'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { socket } from '../utils/socket';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from "../utils/config";
import axios from 'axios';

interface Notification {
  _id: string;
  customer: string;
  tourName: string;
  createdAt: number;
  isNew: boolean;
}

const fetchNotifications = async (): Promise<Notification[]> => {
  const res = await axios.get(`${BASE_URL}/notification`);
  const notificationsData = res.data.data;

  return notificationsData.map((b: any) => ({
    _id: b._id,
    customer: b.customer,
    tourName: b.tourName,
    isNew: !b.read,
    createdAt: new Date(b.createdAt).getTime(),
  }));
};

export default function NotificationPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 1. React Query fetch
  const { data: notifications = [], refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    refetchOnWindowFocus: true,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (!socket.connected) socket.connect();

    const handleNewBooking = (booking: any) => {
      const newNotification: Notification = {
        _id: booking._id,
        customer: booking.customer,
        tourName: booking.tourName,
        isNew: true,
        createdAt: booking.createdAt ? new Date(booking.createdAt).getTime() : Date.now(),
      };

      queryClient.setQueryData<Notification[]>(['notifications'], (old = []) => [
        newNotification,
        ...old,
      ]);
    };

    socket.on('new_booking', handleNewBooking);
    return () => socket.off('new_booking', handleNewBooking);
  }, [queryClient]);

  const handleClickBooking = async (id: string) => {
    router.push(`/admin/bookings`);
    
    queryClient.setQueryData<Notification[]>(['notifications'], (old = []) =>
      old.map(n => (n._id === id ? { ...n, isNew: false } : n))
    );

    await axios.patch(`${BASE_URL}/notification/read/${id}`);
  };

  const unreadCount = notifications.filter(n => n.isNew).length;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Notifications ({unreadCount})
      </h1>
      <ul className="flex flex-col gap-2">
        {notifications.map(n => (
          <li
            key={n._id}
            onClick={() => handleClickBooking(n._id)}
            className={`p-3 rounded shadow cursor-pointer transition 
              ${n.isNew ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`}
          >
            <p>
              <strong>{n.customer}</strong> has booked <strong>{n.tourName}</strong>
            </p>
            <p className="text-sm text-gray-500">
              {new Date(n.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
        {notifications.length === 0 && <li>No notifications</li>}
      </ul>
    </div>
  );
}
