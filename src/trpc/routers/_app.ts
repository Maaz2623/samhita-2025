import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { registrationRouter } from "../procedures/registration.procedure";
export const appRouter = createTRPCRouter({
  registration: registrationRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
