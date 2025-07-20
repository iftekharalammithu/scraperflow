import DesktopSidebar from "@/components/home/DesktopSidebar";
import { Separator } from "@/components/ui/separator";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="  flex h-screen">
      <DesktopSidebar></DesktopSidebar>
      <div className="  flex flex-col flex-1 min-h-screen">
        <header className=" flex items-center justify-between  px-6 py-4  h-[50px] container">
          ScraperFlow
        </header>
        <Separator></Separator>
        <div className=" overflow-auto">
          <div className=" flex-1 container py-4 px-7 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
