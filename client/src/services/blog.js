import axios from 'axios';

const BASE_URL = '/api';

let authorizationStr = null;

const setAuthorizationStr = token => {
  if (token === null) {
    authorizationStr = null;
  } else {
    authorizationStr = `Bearer ${token}`;
  }
}

const getAllPosts = user => {
  const username = user.username;
  const config = {
    headers: { Authorization: authorizationStr }
  };
  const result = axios.get(`${BASE_URL}/blogposts/${username}`, config);
  return result.then(response => response.data);
}

const createPost = (post) => {

}

export default {
  setAuthorizationStr,
  getAllPosts
}