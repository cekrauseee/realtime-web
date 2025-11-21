import { LogOutIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import { signOut } from '../../service'

export const SignOutButton = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={async () => {
        await signOut()
        navigate('/sign-in')
      }}
      className='ghost-button'
    >
      <LogOutIcon />
      <span>Sign out</span>
    </button>
  )
}
