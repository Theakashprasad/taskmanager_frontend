import { useContext } from 'react';
import { SocketContext } from './SocketContext';

export const useSocket = () => {
  return useContext(SocketContext); // Return socket from context
};