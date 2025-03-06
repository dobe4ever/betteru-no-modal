"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, Bot } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
}

export function ChatbotDrawer() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: "Hello! How can I assist you today?", sender: 'bot' },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = { id: Date.now().toString(), content: input, sender: 'user' }
      setMessages([...messages, newMessage])
      setInput("")
      // Here you would typically send the message to your AI service and get a response
      // For now, we'll just simulate a response after a short delay
      setTimeout(() => {
        const botResponse: Message = { id: (Date.now() + 1).toString(), content: "I'm an AI assistant. How can I help you?", sender: 'bot' }
        setMessages(prev => [...prev, botResponse])
      }, 1000)
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full fixed bottom-4 right-4 h-14 w-14 shadow-lg bg-white hover:bg-gray-100 border-gray-200 z-50"
          >
            <MessageSquare className="h-6 w-6 text-gray-600" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0">
          <SheetHeader className="border-b px-6 py-4">
            <SheetTitle>AI Assistant</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-130px)] px-6 py-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`flex items-start ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage src={message.sender === 'user' ? "/user-avatar.png" : "/bot-avatar.png"} />
                    <AvatarFallback>{message.sender === 'user' ? 'U' : 'B'}</AvatarFallback>
                  </Avatar>
                  <div className={`rounded-lg p-3 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="border-t px-6 py-4">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

