import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import CreatePlant from './pages/CreatePlant';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useState } from 'react';
import CurrentUserProvider from './contexts/AuthContext';
import ToastProvider from './contexts/ToastContext';
import RequireAuth from './components/RequireAuth';
import Users from './pages/Users';
import Admin from './pages/Admin';

export interface ToastProps {
  color: string;
  message: string;
}

const App = () => {
  return (
    <div className='position-relative'>
      <BrowserRouter>
        <ToastProvider>
          <CurrentUserProvider>
            {/* On utilise notre composant dans notre JSX */}
            <NavBar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />

              {/* Protected Routes */}
              <Route element={<RequireAuth allowedRole='admin' />}>
                <Route path='/admin' element={<Admin />} />
                <Route path='/users' element={<Users />} />
                <Route path='/plant' element={<CreatePlant />} />
                <Route path='/plant/:id' element={<Details />} />
              </Route>
            </Routes>
          </CurrentUserProvider>
        </ToastProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
