import ReconnectingWebSocket from 'reconnecting-websocket'
import z from 'zod'
import { create } from 'zustand'
import { mountApiUrl } from '../api/utils/helpers'
import { WEBSOCKET_EVENTS_DECLARATION } from './utils/constants'
import { wrapWebSocket } from './utils/helpers'
import { websocketEventSchema } from './utils/schemas'
import type { WebSocket } from './utils/types'

type WebSocketState = {
  ws: WebSocket | null
  connect: () => void
  disconnect: () => void
}

export const useWebSocketStore = create<WebSocketState>()((set, get) => ({
  ws: null,
  connect: () => {
    const ws = new ReconnectingWebSocket(mountApiUrl('signal'))
    ws.onopen = () => set({ ws: wrapWebSocket(ws) })

    ws.onmessage = async (event) => {
      try {
        const parse = z
          .object({
            event: websocketEventSchema,
            data: z.unknown()
          })
          .safeParse(JSON.parse(event.data as string))

        if (!parse.success) return

        const payload = parse.data
        console.log(payload)

        const declaration = WEBSOCKET_EVENTS_DECLARATION[payload.event]
        await declaration.listener(payload.data)
      } catch {
        //
      }
    }

    ws.onclose = () => set({ ws: null })
  },
  disconnect: () => get().ws?.close?.()
}))
