import NewAnecdote from './components/newAnecdote';
import AnecdotesList from './components/AnecdotesList';

const App = () => {
  return (
    <div>
      <AnecdotesList />
      <NewAnecdote />
    </div>
  )
}

export default App