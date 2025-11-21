import { userSchema } from '@/domain/identity/user/utils/schemas'
import z from 'zod'
import { augmentedTopicSchema, topicVisibilitySchema } from './utils/schemas'

export const getTopicsResponseDto = z.object({ topics: augmentedTopicSchema.array() })

export const createTopicDto = z.object({
  name: z.string().trim().min(1),
  visibility: topicVisibilitySchema
})

export const createTopicResponseDto = z.object({ topic: augmentedTopicSchema })

export const joinTopicDto = z.object({ topicId: z.cuid2() })

export type JoinTopicDto = z.infer<typeof joinTopicDto>

export type LeaveTopicDto = { topicId: string }

export const topicUserAppendDto = z.object({
  user: userSchema,
  topicId: z.cuid2()
})

export const topicUserRemoveDto = z.object({
  userId: z.cuid2(),
  topicId: z.cuid2()
})
