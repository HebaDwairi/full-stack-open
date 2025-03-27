import { createSlice } from "@reduxjs/toolkit"


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

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;