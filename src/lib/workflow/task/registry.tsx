import { TaskType } from "@/Types/TaskType";
import { EXTRACT_TEXT_ELEMENT } from "./Extract_text_element";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHTMLTask } from "./PageToHtml";
import { WorkflowTask } from "@/Types/workflow";

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};
export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHTMLTask,
  EXTRACT_TEXT_ELEMENT: EXTRACT_TEXT_ELEMENT,
};
