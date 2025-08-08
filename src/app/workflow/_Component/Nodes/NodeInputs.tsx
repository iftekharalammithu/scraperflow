import { cn } from "@/lib/utils";
import { TaskParam } from "@/Types/TaskType";
import { Handle, Position, useEdges } from "@xyflow/react";
import React, { ReactNode } from "react";
import NodeParamField from "./NodeParamField";
import { ColorForhandle } from "./Comon";

const NodeInputs = ({ children }: { children: ReactNode }) => {
  return <div className=" flex flex-col divide-y gap-2">{children}</div>;
};

export default NodeInputs;

export const NodeInput = ({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) => {
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );
  return (
    <div className="  flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField
        param={input}
        nodeId={nodeId}
        disabled={isConnected}
      ></NodeParamField>
      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-foreground  !border-2 !border-background !-left-2 !w-4 !h-4",
            ColorForhandle[input.type]
          )}
        ></Handle>
      )}
    </div>
  );
};
