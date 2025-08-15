import Topbar from "@/app/workflow/_Component/Topbar/Topbar";
import { auth } from "@clerk/nextjs/server";
import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";
import { GetWorkexecutionWithPhases } from "../../../../../../actions/workflows/GetworkflowwithPhase";
import ExecutionViewer from "./_Component/ExecutionViewer";

const page = ({
  params,
}: {
  params: { executionId: string; workflowId: string };
}) => {
  return (
    <div className=" flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        workflowId={params.workflowId}
        title="Workflow run details"
        subtitle={`Run ID: ${params.executionId}`}
        hidebuttons
      ></Topbar>
      <section className=" flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className=" flex w-full items-center  justify-center">
              <Loader2Icon className=" h-10 w-10 animate-spin "></Loader2Icon>
            </div>
          }
        >
          <ExecutionViewerWrapper
            executionId={params.executionId}
          ></ExecutionViewerWrapper>
        </Suspense>
      </section>
    </div>
  );
};

export default page;

const ExecutionViewerWrapper = async ({
  executionId,
}: {
  executionId: string;
}) => {
  const { userId } = await auth();
  if (!userId) {
    return <div>Unauthentication</div>;
  }
  const workflowExecution = await GetWorkexecutionWithPhases(executionId);
  if (!workflowExecution) {
    return <div>Not Found</div>;
  }
  return <ExecutionViewer initialData={workflowExecution}></ExecutionViewer>;
};
