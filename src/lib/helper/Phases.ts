import { ExecutionPhase } from "@prisma/client";

type Phases = Pick<ExecutionPhase, "creditConsumer">;
export const GetPhasesTotalCost = (phases: Phases[]) => {
  return phases.reduce((acc, phase) => acc + (phase.creditConsumer || 0), 0);
};
