import { useState } from 'react'

const Button =({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const StatisticLine = ({text, value}) => {

return(
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)
}
const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total || 0; // To avoid NaN if total is 0
  const positivePercentage = (good / total) * 100 || 0; // To avoid NaN if total is 0

  return (
    <table>
      <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average.toFixed(2)} />
      <StatisticLine text="positive" value={positivePercentage.toFixed(2)} />
      </tbody>
      
    </table>
  );
}
const History = ({allClicks, good, bad, neutral }) => {
  if (allClicks === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      <Statistics good={good} neutral={neutral} bad={bad}  />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() =>setGood(good+1)} text="good" />
      <Button handleClick={() =>setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() =>setBad(bad+1)} text="bad" />
      <h1>statistics</h1>
      <History allClicks={good+bad+neutral} good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App