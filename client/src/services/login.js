import axios from 'axios';
const BASE_URL = '/api/login';

const login = async credentials => {
  const resp = await axios.post(BASE_URL, credentials);
  return resp.data;
};

export default { login };