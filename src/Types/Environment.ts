import { WorkflowTask } from "@/Types/workflow";
import { Browser } from "puppeteer";

export type Environment = {
  phases: {
    [key: string]: {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    };
  };
  browser?: Browser;
};

export type ExecutionEnvironment<T extends WorkflowTask> = {
  getInput(name: T["inputs"][number]["name"]): string;
};
