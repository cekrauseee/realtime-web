import { Button } from '@/domain/ui/cn/components/button'
import { LogOutIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import { signOut } from '../../service'

export const SignOutButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      variant='ghost'
      onClick={async () => {
        await signOut()
        navigate('/sign-in')
      }}
      className='p-ghost-button! w-full justify-start'
    >
      <LogOutIcon />
      <span>Sign out</span>
    </Button>
  )
}
