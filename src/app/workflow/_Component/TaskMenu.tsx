"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/Types/TaskType";
import React from "react";

const TaskMenu = () => {
  return (
    <aside className="  w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate p-2 h-full overflow-auto">
      <Accordion
        type="multiple"
        className=" w-full"
        defaultValue={["extraction"]}
      >
        <AccordionItem value="extraction">
          <AccordionTrigger className=" font-bold">
            Data Extraction
          </AccordionTrigger>
          <AccordionContent className=" flex flex-col gap-1">
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML}></TaskMenuBtn>
            <TaskMenuBtn taskType={TaskType.EXTRACT_TEXT_ELEMENT}></TaskMenuBtn>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default TaskMenu;

const TaskMenuBtn = ({ taskType }: { taskType: TaskType }) => {
  const task = TaskRegistry[taskType];
  const onDragStart = (e: React.DragEvent, type: TaskType) => {
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.effectAllowed = "move";
  };
  return (
    <Button
      variant={"secondary"}
      className=" flex justify-between items-center  w-full cursor-grabbing"
      draggable
      onDragStart={(e) => onDragStart(e, taskType)}
    >
      <div className=" flex gap-2 ">
        <task.icon size={20}></task.icon>
        {task.lable}
      </div>
    </Button>
  );
};
