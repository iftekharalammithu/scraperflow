"use client";
import { CoinsIcon, HomeIcon, Layers2Icon, ShieldCheck } from "lucide-react";
import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";

const DesktopSidebar = () => {
  const route = [
    { href: "", label: "Home", icon: HomeIcon },
    { href: "", label: "Workflows", icon: Layers2Icon },
    { href: "", label: "Credentials", icon: ShieldCheck },
    { href: "", label: "Billing", icon: CoinsIcon },
  ];

  const pathname = usePathname();

  const activeRoute =
    route.find(
      (item) => item.href.length > 0 && pathname.includes(item.href)
    ) || route[0];

  return (
    <div className=" relative hidden md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
        <Logo></Logo>
      </div>
      <div className=" p-2">Todo Credits</div>
      <div className=" flex flex-col p-2 gap-2">
        {route.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={buttonVariants({ variant: "ghost" })}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DesktopSidebar;
