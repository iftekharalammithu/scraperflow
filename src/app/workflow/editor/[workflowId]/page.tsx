import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import Editor from "../../_Component/Editor";

const page = async ({ params }: { params: { workflowId: string } }) => {
  const { workflowId } = await params;
  const { userId } = await auth();

  if (!userId) {
    return <div>Unauthenticated</div>;
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <Editor workflow={workflow}></Editor>;
};

export default page;
