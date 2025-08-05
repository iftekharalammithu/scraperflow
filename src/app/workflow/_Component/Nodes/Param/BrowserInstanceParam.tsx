import { ParamProps } from "@/Types/AppNode";
import React from "react";

const BrowserInstanceParam = ({ param }: ParamProps) => {
  return <p className=" text-xs">{param.name}</p>;
};

export default BrowserInstanceParam;
