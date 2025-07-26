import { Skeleton } from "@/components/ui/skeleton";
import { waitfor } from "@/lib/helper/Waitfor";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className=" flex-1 flex flex-col h-full ">
      <div className=" flex justify-between">
        <div className=" flex flex-col">
          <h1 className=" text-3xl font-bold">Work Flows</h1>
          <p className=" text-muted-foreground">Manage your Workflows</p>
        </div>
      </div>
      <div className=" h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton></UserWorkflowsSkeleton>}>
          <UserWorkFlows></UserWorkFlows>
        </Suspense>
      </div>
    </div>
  );
};

const UserWorkflowsSkeleton = () => {
  return (
    <div className="  space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className=" h-32  w-full"></Skeleton>
      ))}
    </div>
  );
};

const UserWorkFlows = async () => {
  await waitfor(3000);
  return <div>UserWorkFlows</div>;
};

export default page;
