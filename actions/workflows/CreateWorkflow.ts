"use server";

import { prisma } from "@/lib/prismadb";
import { createWorkflowSchema } from "@/Schema/WorkflowSchema";
import { WorkflowStatus } from "@/Types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import z from "zod";

export const CreateWorkflow = async (
  form: z.infer<typeof createWorkflowSchema>
) => {
  const { success, data } = createWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid form data");
  }
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Invalid User");
  }

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: "TODO",
      ...data,
    },
  });
  if (!result) {
    throw new Error("failed to create workflow");
  }

  redirect(`/workflow/editor/${result.id}`);
};
