"use server";

import FlowToExecutionPlan from "@/components/hooks/FlowToExecutionPlan";
import { prisma } from "@/lib/prismadb";
import { ExecuteWorkflow } from "@/lib/workflow/ExecuteWorkflow";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  ExecutionPhaseStatus,
  workflowExecutePlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "@/Types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }
  const { workflowId, flowDefinition } = form;

  if (!workflowId) {
    throw new Error("workflowId is required");
  }
  const workflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id: workflowId,
    },
  });
  if (!workflow) {
    throw new Error("workflow not found");
  }
  if (!flowDefinition) {
    throw new Error("flow definition is not defined");
  }
  const flow = JSON.stringify(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);

  if (result.error) {
    throw new Error("flow definition is not Valid");
  }
  if (!result.executionPlan) {
    throw new Error("no execution plan generated");
  }
  const executionPlan: workflowExecutePlan = result.executionPlan;
  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId,
      userId,
      status: WorkflowExecutionStatus.PENDING,
      startedAt: new Date(),
      trigger: WorkflowExecutionTrigger.MANUAL,
      phases: {
        create: executionPlan.flatMap((phase) => {
          return phase.nodes.flatMap((node) => {
            return {
              userId,
              status: ExecutionPhaseStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            };
          });
        }),
      },
    },
    select: {
      id: true,
      phases: true,
    },
  });
  if (!execution) {
    throw new Error("Workflow Execution not created");
  }
  ExecuteWorkflow(execution.id);
  redirect(`/workflow/runs/${workflowId}/${execution.id}`);
}
