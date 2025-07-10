import { router, protectedProcedure } from "@/lib/trpc";
import { prisma } from "@/lib/db";
import { Status } from "@prisma/client";
import z from "zod";

export const resourcesRouter = router({
  // Get current user information
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    return {
      id: ctx.user.id,
      email: ctx.user.primaryEmail,
      displayName: ctx.user.displayName,
      profileImageUrl: ctx.user.profileImageUrl,
    };
  }),

  list: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await prisma.resource.findMany({
      orderBy: { order: "asc" },
      where: {
        email: ctx.user.primaryEmail || ctx.user.displayName || "unknown",
        deleted_at: null,
      },
    });
    return tasks;
  }),

  create: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        status: z.nativeEnum(Status),
        order: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const resource = await prisma.resource.create({
        data: {
          ...input,
          email: ctx.user.primaryEmail || ctx.user.displayName || "unknown",
        },
      });
      return resource;
    }),

  upsert: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.string(),
        status: z.nativeEnum(Status),
        order: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      const resource = await prisma.resource.upsert({
        where: { id },
        update: {
          ...updateData,
          email: ctx.user.primaryEmail || ctx.user.displayName || "unknown",
        },
        create: {
          ...input,
          email: ctx.user.primaryEmail || ctx.user.displayName || "unknown",
          id,
        },
      });
      return resource;
    }),

  updateOrder: protectedProcedure
    .input(
      z.object({
        updates: z.array(
          z.object({
            id: z.string(),
            order: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userEmail =
        ctx.user.primaryEmail || ctx.user.displayName || "unknown";

      // Update all resources in a transaction
      await prisma.$transaction(
        input.updates.map(({ id, order }) =>
          prisma.resource.updateMany({
            where: {
              id,
              email: userEmail,
            },
            data: { order },
          })
        )
      );

      return { success: true };
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userEmail =
        ctx.user.primaryEmail || ctx.user.displayName || "unknown";

      await prisma.resource.updateMany({
        where: {
          id: input.id,
          email: userEmail,
          deleted_at: null,
        },
        data: {
          deleted_at: new Date(),
        },
      });

      return { success: true };
    }),
});
