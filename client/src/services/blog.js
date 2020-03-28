import axios from 'axios'

const BASE_URL = '/api/blogposts'

let authenticationStr = null;

const setAuthenicationStr = token => {
  if (token === null) {
    authenticationStr = null;
  } else {
    authenticationStr = `Authentication ${token}`;
  }
}

const getAllPosts = user => {
  const username = user.username;
  const config = {
    headers: {
      Authentication: authenticationStr
    }
  };
  const request = axios.get(`${BASE_URL}/${username}`, config);
  return request.then(response => response.data);
}

export default {
  setAuthenicationStr,
  getAllPosts
}