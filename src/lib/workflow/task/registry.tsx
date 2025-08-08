import { TaskType } from "@/Types/TaskType";
import { EXTRACT_TEXT_ELEMENT } from "./Extract_text_element";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHTMLTask } from "./PageToHtml";
import { WorkflowTask } from "@/Types/workflow";

export const TaskRegistry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHTMLTask,
  EXTRACT_TEXT_ELEMENT: EXTRACT_TEXT_ELEMENT,
};

type Registry = {
  [k in TaskType]: WorkflowTask;
};
