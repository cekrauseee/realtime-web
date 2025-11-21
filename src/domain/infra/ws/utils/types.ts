import ReconnectingWebSocket from 'reconnecting-websocket'
import type z from 'zod'
import type { websocketEventSchema } from './schemas'

export type WebSocket = { send: (event: string, data: unknown) => void } & Omit<ReconnectingWebSocket, 'send'>

export type Event = z.infer<typeof websocketEventSchema>

export type Listener = (data: unknown) => void | Promise<void>

export type EventsDeclaration<T extends string> = { [event in T]: { listener: Listener } }
