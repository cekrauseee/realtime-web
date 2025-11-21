import { Button } from '@/domain/ui/cn/components/button'
import { GlobeIcon, LockIcon } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'
import { useShallow } from 'zustand/react/shallow'
import { useTopicStore } from '../../store'
import { topicVisibilitySchema } from '../../utils/schemas'
import type { TopicVisibility as TopicVisibilityType } from '../../utils/types'

export const TopicVisibility = () => {
  const navigate = useNavigate()

  const search = new URLSearchParams(useLocation().search)
  const viewing = topicVisibilitySchema.safeParse(search.get('v')).data ?? 'private'

  const setVisibility = useTopicStore(useShallow((state) => state.setVisibility))

  const setVisibilityAndRoute = (visibility: TopicVisibilityType) => {
    setVisibility(visibility)
    navigate('?v=' + visibility)
  }

  return (
    <div className='grid grid-cols-2'>
      <Button
        variant='ghost'
        onClick={() => setVisibilityAndRoute('private')}
        data-active={viewing === 'private'}
        className='p-ghost-button!'
      >
        <LockIcon />
        <span>Mine</span>
      </Button>
      <Button
        variant='ghost'
        onClick={() => setVisibilityAndRoute('public')}
        data-active={viewing === 'public'}
        className='p-ghost-button!'
      >
        <GlobeIcon />
        <span>Public</span>
      </Button>
    </div>
  )
}
