import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

 const NewAnecdote = () => {

  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.inp.value;
    dispatch(createAnecdote(content));
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