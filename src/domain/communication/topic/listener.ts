import type { Listener } from '@/domain/infra/ws/utils/types'
import { topicUserAppendDto, topicUserRemoveDto } from './dtos'
import { useTopicStore } from './store'

export const handleTopicUserAppend: Listener = (data) => {
  const parse = topicUserAppendDto.parse(data)
  useTopicStore.getState().appendTopicUser(parse.user, parse.topicId)
}

export const handleTopicUserRemove: Listener = (data) => {
  const parse = topicUserRemoveDto.parse(data)
  useTopicStore.getState().removeTopicUser(parse.userId, parse.topicId)
}
