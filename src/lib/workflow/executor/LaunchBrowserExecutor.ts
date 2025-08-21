import { Environment, ExecutionEnvironment } from "@/Types/Environment";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");
    const browser = await puppeteer.launch({
      headless: false,
    });

    await browser.close();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
