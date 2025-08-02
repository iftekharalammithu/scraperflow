import { NodeProps } from "@xyflow/react";
import React, { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/Types/AppNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import NodeInputs, { NodeInput } from "./NodeInputs";

const NodesComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];
  return (
    <NodeCard isSelectd={props.selected} nodeId={props.id}>
      <NodeHeader taskType={nodeData.type}></NodeHeader>
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput input={input} key={input.name}></NodeInput>
        ))}
      </NodeInputs>
    </NodeCard>
  );
});

export default NodesComponent;
NodesComponent.displayName = "NodeConponent";
