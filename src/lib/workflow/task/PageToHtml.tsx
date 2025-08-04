import { TaskParamType, TaskType } from "@/Types/TaskType";
import { GlobeIcon, LucideProps } from "lucide-react";
import React from "react";

export const PageToHTMLTask = {
  type: TaskType.PAGE_TO_HTML,
  lable: "Get HTML From Page",
  icon: (props: LucideProps) => (
    <GlobeIcon className=" stroke-pink-400" {...props}></GlobeIcon>
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Web Page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
      hideHandle: true,
    },
  ],
};
