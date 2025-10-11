import { baseProcedure, createTRPCRouter } from "../init";
import { registrationInputSchema } from "@/zodSchemas";
import { db } from "@/db";
import { registrationsTable } from "@/db/schema";
import z from "zod";
import { sql } from "drizzle-orm";

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

  getEventRegistrations: baseProcedure
    .input(
      z.object({
        eventName: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const registrations = await db
          .select({
            id: registrationsTable.id,
            name: registrationsTable.name,
            course: registrationsTable.course,
            events: registrationsTable.events,
          })
          .from(registrationsTable)
          .where(
            sql`
          EXISTS (
            SELECT 1 FROM jsonb_array_elements(${registrationsTable.events}) AS elem
            WHERE elem->'event'->>'name' = ${input.eventName}
          )
          `
          );

        // Step 2: Extract participants only from the matching event
        const filtered = registrations.map((reg) => {
          const matchingEvent = reg.events.find(
            (e: any) => e.event?.name === input.eventName
          );

          return {
            id: reg.id,
            name: reg.name,
            course: reg.course,
            participants: matchingEvent?.participants ?? [],
          };
        });

        return filtered;
      } catch (error) {
        console.error("Error in getEventRegistrations:", error);
        throw new Error("Could not fetch registrations");
      }
    }),
});
