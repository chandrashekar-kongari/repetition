import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc";
import { prisma } from "@/lib/db";
import {
  taskSchema,
  updateTaskSchema,
  reorderTasksSchema,
} from "@/lib/schemas";

export const tasksRouter = router({
  list: publicProcedure.query(async () => {
    const tasks = await prisma.task.findMany({
      orderBy: { order: "asc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return tasks;
  }),

  create: publicProcedure.input(taskSchema).mutation(async ({ input }) => {
    // Get the highest order value and add 1
    const highestOrder = await prisma.task.aggregate({
      _max: {
        order: true,
      },
    });

    const newOrder = (highestOrder._max.order ?? -1) + 1;

    const task = await prisma.task.create({
      data: {
        ...input,
        order: newOrder,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return task;
  }),

  update: publicProcedure
    .input(updateTaskSchema)
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;

      const task = await prisma.task.update({
        where: { id },
        data: updateData,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return task;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ input }) => {
      await prisma.task.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),

  reorder: publicProcedure
    .input(reorderTasksSchema)
    .mutation(async ({ input }) => {
      // Use a transaction to update all task orders atomically
      await prisma.$transaction(
        input.tasks.map((task) =>
          prisma.task.update({
            where: { id: task.id },
            data: { order: task.order },
          })
        )
      );

      // Return the updated tasks
      const updatedTasks = await prisma.task.findMany({
        orderBy: { order: "asc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return updatedTasks;
    }),
});
