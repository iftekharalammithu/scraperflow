import { AppNodeProps } from "./../../Types/AppNode";
import { TaskType } from "@/Types/TaskType";

export const CreateFlowNode = (
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNodeProps => {
  return {
    id: crypto.randomUUID(),
    type: "FlowScrapeNode",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
};
