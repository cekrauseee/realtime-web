import { TOPIC_EVENTS_DECLARATION } from '@/domain/communication/topic/utils/constants'
import type { Event, EventsDeclaration } from './types'

export const WEBSOCKET_EVENTS_DECLARATION: EventsDeclaration<Event> = { ...TOPIC_EVENTS_DECLARATION }
