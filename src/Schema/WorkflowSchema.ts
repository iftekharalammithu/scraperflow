import { z } from "zod";

export const createWorkflowSchema = z.object({
  name: z.string({ message: "Username is required" }).max(50),
  description: z.string({ message: "Description is required" }).max(50),
});
