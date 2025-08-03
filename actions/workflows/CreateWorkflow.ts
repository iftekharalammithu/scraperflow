"use server";

import { AppNodeProps } from "./../../src/Types/AppNode";
import { prisma } from "@/lib/prismadb";
import { CreateFlowNode } from "@/lib/workflow/CreateFlowNode";
import { createWorkflowSchema } from "@/Schema/WorkflowSchema";
import { TaskType } from "@/Types/TaskType";
import { WorkflowStatus } from "@/Types/workflow";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import z from "zod";

export const CreateWorkflow = async (
  form: z.infer<typeof createWorkflowSchema>
) => {
  const { success, data } = createWorkflowSchema.safeParse(form);
  // console.log(success);
  if (!success) {
    throw new Error("Invalid form data");
  }
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Invalid User");
  }

  const initialFlow: { nodes: AppNodeProps[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };

  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data,
    },
  });
  console.log(result);
  if (!result) {
    throw new Error("failed to create workflow");
  }

  return { success: true, id: result.id }; // Return instead of redirect
};
