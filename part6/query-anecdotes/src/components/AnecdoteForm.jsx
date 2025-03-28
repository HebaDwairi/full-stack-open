import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNew } from "../requests";
import { useSetNotification } from "../notificationContext";

const AnecdoteForm = () => {

  const queryClient = useQueryClient();
  const setNotification = useSetNotification();

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: queryClient.invalidateQueries({queryKey: ['anecdotes']}),
    onError: (error) => {
      setNotification(error.response.data.error);
    }
  });

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({
      content,
      votes: 0,
    });

    setNotification(`new anecdote added "${content}"`)
    
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
