import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const AnecdotesList = () => {

  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state);
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AnecdotesList;