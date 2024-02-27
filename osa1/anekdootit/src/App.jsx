import { useState } from 'react'

const generateRandomNumber = (max) => {
    const number = Math.floor(Math.random() * max)
    console.log(number)
    return number
}

const vote = (selected, votes) => {
    const copy = { ...votes }
    copy[selected] += 1
    return copy
}

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
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
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    return (
        <div>
            {anecdotes[selected]}
            <p>has {votes[selected]} votes</p>
            <div>
                <Button handleClick={() => setSelected(generateRandomNumber(anecdotes.length))} text="next anecdote" />
                <Button handleClick={() => setVotes(vote(selected, votes))} text="vote" />
            </div>
        </div>
    )
}

export default App