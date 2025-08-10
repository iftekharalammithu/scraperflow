import { TaskParamType, TaskType } from "@/Types/TaskType";
import { WorkflowTask } from "@/Types/workflow";
import { GlobeIcon, LucideProps } from "lucide-react";
import React from "react";

export const PageToHTMLTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get HTML From Page",
  icon: (props: LucideProps) => (
    <GlobeIcon className=" stroke-pink-400" {...props}></GlobeIcon>
  ),
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: "Web Page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
      hideHandle: false,
    },
  ],
  outputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
    },
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
} satisfies WorkflowTask;
