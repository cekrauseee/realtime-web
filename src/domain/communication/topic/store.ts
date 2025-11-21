import type { User } from '@/domain/identity/user/utils/types'
import { enableMapSet, produce } from 'immer'
import { create } from 'zustand'
import { createTopic, getTopics } from './service'
import type { AugmentedTopic, CreateTopicDto, TopicVisibility } from './utils/types'

type TopicState = {
  topics: Map<string, AugmentedTopic>
  fetchTopics: () => Promise<void>
  createTopic: (body: CreateTopicDto) => Promise<void>
  appendTopicUser: (user: User, topicId: string) => void
  removeTopicUser: (userId: string, topicId: string) => void
  viewing: TopicVisibility
  setVisibility: (visibility: TopicVisibility) => void
}

enableMapSet()

export const useTopicStore = create<TopicState>()((set) => ({
  topics: new Map(),
  fetchTopics: async () => {
    const topics = await getTopics()
    set({ topics: new Map(topics.map((topic) => [topic.id, topic])) })
  },
  createTopic: async (body) => {
    const topic = await createTopic(body)

    set(
      produce((state: TopicState) => {
        state.topics.set(topic.id, topic)
      })
    )
  },
  appendTopicUser: (user, topicId) =>
    set(
      produce((state: TopicState) => {
        const topic = state.topics.get(topicId)
        if (topic) state.topics.set(topic.id, { ...topic, users: [...topic.users, user] })
      })
    ),
  removeTopicUser: (userId, topicId) =>
    set(
      produce((state: TopicState) => {
        const topic = state.topics.get(topicId)
        if (topic) state.topics.set(topic.id, { ...topic, users: topic.users.filter((user) => user.id !== userId) })
      })
    ),
  viewing: 'private',
  setVisibility: (visibility) => set({ viewing: visibility })
}))
