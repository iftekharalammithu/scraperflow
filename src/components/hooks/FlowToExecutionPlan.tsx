import { TaskRegistry } from "@/lib/workflow/task/registry";
import { AppNodeProps } from "@/Types/AppNode";
import {
  workflowExecutePlan,
  WorkflowExecutePlanPhase,
} from "@/Types/workflow";
import { Edge, getIncomers } from "@xyflow/react";

type FlowToExecutionPlanType = {
  executionPlan?: workflowExecutePlan;
};

const FlowToExecutionPlan = (
  nodes: AppNodeProps[],
  edges: Edge[]
): FlowToExecutionPlanType => {
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint
  );

  if (!entryPoint) {
    throw new Error("TODO: Handle This Error");
  }

  const planned = new Set<string>();

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
