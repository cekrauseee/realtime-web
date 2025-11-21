import { Button } from '@/domain/ui/cn/components/button'
import { LogOutIcon } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'
import { useSessionStore } from '../../store'

export const SignOutButton = () => {
  const signOut = useSessionStore(useShallow((state) => state.signOut))

  return (
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
}
