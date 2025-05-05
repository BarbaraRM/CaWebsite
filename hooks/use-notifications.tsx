"use client"

import { useState, useEffect, useCallback } from "react"
import { notificationsService } from "@/services/notifications-service"
import type { Notification } from "@/types/notification"

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const fetchNotifications = useCallback(async () => {
    try {
      const data = await notificationsService.getNotifications()
      setNotifications(data)
    } catch (error) {
      console.error("Error fetching notifications:", error)
    }
  }, [])

  useEffect(() => {
    fetchNotifications()

    // Refresh notifications every minute
    const interval = setInterval(fetchNotifications, 60000)

    return () => clearInterval(interval)
  }, [fetchNotifications])

  const markAsRead = useCallback(async (id: string) => {
    try {
      await notificationsService.markAsRead(id)
      setNotifications((prev) =>
        prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
      )
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }, [])

  const getNotification = useCallback(async (id: string) => {
    try {
      return await notificationsService.getNotificationById(id)
    } catch (error) {
      console.error("Error fetching notification:", error)
      return null
    }
  }, [])

  return {
    notifications,
    markAsRead,
    getNotification,
  }
}

