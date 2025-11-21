import { api } from '@/domain/infra/api'
import { getSessionResponseDto, signInResponseDto, signUpResponseDto, type SignInDto, type SignUpDto } from './dtos'
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

export const signIn = async (body: SignInDto): Promise<Session> => {
  const res = await api.post('auth/sign-in', body)
  const data = await res.json()
  return signInResponseDto.parse(data).session
}

export const signUp = async (body: SignUpDto): Promise<Session> => {
  const res = await api.post('auth/sign-up', body)
  const data = await res.json()
  return signUpResponseDto.parse(data).session
}

export const signOut = async () => api.delete('auth/session')
