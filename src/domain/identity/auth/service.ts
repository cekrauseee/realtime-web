import { api } from '@/domain/infra/api'
import { getSessionResponseDto, type SignInDto, type SignUpDto } from './dtos'
import type { Session } from './utils/types'

export const getSession = async (): Promise<Session | null> => {
  try {
    const res = await api.get('auth/session')

    const payload = await res.json()
    const parse = getSessionResponseDto.safeParse(payload)
    if (!parse.success) return null

    return parse.data.session
  } catch {
    return null
  }
}

export const signIn = (body: SignInDto) => api.post('auth/sign-in', body)

export const signUp = async (body: SignUpDto) => api.post('auth/sign-up', body)

export const signOut = async () => api.delete('auth/session')
