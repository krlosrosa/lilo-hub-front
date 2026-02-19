import { z } from "zod";

export const userModel = z.object({
  sub: z.string(),
  email: z.string(),
  name: z.string(),
});

export type UserModel = z.infer<typeof userModel>;