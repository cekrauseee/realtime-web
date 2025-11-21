import { useSessionStore } from '@/domain/identity/auth/store'
import { SignOutButton } from '@/domain/identity/auth/ui/widgets/sign-out-button'
import { Fallback } from '@/domain/ui/components/widgets/fallback'
import { State } from '@/domain/ui/components/widgets/state'
import { Outlet } from 'react-router'
import { useShallow } from 'zustand/react/shallow'

export const ProtectedLayout = () => {
  const session = useSessionStore(useShallow((state) => state.session))
  if (!session) return <Fallback />

  return (
    <State>
      <div className='flex h-svh flex-col'>
        <div className='flex min-h-0 flex-1 flex-col'>
          <Outlet />
        </div>
        <footer className='screen-width'>
          <SignOutButton />
        </footer>
      </div>
    </State>
  )
}
