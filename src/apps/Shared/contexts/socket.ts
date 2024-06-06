import { createContext, } from 'react';
import io, { Socket, } from 'socket.io-client';

const ONE_MINUTE = 60 * 1000;

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: ONE_MINUTE,
  reconnectionDelayMax: ONE_MINUTE * 5,
  retries: +import.meta.env.VITE_MAX_RETRIES,
});

export type SocketContextType = Socket | null;

export const SocketContext = createContext<SocketContextType>(null);