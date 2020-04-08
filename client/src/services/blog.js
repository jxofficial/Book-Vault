import axios from 'axios';

const BASE_URL = '/api';

let authorizationStr = null;
let config = null;

const setAuthorizationStr = token => {
  if (token === null) {
    authorizationStr = null;
  } else {
    authorizationStr = `Bearer ${token}`;
  }
  config = {
    headers: { Authorization: authorizationStr }
  };
}

const getAllPosts = () => {
  const result = axios.get(`${BASE_URL}/blogposts`);
  return result.then(response => response.data);
};

const getAllPostsBy = user => {
  const username = user.username;
  const result = axios.get(`${BASE_URL}/blogposts/${username}`, config);
  return result.then(response => response.data);
};

const createPost = post => {
  const result = axios.post(`${BASE_URL}/blog`, post, config);
  return result.then(response => response.data);
};

const likePost = post => {
  const updatedLikes = post.likes + 1;
  const updatedPost = {...post, likes: updatedLikes};
  const result = axios.put(`${BASE_URL}/blogposts/${post.id}`, updatedPost);
  return result.then(response => response.data);
};

export default {
  setAuthorizationStr,
  getAllPosts,  
  getAllPostsBy,
  createPost,
  likePost
};