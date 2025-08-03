"use server";

import { prisma } from "@/lib/prismadb";
import { WorkflowStatus } from "@/Types/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const UpdateWorkflow = async ({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauth");
  }
  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });
  if (!workflow) {
    throw new Error("Workflow Not Found");
  }
  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("Workflow is not Draft");
  }
  await prisma.workflow.update({
    where: {
      id,
      userId,
    },
    data: {
      definition,
    },
  });
  revalidatePath("/workflow");
};
