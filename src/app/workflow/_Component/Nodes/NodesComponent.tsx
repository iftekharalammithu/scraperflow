import { NodeProps } from "@xyflow/react";
import React, { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/Types/AppNode";

const NodesComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  return (
    <NodeCard isSelectd={props.selected} nodeId={props.id}>
      <NodeHeader taskType={nodeData.type}></NodeHeader>
    </NodeCard>
  );
});

export default NodesComponent;
NodesComponent.displayName = "NodeConponent";
