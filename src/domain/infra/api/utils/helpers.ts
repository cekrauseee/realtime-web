import z from 'zod'
import type { CallApiBody, CallApiInit } from './types'

export const callApi = async (pathname: string, init?: CallApiInit) => {
  const res = await fetch(mountApiUrl(pathname), {
    ...init,
    body: normalizeBody(init?.body),
    credentials: 'include'
  })

  if (!res.ok) throw new Error('Internal Server Error')
  return res
}

const normalizeBody = (body: CallApiBody | undefined) => {
  if (!body || body instanceof FormData) return body
  return JSON.stringify(body)
}

export const mountApiUrl = (pathname: string, params?: GetApiUrlParams) => {
  let base = getApiUrl(params)
  if (pathname.startsWith('/')) return (base += pathname)
  return (base += '/' + pathname)
}

type GetApiUrlParams = { ws?: boolean }

const getApiUrl = ({ ws }: GetApiUrlParams = { ws: false }) => {
  const env = import.meta.env.VITE_API_URL
  const parse = z.url().safeParse(env)
  if (!parse.success) throw new Error('Invalid `VITE_API_URL`')

  let url = parse.data
  if (ws) url = url.replace('http://', 'ws://')

  return url
}
