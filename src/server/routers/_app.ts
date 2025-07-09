import { router } from "@/lib/trpc";
import { resourcesRouter } from "./resources";

export const appRouter = router({
  resources: resourcesRouter,
});

export type AppRouter = typeof appRouter;
