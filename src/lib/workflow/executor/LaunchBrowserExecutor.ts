import { Environment } from "@/Types/Environment";
import puppeteer from "puppeteer";

export async function LaunchBrowserExecutor(
  environment: Environment
): Promise<boolean> {
  try {
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
