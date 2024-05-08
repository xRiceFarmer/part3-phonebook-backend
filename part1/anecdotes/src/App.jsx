import { useState } from 'react'
const Button =({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
function handleVote ({points, selected})  {
  const copy = [...points]
  copy[selected] +=1
  return copy
}
const MostVote = ({anecdotes, points}) => {
    const maxIndex = points.indexOf(Math.max(...points));
    return (
      <div>
          <p>{anecdotes[maxIndex]}</p>
          <p>has {points[maxIndex]} votes</p>
      </div>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));
   
  const [selected, setSelected] = useState(0)

  function randomize (max) {
    let x= Math.floor(Math.random() * max);
    return x 
}
  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>
      {anecdotes[selected]}
      </p>
      <p>
      <Button text = "vote" handleClick={()=> setPoints(handleVote({points, selected}))}/>
      <Button text="next anecdote" handleClick={()=> setSelected(randomize(anecdotes.length))}/>
      </p>
      <p>has {points[selected]} votes</p>
      <h1>Anecdote with the most vote</h1>
      <MostVote anecdotes={anecdotes} points ={points}/>
    </div>
  )
}

export default App