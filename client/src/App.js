import React, { useState, useEffect } from 'react'
import Login from './components/Login';
import BlogPost from './components/BlogPost';
import BlogPostForm from './components/BlogPostForm';
import ErrorNotification from './components/ErrorNotification';
import SuccessNotification from './components/SuccessNotification';
import loginService from './services/login';
import blogService from './services/blog';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // user is the login resp obj with token, username & name properties
  const [blogPosts, setBlogPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setsuccessMessage] = useState(null);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      blogService.setAuthorizationStr(user.token);
      setUser(user);
    }
  }, []); // runs after first render only

  useEffect(() => {
    if (user === null) return;
    blogService.setAuthorizationStr(user.token);
    blogService
      .getAllPosts(user)
      .then(posts => setBlogPosts(posts));
  }, [user]); // runs after first render and every time user is updated.

  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const handleTitleChange = e => setTitle(e.target.value);
  const handleAuthorChange = e => setAuthor(e.target.value);
  const handleUrlChange = e => setUrl(e.target.value);

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
      setErrorMessage(exception.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  const onLogout = e => {
    e.preventDefault();
    localStorage.removeItem('user');
    blogService.setAuthorizationStr(null);
    setBlogPosts([]);
    setUser(null);
  }

  const onCreatePost = async e => {
    e.preventDefault();
    const createdPost = await blogService.createPost({
      title,
      author,
      url
    });
    
    setBlogPosts([...blogPosts, createdPost]);
    
    setTitle('');
    setAuthor('');
    setUrl('');
    
    setsuccessMessage(`${createdPost.title} was successfully posted`);
    setTimeout(() => {
      setsuccessMessage(null);
    }, 4000);
  }

  if (user === null) {
    return (
      <div>
        <ErrorNotification
          message={errorMessage}
        />
        <div>
          <Login
            onLogin={onLogin}
            username={username}
            handleUsernameChange={handleUsernameChange}
            password={password}
            handlePasswordChange={handlePasswordChange}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Welcome to {user.name}'s blog</h1>
        <SuccessNotification 
          message={successMessage}
        />
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
      <div>
        <BlogPostForm
          createPost={onCreatePost}
          title={title}
          handleTitleChange={handleTitleChange}
          author={author}
          handleAuthorChange={handleAuthorChange}
          url={url}
          handleUrlChange={handleUrlChange}
        />
      </div>
    </div>
  );
}

export default App;