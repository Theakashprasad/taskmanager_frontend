import  { useState } from 'react';
import { TaskContext } from './TaskContext';
import { ITask } from '../Types/User';

export const TaskProvider = ({ children }: any) => {
  const [allTasks, setAllTasks] = useState<ITask[] | null>(null);

  return (
    <TaskContext.Provider value={{ allTasks, setAllTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
