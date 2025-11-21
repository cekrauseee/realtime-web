import { api } from '@/domain/infra/api'
import { useWebSocketStore } from '@/domain/infra/ws/store'
import { createTopicResponseDto, getTopicsResponseDto, type JoinTopicDto, type LeaveTopicDto } from './dtos'
import type { AugmentedTopic, CreateTopicDto } from './utils/types'

export const getTopics = async (): Promise<AugmentedTopic[]> => {
  const res = await api.get('topics')
  const data = await res.json()
  return getTopicsResponseDto.parse(data).topics
}

export const createTopic = async (body: CreateTopicDto): Promise<AugmentedTopic> => {
  const res = await api.post('topics', body)
  const data = await res.json()
  return createTopicResponseDto.parse(data).topic
}

export const joinTopic = (body: JoinTopicDto) => {
  const ws = useWebSocketStore.getState().ws
  if (ws) ws.send('topic:join', body)
}

export const leaveTopic = (body: LeaveTopicDto) => {
  const ws = useWebSocketStore.getState().ws
  if (ws) ws.send('topic:leave', body)
}
