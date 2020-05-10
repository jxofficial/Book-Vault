import axios from 'axios';
const BASE_URL = '/api/login';

const login = async credentials => {
  // any resp that is in thr 400/500 range will be treated as an error
  // error will be propogated to the caller, in this case login function in App.js component.
  const resp = await axios.post(BASE_URL, credentials);
  return resp.data;
  // refer to https://stackoverflow.com/a/51768316 for axios error handling
};

export default { login };