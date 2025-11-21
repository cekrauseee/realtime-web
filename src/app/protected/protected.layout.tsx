import { SignOutButton } from '@/domain/identity/auth/ui/widgets/sign-out-button'
import { State } from '@/domain/ui/components/widgets/state'
import { Outlet } from 'react-router'

export const ProtectedLayout = () => (
  <State>
    <div className='flex h-svh flex-col'>
      <div className='flex min-h-0 flex-1 flex-col'>
        <Outlet />
      </div>
      <footer className='mx-auto w-full max-w-lg'>
        <SignOutButton />
      </footer>
    </div>
  </State>
)
