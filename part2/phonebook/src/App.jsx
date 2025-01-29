import { useEffect, useState } from 'react';
import axios from 'axios';
import personsService from './services/persons';

const Filter = ({setFilterWord, filterWord}) =>{
  return(
    <div>
      filter by name: <input type="text" onChange={(event) => setFilterWord(event.target.value) } value={filterWord}/>
    </div>
  );
}

const PersonForm = ({newName, newNumber, setNewName, setNewNumber, addPerson}) => {
  return(
    <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={event => setNewName(event.target.value)} /></div>
        <div>number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)} /></div>
        <div><button type="submit">add</button></div>
    </form>
  );
}

const Person = ({person, handleDeletion}) => {
  return (
      <li>
        {person.name} {person.number}
        <button onClick={handleDeletion}>delete</button>
      </li>
  );
}

const Persons = ({persons, filterWord, setPersons}) => {
  const handleDeletion = (id, name) => {
    if(confirm(`do you want to delete ${name}?`)){
      personsService
        .deletePerson(id)
        .then(() => { 
          console.log(name + ' was deleted');
          setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
        });
    }
  }
  return(
    <ul>
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

  useEffect(() => {
    personsService
      .getAll()
      .then(initial => {
        console.log(initial);
        setPersons(initial);
      })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to the phonebook`);
    }
    else{
      personsService
        .create(newPerson)
        .then(returnedObj => {
          setPersons(persons.concat(returnedObj));
          setNewName('');
          setNewNumber('');
        });
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilterWord={setFilterWord} filterWord={filterWord} />
      <h2>add a new person</h2>
      <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterWord={filterWord} setPersons={setPersons}/>
    </div>
  )
}

export default App