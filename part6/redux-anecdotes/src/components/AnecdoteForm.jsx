import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

 const NewAnecdote = () => {

  const dispatch = useDispatch();

  const handleNewAnecdote = async(e) => {
    e.preventDefault();
    const content = e.target.inp.value;

    dispatch(addAnecdote(content));

    e.target.inp.value = '';
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div><input name="inp"/></div>
        <button type='submit'>create</button>
      </form>
    </>
  );
}

export default NewAnecdote;