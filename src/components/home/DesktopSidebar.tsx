"use client";
import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheck,
} from "lucide-react";
import React, { useState } from "react";
import Logo from "../Logo";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const route = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/workflows", label: "Workflows", icon: Layers2Icon },
  { href: "/credentials", label: "Credentials", icon: ShieldCheck },
  { href: "/billing", label: "Billing", icon: CoinsIcon },
];

const DesktopSidebar = () => {
  const pathname = usePathname();

  const activeRoute =
    route.find((item) => item.href.length > 0 && pathname === item.href) ||
    route[0];

  return (
    <div className=" relative hidden md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-foreground-foreground border-r-2 border-separate">
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
        <Logo></Logo>
      </div>
      <div className=" p-2">Todo Credits</div>
      <div className=" flex flex-col p-2 gap-2">
        {route.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-foreground",
              activeRoute.label === item.label
                ? "bg-primary  "
                : "hover:bg-primary/20"
            )}
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

export const MobileSidebar = () => {
  const [isOpen, setOpen] = useState(false);

  const pathname = usePathname();

  const activeRoute =
    route.find(
      (item) => item.href.length > 0 && pathname.includes(item.href)
    ) || route[0];

  return (
    <div className=" block border-separate bg-background md:hidden">
      <nav className=" container flex items-center justify-between px-8 ">
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MenuIcon></MenuIcon>
            </Button>
          </SheetTrigger>
          <SheetContent
            className=" w-[400px] sm:w-[540px] space-y-4"
            side="left"
          >
            <Logo></Logo>
            <div className="flex flex-col gap-1">
              {route.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "text-foreground",
                    activeRoute.label === item.label
                      ? "bg-primary  "
                      : "hover:bg-primary/20"
                  )}
                  onClick={() => setOpen(!isOpen)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};
