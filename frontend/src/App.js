import React, { useEffect, useState } from 'react';
import API from './api';

function App() {
  console.log("Trigger CI")

  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  const fetchUsers = async () => {
    const response = await API.get('/users');
    setUsers(response.data);
  };

  const addUser = async () => {
    if (!name) return;

    await API.post('/users', { name });

    setName('');

    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>3-Tier Application</h1>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

<button onClick={addUser}>Add User</button>

      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
