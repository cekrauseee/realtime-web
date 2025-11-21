import z from 'zod'

export const userSchema = z.object({
  id: z.cuid2(),
  email: z.email(),
  username: z.string().trim().min(1),
  createdAt: z.string().transform((val) => new Date(val))
})
