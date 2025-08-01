import { Node } from "@xyflow/react";
import { TaskType } from "./TaskType";

export interface AppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface AppNodeProps extends Node {
  data: AppNodeData;
}
