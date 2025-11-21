import { CreateTopicDialog } from '@/domain/communication/topic/ui/fragments/create-topic-dialog'
import { TopicList } from '@/domain/communication/topic/ui/widgets/topic-list'
import { TopicSection } from '@/domain/communication/topic/ui/widgets/topic-section'
import { PlusIcon } from 'lucide-react'

export const ProtectedPage = () => (
  <>
    <header className='screen-width'>
      <TopicSection />
    </header>
    <main className='flex flex-1 flex-col overflow-hidden'>
      <TopicList />
      <CreateTopicDialog>
        <button className='screen-width ghost-button'>
          <PlusIcon />
          <span>New topic</span>
        </button>
      </CreateTopicDialog>
    </main>
  </>
)
