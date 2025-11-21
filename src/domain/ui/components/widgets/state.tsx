import { useTopicStore } from '@/domain/communication/topic/store'
import { useWebSocketStore } from '@/domain/infra/ws/store'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Fallback } from './fallback'

type StateProps = { children: React.ReactNode }

export const State = ({ children }: StateProps) => {
  const { ws, connect, disconnect } = useWebSocketStore(
    useShallow((state) => ({
      ws: state.ws,
      connect: state.connect,
      disconnect: state.disconnect
    }))
  )

  const fetchTopics = useTopicStore(useShallow((state) => state.fetchTopics))

  useEffect(() => {
    connect()
    fetchTopics()

    return () => disconnect()
  }, [connect, fetchTopics, disconnect])

  if (!ws) return <Fallback />
  return children
}
