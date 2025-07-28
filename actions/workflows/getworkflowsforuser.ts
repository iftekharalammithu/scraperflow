"use server";

import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

export const GetWorkflowForUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized!");
  }

  return prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createAt: "asc",
    },
  });
};
