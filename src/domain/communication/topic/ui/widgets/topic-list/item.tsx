import { Avatar, AvatarFallback } from '@/domain/ui/cn/components/avatar'
import { Button } from '@/domain/ui/cn/components/button'
import { PhoneOffIcon, UserIcon } from 'lucide-react'
import { joinTopic, leaveTopic } from '../../../service'
import type { AugmentedTopic } from '../../../utils/types'

type TopicProps = { topic: AugmentedTopic; active: boolean }

export const TopicListItem = ({ topic, active }: TopicProps) => (
  <div className='screen-width'>
    <Button
      variant='ghost'
      data-active={active}
      onClick={() => {
        if (active) return
        joinTopic({ topicId: topic.id })
      }}
      className='p-ghost-button! w-full justify-between'
    >
      <span>{topic.name}</span>
      <div className='flex -space-x-2'>
        {topic.users.map((user) => (
          <Avatar
            key={user.id}
            className='size-7 border'
          >
            <AvatarFallback>
              <UserIcon className='text-muted-foreground size-4' />
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
    </Button>
    {active && (
      <div className='screen-width'>
        <Button
          onClick={() => leaveTopic({ topicId: topic.id })}
          variant='destructive'
          className='w-full justify-center p-6'
        >
          <PhoneOffIcon />
        </Button>
      </div>
    )}
  </div>
)
