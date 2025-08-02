import { TaskParam, TaskParamType } from "@/Types/TaskType";
import React from "react";
import StringParam from "./Param/StringParam";

const NodeParamField = ({ param }: { param: TaskParam }) => {
  switch (param.type) {
    case TaskParamType.STRING:
      return <StringParam param={param}></StringParam>;

    default:
      return (
        <div className=" w-full">
          <p className=" text-xs text-muted-foreground">Not Implement</p>
        </div>
      );
  }
};

export default NodeParamField;
