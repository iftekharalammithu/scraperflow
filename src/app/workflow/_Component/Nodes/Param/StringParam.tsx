import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/Types/AppNode";
import React, { useEffect, useId, useState } from "react";

const StringParam = ({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: ParamProps) => {
  const [intervalValue, setintervalValue] = useState(value);
  const id = useId();

  useEffect(() => {
    setintervalValue(value);
  }, [value]);

  let Component: any = Input;
  if (param.variant === "textarea") {
    Component = Textarea;
  }
  return (
    <div className=" space-y-1 p-1 w-full">
      <Label htmlFor={id} className=" text-xs flex">
        {param.name}
      </Label>
      <Component
        disabled={disabled}
        id={id}
        value={intervalValue}
        onBlur={(e: any) => updateNodeParamValue(e.target.value)}
        placeholder="Enter value here"
        onChange={(e: any) => setintervalValue(e.target.value)}
      ></Component>
      {param.helperText && (
        <p className=" text-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
