import Logo from "@/components/Logo";
import { ThemeModeToggle } from "@/components/ThemeModeToggle";
import { Separator } from "@/components/ui/separator";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex flex-col w-full h-screen">
      {children} <Separator></Separator>
      <footer className=" flex items-center justify-between p-2">
        <Logo iconSize={16} fontSize=" text-xl"></Logo>
        <ThemeModeToggle></ThemeModeToggle>
      </footer>
    </div>
  );
};

export default layout;
