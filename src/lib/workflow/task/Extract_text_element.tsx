import { TaskParamType, TaskType } from "@/Types/TaskType";
import { LucideProps, TextIcon } from "lucide-react";
import React from "react";

export const EXTRACT_TEXT_ELEMENT = {
  type: TaskType.EXTRACT_TEXT_ELEMENT,
  lable: "Extract Text From Element",
  icon: (props: LucideProps) => (
    <TextIcon className=" stroke-pink-400" {...props}></TextIcon>
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
  ],
  outputs: [
    {
      name: "Extracted text",
      type: TaskParamType.STRING,
    },
  ],
};
