import React, { useState, useEffect } from 'react'
import BlogPost from './components/BlogPosts'
import Login from './components/Login';
import blogService from './services/blog'
import loginService from './services/login';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    if (user === null) return;
    blogService
      .getAllPosts(user)
      .then(posts => setBlogPosts(posts));
  }, [user]);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      blogService.setAuthenicationStr(user.token);
      setUser(user);
    }
  }, []);


  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const onLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log('Invalid username or password');
    }
  };

  const onLogout = e => {
    e.preventDefault();
    localStorage.removeItem('user');
    blogService.setAuthenicationStr(null);
    setUser(null);
  }

  if (user === null) {
    return (
      <div>
        <Login
          onLogin={onLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to {user.name}'s blog</h1>
      <button
        type="button"
        onClick={onLogout}
      >
        Logout
      </button>
      <h2>Posts</h2>
      {blogPosts.map(post =>
        <BlogPost key={post.id} post={post} />
      )}

    </div>
  );
}

export default App;