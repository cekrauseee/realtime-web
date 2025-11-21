import z from 'zod'
import { userSchema } from '../../user/utils/schemas'

export const sessionSchema = z.object({ user: userSchema })
