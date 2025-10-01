"use client"

import { Calendar, DollarSign, Heart, Gift, CheckCircle, MapPin, Clock, Bell, Car, Navigation, Video, Users, Play } from "lucide-react"

// Widget data type definitions
export interface StickerWidget {
  type: "sticker"
  stickerUrl: string
  stickerName: string
}

export interface MoneyWidget {
  type: "money" 
  amount: number
  currency: string
  note?: string
}

export interface DaysSinceWidget {
  type: "days-since"
  eventName: string
  eventDate: string // ISO date string
  emoji?: string
}

export interface SharedLocationWidget {
  type: "shared-location"
  locationName: string
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
  message?: string
}

export interface DateReminderWidget {
  type: "date-reminder"
  eventName: string
  eventDate: string // ISO date string
  eventTime: string // HH:MM format
  location: string
  commuteTime?: number // minutes
  emoji?: string
}

export interface CalendarEventWidget {
  type: "calendar-event"
  eventName: string
  eventDate: string // ISO date string
  eventTime: string // HH:MM format
  duration?: number // minutes
  location?: string
  description?: string
  priority: "low" | "medium" | "high"
}

export interface GoneLiveWidget {
  type: "gone-live"
  streamTitle: string
  activity: string // "working", "studying", "cooking", "gaming", etc.
  duration?: number // minutes already streaming
  isActive: boolean
  viewers?: number
}

export type WidgetData = StickerWidget | MoneyWidget | DaysSinceWidget | SharedLocationWidget | DateReminderWidget | CalendarEventWidget | GoneLiveWidget

// Individual widget components
export function StickerWidgetComponent({ widget }: { widget: StickerWidget }) {
  return (
    <div className="p-3 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg border border-gray-200 animate-slide-up hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="text-6xl transform hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-md">
        {widget.stickerUrl}
      </div>
      <p className="text-xs text-center mt-1 text-gray-600 animate-fade-in font-medium">{widget.stickerName}</p>
    </div>
  )
}

export function MoneyWidgetComponent({ widget }: { widget: MoneyWidget }) {
  return (
    <div className="p-5 bg-gradient-to-br from-green-100 via-emerald-50 to-green-50 border-2 border-green-200 rounded-2xl max-w-xs shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up transform hover:-translate-y-2 hover:rotate-1 relative overflow-hidden">
      {/* Skeumorphic shine effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white to-transparent opacity-40"></div>
      
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full flex items-center justify-center shadow-inner border-2 border-green-300 animate-pulse relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-transparent opacity-30"></div>
          <DollarSign className="h-5 w-5 text-white drop-shadow-sm relative z-10" />
        </div>
        <span className="font-bold text-green-800 text-shadow-sm">Money Sent</span>
      </div>
      
      <div className="text-3xl font-black text-green-900 mb-2 animate-bounce-in drop-shadow-lg">
        {widget.currency} {widget.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      </div>
      
      {widget.note && (
        <p className="text-sm text-green-700 animate-fade-in bg-green-200 bg-opacity-50 p-2 rounded-lg border border-green-300 italic">{widget.note}</p>
      )}
      
      <div className="mt-4 text-xs text-green-600 flex items-center space-x-1 animate-fade-in bg-white bg-opacity-60 p-2 rounded-lg shadow-inner">
        <CheckCircle className="h-4 w-4 text-green-500 drop-shadow-sm" />
        <span className="font-semibold">Transfer completed</span>
      </div>
      
      {/* Bottom depth shadow */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-green-900 to-transparent opacity-10 rounded-b-2xl"></div>
    </div>
  )
}

export function DaysSinceWidgetComponent({ widget }: { widget: DaysSinceWidget }) {
  const eventDate = new Date(widget.eventDate)
  const today = new Date()
  const diffTime = today.getTime() - eventDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  return (
    <div className="p-5 bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100 border-2 border-purple-200 rounded-2xl max-w-xs shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up transform hover:-translate-y-2 hover:-rotate-1 relative overflow-hidden">
      {/* Skeumorphic shine effects */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-70"></div>
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white to-transparent opacity-50"></div>
      
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-inner border-2 border-purple-300 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-transparent opacity-40"></div>
          <Calendar className="h-5 w-5 text-white drop-shadow-sm relative z-10" />
        </div>
        <span className="font-bold text-purple-800 text-shadow-sm">Days Since</span>
      </div>
      
      <div className="text-center">
        <div className="text-4xl mb-2 animate-bounce drop-shadow-lg">{widget.emoji || "📅"}</div>
        
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-3 shadow-inner border border-purple-200 mb-3">
          <div className="text-2xl font-black text-purple-900 mb-1 animate-count-up drop-shadow-md">
            {diffDays} {diffDays === 1 ? "day" : "days"}
          </div>
        </div>
        
        <p className="text-sm text-purple-700 font-bold animate-fade-in bg-purple-200 bg-opacity-60 p-2 rounded-lg border border-purple-300">{widget.eventName}</p>
        <p className="text-xs text-purple-600 mt-2 animate-fade-in bg-white bg-opacity-50 p-1 rounded font-medium">
          {eventDate.toLocaleDateString("en-IN", { 
            month: "short", 
            day: "numeric", 
            year: "numeric" 
          })}
        </p>
      </div>
      
      {/* Bottom depth shadow */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-purple-900 to-transparent opacity-15 rounded-b-2xl"></div>
    </div>
  )
}

export function SharedLocationWidgetComponent({ widget }: { widget: SharedLocationWidget }) {
  return (
    <div className="p-4 bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-100 border-2 border-blue-200 rounded-2xl max-w-xs shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up transform hover:-translate-y-1 relative overflow-hidden">
      {/* Skeumorphic shine effects */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-70"></div>
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white to-transparent opacity-50"></div>
      
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-inner border-2 border-blue-300 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-transparent opacity-40"></div>
          <MapPin className="h-5 w-5 text-white drop-shadow-sm relative z-10" />
        </div>
        <span className="font-bold text-blue-800 text-shadow-sm">Location Shared</span>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-black text-blue-900 drop-shadow-sm">{widget.locationName}</h3>
        <p className="text-sm text-blue-700 bg-blue-200 bg-opacity-60 p-2 rounded-lg border border-blue-300">
          {widget.address}
        </p>
        {widget.message && (
          <p className="text-xs text-blue-600 italic bg-white bg-opacity-50 p-2 rounded">
            {widget.message}
          </p>
        )}
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <button className="text-xs text-blue-600 bg-white bg-opacity-60 px-3 py-1 rounded-lg shadow-inner border border-blue-200 font-semibold flex items-center space-x-1">
          <Navigation className="h-3 w-3" />
          <span>Get Directions</span>
        </button>
        <div className="text-xs text-blue-500">📍 Live location</div>
      </div>
      
      {/* Bottom depth shadow */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-blue-900 to-transparent opacity-15 rounded-b-2xl"></div>
    </div>
  )
}

export function DateReminderWidgetComponent({ widget }: { widget: DateReminderWidget }) {
  const eventDate = new Date(`${widget.eventDate}T${widget.eventTime}`)
  const now = new Date()
  const timeUntil = eventDate.getTime() - now.getTime()
  const daysUntil = Math.ceil(timeUntil / (1000 * 60 * 60 * 24))
  const hoursUntil = Math.ceil(timeUntil / (1000 * 60 * 60))
  
  const getTimeDisplay = () => {
    if (timeUntil < 0) return "Past event"
    if (daysUntil > 1) return `${daysUntil} days`
    if (hoursUntil > 1) return `${hoursUntil} hours`
    return "Soon!"
  }
  
  return (
    <div className="p-4 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-100 border-2 border-orange-200 rounded-2xl max-w-xs shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up transform hover:-translate-y-1 relative overflow-hidden">
      {/* Skeumorphic shine effects */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-70"></div>
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white to-transparent opacity-50"></div>
      
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-inner border-2 border-orange-300 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-transparent opacity-40"></div>
          <Bell className="h-5 w-5 text-white drop-shadow-sm relative z-10" />
        </div>
        <span className="font-bold text-orange-800 text-shadow-sm">Date Reminder</span>
      </div>
      
      <div className="text-center mb-3">
        <div className="text-2xl mb-1">{widget.emoji || "⏰"}</div>
        <h3 className="text-lg font-black text-orange-900 drop-shadow-sm mb-1">{widget.eventName}</h3>
        <div className="text-sm font-bold text-orange-700 bg-orange-200 bg-opacity-60 p-2 rounded-lg border border-orange-300">
          {eventDate.toLocaleDateString('en-IN', { 
            weekday: 'short',
            month: 'short', 
            day: 'numeric' 
          })} at {widget.eventTime}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-orange-600 flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>{widget.location}</span>
          </span>
          <span className="text-orange-800 font-bold">{getTimeDisplay()}</span>
        </div>
        
        {widget.commuteTime && (
          <div className="text-xs text-orange-600 bg-white bg-opacity-50 p-2 rounded flex items-center space-x-1">
            <Car className="h-3 w-3" />
            <span>~{widget.commuteTime} min commute</span>
          </div>
        )}
      </div>
      
      {/* Bottom depth shadow */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-orange-900 to-transparent opacity-15 rounded-b-2xl"></div>
    </div>
  )
}

export function CalendarEventWidgetComponent({ widget }: { widget: CalendarEventWidget }) {
  const eventDate = new Date(`${widget.eventDate}T${widget.eventTime}`)
  const priorityColors = {
    low: 'gray',
    medium: 'yellow', 
    high: 'red'
  }
  const color = priorityColors[widget.priority]
  
  return (
    <div className={`p-4 bg-gradient-to-br from-${color}-100 via-${color}-50 to-${color}-100 border-2 border-${color}-200 rounded-2xl max-w-xs shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up transform hover:-translate-y-1 relative overflow-hidden`}>
      {/* Skeumorphic shine effects */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-70"></div>
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white to-transparent opacity-50"></div>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 bg-gradient-to-br from-${color}-400 via-${color}-500 to-${color}-600 rounded-full flex items-center justify-center shadow-inner border-2 border-${color}-300 relative`}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-transparent opacity-40"></div>
            <Calendar className="h-4 w-4 text-white drop-shadow-sm relative z-10" />
          </div>
          <span className={`font-semibold text-${color}-800 text-shadow-sm text-sm`}>Event</span>
        </div>
        <div className={`text-xs px-2 py-1 bg-${color}-200 text-${color}-800 rounded-full font-bold`}>
          {widget.priority.toUpperCase()}
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className={`text-lg font-black text-${color}-900 drop-shadow-sm`}>{widget.eventName}</h3>
        
        <div className={`text-sm font-bold text-${color}-700 bg-${color}-200 bg-opacity-60 p-2 rounded-lg border border-${color}-300`}>
          {eventDate.toLocaleDateString('en-IN', { 
            weekday: 'short',
            month: 'short', 
            day: 'numeric' 
          })} • {widget.eventTime}
          {widget.duration && (
            <span className="ml-2 text-xs">({widget.duration}m)</span>
          )}
        </div>
        
        {widget.location && (
          <div className={`text-xs text-${color}-600 flex items-center space-x-1`}>
            <MapPin className="h-3 w-3" />
            <span>{widget.location}</span>
          </div>
        )}
        
        {widget.description && (
          <p className={`text-xs text-${color}-600 italic bg-white bg-opacity-50 p-2 rounded`}>
            {widget.description}
          </p>
        )}
      </div>
      
      {/* Bottom depth shadow */}
      <div className={`absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-${color}-900 to-transparent opacity-15 rounded-b-2xl`}></div>
    </div>
  )
}

export function GoneLiveWidgetComponent({ widget }: { widget: GoneLiveWidget }) {
  const getActivityEmoji = () => {
    switch (widget.activity) {
      case "working": return "💻"
      case "studying": return "📚"
      case "cooking": return "🍳"
      case "gaming": return "🎮"
      case "reading": return "📖"
      case "exercising": return "🏋️"
      default: return "📹"
    }
  }
  
  return (
    <div className="p-4 bg-gradient-to-br from-red-100 via-pink-100 to-red-100 border-2 border-red-200 rounded-2xl max-w-xs shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up transform hover:-translate-y-1 relative overflow-hidden">
      {/* Live indicator pulse */}
      {widget.isActive && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      )}
      
      {/* Skeumorphic shine effects */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-70"></div>
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white to-transparent opacity-50"></div>
      
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-red-400 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-inner border-2 border-red-300 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-transparent opacity-40"></div>
          <Video className="h-5 w-5 text-white drop-shadow-sm relative z-10" />
        </div>
        <span className="font-bold text-red-800 text-shadow-sm">Gone Live!</span>
        {widget.isActive && (
          <div className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-bold animate-pulse">
            LIVE
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="text-center">
          <div className="text-3xl mb-2">{getActivityEmoji()}</div>
          <h3 className="text-lg font-black text-red-900 drop-shadow-sm mb-1">{widget.streamTitle}</h3>
          <p className="text-sm font-bold text-red-700 bg-red-200 bg-opacity-60 p-2 rounded-lg border border-red-300 capitalize">
            {widget.activity}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          {widget.duration && (
            <div className="text-red-600 flex items-center space-x-1">
              <Play className="h-3 w-3" />
              <span>{widget.duration}m streaming</span>
            </div>
          )}
          {widget.viewers && (
            <div className="text-red-600 flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{widget.viewers} watching</span>
            </div>
          )}
        </div>
        
        {widget.isActive && (
          <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2">
            <Video className="h-4 w-4" />
            <span>Join & Watch</span>
          </button>
        )}
      </div>
      
      {/* Bottom depth shadow */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-red-900 to-transparent opacity-15 rounded-b-2xl"></div>
    </div>
  )
}

// Main widget renderer component
export function WidgetRenderer({ widget }: { widget: WidgetData }) {
  switch (widget.type) {
    case "sticker":
      return <StickerWidgetComponent widget={widget} />
    case "money":
      return <MoneyWidgetComponent widget={widget} />
    case "days-since":
      return <DaysSinceWidgetComponent widget={widget} />
    case "shared-location":
      return <SharedLocationWidgetComponent widget={widget} />
    case "date-reminder":
      return <DateReminderWidgetComponent widget={widget} />
    case "calendar-event":
      return <CalendarEventWidgetComponent widget={widget} />
    case "gone-live":
      return <GoneLiveWidgetComponent widget={widget} />
    default:
      return null
  }
}