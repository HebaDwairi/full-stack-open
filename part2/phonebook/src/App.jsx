/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import personsService from './services/persons';
import './style.css';

const Filter = ({setFilterWord, filterWord}) =>{
  return(
    <div className='container'>
      filter by name: <input type="text" onChange={(event) => setFilterWord(event.target.value) } value={filterWord}/>
    </div>
  );
}

const Message = ({message}) => {
  if(message.content === null) return null;

  return(
    <div className={message.error ? 'errorMsg' : 'msg'}>
      {message.content}
    </div>
  );
}

const PersonForm = ({newName, newNumber, setNewName, setNewNumber, addPerson}) => {
  return(
    <form onSubmit={addPerson} className='container'>
        <div className='formInp'>name: <input value={newName} onChange={event => setNewName(event.target.value)} /></div>
        <div className='formInp'>number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)} /></div>
        <div><button type="submit" style={{width:'100%'}}>add</button></div>
    </form>
  );
}

const Person = ({person, handleDeletion}) => {
  return (
      <li>
        <b id='name'>{person.name}</b>  <span id='number'>{person.number}</span>
        <button onClick={handleDeletion} className='deleteBtn'>delete</button>
      </li>
  );
}

const Persons = ({persons, filterWord, setPersons, setMessage}) => {
  const handleDeletion = (id, name) => {
    if(confirm(`do you want to delete ${name}?`)){
      personsService
        .deletePerson(id)
        .then(() => { 
          setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
          setMessage({
            error: false,
            content: `deleted ${name}`
          });
          setTimeout(() => {
            setMessage({error: false, content: null});
          }, 5000);
        });
    }
  }
  return(
    <ul className='container'>
      {
      persons.filter((person) => person.name.toLowerCase().includes(filterWord.toLowerCase())).
      map((person) => 
        <Person key={person.id} person={person} handleDeletion={() => handleDeletion(person.id, person.name)}/>
      )
      }
    </ul>
  );
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('');
  const [message, setMessage] = useState({error: false, content: null});

  useEffect(() => {
    personsService
      .getAll()
      .then(initial => {
        setPersons(initial);
      })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(person => person.name === newName);

    if(existingPerson){
      if(confirm(`${newName} is already added to the phonebook, replace the number with the new one?`)){
        personsService
          .update(existingPerson.id, {...existingPerson, number : newNumber})
          .then((updatedPerson) => {
            console.log(newName + ' updated successfully');
            setPersons(persons.map(person => person.id === existingPerson.id ? updatedPerson : person));
            setMessage({
              error: false,
              content: `updated ${newName}'s number`
            });
            setTimeout(() => {
              setMessage({error: false, content: null});
            }, 5000);
          })
          .catch(err => {
            console.log(err);
            setMessage({
              error: true,
              content: `${newName}'s data has already been removed from the server`
            });
            setTimeout(() => {
              setMessage({error: false, content: null});
            }, 5000);
          });
      }
    }
    else{
      personsService
        .create(newPerson)
        .then(returnedObj => {
          setPersons(persons.concat(returnedObj));
          setMessage({
            error: false,
            content: `${newName} was added successfully.`
          });
          setTimeout(() => {
            setMessage({error: false, content: null});
          }, 5000);
        })
        .catch(err => {
          setMessage({
            error: true,
            content: err.response.data.error
          });
          setTimeout(() => {
            setMessage({error: false, content: null});
          }, 5000);
        })
    }
    setNewName('');
    setNewNumber('');
  }
  return (
    <div className='main'>
      <div className='left'>
        <h2>Phonebook</h2>
        <Filter setFilterWord={setFilterWord} filterWord={filterWord} />
        <h2>Add a new person</h2>
        <Message message={message}/>
        <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} addPerson={addPerson}/>
      </div>
      <div className='right'>
        <h2>Numbers</h2>
        <Persons persons={persons} filterWord={filterWord} setPersons={setPersons} setMessage={setMessage}/>
      </div>
    </div>
  )
}

export default App