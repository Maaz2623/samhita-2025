import z from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { registrationInputSchema } from "@/zodSchemas";
import { db } from "@/db";
import { registrationsTable } from "@/db/schema";

export const registrationRouter = createTRPCRouter({
  create: baseProcedure
    .input(registrationInputSchema)
    .mutation(async ({ input }) => {
      const registration = await db
        .insert(registrationsTable)
        .values({
          name: input.name,
          phone: input.phone,
          regNo: input.regNo,
          course: input.course,
          events: input.events,
        })
        .returning();

      return registration;
    }),
});
