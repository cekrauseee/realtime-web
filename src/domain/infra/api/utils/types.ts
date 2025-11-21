export type CallApiBody = object | FormData

export type CallApiInit = { body?: CallApiBody } & Omit<RequestInit, 'body' | 'credentials'>
