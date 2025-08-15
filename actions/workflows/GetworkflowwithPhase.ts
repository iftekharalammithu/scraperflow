"use server";

import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

export const GetWorkexecutionWithPhases = async (executionId: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }
  return prisma.workflowExecution.findUnique({
    where: {
      id: executionId,
      userId,
    },
    include: {
      phases: {
        orderBy: {
          number: "asc",
        },
      },
    },
  });
};
