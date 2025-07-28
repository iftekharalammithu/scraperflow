"use client";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Layers2Icon } from "lucide-react";
import React, { useState } from "react";

interface CreateWorkflowDialogProps {
  triggerText?: string;
}

const CreateWorkflowDialog = ({ triggerText }: CreateWorkflowDialogProps) => {
  const [open, setopen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setopen}>
        <DialogTrigger asChild>
          <Button variant={"project"}>
            {" "}
            {triggerText ?? "Create Workflow"}
          </Button>
        </DialogTrigger>
        <DialogContent className=" px-0">
          <CustomDialogHeader
            icon={Layers2Icon}
            title={"Create Workflow"}
            subtitle={"Start building your workflow"}
          ></CustomDialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateWorkflowDialog;
