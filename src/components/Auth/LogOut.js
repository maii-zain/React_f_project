import React from 'react';
import { useDispatch } from 'react-redux'; // Assuming you're using Redux for state management
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
 
    history.push('/login');
  };

  return (
    <div>
      <h1>Logout</h1>
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
