import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const AnecdotesList = () => {

  const dispatch = useDispatch();
  const anecdotes = useSelector(({anecdotes, filter}) => 
    anecdotes.filter(elem => elem.content.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <>
      {anecdotes.map(anecdote =>
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