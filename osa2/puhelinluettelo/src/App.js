import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const FilterNames = (props) => { 
  return (
  <div>
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

const Persons = ({filteredPersons, removePerson}) => {
  
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
      {filteredPersons.map((person, i) =>
        <li key={i} >
          {person.name} {person.number}
          <button onClick={(e)=>removePerson(i)}>delete</button>
        </li>
        )}
      </ul>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="info">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>

  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const [filterString, setFilterString] = useState('')
  const [infoMessage, setinfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const removePerson = (i) => {
    console.log('person that needs to be removed ' + i)
    const personid = persons[i].id
    const name = persons[i].name
    if (window.confirm('Do you want to delete '+ name + '?')) {
      personService.remove(personid)
        .then(response => {
          const personsLeft = persons.filter(p => p.id !== personid)
          setPersons(personsLeft)
        })
        setinfoMessage(
          name + ' has been removed'
        )
        setTimeout(() => {
          setinfoMessage(null)
        }, 4000)
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const existing = persons.findIndex(person => person.name === newName)
    if (existing === -1) { 
      const nameObject = {
        name: newName ,
        number: newNumber
      }

      personService
        .create(nameObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setinfoMessage(
          newName + ' has been added'
        )
        setTimeout(() => {
          setinfoMessage(null)
        }, 4000) 
        }) 
          
    } else {
      if (window.confirm(newName + ' is already in the phonebook, replace old number with a new one?')) {
         const nameObject = {
           name: newName,
           number: newNumber
         } 

        const existingid = persons[existing].id
        personService
          .update(existingid,nameObject)
          .then(response => {
            console.log(response)
            persons[existing].number = newNumber
            setPersons(persons)
            setNewNumber('')
            setNewNumber('')
            setinfoMessage(
              newName + ' has been updated'
            )
            setTimeout(() => {
              setinfoMessage(null)
            }, 4000)
          })
          .catch(error => {
            console.log('fail:' , error)
            setErrorMessage (
              'Information of ' + newName + ' has alredy been removed from server'
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 4000)
          }) 
          
        } 
        
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
      <h1>Phonebook</h1>
      <Notification message={infoMessage} />
      <ErrorNotification message={errorMessage} />
      <FilterNames
      filterString = {filterString}
      handleFilterChange = {handleFilterChange}/>
      <PersonForm addName={addName}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
      <Persons 
      filteredPersons={filteredPersons}
      removePerson={removePerson}
      />
    </div>
  )
}

export default App
