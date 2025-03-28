import { useEffect } from 'react';
import NewAnecdote from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdoteList';
import Filter from './components/Filter';
import { useDispatch } from 'react-redux';
import { intializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(intializeAnecdotes());
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