import axios from 'axios';
const baseUrl = '/api/login';

const login = (credentials) => {
  return axios
    .post(baseUrl, credentials)
    .then(res => {
      return res.data;
    });
}

export default { login }