// This is a mock service for notifications
// In a real app, this would make API calls to your backend

import type { Notification } from "@/types/notification"

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Bienvenido a la plataforma",
    preview: "Gracias por registrarte en nuestra plataforma. Aquí encontrarás toda la información que necesitas.",
    content:
      "Gracias por registrarte en nuestra plataforma. Aquí encontrarás toda la información que necesitas para comenzar a utilizar nuestros servicios. Si tienes alguna pregunta, no dudes en contactarnos.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false,
    actionUrl: "https://example.com",
    actionText: "Comenzar",
  },
  {
    id: "2",
    title: "Nueva actualización disponible",
    preview: "Hemos lanzado una nueva actualización con mejoras y correcciones de errores.",
    content:
      "Hemos lanzado una nueva actualización con mejoras y correcciones de errores. Entre las novedades se incluyen: mejor rendimiento, nueva interfaz de usuario y más opciones de personalización. Actualiza ahora para disfrutar de todas estas mejoras.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: false,
    actionUrl: "https://example.com/update",
    actionText: "Actualizar",
  },
  {
    id: "3",
    title: "Recordatorio de reunión",
    preview: "Tienes una reunión programada para mañana a las 10:00 AM.",
    content:
      "Tienes una reunión programada para mañana a las 10:00 AM con el equipo de desarrollo. La reunión se llevará a cabo en la sala de conferencias principal. Por favor, prepara tu presentación y llega a tiempo.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    read: true,
    actionUrl: "https://example.com/calendar",
    actionText: "Ver calendario",
  },
  {
    id: "4",
    title: "Nuevo mensaje recibido",
    preview: "Has recibido un nuevo mensaje de Juan Pérez.",
    content:
      "Has recibido un nuevo mensaje de Juan Pérez: 'Hola, ¿podríamos reunirnos para discutir el nuevo proyecto? Tengo algunas ideas que me gustaría compartir contigo. Saludos.'",
    date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    read: true,
    actionUrl: "https://example.com/messages",
    actionText: "Responder",
  },
  {
    id: "5",
    title: "Factura generada",
    preview: "Se ha generado la factura correspondiente al mes de abril.",
    content:
      "Se ha generado la factura correspondiente al mes de abril. El monto total es de $1,250.00. La fecha límite de pago es el 15 de mayo. Puedes descargar la factura desde tu panel de control o hacer clic en el botón a continuación.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
    read: false,
    actionUrl: "https://example.com/invoices",
    actionText: "Ver factura",
  },
]

// Local storage key for notifications
const NOTIFICATIONS_KEY = "notifications"

// Initialize notifications in localStorage if not present
function initializeNotifications() {
  if (!localStorage.getItem(NOTIFICATIONS_KEY)) {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(mockNotifications))
  }
}

// Get notifications from localStorage
function getNotificationsFromStorage(): Notification[] {
  initializeNotifications()
  const notificationsJson = localStorage.getItem(NOTIFICATIONS_KEY)
  return notificationsJson ? JSON.parse(notificationsJson) : []
}

// Save notifications to localStorage
function saveNotificationsToStorage(notifications: Notification[]) {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications))
}

export const notificationsService = {
  // Get all notifications
  async getNotifications(): Promise<Notification[]> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    return getNotificationsFromStorage()
  },

  // Get notification by ID
  async getNotificationById(id: string): Promise<Notification> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    const notifications = getNotificationsFromStorage()
    const notification = notifications.find((n) => n.id === id)

    if (!notification) {
      throw new Error("Notificación no encontrada")
    }

    return notification
  },

  // Mark notification as read
  async markAsRead(id: string): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    const notifications = getNotificationsFromStorage()
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    )

    saveNotificationsToStorage(updatedNotifications)
  },

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const notifications = getNotificationsFromStorage()
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }))

    saveNotificationsToStorage(updatedNotifications)
  },
}

