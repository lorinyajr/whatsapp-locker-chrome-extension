import React, { useState } from 'react';
import './App.css';

function ZackProtect() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isRegistered) {
      if (!userName || !password) {
        setError('Username or password is empty!');
      } else {
        localStorage.setItem('userName', userName);
        localStorage.setItem('password', password);
        setError('Registered successfully!');
        setIsRegistered(true);
      }
    } else {
      const storedUserName = localStorage.getItem('userName');
      const storedPassword = localStorage.getItem('password');

      if (userName === storedUserName && password === storedPassword) {
        // Password is correct, you can navigate to the main app here
        setError('');
      } else {
        setError('Incorrect username or password.');
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {isRegistered ? (
          <h1>Login to WhatsApp</h1>
        ) : (
          <h1>Register to use Zack Protect</h1>
        )}

        <label>User name:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={isRegistered}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {isRegistered ? 'Login' : 'Sign up'}
        </button>

        {error && <label style={{ color: 'red' }}>{error}</label>}
      </form>
    </div>
  );
}

export default ZackProtect;
