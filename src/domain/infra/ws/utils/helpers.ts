import type ReconnectingWebSocket from 'reconnecting-websocket'
import type { WebSocket } from './types'

export const wrapWebSocket = (raw: ReconnectingWebSocket): WebSocket =>
  ({ ...raw, send: (event, data) => raw.send(JSON.stringify({ event, data })) }) as WebSocket
