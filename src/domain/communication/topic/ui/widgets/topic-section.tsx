import { GlobeIcon, LockIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { useShallow } from 'zustand/react/shallow'
import { useTopicStore } from '../../store'
import { topicVisibilitySchema } from '../../utils/schemas'

export const TopicSection = () => {
  const search = new URLSearchParams(useLocation().search)
  const viewing = topicVisibilitySchema.safeParse(search.get('v')).data ?? 'private'

  const setVisibility = useTopicStore(useShallow((state) => state.setVisibility))
  setVisibility(viewing)

  return (
    <div className='grid grid-cols-2'>
      <Link
        to='?v=private'
        onClick={() => setVisibility('private')}
        data-active={viewing === 'private'}
        className='ghost-button justify-center'
      >
        <LockIcon />
        <span>Mine</span>
      </Link>
      <Link
        to='?v=public'
        onClick={() => setVisibility('public')}
        data-active={viewing === 'public'}
        className='ghost-button justify-center'
      >
        <GlobeIcon />
        <span>Public</span>
      </Link>
    </div>
  )
}
