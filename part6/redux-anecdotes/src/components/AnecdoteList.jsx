import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import Notification from './Notification';
import { setVoteNotification, removeNotification } from "../reducers/notificationReducer";
import store from "../reducers/store";

const AnecdotesList = () => {

  const dispatch = useDispatch();
  const anecdotes = useSelector(({anecdotes, filter}) => 
    anecdotes.filter(elem => elem.content.toLowerCase().includes(filter.toLowerCase()))
  );

  const handleVote = (id, content) => {
    dispatch(vote(id));
    dispatch(setVoteNotification(content));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
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
            <button onClick={() => {handleVote(anecdote.id, anecdote.content)}}>vote</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AnecdotesList;