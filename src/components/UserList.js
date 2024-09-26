// src/components/UserList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../redux/actions';

const UserList = () => {
  const users = useSelector((state) => state.users);  // Access users from state
  const dispatch = useDispatch();

  const handleAddUser = () => {
    const newUser = { id: Date.now(), name: 'New User' };  // Create a new user
    dispatch(addUser(newUser));  // Dispatch addUser action
  };

  const handleRemoveUser = (userId) => {
    dispatch(removeUser(userId));  // Dispatch removeUser action
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} 
            <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default UserList;
