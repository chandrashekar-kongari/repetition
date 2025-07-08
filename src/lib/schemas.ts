import { z } from "zod";

// Task Status and Priority enums from Prisma
export const TaskStatus = z.enum(["TODO", "IN_PROGRESS", "DONE"]);
export const Priority = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);

// Task schema for validation
export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z.string().optional(),
  status: TaskStatus.default("TODO"),
  priority: Priority.default("MEDIUM"),
  order: z.number().int().min(0).default(0),
});

export const updateTaskSchema = taskSchema.partial().extend({
  id: z.string().cuid(),
});

export const reorderTasksSchema = z.object({
  tasks: z.array(
    z.object({
      id: z.string().cuid(),
      order: z.number().int().min(0),
    })
  ),
});

// User schema
export const userSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
});

// Type exports
export type TaskInput = z.infer<typeof taskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type ReorderTasksInput = z.infer<typeof reorderTasksSchema>;
export type UserInput = z.infer<typeof userSchema>;
