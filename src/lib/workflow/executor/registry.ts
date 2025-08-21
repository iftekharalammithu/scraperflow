import { TaskType } from "@/Types/TaskType";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtml";
import { WorkflowTask } from "@/Types/workflow";
import { ExecutionEnvironment } from "@/Types/Environment";

type Executionfn<T extends WorkflowTask> = (
  environment: ExecutionEnvironment<T>
) => Promise<boolean>;
type RegistryType = {
  [K in TaskType]: Executionfn<WorkflowTask & { type: K }>;
};

export const ExecutorRegistry: RegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_ELEMENT: () => Promise.resolve(true),
};
