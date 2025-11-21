import { TOPIC_EVENTS } from '@/domain/communication/topic/utils/constants'
import z from 'zod'

export const websocketEventSchema = z.enum([...TOPIC_EVENTS])
