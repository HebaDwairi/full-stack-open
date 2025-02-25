import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = (obj) => {
  const request = axios.post(baseUrl, obj, {
    headers: {
      Authorization: token
    }
  });
  return request.then(response => response.data);
}

const update = (obj, id) => {
  const request = axios.put(`${baseUrl}/${id}`, obj, {
    headers: {
      Authorization: token
    }
  });
  return request.then(response => response.data);
}

export default { getAll, setToken, create, update};