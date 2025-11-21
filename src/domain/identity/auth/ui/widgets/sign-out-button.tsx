import { Button } from '@/domain/ui/cn/components/button'
import { LogOutIcon } from 'lucide-react'
import { signOut } from '../../service'

export const SignOutButton = () => (
  <Button
    variant='ghost'
    onClick={async () => {
      await signOut()
      window.location.href = '/sign-in'
    }}
    className='p-ghost-button! w-full justify-start'
  >
    <LogOutIcon />
    <span>Sign out</span>
  </Button>
)
