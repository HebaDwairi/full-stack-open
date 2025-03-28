import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = async() => {
  const res = await axios.get(baseUrl);
  return res.data;
}

export const createNew = async(anecdote) => {
  const res = await axios.post(baseUrl, anecdote);
  return res.data;
}

export const update = async (updatedAnecdote) => {
  const res = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote);
  return res.data;
}