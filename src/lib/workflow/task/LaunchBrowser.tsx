import { TaskParamType, TaskType } from "@/Types/TaskType";
import { WorkflowTask } from "@/Types/workflow";
import { GlobeIcon, LucideProps } from "lucide-react";
import React from "react";
import { ExecutorRegistry } from "../executor/registry";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon className=" stroke-pink-400" {...props}></GlobeIcon>
  ),
  isEntryPoint: true,
  credits: 5,
  inputs: [
    {
      name: "Website Url",
      type: TaskParamType.STRING,
      helperText: "eg: https://www.google.com",
      required: true,
      hideHandle: true,
    },
  ] as const,
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
