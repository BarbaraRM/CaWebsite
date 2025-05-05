"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNotifications } from "@/hooks/use-notifications";

export function NotificationsPopover() {
  const { notifications, markAsRead } = useNotifications();
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="hover:bg-gray-50 rounded-full p-1 relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-1 px-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium font-poppins">Notificaciones</h4>
            <Link href="/notificaciones">
              <div className="text-sm hover:bg-gray-50 py-1 px-2 rounded-md font-medium">
                Ver todas
              </div>
            </Link>
          </div>
        </div>
        <div className="h-[300px] overflow-auto">
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.slice(0, 5).map((notification: any) => (
                <div key={notification.id} className={`px-4 py-1`}>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p
                        className={`text-sm ${
                          !notification.read
                            ? "font-medium text-dark"
                            : "font-normal text-gray-600"
                        }`}
                      >
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(notification.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-1 flex flex-row gap-x-2">
                    <Link
                      href={`/notificaciones/${notification.id}`}
                      onClick={() => setOpen(false)}
                      className="text-xs text-primary hover:underline"
                    >
                      Ver detalles
                    </Link>
                    {!notification.read && (
                      <button
                        className="text-xs rounded-md font-medium hover:underline"
                        onClick={() => markAsRead(notification.id)}
                        disabled={notification.read}
                      >
                        {notification.read ? "Leído" : "Marcar"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No tienes notificaciones
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
