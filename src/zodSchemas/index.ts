import z from "zod";

export const registrationInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number seems too long"),
  regNo: z.string().min(1, "Registration number is required"),
  course: z.string().min(1, "Course is required"),
  events: z
    .array(
      z.object({
        event: z.object({
          name: z.string(),
          type: z.string(),
          description: z.string(),
        }),
        participants: z.array(z.string().min(1)).default([]),
      })
    )
    .min(1, "At least one event must be selected"),
});
