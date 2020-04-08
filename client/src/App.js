import React, { useState, useEffect } from 'react'
import Login from './components/Login';
import BlogPost from './components/BlogPost';
import BlogPostForm from './components/BlogPostForm';
import ErrorNotification from './components/ErrorNotification';
import SuccessNotification from './components/SuccessNotification';
import Toggleable from './components/Toggleable';

import loginService from './services/login';
import blogService from './services/blog';

const App = () => {
  // allows the parent to access a DOM node or React element outside the render flow 
  // during the render phase, you modify a child with new props
  const blogFormRef = React.createRef(); 

  const [user, setUser] = useState(null); // user is the login resp obj with token, username & name properties
  const [blogPosts, setBlogPosts] = useState([]);

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
      .getAllPosts()
      .then(posts => setBlogPosts(posts));
  }, [user]); // runs after first render and every time user is updated.


  const login = async credentials => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (exception) {
      setErrorMessage(exception.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem('user');
    blogService.setAuthorizationStr(null);
    setBlogPosts([]);
    setUser(null);
  };

  const createPost = async post => {
    // cannot be placed after setBlogPosts 
    // because the toggleable react element will have been updated 
    // and the blogFormRef will point to a new react element.
    blogFormRef.current.toggleVisibility(); 
    const createdPost = await blogService.createPost(post);
    setBlogPosts([...blogPosts, createdPost]);

    setsuccessMessage(`${createdPost.title} was successfully posted`);
    setTimeout(() => {
      setsuccessMessage(null);
    }, 4000);
  }

  const likePost = async post => {
    const updatedPost = await blogService.likePost(post);
    const updatedPosts = blogPosts.map(post => {
      if (post.id === updatedPost.id) return updatedPost;
      else return post;
    });
    setBlogPosts(updatedPosts);
  };

  if (user === null) {
    return (
      <div>
        <div>
          <ErrorNotification message={errorMessage} />
        </div>
        <Login login={login} />
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <h1>Welcome to {user.name}'s blog</h1>
          <SuccessNotification
            message={successMessage}
          />
          <button
            type="button"
            onClick={logout}
          >
            Logout
          </button>
          <h2>Posts</h2>
          {blogPosts.map(post =>
            <BlogPost key={post.id} post={post} likePost={likePost}/>
          )}
        </div>

        <div>
          <Toggleable buttonLabel="New Post" ref={blogFormRef}>
            <BlogPostForm createPost={createPost} />
          </Toggleable>
        </div>
      </div>
    );
  }

}

export default App;