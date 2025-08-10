import { NodeProps } from "@xyflow/react";
import React, { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/Types/AppNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import NodeInputs, { NodeInput } from "./NodeInputs";
import NodeOutputs, { NodeOutput } from "./NodeOutputs";
import { Badge } from "@/components/ui/badge";

const DEV_MODE = "true";

const NodesComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];
  return (
    <NodeCard isSelectd={props.selected} nodeId={props.id}>
      {DEV_MODE && <Badge>{props.id}</Badge>}
      <NodeHeader taskType={nodeData.type} nodeId={props.id}></NodeHeader>
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput
            nodeId={props.id}
            input={input}
            key={input.name}
          ></NodeInput>
        ))}
      </NodeInputs>
      <NodeOutputs>
        {task.outputs.map((output) => (
          <NodeOutput output={output} key={output.name}></NodeOutput>
        ))}
      </NodeOutputs>
    </NodeCard>
  );
});

export default NodesComponent;
NodesComponent.displayName = "NodeConponent";
