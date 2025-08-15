import { TaskRegistry } from "@/lib/workflow/task/registry";
import { AppNodeMissionInputs, AppNodeProps } from "@/Types/AppNode";
import {
  workflowExecutePlan,
  WorkflowExecutePlanPhase,
} from "@/Types/workflow";
import { Edge } from "@xyflow/react";

export enum FlowToExecutionPlanValidationError {
  "NO_ENTRY_POINT",
  "INVALID_INPUTS",
}

export type FlowToExecutionPlanType = {
  executionPlan?: workflowExecutePlan;
  error?: {
    type: FlowToExecutionPlanValidationError;
    invalidElements?: AppNodeMissionInputs[];
  };
};

const FlowToExecutionPlan = (
  nodes: AppNodeProps[],
  edges: Edge[]
): FlowToExecutionPlanType => {
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint
  );

  if (!entryPoint) {
    return {
      error: { type: FlowToExecutionPlanValidationError.NO_ENTRY_POINT },
    };
  }

  const inputsWithErrors: AppNodeMissionInputs[] = [];
  const planned = new Set<string>();
  const inValidInputs = getInvalidInputs(entryPoint, edges, planned);
  if (inValidInputs.length > 0) {
    inputsWithErrors.push({
      nodeId: entryPoint.id,
      inputs: inValidInputs,
    });
  }
  const executionPlan: workflowExecutePlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];
  planned.add(entryPoint.id);
  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutePlanPhase = { phase, nodes: [] };
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        continue;
      }
      const invalidInputs = getInvalidInputs(currentNode, edges, planned);
      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          console.log("Invalid Inputs", currentNode.id, invalidInputs);
          inputsWithErrors.push({
            nodeId: currentNode.id,
            inputs: inValidInputs,
          });
        } else {
          continue;
        }
      }
      nextPhase.nodes.push(currentNode);
    }
    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }
    executionPlan.push(nextPhase);
  }
  if (inputsWithErrors.length > 0) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.INVALID_INPUTS,
        invalidElements: inputsWithErrors,
      },
    };
  }
  return { executionPlan };
};

export default FlowToExecutionPlan;

function getInvalidInputs(
  node: AppNodeProps,
  edges: Edge[],
  planned: Set<string>
) {
  const invalidInputs = [];
  const inputs = TaskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    const inputValueProvided = inputValue?.length > 0;
    if (inputValueProvided) {
      continue;
    }
    const incomingEdges = edges.filter((edge) => edge.target === node.id);

    const inputEdgedByoutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );
    const requiredInputProvidedByVisitedOutput =
      input.required &&
      inputEdgedByoutput &&
      planned.has(inputEdgedByoutput.source);

    if (requiredInputProvidedByVisitedOutput) {
      continue;
    } else if (!input.required) {
      if (!inputEdgedByoutput) {
        continue;
      }
      if (inputEdgedByoutput && planned.has(inputEdgedByoutput.source)) {
        continue;
      }
    }
    invalidInputs.push(input.name);
  }
  return invalidInputs;
}

function getIncomers(node: AppNodeProps, nodes: AppNodeProps[], edges: Edge[]) {
  if (!node.id) {
    return [];
  }
  const incomersIds = new Set();
  edges.forEach((edge) => {
    if (edge.target === node.id) {
      incomersIds.add(edge.source);
    }
  });
  return nodes.filter((n) => incomersIds.has(n.id));
}
