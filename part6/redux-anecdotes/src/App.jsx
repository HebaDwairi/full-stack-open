import NewAnecdote from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdotesList />
      <NewAnecdote />
    </div>
  )
}

export default App