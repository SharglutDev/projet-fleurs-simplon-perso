import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { UserType } from '../contexts/AuthContext';

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    let isMounted = true;
    // AbortControll allow us to cancel the axios request in case its taking too long and the user already switched to another page.
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response: AxiosResponse<{ data: UserType[] }> = await axios.get(
          'http://localhost:8080/api/v1/user/all',
          {
            signal: controller.signal,
          }
        );
        console.log('Fetch Users Response : ', response);
        const { data } = response.data;
        isMounted && setUsers(data);
      } catch (err) {
        console.error('Fetch Users Error : ', err);
      }
    };

    getUsers();

    return () => {
      // Launching when component unmount
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
