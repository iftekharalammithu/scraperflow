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
import { createWorkflowSchema } from "@/Schema/WorkflowSchema";
import { Layers2Icon, Loader2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkflow } from "../../../../../actions/workflows/CreateWorkflow";
import { toast } from "sonner";
interface CreateWorkflowDialogProps {
  triggerText?: string;
}

const CreateWorkflowDialog = ({ triggerText }: CreateWorkflowDialogProps) => {
  const [open, setopen] = useState(false);

  const form = useForm<z.infer<typeof createWorkflowSchema>>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {},
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: () => {
      toast.success("Workflow Created", { id: "create-workflow" });
    },
    onError: () => {
      toast.error("Failed to Created", { id: "create-workflow" });
    },
  });

  const onsubmit = useCallback(
    (values: z.infer<typeof createWorkflowSchema>) => {
      toast.loading("Creating workflow...", { id: "create-workflow" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <div>
      <Dialog open={open} onOpenChange={setopen}>
        <DialogTrigger asChild>
          <Button variant={"project"}>
            {triggerText ?? "Create Workflow"}
          </Button>
        </DialogTrigger>
        <DialogContent className=" px-0">
          <CustomDialogHeader
            icon={Layers2Icon}
            title={"Create Workflow"}
            subtitle={"Start building your workflow"}
          ></CustomDialogHeader>
          <div className=" p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onsubmit)}
                className=" space-y-8 w-full"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" flex gap-1 items-center">
                        Name
                        <p className=" text-xs text-primary">required</p>
                      </FormLabel>

                      <FormControl>
                        <Input {...field}></Input>
                      </FormControl>
                      <FormDescription>
                        Choose a Description and unique name
                      </FormDescription>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" flex gap-1 items-center">
                        Description
                        <p className=" text-xs text-muted-foreground">
                          Optional
                        </p>
                      </FormLabel>

                      <FormControl>
                        <Textarea
                          placeholder="Type Description"
                          className=" resize-none"
                          {...field}
                        ></Textarea>
                      </FormControl>
                      <FormDescription>Provide a Desctiption</FormDescription>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>
                <Button type="submit" disabled={isPending} className=" w-full">
                  {isPending ? (
                    <Loader2 className=" animate-spin"></Loader2>
                  ) : (
                    "Process"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateWorkflowDialog;
