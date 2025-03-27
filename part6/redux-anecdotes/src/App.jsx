import NewAnecdote from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdoteList';
import Filter from './components/Filter';

const App = () => {
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