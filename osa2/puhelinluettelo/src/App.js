import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FilterNames = (props) => { 
  return (
  <div>
  <h1>Phonebook</h1>
  <p>filter shown with
  <input value={props.filterString}
  onChange={props.handleFilterChange}
  />
  </p>
  </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <h2>Add a new</h2>
      <form onSubmit={props.addName}>
      name: <input 
      value={props.newName}
      onChange={props.handleNameChange} 
      />
    <div>
    number: <input
    value={props.newNumber}
    onChange={props.handleNumberChange}
    />
    </div>
      <div>
        <button type="submit">add</button>
      </div>
      </form>
  </div>
  )
}

const Persons = ({filteredPersons}) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
      {filteredPersons.map((person, i) =>
        <li key={i} >
          {person.name} {person.number}
        </li>
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const [filterString, setFilterString] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const existing = persons.findIndex(person => person.name === newName)
    if (existing === -1) { 
      const nameObject = {
        name: newName ,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(newName + ' is already in the phonebook')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }

  const filteredPersons = persons.filter(person => {
    if(filterString) {
      return person.name.includes(filterString) 
    }
    return true
  })
  console.log(persons)

  return (  
    <div>
      <FilterNames
      filterString = {filterString}
      handleFilterChange = {handleFilterChange}/>
      <PersonForm addName={addName}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App
