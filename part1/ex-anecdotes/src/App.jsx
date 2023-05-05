import { useState, useRef } from 'react'
import './App.css'

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // HOOKS
  const [selected, setSelected] = useState(Math.floor(Math.random()*anecdotes.length));
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const maxVote = useRef(0);
  
  // CALLBACKS
  const setNextQuote = () => {
    const nextIndex = Math.floor(Math.random() * anecdotes.length) ;
    console.log(nextIndex)
    setSelected(nextIndex);
  }

  const findMax = (arr) => {
    let max = arr[0];
    let maxIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
  }

  const castVote = () => {
    const newVotes = [...votes];
    newVotes[selected] = newVotes[selected]+1;
    maxVote.current = findMax(newVotes);
    setVotes(newVotes);
    console.log(newVotes);
  }

  // RETURN COMPONENTS
  return (
    <>
      <ShowQuote heading="Anecdote of the day" 
        anecdotes={anecdotes} index={selected} votes={votes[selected]} />
      <br/>
      <Button onClick={castVote} text="vote" />
      <Button onClick={setNextQuote} text="next anecdote" />
      <ShowQuote heading="Most popular" 
        anecdotes={anecdotes} index={maxVote.current} votes={votes[maxVote.current]} />
    </>
  )
}

function ShowQuote({anecdotes, index, votes, heading}){
  return (
    <>
      <h2>{heading}</h2>
    <div className="quote">"{anecdotes[index]}"</div>
      <br></br>
    <div>has {votes} votes</div>
    </>
  )
}

function Button({onClick, text}){
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}


export default App
