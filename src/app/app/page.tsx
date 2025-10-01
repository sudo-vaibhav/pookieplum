"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Heart, 
  Send, 
  Paperclip, 
  Smile, 
  MoreHorizontal,
  Settings,
  Phone,
  Video
} from "lucide-react"
import { useClientSideNullableAuth } from "@/lib/firebase/clientApp"
import { WidgetRenderer, type WidgetData } from "@/components/chat-widgets"
import { WidgetSelector } from "@/components/widget-selector"

interface Message {
  id: string
  content: string
  sender: "me" | "partner"
  timestamp: Date
  type: "text" | "image" | "emoji" | "widget"
  widget?: WidgetData
}

export default function ChatApp() {
  const { user } = useClientSideNullableAuth()
  const [messageInput, setMessageInput] = useState("")

  // Mock partner data - in a real app this would come from Firebase
  const partner = {
    name: "My Love ❤️",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Good morning my love! ☀️",
      sender: "partner",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      type: "text"
    },
    {
      id: "2", 
      content: "Good morning beautiful! How did you sleep? 💕",
      sender: "me",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 5),
      type: "text"
    },
    {
      id: "3",
      content: "",
      sender: "partner", 
      timestamp: new Date(Date.now() - 1000 * 60 * 90),
      type: "widget",
      widget: {
        type: "sticker",
        stickerUrl: "😘",
        stickerName: "Kiss"
      }
    },
    {
      id: "4",
      content: "Like a baby knowing you're in my life 🥰",
      sender: "partner", 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1),
      type: "text"
    },
    {
      id: "5",
      content: "Lunch is on me today! 💕",
      sender: "me",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      type: "widget",
      widget: {
        type: "money",
        amount: 850,
        currency: "₹",
        note: "For that amazing dosa place you love!"
      }
    },
    {
      id: "6",
      content: "You always know how to make me smile 😊 I love you so much!",
      sender: "me",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: "text"
    },
    {
      id: "7",
      content: "Look how long it's been!",
      sender: "partner",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      type: "widget",
      widget: {
        type: "days-since",
        eventName: "Our first date",
        eventDate: "2024-06-15",
        emoji: "💕"
      }
    },
    {
      id: "8",
      content: "I'm at this cute cafe, come join me!",
      sender: "partner",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      type: "widget",
      widget: {
        type: "shared-location",
        locationName: "The Coffee Bean",
        address: "123 Brigade Road, Bangalore, Karnataka",
        message: "They have amazing filter coffee! ☕"
      }
    },
    {
      id: "9",
      content: "Don't forget our dinner plans!",
      sender: "me",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      type: "widget",
      widget: {
        type: "date-reminder",
        eventName: "Romantic Dinner",
        eventDate: "2025-01-02",
        eventTime: "19:30",
        location: "Toit Brewpub, Indiranagar",
        commuteTime: 25,
        emoji: "🍽️"
      }
    },
    {
      id: "10",
      content: "Working on something special for you 😉",
      sender: "me",
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
      type: "widget",
      widget: {
        type: "gone-live",
        streamTitle: "Surprise project for my love",
        activity: "working",
        isActive: true,
        duration: 45,
        viewers: 1
      }
    },
    {
      id: "11",
      content: "Can't wait to see you tonight! 💕",
      sender: "partner",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      type: "text"
    }
  ])

  const sendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: messageInput,
        sender: "me",
        timestamp: new Date(),
        type: "text"
      }
      setMessages(prev => [...prev, newMessage])
      setMessageInput("")
      // TODO: Send to Firebase
    }
  }

  const sendWidget = (widget: WidgetData) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: "",
      sender: "me",
      timestamp: new Date(),
      type: "widget",
      widget
    }
    setMessages(prev => [...prev, newMessage])
    // TODO: Send to Firebase
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { 
      hour: "numeric", 
      minute: "2-digit",
      hour12: true 
    })
  }

  const formatLastSeen = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 60 * 24) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <Heart className="h-16 w-16 text-pink-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to PookiePlum</h2>
          <p className="text-gray-600 mb-6">Please sign in to start chatting with your loved one</p>
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
            Sign In to Continue
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-pink-100 text-pink-600">
                  {partner.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {partner.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{partner.name}</h2>
              <p className="text-sm text-gray-500">
                {partner.isOnline ? "Online" : `Last seen ${formatLastSeen(partner.lastSeen)}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "me" ? "justify-end" : "justify-start items-end"}`}
          >
            {message.sender === "partner" && (
              <div className="mr-2 mb-1">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-pink-100 text-pink-600 text-xs">
                    {partner.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
            <div className="flex flex-col space-y-1">
              {/* Widget Rendering */}
              {message.widget && (
                <div className="mb-2">
                  <WidgetRenderer widget={message.widget} />
                </div>
              )}
              
              {/* Text Message */}
              {message.content && (
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.sender === "me"
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                      : "bg-white text-gray-900 border border-gray-200"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === "me" ? "text-pink-100" : "text-gray-500"
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              )}
              
              {/* Timestamp for widget-only messages */}
              {message.widget && !message.content && (
                <p className={`text-xs ${
                  message.sender === "me" ? "text-right text-gray-500" : "text-gray-500"
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="h-4 w-4" />
          </Button>
          <WidgetSelector onSendWidget={sendWidget} />
          <div className="flex-1 relative">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="pr-12 bg-gray-50 border-gray-200"
            />
            <Button
              onClick={sendMessage}
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}