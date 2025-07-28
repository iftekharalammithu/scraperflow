"use client";
import React from "react";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomDialogHeaderProps {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;

  titleClassName?: string;
  subtitleClassName?: string;
  iconClassName?: string;
}

const CustomDialogHeader = (props: CustomDialogHeaderProps) => {
  const Icon = props.icon;
  return (
    <div>
      <DialogHeader className=" py-6">
        <DialogTitle asChild>
          <div className=" flex flex-col items-center gap-2 mb-2">
            {Icon && (
              <Icon
                className={cn("stroke-primary", props.iconClassName)}
                size={30}
              ></Icon>
            )}
            {props.title && (
              <p className={cn("text-xl text-primary", props.titleClassName)}>
                {props.title}
              </p>
            )}
            {props.subtitle && (
              <p
                className={cn(
                  "text-sm text-muted-foreground",
                  props.subtitleClassName
                )}
              >
                {props.subtitle}
              </p>
            )}
          </div>
        </DialogTitle>
      </DialogHeader>
    </div>
  );
};

export default CustomDialogHeader;
