import { Avatar, AvatarFallback } from '@/domain/ui/cn/components/avatar'
import { cn } from '@/domain/ui/cn/utils/helpers'
import { Button } from '@/domain/ui/components/fragments/button'
import { UserIcon } from 'lucide-react'
import { joinTopic } from '../../service'
import type { AugmentedTopic } from '../../utils/types'

type TopicProps = { topic: AugmentedTopic }

export const Topic = ({ topic }: TopicProps) => (
  <Button
    onClick={() => joinTopic({ topicId: topic.id })}
    className={cn('mx-auto w-full max-w-lg justify-between')}
  >
    <div className='flex h-6 w-full items-center justify-between'>
      <span className='font-bold'>{topic.name}</span>
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
    </div>
  </Button>
)
