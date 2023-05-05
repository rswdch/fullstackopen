import { useState } from 'react'
import './App.css'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good+1)}>good</button>
      <button onClick={() => setNeutral(neutral+1)}>neutral</button>
      <button onClick={() => setBad(bad+1)}>bad</button>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

function Statistics({good, neutral, bad}){
  const all = good + neutral + bad;
  if (all === 0){
    return (<div>no feedback given</div>)
  }
  const average = all/3;
  const positive = good/all * 100;
  return (
    <table>
      {/* <thead><tr><th>statistics</th></tr></thead> */}
      <tbody>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={ bad}/>
      <StatisticLine text='all' value={all}/>
      <StatisticLine text='average' value={Math.round(average*100)/100}/>
      <StatisticLine text='positive' value={Math.round(positive)+" %"}/>
    </tbody></table>
  )
}

function StatisticLine({text, value}){
  return(
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

export default App
