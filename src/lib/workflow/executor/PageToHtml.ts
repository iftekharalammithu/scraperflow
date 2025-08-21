import { ExecutionEnvironment } from "@/Types/Environment";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import { PageToHTMLTask } from "../task/PageToHtml";

export async function PageToHtmlExecutor(
  environment: ExecutionEnvironment<typeof PageToHTMLTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
