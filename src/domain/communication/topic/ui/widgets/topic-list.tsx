import { useShallow } from 'zustand/react/shallow'
import { useTopicStore } from '../../store'
import { TopicListItem } from './topic-list/item'

export const TopicList = () => {
  const topics = useTopicStore(useShallow((state) => state.topics))

  return (
    <ul className='overflow-y-auto'>
      {Array.from(topics.values()).map((topic) => (
        <li key={topic.id}>
          <TopicListItem topic={topic} />
        </li>
      ))}
    </ul>
  )
}
