import z from 'zod'
import { sessionSchema } from './utils/schemas'

export const getSessionResponseDto = z.object({ session: sessionSchema })

export const signInDto = z.object({
  email: z.email(),
  password: z.string().trim().min(1)
})

export type SignInDto = z.infer<typeof signInDto>

export const signUpDto = z.object({
  email: z.email(),
  username: z.string().trim().min(1),
  password: z.string().trim().min(1)
})

export type SignUpDto = z.infer<typeof signUpDto>
