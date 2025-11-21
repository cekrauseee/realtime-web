import { Button } from '@/domain/ui/components/fragments/button'
import { LogOutIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import { signOut } from '../../service'

export const SignOutButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      onClick={async () => {
        await signOut()
        navigate('/sign-in')
      }}
    >
      <LogOutIcon className='size-4' />
      <span>Sign out</span>
    </Button>
  )
}
