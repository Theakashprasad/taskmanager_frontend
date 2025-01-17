// src/context/SocketProvider.jsx
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "./SocketContext";

export const SocketProvider = ({ children }: any) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // const baseURL = import.meta.env.VITE_PUBLIC_SERVER_URL; // Environment variable for the base URL
    const newSocket = io("https://taskmanager-7xd2.onrender.com", {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true
    });
    
    // Connect to the Socket.io server
    // const newSocket = io(baseURL);
    setSocket(newSocket);


    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
