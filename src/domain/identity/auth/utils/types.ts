import type z from 'zod'
import type { sessionSchema } from './schemas'

export type Session = z.infer<typeof sessionSchema>
