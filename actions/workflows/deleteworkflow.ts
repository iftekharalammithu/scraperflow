"use server";

import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteWorkflow = async (id: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unauthorized");
  }
  console.log(id);

  await prisma.workflow.delete({
    where: { id, userId },
  });

  revalidatePath("/workflows");
};
