import { create } from 'zustand'
import type { SignInDto, SignUpDto } from './dtos'
import { getSession, signIn, signOut, signUp } from './service'
import type { Session } from './utils/types'

type SessionState = {
  session: Session | null
  getSession: () => Promise<Session | null>
  signIn: (body: SignInDto) => Promise<void>
  signUp: (body: SignUpDto) => Promise<void>
  signOut: () => Promise<void>
}

export const useSessionStore = create<SessionState>()((set) => ({
  session: null,
  getSession: async () => {
    const session = await getSession()
    set({ session })

    return session
  },
  signIn: async (body) => {
    const session = await signIn(body)
    set({ session })
  },
  signUp: async (body) => {
    const session = await signUp(body)
    set({ session })
  },
  signOut: async () => {
    await signOut()
    set({ session: null })
  }
}))
