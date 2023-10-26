'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserProfileProps {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: number;
  };
}

const UserData: React.FC = () => {
  const [data, setData] = useState<UserProfileProps[]>([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }, []);

  return (
    <div>
      <h1>Profile Information</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserData;
