import { useState, useEffect } from 'react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND || 'https://localhost:3000'

export interface Message {
  id: number
  text: string
  timestamp: Date
}

const formatData = (data) => {
    const result: Message[] = data.map(item => ({
        'id': item['id'],
        'text': item['message'],
        'timestamp': new Date(item['created_at'].replace(' ', 'T'))
    }))
    
    return result
}

export function useRetrieveMessage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [fetchLoading, setLoading] = useState(true)
    const [fetchError, setError] = useState<string | null>(null)
    const [update, setUpdate] = useState(true)

    const fetchMessages = async () => {
        if (!update) return

        try {
            const res = await fetch(BACKEND_URL)
            
            if (!res.ok) throw new Error("Failed to fetch messages")

            const data = await res.json()
            const messages = formatData(data)

            setMessages(messages)
        } catch (err : any) {
            setError(err.message)
        } finally {
            setLoading(false)
            setUpdate(false)
        }
    }

    useEffect(() => { fetchMessages() }, [update])

    return { messages, fetchLoading, fetchError, setUpdate }
}