"use server";
import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

export const GetWorkflowPhaseDetails = async (phaseId: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  return prisma.executionPhase.findUnique({
    where: { id: phaseId, execution: { userId } },
  });
};
