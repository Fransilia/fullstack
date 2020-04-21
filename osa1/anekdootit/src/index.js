import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Votes = (props) => {
  return (
    <div>
      <p>
        has {props.votes[props.selected]} votes
      </p>
    </div>

  )
}

const App = (props) => {

  const [selected, setSelected] =useState(Math.floor((Math.random() * 7) + 0))
  const [votes, setVotes] =useState(props.pisteLista)

  const nextA = () => {
    setSelected(Math.floor((Math.random() * 7) + 0))
  }

  const addPoint = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const isoin = (Math.max(...votes))
  const paikka = (votes.indexOf(isoin))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
    <div>
      <Votes votes={votes} selected = {selected}/>
    </div>     
      <div>    
        <Button
          handleClick={nextA}
          text='next'       
        />
        <Button
          text='vote'
          handleClick={addPoint}
          />
      </div> 

      <h1>Anecdote with most votes</h1>
      {props.anecdotes[paikka]}
      <p>
        has {isoin} votes
      </p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'I do not like computer science jokes... not one bit.'
]

const pisteLista = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0);
console.log(pisteLista)

ReactDOM.render(
  <App anecdotes={anecdotes} pisteLista={pisteLista}/>,
  
  document.getElementById('root')
)