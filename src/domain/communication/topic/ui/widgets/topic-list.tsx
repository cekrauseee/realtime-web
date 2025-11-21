import { useSession } from '@/domain/identity/auth/hooks'
import { useShallow } from 'zustand/react/shallow'
import { useTopicStore } from '../../store'
import { TopicListItem } from './topic-list/item'

export const TopicList = () => {
  const session = useSession()

  const { topics, viewing } = useTopicStore(
    useShallow((state) => ({
      topics: state.topics,
      viewing: state.viewing
    }))
  )

  return (
    <ul className='overflow-y-auto'>
      {Array.from(topics.values())
        .filter((topic) => topic.visibility === viewing)
        .map((topic) => (
          <li key={topic.id}>
            <TopicListItem
              topic={topic}
              active={!!topic.users.find((user) => user.id === session.user.id)}
            />
          </li>
        ))}
    </ul>
  )
}
