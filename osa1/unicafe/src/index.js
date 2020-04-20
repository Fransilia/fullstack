import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const Statistic = (props) => {
  console.log(props)
  if (props.allClicks.length === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>
        no feedback given
        </p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value = {props.all} />
      <StatisticLine text="average" value = {props.average} />
      <StatisticLine text="positive" value = {props.positive} />
    </div>
  )
}

const StatisticLine = ({text , value}) => {
  return (
  <table>
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  </table>  
  )
}


const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const allValues = good + bad + neutral 
  const [allClicks, setAll] = useState([])
  
  const addGood = () => {
    setGood(good + 1)
    setAll(allClicks.concat('L'))
  }
  const addNeutral = () => {
    setNeutral(neutral + 1)
    setAll(allClicks.concat('L'))

  }  
  const addBad = () => {
    setBad(bad + 1)
    setAll(allClicks.concat('L'))
  }
  const positiveValues = ((good/allValues)*100) + ' %'
  const average =((good + (bad * (-1)))/allValues)
  

  return (
    <div>
      <h1>Give feedback</h1>
      <Button
        handleClick={addGood}
        text='good'       
      />
      <Button
        handleClick={addNeutral}
        text='neutral'
      />
      <Button
        handleClick={addBad}
        text='bad'
      />
      
      <Statistic allClicks = {allClicks} 
      good = {good} neutral = {neutral} bad = {bad} 
      all = {allValues} average = {average} positive = {positiveValues}/>

    </div>

  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
