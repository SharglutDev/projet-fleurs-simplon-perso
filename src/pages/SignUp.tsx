import axios, { AxiosResponse } from 'axios';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastProps } from '../App';
import AuthForm, { FormDataType } from '../components/AuthForm';
import { useToast } from '../contexts/ToastContext';

interface SignUpResponseType {
  message: string;
  data: string;
}

const SignUp = () => {
  const redirectToLogin = useNavigate();
  const { handleToast } = useToast();

  const handleLoginForm = async (formData: FormDataType) => {
    console.log(formData);
    try {
      const response: AxiosResponse<SignUpResponseType> = await axios.post(
        'http://localhost:8080/api/v1/user/signup',
        formData
      );
      console.log(response.data);
      if (response.status === 200) {
        handleToast({ color: 'success', message: response.data.message });
        redirectToLogin('/login');
      } else {
        handleToast({ color: 'danger', message: response.data.message });
      }
    } catch (error: any) {
      console.log(error);
      handleToast({ color: 'danger', message: error.response.data.message });
    }
  };

  return (
    <>
      <Container className='mt-5 w-25'>
        <AuthForm onFormSubmit={handleLoginForm} button={'Sign Up'} />
      </Container>
    </>
  );
};

export default SignUp;
