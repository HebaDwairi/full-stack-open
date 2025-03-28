import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll, update } from './requests';
import { useSetNotification } from './notificationContext';

const App = () => {

  const queryClient = useQueryClient();
  const setNotification = useSetNotification();

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
  });

  const votingMutation = useMutation({
    mutationFn: update,
    onSuccess: queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  });

  const handleVote = (anecdote) => {
    console.log('vote')
    votingMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    setNotification(`you voted "${anecdote.content}"`)
  }


  if(result.isError) {
    return <div>anecdote service not available due to an error: {result.error.message}</div>
  }

  if(result.isLoading) {
    return <div>loading...</div>
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
