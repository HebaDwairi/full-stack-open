import { createSlice } from "@reduxjs/toolkit"
import anecodtesService from '../services/anecdotes';

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
    const anecdotes = await anecodtesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecodtesService.createNew({
      content,
      votes:0,
    });
    dispatch(createAnecdote(newAnecdote));
  }
}

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;