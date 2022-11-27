import axios, { AxiosResponse } from 'axios';
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastProps } from '../App';
import AuthForm, { FormDataType } from '../components/AuthForm';
import { useAuth, UserType } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface LoginResponseType {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: UserType;
  };
}

const Login = () => {
  const { setCurrentUser } = useAuth();
  const { handleToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  console.log('location : ', location);
  // allow access to the previous path where the user tried to access if not go to home
  const from = location.state?.from?.pathname || '/';

  const handleLoginForm = async (formData: FormDataType) => {
    try {
      const response: AxiosResponse<LoginResponseType> = await axios.post(
        'http://localhost:8080/api/v1/user/login',
        formData
      );
      console.log(response.data);
      const { data, message } = response.data;
      const userRole = response.data.data.user.role;

      if (response.status === 200) {
        setCurrentUser(data.user);
        handleToast({ color: 'success', message: message });
        navigate(from, { replace: true });
        // navigate('/');
      } else {
        handleToast({ color: 'danger', message: message });
      }
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
    } catch (error: any) {
      console.log(error);
      handleToast({ color: 'danger', message: error.response.data.message });
    }
  };

  return (
    <>
      <Container className='mt-5 w-25'>
        <AuthForm onFormSubmit={handleLoginForm} button='Login' />
      </Container>
    </>
  );
};

export default Login;
