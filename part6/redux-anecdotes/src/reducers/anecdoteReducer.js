import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    vote (state, action) {
      const id = action.payload;
      const elemToChange = state.find(elem => elem.id === id);
      const changedElem = {
        ...elemToChange,
        votes: elemToChange.votes + 1,
      }
      return state.map(elem => elem.id === id ? changedElem : elem).sort((a, b) => b.votes - a.votes);
    },
    createAnecdote (state, action) {
      state.push(action.payload);
    },
    setAnecdotes (state, action) {
      return action.payload;
    }
  }

});

export const intializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew({
      content,
      votes:0,
    });
    dispatch(createAnecdote(newAnecdote));
  }
}

export const incrementVotes = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    await anecdoteService.updateAnecdote(updatedAnecdote, anecdote.id);
    dispatch(vote(anecdote.id));
  }
}

export const { createAnecdote, vote, setAnecdotes} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;