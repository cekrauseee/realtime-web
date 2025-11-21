import { create } from 'zustand'
import { getSession } from './service'
import type { Session } from './utils/types'

type SessionState = { session: Session | null; getSession: () => Promise<Session | null> }

export const useSessionStore = create<SessionState>()((set) => ({
  session: null,
  getSession: async () => {
    const session = await getSession()
    set({ session })

    return session
  }
}))
