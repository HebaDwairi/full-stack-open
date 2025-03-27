import { useEffect } from 'react';
import NewAnecdote from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdoteList';
import Filter from './components/Filter';
import anecdoteService from './services/anecdotes';
import { useDispatch } from 'react-redux';
import { setAnecdotes } from './reducers/anecdoteReducer';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService
      .getAll()
      .then(res => {
        dispatch(setAnecdotes(res));
      })
      .catch(err => {
        console.log('error fetching anecdotes', err);
      })
  });

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdotesList />
      <NewAnecdote />
    </div>
  )
}

export default App