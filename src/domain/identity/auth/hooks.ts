import { useShallow } from 'zustand/react/shallow'
import { useSessionStore } from './store'

export const useSession = () => {
  const session = useSessionStore(useShallow((state) => state.session))
  if (!session) throw new Error('Session not found')
  return session
}
