import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateFlowNode } from "@/lib/workflow/CreateFlowNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { AppNodeProps } from "@/Types/AppNode";
import { TaskType } from "@/Types/TaskType";
import { useReactFlow } from "@xyflow/react";
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from "lucide-react";
import React from "react";

const NodeHeader = ({
  taskType,
  nodeId,
}: {
  taskType: TaskType;
  nodeId: string;
}) => {
  const task = TaskRegistry[taskType];

  const { deleteElements, getNode, addNodes } = useReactFlow();
  return (
    <div className=" flex items-center gap-2 p-2">
      <task.icon size={16}></task.icon>
      <div className=" flex justify-between items-center w-full">
        <p className=" text-sm font-bold uppercase text-foreground-foreground">
          {task.label}
        </p>
        <div className=" flex gap-1 items-center">
          {task.isEntryPoint && <Badge>Entry Point</Badge>}
          <Badge className=" gap-2 flex items-center text-xs">
            <CoinsIcon size={16}></CoinsIcon>
            {task.credits}
          </Badge>
          {!task.isEntryPoint && (
            <>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  deleteElements({
                    nodes: [{ id: nodeId }],
                  });
                }}
              >
                <TrashIcon size={12}></TrashIcon>
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  const node = getNode(nodeId) as AppNodeProps;
                  const newX = node.position.x;
                  const newY = node.position.y + node.measured?.height! + 20;
                  const newNode = CreateFlowNode(node.data.type, {
                    x: newX,
                    y: newY,
                  });
                  addNodes([newNode]);
                }}
              >
                <CopyIcon size={12}></CopyIcon>
              </Button>
            </>
          )}
          <Button
            variant={"ghost"}
            size={"icon"}
            className=" drag-handle cursor-grab"
          >
            <GripVerticalIcon size={20}></GripVerticalIcon>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeHeader;
