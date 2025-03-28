import { useDispatch, useSelector } from "react-redux";
import { incrementVotes } from "../reducers/anecdoteReducer";
import Notification from './Notification';
import { setNotification } from "../reducers/notificationReducer";
import store from "../reducers/store";

const AnecdotesList = () => {

  const dispatch = useDispatch();
  const anecdotes = useSelector(({anecdotes, filter}) => 
    anecdotes.filter(elem => elem.content.toLowerCase().includes(filter.toLowerCase()))
  );

  const handleVote = (anecdote) => {
    dispatch(incrementVotes(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  }

  return (
    <>
      {store.getState().notification && <Notification />}
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {handleVote(anecdote)}}>vote</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AnecdotesList;