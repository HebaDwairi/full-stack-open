const baseUrl = 'http://localhost:3001/anecdotes';
import axios from 'axios';

const getAll = async() => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const createNew = async (obj) => {
  const response = await axios.post(baseUrl, obj);
  return response.data;
}

export default {
  getAll,
  createNew
}