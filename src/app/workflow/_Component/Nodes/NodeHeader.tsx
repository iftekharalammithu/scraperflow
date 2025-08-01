import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/Types/TaskType";
import { CoinsIcon, GripVerticalIcon } from "lucide-react";
import React from "react";

const NodeHeader = ({ taskType }: { taskType: TaskType }) => {
  const task = TaskRegistry[taskType];
  return (
    <div className=" flex items-center gap-2 p-2">
      <task.icon size={16}></task.icon>
      <div className=" flex justify-between items-center w-full">
        <p className=" text-sm font-bold uppercase text-muted-foreground">
          {task.lable}
        </p>
        <div className=" flex gap-1 items-center">
          {task.isEntryPoint && <Badge>Entry Point</Badge>}
          <Badge className=" gap-2 flex items-center text-xs">
            <CoinsIcon size={16}></CoinsIcon>
            TODO
          </Badge>
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
