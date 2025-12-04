"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Send } from "lucide-react"

import { useRetrieveMessage } from '../hooks/useRetrieveMessage'
import { useCreateMessage } from '../hooks/useCreateMessage'
import LoadingOverlay from '../components/LoadingOverlay'
import ErrorMessage from '../components/ErrorMessage'

export default function MessagesPage() {
  const { messages, fetchLoading, fetchError, setUpdate } = useRetrieveMessage()
  const { sendLoading, sendError, sendSuccess, setMessage } = useCreateMessage()
  const [inputText, setInputText] = useState("")

  useEffect(() => { if(sendSuccess) setUpdate(true) }, [sendSuccess])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (inputText.trim()) {
      const newMessage: string = inputText.trim()
      setMessage(newMessage)
      setInputText("")
    }
  }

  const formatTime = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0')
      const month = date.toLocaleDateString('default', { month: 'short' })
      const year = date.getFullYear()

      const localHours = date.getHours() - (date.getTimezoneOffset() / 60)
      const hours = (localHours >= 12 ? localHours % 12 : localHours) || 12
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const ampm = localHours >= 12 ? 'pm' : 'am'

      return `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`
  }

  return (
    <div className="min-h-screen bg-background">
      <LoadingOverlay isLoading={fetchLoading || sendLoading}/>
      <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <ErrorMessage description={sendError || fetchError}/>
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">Messages</h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
            Share your thoughts and view your message history
          </p>
        </div>

        {/* Input Form */}
        <Card className="mb-8 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="message-input" className="sr-only">
                Enter your message
              </label>
              <Textarea
                id="message-input"
                placeholder="Type your message here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-32 resize-none text-base"
                aria-label="Message input"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={!inputText.trim()} className="gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </div>
          </form>
        </Card>

        {/* Message History */}
        <div>
          <h2 className="mb-4 text-xl font-medium">Message History</h2>

          {messages.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No messages yet. Start by sending your first message above.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => (
                <Card key={message.id} className="p-4 md:p-5">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">{formatTime(message.timestamp)}</p>
                    <p className="text-base leading-relaxed">{message.text}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
