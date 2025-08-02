import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskParam } from "@/Types/TaskType";
import React, { useId } from "react";

interface ParamProps {
  param: TaskParam;
}

const StringParam = ({ param }: ParamProps) => {
  const id = useId();
  return (
    <div className=" space-y-1 p-1 w-full">
      <Label htmlFor={id} className=" text-xs flex"></Label>
      <Input id={id}></Input>
      {param.helperText && (
        <p className=" text-muted px-2">{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
