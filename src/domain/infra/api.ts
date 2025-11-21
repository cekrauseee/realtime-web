import { callApi } from './api/utils/helpers'
import type { CallApiInit } from './api/utils/types'

type ApiInit = Omit<CallApiInit, 'method' | 'body'>

export const api = {
  get: (pathname: string, init?: ApiInit) => callApi(pathname, init),
  post: (pathname: string, body?: object, init?: ApiInit) => callApi(pathname, { ...init, method: 'POST', body }),
  put: (pathname: string, body?: object, init?: ApiInit) => callApi(pathname, { ...init, method: 'PUT', body }),
  delete: (pathname: string, init?: ApiInit) => callApi(pathname, { ...init, method: 'DELETE' })
}
