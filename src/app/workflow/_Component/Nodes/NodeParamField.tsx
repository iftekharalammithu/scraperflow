import { TaskParam, TaskParamType } from "@/Types/TaskType";
import React, { useCallback } from "react";
import StringParam from "./Param/StringParam";
import { useReactFlow } from "@xyflow/react";
import { AppNodeProps } from "@/Types/AppNode";
import BrowserInstanceParam from "./Param/BrowserInstanceParam";

const NodeParamField = ({
  param,
  nodeId,
}: {
  param: TaskParam;
  nodeId: string;
}) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNodeProps;
  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [updateNodeData, param.name, node?.data.inputs, nodeId]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        ></StringParam>
      );
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={""}
          updateNodeParamValue={updateNodeParamValue}
        ></BrowserInstanceParam>
      );

    default:
      return (
        <div className=" w-full">
          <p className=" text-xs text-foreground-foreground">Not Implement</p>
        </div>
      );
  }
};

export default NodeParamField;
