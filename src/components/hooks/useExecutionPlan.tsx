import { useReactFlow } from "@xyflow/react";
import React, { useCallback } from "react";
import FlowToExecutionPlan from "./FlowToExecutionPlan";
import { AppNodeProps } from "@/Types/AppNode";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan } = FlowToExecutionPlan(
      nodes as AppNodeProps[],
      edges
    );
    return executionPlan;
  }, [toObject]);
  return generateExecutionPlan;
};

export default useExecutionPlan;
