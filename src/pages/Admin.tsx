import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface InterfaceName {}

const Admin = () => {
  return (
    <Container className='mt-5 text-center'>
      <section>
        <h1 className='mb-5'>Admins Interface</h1>
        <Button className='mx-3'>
          <Link to='/plant'>Add a new Plant</Link>
        </Button>
        <Button className='mx-3'>
          <Link to='/users'>Check users list</Link>
        </Button>
      </section>
    </Container>
  );
};

export default Admin;
