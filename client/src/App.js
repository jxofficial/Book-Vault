import React, { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';


import BlogPost from './components/blogPost/BlogPost';
import Login from './components/Login';
import BlogPostForm from './components/blogPostForm/BlogPostForm';
import ErrorNotification from './components/ErrorNotification';
import SuccessNotification from './components/SuccessNotification';
import Toggleable from './components/Toggleable';
import Header from './components/Header';

import loginService from './services/login';
import blogService from './services/blog';

const App = () => {
  // allows the parent to access a DOM node or React element outside the render flow
  // during the render phase, you modify a child with new props
  const blogFormRef = React.createRef();

  const [user, setUser] = useState(null); // user is the login resp obj with token, username & name properties
  const [blogPosts, setBlogPosts] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

    setSuccessMessage(`${createdPost.title} was successfully added`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  const likePost = async post => {
    const updatedPost = await blogService.likePost(post);
    const updatedPosts = blogPosts.map(post => {
      if (post.id === updatedPost.id) return updatedPost;
      else return post;
    });
    setBlogPosts(updatedPosts);
  };

  const deletePost = async postToBeDeleted => {
    try {
      const isToBeDeleted = window.confirm(`${postToBeDeleted.title} will be deleted!`);
      if (isToBeDeleted) {
        await blogService.deletePost(postToBeDeleted);
        const updatedPosts = blogPosts.filter(post => post.id !== postToBeDeleted.id);
        setBlogPosts(updatedPosts);
      }
    } catch (exception) {
      setErrorMessage(exception.response.data.error); // data is the actual response object sent
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  const sortBlogPosts = () => {
    const sortedBlogPosts = [...blogPosts.sort((post1, post2) => post1.likes - post2.likes)];
    setBlogPosts(sortedBlogPosts);
  };

  if (user === null) {
    return (
      <Container>
        <div>
          <ErrorNotification message={errorMessage} />
        </div>
        <Login login={login} />
      </Container>
    );
  } else {
    return (
      <Container>
        <div>
          <Header
            user={user}
            handleLogout={logout}
          />
          <div>
            <SuccessNotification message={successMessage} />
          </div>
          <div>
            <ErrorNotification message={errorMessage} />
          </div>
          <h2>
            Posts&nbsp;
            <span><button onClick={sortBlogPosts}>Sort</button></span>
          </h2>

          {blogPosts.map(post => (
            <BlogPost
              post={post}
              likePost={likePost}
              deletePost={deletePost}
              key={post.id}
            />
          ))}
        </div>

        <div>
          <Toggleable buttonLabel="New Post" ref={blogFormRef}>
            <BlogPostForm createPost={createPost} />
          </Toggleable>
        </div>
      </Container>
    );
  }
};

export default App;