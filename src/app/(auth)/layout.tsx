import Logo from "@/components/Logo";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex items-center justify-center  h-screen gap-4 flex-col">
      <Logo></Logo>
      {children}
    </div>
  );
};

export default layout;
