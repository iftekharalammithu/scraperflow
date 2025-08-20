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
