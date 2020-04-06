import React, { useState } from 'react';

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const onLogin = e => {
    e.preventDefault();
    const credentials = {username, password};
    login(credentials);
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <h2>
        Application Login
      </h2>
      <form onSubmit={onLogin}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;