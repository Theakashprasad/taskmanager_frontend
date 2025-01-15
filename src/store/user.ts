import { create } from "zustand";

interface AppState {
  isAuth: boolean| string;
  setIsAuth: (isAuth: boolean) => void;
}

// Utility function to load initial state from local storage
const loadFromLocalStorage = (): boolean|string => {
  if (typeof window !== "undefined") {
    const storedAuth = localStorage.getItem("jwt");
    
    return storedAuth ? storedAuth: false;
  }
  return false; // default value if localStorage is not accessible
};

const useStore = create<AppState>((set) => ({
  isAuth: loadFromLocalStorage(), // Load initial state from localStorage
  setIsAuth: (isAuth) => {
    set({ isAuth });
  },
}));

export default useStore;
