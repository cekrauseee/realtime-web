import type { EventsDeclaration } from '@/domain/infra/ws/utils/types'
import { handleTopicUserAppend, handleTopicUserRemove } from '../listener'
import type { TopicEvent } from './types'

export const TOPIC_EVENTS = ['topic:user:append', 'topic:user:remove'] as const

export const TOPIC_EVENTS_DECLARATION: EventsDeclaration<TopicEvent> = {
  'topic:user:append': { listener: handleTopicUserAppend },
  'topic:user:remove': { listener: handleTopicUserRemove }
}
