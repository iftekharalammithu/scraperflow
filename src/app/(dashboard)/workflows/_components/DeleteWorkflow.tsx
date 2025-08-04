"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { deleteWorkflow } from "../../../../../actions/workflows/deleteworkflow";
import { toast } from "sonner";

interface DeleteWorkflowProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowId: string;
}

const DeleteWorkflow = ({
  open,
  setOpen,
  workflowName,
  workflowId,
}: DeleteWorkflowProps) => {
  const [confirmtext, setconfirmtext] = useState<string>("");

  const deleteMutation = useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: () => {
      toast.success("WorkFlow Deleted", { id: workflowId });
      setconfirmtext("");
    },
    onError: () => {
      toast.error("WorkFlow Deleted", { id: workflowId });
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this workflow, you will not able to recover it
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col py-4 gap-2 px-4">
          <p className="text-sm text-muted-foreground">
            If you are sure enter <b>{workflowName}</b> to confirm
          </p>
          <Input
            value={confirmtext}
            onChange={(e) => setconfirmtext(e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setconfirmtext("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmtext !== workflowName || deleteMutation.isPending}
            onClick={(e) => {
              e.stopPropagation();
              toast.loading("Deleting....", { id: workflowId });
              deleteMutation.mutate(workflowId);
            }}
            className=" bg-destructive  text-white hover:bg-destructive/80"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWorkflow;
