import axios, { AxiosResponse } from 'axios';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';

/**
 * Declaring context and Typing it
 */
export interface UserType {
  id?: string;
  email: string;
  password: string;
  role: string;
}

interface UserContextType {
  currentUser: UserType | null;
  setCurrentUser: (user: UserType) => void;
  checkLogin: () => void;
  setAuthLoading: (isLoading: boolean) => void;
  authLoading: boolean;
  handleLogout: () => void;
}

const CurrentUserContext = createContext<UserContextType | null>(null);

/**
 * Custom hook to handle the case where context is not defined
 * Otherwise an error will throw when using the context in other components
 * Also allow to better see which context we are using in others components and allow to use * only one import
 */
export const useAuth = () => {
  let context = useContext(CurrentUserContext);
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
  children: ReactNode;
}

const CurrentUserProvider: React.FC<ProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const { handleToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const checkLogin = async () => {
    const accessToken = localStorage.getItem('accessToken');
    console.log('AuthContext - Get Token : ', accessToken);

    setAuthLoading(true);

    if (accessToken) {
      try {
        const response: AxiosResponse<{ data: UserType }> = await axios.get(
          'http://localhost:8080/api/v1/user/token',
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log('AuthContext - Response : ', response.data);
        const { data } = response.data;
        setAuthLoading(false);

        if (data) {
          setCurrentUser(data);
        }
      } catch (error: any) {
        console.log('AuthContext - InvalidToken : ', error.response.data.data);
        setAuthLoading(false);
        setCurrentUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        handleToast({ color: 'danger', message: error.response.data.message });
      }
    } else {
      console.log('AuthContext - No Token');
      setAuthLoading(false);
      setCurrentUser(null);
      // handleToast({
      //   color: 'danger',
      //   message: 'Vous devez vous identifier pour accéder à cette page',
      // });
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setCurrentUser(null);
    navigate('/login');
    console.log('AuthContext - Logout : tokens removed');
  };

  const stateValues = {
    currentUser,
    setCurrentUser,
    checkLogin,
    authLoading,
    setAuthLoading,
    handleLogout,
  };

  return (
    <CurrentUserContext.Provider value={stateValues}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
