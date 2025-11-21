import { userSchema } from '@/domain/identity/user/utils/schemas'
import z from 'zod'

export const topicSchema = z.object({
  id: z.cuid2(),
  userId: z.cuid2(),
  name: z.string().trim().min(1),
  normalizedName: z.string().trim().min(1),
  createdAt: z.string().transform((val) => new Date(val))
})

export const augmentedTopicSchema = topicSchema.extend({ users: userSchema.array() })
