import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/domain/ui/cn/components/select'
import { GlobeIcon, LockIcon } from 'lucide-react'
import type { TopicVisibility } from '../../utils/types'

type TopicVisibilitySelectProps = { value: TopicVisibility; onValueChange: (value: TopicVisibility) => void }

export const TopicVisibilitySelect = (props: TopicVisibilitySelectProps) => (
  <Select {...props}>
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value='private'>
        <LockIcon />
        <span>Private</span>
      </SelectItem>
      <SelectItem value='public'>
        <GlobeIcon />
        <span>Public</span>
      </SelectItem>
    </SelectContent>
  </Select>
)
