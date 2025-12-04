import axios from 'axios'
import { useState, useEffect } from 'react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND || 'https://localhost:3000'

export const useCreateMessage = () => {
    const [sendLoading, setLoading] = useState(false);
    const [sendError, setError] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [sendSuccess, setSuccess] = useState(false)

    const sendMessage = async () => {
        if (message == '') return       // Only send message with content

        setLoading(true)
        setError(null)
        setSuccess(false)
        
        try {
            const res = await axios.post(
                BACKEND_URL, 
                { message },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            setSuccess(true)
            setMessage('')             // Clear message after sending
        } catch (err: any) {
            setError(err.response?.data?.error || err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { sendMessage() }, [message])

    return { sendLoading, sendError, sendSuccess, setMessage }
}