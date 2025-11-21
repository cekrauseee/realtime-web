import { CreateTopicDialog } from '@/domain/communication/topic/ui/fragments/create-topic-dialog'
import { TopicList } from '@/domain/communication/topic/ui/widgets/topic-list'
import { TopicVisibility } from '@/domain/communication/topic/ui/widgets/topic-visibility'
import { Button } from '@/domain/ui/cn/components/button'
import { PlusIcon } from 'lucide-react'

export const ProtectedPage = () => (
  <>
    <header className='screen-width'>
      <TopicVisibility />
    </header>
    <main className='flex flex-1 flex-col overflow-hidden'>
      <TopicList />
      <div className='screen-width'>
        <CreateTopicDialog>
          <Button
            variant='ghost'
            className='p-ghost-button! w-full'
          >
            <PlusIcon />
            <span>New topic</span>
          </Button>
        </CreateTopicDialog>
      </div>
    </main>
  </>
)
