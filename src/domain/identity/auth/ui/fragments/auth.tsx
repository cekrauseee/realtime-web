import { useSessionStore } from '@/domain/identity/auth/store'
import { Fallback } from '@/domain/ui/components/widgets/fallback'
import { useEffect, useEffectEvent, useState, useTransition } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { useShallow } from 'zustand/react/shallow'

export const Auth = () => {
  const [transitioning, startTransition] = useTransition()

  const [ready, setReady] = useState(false)
  const prepare = useEffectEvent(() => setReady(true))

  useEffect(() => {
    if (transitioning) return
    prepare()
  }, [transitioning])

  const navigate = useNavigate()
  const pathname = useLocation().pathname

  const getSession = useSessionStore(useShallow((state) => state.getSession))

  const verifyAuthentication = useEffectEvent(async () => {
    const session = await getSession()
    const isPublic = pathname.startsWith('/sign')

    if (!session && !isPublic) {
      startTransition(() => navigate('/sign-in'))
      return
    }

    if (session && isPublic) {
      startTransition(() => navigate('/'))
      return
    }
  })

  useEffect(() => {
    verifyAuthentication()
  }, [])

  if (!ready) return <Fallback />
  return <Outlet />
}
