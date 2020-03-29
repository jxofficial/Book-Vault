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

const getAllPosts = user => {
  const username = user.username;
  const result = axios.get(`${BASE_URL}/blogposts/${username}`, config);
  return result.then(response => response.data);
}

const createPost = post => {
  const result = axios.post(`${BASE_URL}/blog`, post, config);
  return result.then(response => response.data);
}

export default {
  setAuthorizationStr,
  getAllPosts,
  createPost
}