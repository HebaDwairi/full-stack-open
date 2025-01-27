import { useState } from 'react'

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

const Persons = ({persons, filterWord}) => {
  return(
    <ul>
      {
      persons.filter((person) => person.name.toLowerCase().includes(filterWord.toLowerCase())).
      map((person) => <li key={person.name}>{person.name} {person.number}</li>)
      }
    </ul>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to the phonebook`);
    }
    else{
      setPersons(persons.concat(newPerson));
    }
    setNewName('');
    setNewNumber('');
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilterWord={setFilterWord} filterWord={filterWord} />
      <h2>add a new person</h2>
      <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterWord={filterWord}/>
    </div>
  )
}

export default App