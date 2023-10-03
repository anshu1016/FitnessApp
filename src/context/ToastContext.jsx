import { createContext, useContext, useReducer } from "react";
import { initialToast, ToastReducer } from "../reducers/ToastReducer";
export const ToastContext = createContext();
export const ToastContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ToastReducer, initialToast);
  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
