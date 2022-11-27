import { createContext, useContext, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

/**
 * Declaring context and Typing it
 */
export interface ToastProps {
  message: string;
  color: string;
}

interface ToastContextType {
  toast: ToastProps | null;
  handleToast: (toast: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

/**
 * Custom hook to handle the case where context is not defined
 * Otherwise an error will throw when using the context in other components
 * Also allow to better see which context we are using in others components and allow to use * only one import
 */

export const useToast = () => {
  let context = useContext(ToastContext);
  if (!context) {
    throw Error(
      'children must be inside the provider otherwise it wont function correctly'
    );
  }
  return context;
};

/**
 * Declaring Provider + logic and wrapping it directly around {children} to limit the code in App.tsx
 */
interface ProviderProps {
  children: React.ReactNode;
}

const ToastProvider: React.FC<ProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [show, toggleShow] = useState(false);

  const handleToast = (toast: ToastProps) => {
    setToast(toast);
    toggleShow(!show);
  };

  const stateValues = {
    toast,
    handleToast,
  };

  return (
    <ToastContext.Provider value={stateValues}>
      <ToastContainer position='top-center' className='p-3'>
        <Toast
          bg={toast?.color}
          onClose={() => toggleShow(!show)}
          show={show}
          delay={3000}
          autohide
        >
          <Toast.Body className='text-white text-center fs-6'>
            {toast?.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
