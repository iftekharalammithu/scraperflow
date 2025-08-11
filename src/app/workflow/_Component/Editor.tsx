import { Workflow } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";
import Topbar from "./Topbar/Topbar";
import TaskMenu from "./TaskMenu";
import { FlowValidationContextProvider } from "@/components/Context/FlowValidationContext";

const Editor = ({ workflow }: { workflow: Workflow }) => {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className=" flex flex-col h-full w-full overflow-hidden">
          <Topbar
            title={"Workflow Editor"}
            workflowId={workflow.id}
            subtitle={workflow.name}
          ></Topbar>
          <section className=" flex h-full overflow-auto">
            <TaskMenu></TaskMenu>
            <FlowEditor workflow={workflow}></FlowEditor>
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
};

export default Editor;
