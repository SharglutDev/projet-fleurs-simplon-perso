import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const NavBar = () => {
  const { handleLogout, currentUser } = useAuth();
  const { handleToast } = useToast();

  const handleDisconnect = () => {
    handleLogout();
    handleToast({ color: 'info', message: 'You have been disconnected' });
  };

  return (
    <Navbar sticky='top' expand='lg' bg='light' className='shadow'>
      <Container fluid>
        <Navbar.Brand>🍀 Société Nature Cueillette et Fleur</Navbar.Brand>
        <Navbar.Toggle
          data-bs-toggle='collapse'
          data-bs-target='#navbarScroll'
          aria-controls='navbarScroll'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </Navbar.Toggle>
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='me-auto' navbarScroll>
            <NavLink to='/' end className='nav-link'>
              Home
            </NavLink>
            <NavLink to='/plant' className='nav-link'>
              Create
            </NavLink>
            <NavLink to='/users' className='nav-link'>
              Users
            </NavLink>
          </Nav>
          <Nav className='ms-auto'>
            {currentUser ? (
              <div className='d-flex align-items-center'>
                {currentUser.role === 'admin' ? (
                  <NavLink to='/admin' className='fw-bold mx-5 nav-lnik'>
                    Admin Interface
                  </NavLink>
                ) : (
                  <div className='fw-bold mx-5'>Connecté</div>
                )}
                <NavLink
                  to='/login'
                  className='nav-link'
                  onClick={handleDisconnect}
                >
                  Logout
                </NavLink>
              </div>
            ) : (
              <div className='d-flex align-items-center'>
                <NavLink to='/signup' className='nav-link'>
                  SignUp
                </NavLink>
                <NavLink to='/login' className='nav-link'>
                  Login
                </NavLink>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
