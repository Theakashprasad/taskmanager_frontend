import { createContext, Dispatch, SetStateAction } from 'react';
import { ITask } from '../Types/User';

interface TaskContextValue {
  allTasks: ITask[] | null;
  setAllTasks: Dispatch<SetStateAction<ITask[] | null>>;
}

export const TaskContext = createContext<TaskContextValue | null>(null);
