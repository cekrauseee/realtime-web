import { useTopicStore } from '@/domain/communication/topic/store'
import { CreateTopicDialog } from '@/domain/communication/topic/ui/fragments/create-topic-dialog'
import { Topic } from '@/domain/communication/topic/ui/widgets/topic'
import { Button } from '@/domain/ui/components/fragments/button'
import { PlusIcon } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

export const ProtectedPage = () => {
  const topics = useTopicStore(useShallow((state) => state.topics))

  return (
    <main className='flex flex-1 flex-col overflow-hidden'>
      <ul className='overflow-y-auto'>
        {Array.from(topics.values()).map((topic) => (
          <li key={topic.id}>
            <Topic topic={topic} />
          </li>
        ))}
        <CreateTopicDialog>
          <Button className='mx-auto w-full max-w-lg'>
            <PlusIcon className='size-4' />
            <span>New topic</span>
          </Button>
        </CreateTopicDialog>
      </ul>
    </main>
  )
}
