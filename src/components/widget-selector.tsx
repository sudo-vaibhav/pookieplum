"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  DollarSign,
  Smile,
  Send,
  MapPin,
  Bell,
  Clock,
  Video,
} from "lucide-react";
import type { WidgetData } from "./chat-widgets";

interface WidgetSelectorProps {
  onSendWidget: (widget: WidgetData) => void;
}

export function WidgetSelector({ onSendWidget }: WidgetSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<string>("");

  // Sticker data
  const stickers = [
    { emoji: "😘", name: "Kiss" },
    { emoji: "❤️", name: "Heart" },
    { emoji: "🥰", name: "Love" },
    { emoji: "😍", name: "Heart Eyes" },
    { emoji: "🤗", name: "Hug" },
    { emoji: "💕", name: "Two Hearts" },
    { emoji: "💖", name: "Sparkling Heart" },
    { emoji: "🌹", name: "Rose" },
  ];

  // Money widget form
  const [moneyForm, setMoneyForm] = useState({
    amount: "",
    currency: "₹",
    note: "",
  });

  // Days since widget form
  const [daysSinceForm, setDaysSinceForm] = useState({
    eventName: "",
    eventDate: "",
    emoji: "📅",
  });

  // Shared location widget form
  const [locationForm, setLocationForm] = useState({
    locationName: "",
    address: "",
    message: "",
  });

  // Date reminder widget form
  const [dateReminderForm, setDateReminderForm] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    location: "",
    commuteTime: "",
    emoji: "⏰",
  });

  // Calendar event widget form
  const [calendarForm, setCalendarForm] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    duration: "",
    location: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
  });

  // Gone live widget form
  const [goneLiveForm, setGoneLiveForm] = useState({
    streamTitle: "",
    activity: "working",
  });

  const handleSendSticker = (emoji: string, name: string) => {
    onSendWidget({
      type: "sticker",
      stickerUrl: emoji,
      stickerName: name,
    });
    setIsOpen(false);
  };

  const handleSendMoney = () => {
    if (moneyForm.amount && parseFloat(moneyForm.amount) > 0) {
      onSendWidget({
        type: "money",
        amount: parseFloat(moneyForm.amount),
        currency: moneyForm.currency,
        note: moneyForm.note || undefined,
      });
      setMoneyForm({ amount: "", currency: "₹", note: "" });
      setIsOpen(false);
    }
  };

  const handleSendDaysSince = () => {
    if (daysSinceForm.eventName && daysSinceForm.eventDate) {
      onSendWidget({
        type: "days-since",
        eventName: daysSinceForm.eventName,
        eventDate: daysSinceForm.eventDate,
        emoji: daysSinceForm.emoji,
      });
      setDaysSinceForm({ eventName: "", eventDate: "", emoji: "📅" });
      setIsOpen(false);
    }
  };

  const handleSendLocation = () => {
    if (locationForm.locationName && locationForm.address) {
      onSendWidget({
        type: "shared-location",
        locationName: locationForm.locationName,
        address: locationForm.address,
        message: locationForm.message || undefined,
      });
      setLocationForm({ locationName: "", address: "", message: "" });
      setIsOpen(false);
    }
  };

  const handleSendDateReminder = () => {
    if (
      dateReminderForm.eventName &&
      dateReminderForm.eventDate &&
      dateReminderForm.eventTime &&
      dateReminderForm.location
    ) {
      onSendWidget({
        type: "date-reminder",
        eventName: dateReminderForm.eventName,
        eventDate: dateReminderForm.eventDate,
        eventTime: dateReminderForm.eventTime,
        location: dateReminderForm.location,
        commuteTime: dateReminderForm.commuteTime
          ? parseInt(dateReminderForm.commuteTime)
          : undefined,
        emoji: dateReminderForm.emoji,
      });
      setDateReminderForm({
        eventName: "",
        eventDate: "",
        eventTime: "",
        location: "",
        commuteTime: "",
        emoji: "⏰",
      });
      setIsOpen(false);
    }
  };

  const handleSendCalendarEvent = () => {
    if (
      calendarForm.eventName &&
      calendarForm.eventDate &&
      calendarForm.eventTime
    ) {
      onSendWidget({
        type: "calendar-event",
        eventName: calendarForm.eventName,
        eventDate: calendarForm.eventDate,
        eventTime: calendarForm.eventTime,
        duration: calendarForm.duration
          ? parseInt(calendarForm.duration)
          : undefined,
        location: calendarForm.location || undefined,
        description: calendarForm.description || undefined,
        priority: calendarForm.priority,
      });
      setCalendarForm({
        eventName: "",
        eventDate: "",
        eventTime: "",
        duration: "",
        location: "",
        description: "",
        priority: "medium",
      });
      setIsOpen(false);
    }
  };

  const handleGoneLive = () => {
    if (goneLiveForm.streamTitle) {
      onSendWidget({
        type: "gone-live",
        streamTitle: goneLiveForm.streamTitle,
        activity: goneLiveForm.activity,
        isActive: true,
        duration: 0,
      });
      setGoneLiveForm({ streamTitle: "", activity: "working" });
      setIsOpen(false);
    }
  };

  const resetForms = () => {
    setSelectedWidget("");
    setMoneyForm({ amount: "", currency: "₹", note: "" });
    setDaysSinceForm({ eventName: "", eventDate: "", emoji: "📅" });
    setLocationForm({ locationName: "", address: "", message: "" });
    setDateReminderForm({
      eventName: "",
      eventDate: "",
      eventTime: "",
      location: "",
      commuteTime: "",
      emoji: "⏰",
    });
    setCalendarForm({
      eventName: "",
      eventDate: "",
      eventTime: "",
      duration: "",
      location: "",
      description: "",
      priority: "medium",
    });
    setGoneLiveForm({ streamTitle: "", activity: "working" });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetForms();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Smile className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Send a Widget</DialogTitle>
        </DialogHeader>

        {!selectedWidget && (
          <div className="space-y-4">
            <Button
              onClick={() => setSelectedWidget("stickers")}
              className="w-full justify-start"
              variant="outline"
            >
              <Smile className="h-4 w-4 mr-2" />
              Stickers
            </Button>
            <Button
              onClick={() => setSelectedWidget("money")}
              className="w-full justify-start"
              variant="outline"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Send Money
            </Button>
            <Button
              onClick={() => setSelectedWidget("days-since")}
              className="w-full justify-start"
              variant="outline"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Days Since
            </Button>
            <Button
              onClick={() => setSelectedWidget("location")}
              className="w-full justify-start"
              variant="outline"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Share Location
            </Button>
            <Button
              onClick={() => setSelectedWidget("date-reminder")}
              className="w-full justify-start"
              variant="outline"
            >
              <Bell className="h-4 w-4 mr-2" />
              Date Reminder
            </Button>
            <Button
              onClick={() => setSelectedWidget("calendar")}
              className="w-full justify-start"
              variant="outline"
            >
              <Clock className="h-4 w-4 mr-2" />
              Calendar Event
            </Button>
            <Button
              onClick={() => setSelectedWidget("gone-live")}
              className="w-full justify-start"
              variant="outline"
            >
              <Video className="h-4 w-4 mr-2" />
              Gone Live
            </Button>
          </div>
        )}

        {selectedWidget === "stickers" && (
          <div>
            <h3 className="font-semibold mb-3">Choose a Sticker</h3>
            <div className="grid grid-cols-4 gap-2">
              {stickers.map((sticker) => (
                <Button
                  key={sticker.emoji}
                  variant="outline"
                  className="h-16 text-2xl"
                  onClick={() => handleSendSticker(sticker.emoji, sticker.name)}
                >
                  {sticker.emoji}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-3"
              onClick={() => setSelectedWidget("")}
            >
              Back
            </Button>
          </div>
        )}

        {selectedWidget === "money" && (
          <div className="space-y-4">
            <h3 className="font-semibold">Send Money</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  value={moneyForm.currency}
                  onChange={(e) =>
                    setMoneyForm({ ...moneyForm, currency: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="₹">INR (₹)</option>
                  <option value="$">USD ($)</option>
                  <option value="€">EUR (€)</option>
                  <option value="£">GBP (£)</option>
                </select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={moneyForm.amount}
                  onChange={(e) =>
                    setMoneyForm({ ...moneyForm, amount: e.target.value })
                  }
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="note">Note (optional)</Label>
              <Input
                id="note"
                value={moneyForm.note}
                onChange={(e) =>
                  setMoneyForm({ ...moneyForm, note: e.target.value })
                }
                placeholder="Chai, food, movie tickets..."
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setSelectedWidget("")}
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600"
                onClick={handleSendMoney}
                disabled={
                  !moneyForm.amount || parseFloat(moneyForm.amount) <= 0
                }
              >
                <Send className="h-4 w-4 mr-1" />
                Send
              </Button>
            </div>
          </div>
        )}

        {selectedWidget === "days-since" && (
          <div className="space-y-4">
            <h3 className="font-semibold">Days Since</h3>
            <div>
              <Label htmlFor="eventName">Event Name</Label>
              <Input
                id="eventName"
                value={daysSinceForm.eventName}
                onChange={(e) =>
                  setDaysSinceForm({
                    ...daysSinceForm,
                    eventName: e.target.value,
                  })
                }
                placeholder="First date, last trip to Goa, Diwali celebration..."
              />
            </div>
            <div>
              <Label htmlFor="eventDate">Event Date</Label>
              <Input
                id="eventDate"
                type="date"
                value={daysSinceForm.eventDate}
                onChange={(e) =>
                  setDaysSinceForm({
                    ...daysSinceForm,
                    eventDate: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="emoji">Emoji</Label>
              <div className="flex space-x-2">
                {[
                  "📅",
                  "💕",
                  "✈️",
                  "🎉",
                  "🏠",
                  "💍",
                  "🎂",
                  "🪔",
                  "🎊",
                  "🌟",
                ].map((emoji) => (
                  <Button
                    key={emoji}
                    variant={
                      daysSinceForm.emoji === emoji ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setDaysSinceForm({ ...daysSinceForm, emoji })
                    }
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setSelectedWidget("")}
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600"
                onClick={handleSendDaysSince}
                disabled={!daysSinceForm.eventName || !daysSinceForm.eventDate}
              >
                <Send className="h-4 w-4 mr-1" />
                Send
              </Button>
            </div>
          </div>
        )}

        {selectedWidget === "location" && (
          <div className="space-y-4">
            <h3 className="font-semibold">Share Location</h3>
            <div>
              <Label htmlFor="locationName">Location Name</Label>
              <Input
                id="locationName"
                value={locationForm.locationName}
                onChange={(e) =>
                  setLocationForm({
                    ...locationForm,
                    locationName: e.target.value,
                  })
                }
                placeholder="Coffee Shop, Home, Office..."
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={locationForm.address}
                onChange={(e) =>
                  setLocationForm({ ...locationForm, address: e.target.value })
                }
                placeholder="123 Main St, Bangalore, Karnataka"
              />
            </div>
            <div>
              <Label htmlFor="message">Message (optional)</Label>
              <Input
                id="message"
                value={locationForm.message}
                onChange={(e) =>
                  setLocationForm({ ...locationForm, message: e.target.value })
                }
                placeholder="Come find me here!"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setSelectedWidget("")}
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600"
                onClick={handleSendLocation}
                disabled={!locationForm.locationName || !locationForm.address}
              >
                <Send className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        )}

        {selectedWidget === "date-reminder" && (
          <div className="space-y-4">
            <h3 className="font-semibold">Date Reminder</h3>
            <div>
              <Label htmlFor="reminderEventName">Event Name</Label>
              <Input
                id="reminderEventName"
                value={dateReminderForm.eventName}
                onChange={(e) =>
                  setDateReminderForm({
                    ...dateReminderForm,
                    eventName: e.target.value,
                  })
                }
                placeholder="Dinner date, Movie night..."
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="reminderDate">Date</Label>
                <Input
                  id="reminderDate"
                  type="date"
                  value={dateReminderForm.eventDate}
                  onChange={(e) =>
                    setDateReminderForm({
                      ...dateReminderForm,
                      eventDate: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="reminderTime">Time</Label>
                <Input
                  id="reminderTime"
                  type="time"
                  value={dateReminderForm.eventTime}
                  onChange={(e) =>
                    setDateReminderForm({
                      ...dateReminderForm,
                      eventTime: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="reminderLocation">Location</Label>
              <Input
                id="reminderLocation"
                value={dateReminderForm.location}
                onChange={(e) =>
                  setDateReminderForm({
                    ...dateReminderForm,
                    location: e.target.value,
                  })
                }
                placeholder="Restaurant name, Mall, etc."
              />
            </div>
            <div>
              <Label htmlFor="commuteTime">
                Commute Time (minutes, optional)
              </Label>
              <Input
                id="commuteTime"
                type="number"
                value={dateReminderForm.commuteTime}
                onChange={(e) =>
                  setDateReminderForm({
                    ...dateReminderForm,
                    commuteTime: e.target.value,
                  })
                }
                placeholder="30"
              />
            </div>
            <div>
              <Label htmlFor="reminderEmoji">Emoji</Label>
              <div className="flex space-x-2">
                {["⏰", "💕", "🍽️", "🎬", "🎉", "📍", "💍", "🌹"].map(
                  (emoji) => (
                    <Button
                      key={emoji}
                      variant={
                        dateReminderForm.emoji === emoji ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setDateReminderForm({ ...dateReminderForm, emoji })
                      }
                    >
                      {emoji}
                    </Button>
                  )
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setSelectedWidget("")}
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600"
                onClick={handleSendDateReminder}
                disabled={
                  !dateReminderForm.eventName ||
                  !dateReminderForm.eventDate ||
                  !dateReminderForm.eventTime ||
                  !dateReminderForm.location
                }
              >
                <Send className="h-4 w-4 mr-1" />
                Send
              </Button>
            </div>
          </div>
        )}

        {selectedWidget === "calendar" && (
          <div className="space-y-4">
            <h3 className="font-semibold">Calendar Event</h3>
            <div>
              <Label htmlFor="calendarEventName">Event Name</Label>
              <Input
                id="calendarEventName"
                value={calendarForm.eventName}
                onChange={(e) =>
                  setCalendarForm({
                    ...calendarForm,
                    eventName: e.target.value,
                  })
                }
                placeholder="Team meeting, Doctor appointment..."
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="calendarDate">Date</Label>
                <Input
                  id="calendarDate"
                  type="date"
                  value={calendarForm.eventDate}
                  onChange={(e) =>
                    setCalendarForm({
                      ...calendarForm,
                      eventDate: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="calendarTime">Time</Label>
                <Input
                  id="calendarTime"
                  type="time"
                  value={calendarForm.eventTime}
                  onChange={(e) =>
                    setCalendarForm({
                      ...calendarForm,
                      eventTime: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="duration">Duration (minutes, optional)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={calendarForm.duration}
                  onChange={(e) =>
                    setCalendarForm({
                      ...calendarForm,
                      duration: e.target.value,
                    })
                  }
                  placeholder="60"
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  value={calendarForm.priority}
                  onChange={(e) =>
                    setCalendarForm({
                      ...calendarForm,
                      priority: e.target.value as "low" | "medium" | "high",
                    })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="calendarLocation">Location (optional)</Label>
              <Input
                id="calendarLocation"
                value={calendarForm.location}
                onChange={(e) =>
                  setCalendarForm({ ...calendarForm, location: e.target.value })
                }
                placeholder="Office, Zoom, etc."
              />
            </div>
            <div>
              <Label htmlFor="description">Description (optional)</Label>
              <Input
                id="description"
                value={calendarForm.description}
                onChange={(e) =>
                  setCalendarForm({
                    ...calendarForm,
                    description: e.target.value,
                  })
                }
                placeholder="Additional details..."
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setSelectedWidget("")}
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600"
                onClick={handleSendCalendarEvent}
                disabled={
                  !calendarForm.eventName ||
                  !calendarForm.eventDate ||
                  !calendarForm.eventTime
                }
              >
                <Send className="h-4 w-4 mr-1" />
                Send
              </Button>
            </div>
          </div>
        )}

        {selectedWidget === "gone-live" && (
          <div className="space-y-4">
            <h3 className="font-semibold">Gone Live</h3>
            <div>
              <Label htmlFor="streamTitle">Stream Title</Label>
              <Input
                id="streamTitle"
                value={goneLiveForm.streamTitle}
                onChange={(e) =>
                  setGoneLiveForm({
                    ...goneLiveForm,
                    streamTitle: e.target.value,
                  })
                }
                placeholder="Working on my project, Cooking dinner..."
              />
            </div>
            <div>
              <Label htmlFor="activity">Activity</Label>
              <select
                id="activity"
                value={goneLiveForm.activity}
                onChange={(e) =>
                  setGoneLiveForm({ ...goneLiveForm, activity: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="working">Working 💻</option>
                <option value="studying">Studying 📚</option>
                <option value="cooking">Cooking 🍳</option>
                <option value="gaming">Gaming 🎮</option>
                <option value="reading">Reading 📖</option>
                <option value="exercising">Exercising 🏋️</option>
                <option value="other">Other 📹</option>
              </select>
            </div>
            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <p className="text-xs text-red-600 mb-2">
                📹 Your partner will be invited to watch you live!
              </p>
              <p className="text-xs text-gray-600">
                This creates a one-way video stream where they can see what
                you’re doing.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setSelectedWidget("")}
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500"
                onClick={handleGoneLive}
                disabled={!goneLiveForm.streamTitle}
              >
                <Video className="h-4 w-4 mr-1" />
                Go Live
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
