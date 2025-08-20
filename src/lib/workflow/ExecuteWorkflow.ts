import { environment } from "./../../../node_modules/puppeteer-core/lib/esm/puppeteer/environment";
import "server-only";
import { prisma } from "../prismadb";
import { revalidatePath } from "next/cache";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/Types/workflow";
import { ExecutionPhase } from "@prisma/client";
import { AppNodeData, AppNodeProps } from "@/Types/AppNode";
import { TaskRegistry } from "./task/registry";
import { TaskType } from "@/Types/TaskType";
import { ExecutorRegistry } from "./executor/registry";
import { Environment } from "@/Types/Environment";

export async function ExecuteWorkflow(executiionId: string) {
  const execution = await prisma.workflowExecution.findUnique({
    where: {
      id: executiionId,
    },
    include: { workflow: true, phases: true },
  });
  if (!execution) {
    throw new Error("execution not found");
  }

  const environment: Environment = { phases: {} };
  await initializeWorkFLowExecution(executiionId, execution.workflowId);
  await initializePhaseStatuses(execution);

  let CreditConsumed = 0;
  let executionFailed = false;

  for (const phase of execution.phases) {
    const phaseExecution = await executionWorkflowPhase(phase, environment);
    if (!phaseExecution.success) {
      executionFailed = true;
      break;
    }
  }

  await finalizeWorkflowExecution(
    executiionId,
    execution.workflowId,
    executionFailed,
    CreditConsumed
  );
  revalidatePath("/workflows/runs");
}

async function initializeWorkFLowExecution(
  executionId: string,
  workflowId: string
) {
  await prisma.workflowExecution.update({
    where: {
      id: executionId,
    },
    data: {
      startedAt: new Date(),
      status: WorkflowExecutionStatus.RUNNING,
    },
  });
  await prisma.workflow.update({
    where: {
      id: workflowId,
    },
    data: {
      lastRunAt: new Date(),
      lastRunStatus: WorkflowExecutionStatus.RUNNING,
      lastRunId: executionId,
    },
  });
}

async function initializePhaseStatuses(execution: any) {
  await prisma.executionPhase.updateMany({
    where: {
      id: { in: execution.phases.map((phase: any) => phase.id) },
    },
    data: {
      status: ExecutionPhaseStatus.PENDING,
    },
  });
}

async function finalizeWorkflowExecution(
  executionId: string,
  workflowId: string,
  executionFailed: boolean,
  CreditConsumed: number
) {
  const finalStatus = executionFailed
    ? WorkflowExecutionStatus.FAILED
    : WorkflowExecutionStatus.COMPLETED;

  await prisma.workflowExecution.update({
    where: {
      id: executionId,
    },
    data: {
      status: finalStatus,
      completed: new Date(),
      CreditConsumed,
    },
  });
  await prisma.workflow
    .update({
      where: {
        id: workflowId,
        lastRunId: executionId,
      },
      data: {
        lastRunStatus: finalStatus,
      },
    })
    .catch((err) => {});
}

async function executionWorkflowPhase(
  phase: ExecutionPhase,
  environment: Environment
) {
  const startedAt = new Date();
  const node = JSON.parse(phase.node) as AppNodeProps;

  setupEnvironmentForPhase(node, environment);

  await prisma.executionPhase.update({
    where: {
      id: phase.id,
    },
    data: {
      status: ExecutionPhaseStatus.RUNNING,
      startedAt,
    },
  });
  const creditsRequired = TaskRegistry[node.data.type].credits;
  const success = await executePhase(phase, node, environment);

  await finalizePhase(phase.id, success);
  return { success };
}

async function finalizePhase(phaseId: string, success: boolean) {
  const finalStatus = success
    ? ExecutionPhaseStatus.COMPLETED
    : ExecutionPhaseStatus.FAILED;

  await prisma.executionPhase.update({
    where: {
      id: phaseId,
    },
    data: {
      status: finalStatus,
      completed: new Date(),
    },
  });
}

async function executePhase(
  phase: ExecutionPhase,
  node: AppNodeProps,
  environment: Environment
): Promise<boolean> {
  const runFn = ExecutorRegistry[node.data.type];
  if (!runFn) {
    return false;
  }
  return await runFn(environment);
}

function setupEnvironmentForPhase(
  node: AppNodeProps,
  environment: Environment
) {
  environment.phases[node.id] = { inputs: {}, outputs: {} };
  const inputs = TaskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    const inputvalue = node.data.inputs[input.name];
    if (inputvalue) {
      environment.phases[node.id].inputs[input.name] = inputvalue;
      continue;
    }
  }
}
