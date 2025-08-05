import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParamProps } from "@/Types/AppNode";
import React, { useId, useState } from "react";

const StringParam = ({ param, value, updateNodeParamValue }: ParamProps) => {
  const [intervalValue, setintervalValue] = useState(value);
  const id = useId();
  return (
    <div className=" space-y-1 p-1 w-full">
      <Label htmlFor={id} className=" text-xs flex"></Label>
      <Input
        id={id}
        value={intervalValue}
        onBlur={(e) => updateNodeParamValue(e.target.value)}
        placeholder="Enter value here"
        onChange={(e) => setintervalValue(e.target.value)}
      ></Input>
      {param.helperText && (
        <p className=" text-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
