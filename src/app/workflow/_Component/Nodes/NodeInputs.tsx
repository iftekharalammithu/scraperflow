import { cn } from "@/lib/utils";
import { TaskParam } from "@/Types/TaskType";
import { Handle, Position } from "@xyflow/react";
import React, { ReactNode } from "react";
import NodeParamField from "./NodeParamField";

const NodeInputs = ({ children }: { children: ReactNode }) => {
  return <div className=" flex flex-col divide-y gap-2">{children}</div>;
};

export default NodeInputs;

export const NodeInput = ({ input }: { input: TaskParam }) => {
  return (
    <div className="  flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField param={input}></NodeParamField>
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted  border-2 border-background -left-2 w-4 h-4"
          )}
        ></Handle>
      )}
    </div>
  );
};
