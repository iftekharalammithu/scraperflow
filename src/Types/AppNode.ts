import { Node } from "@xyflow/react";
import { TaskParam, TaskType } from "./TaskType";

export interface AppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: unknown;
}

export interface AppNodeProps extends Node {
  data: AppNodeData;
}

export interface ParamProps {
  param: TaskParam;
  value: string;
  disabled?: boolean;
  updateNodeParamValue: (newValue: string) => void;
}
