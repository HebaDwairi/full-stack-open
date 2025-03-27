import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from '../services/anecdotes';

 const NewAnecdote = () => {

  const dispatch = useDispatch();

  const addAnecdote = async(e) => {
    e.preventDefault();
    const content = e.target.inp.value;

    const newAnecdote = await anecdoteService.createNew({
      content,
      votes: 0,
    });
    dispatch(createAnecdote(newAnecdote));

    e.target.inp.value = '';
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="inp"/></div>
        <button type='submit'>create</button>
      </form>
    </>
  );
}

export default NewAnecdote;