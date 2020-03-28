import React from 'react';

const Login = (props) => {
  const {
    onLogin,
    username,
    handleUsernameChange,
    password,
    handlePasswordChange,
  } = props;

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