import type z from 'zod'
import type { createTopicDto } from '../dtos'
import type { TOPIC_EVENTS } from './constants'
import type { augmentedTopicSchema, topicSchema } from './schemas'

export type Topic = z.infer<typeof topicSchema>

export type AugmentedTopic = z.infer<typeof augmentedTopicSchema>

export type TopicEvent = (typeof TOPIC_EVENTS)[number]

export type CreateTopicDto = z.infer<typeof createTopicDto>
