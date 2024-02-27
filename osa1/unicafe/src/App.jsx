import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const StatisticLine = (props) => {
    return (
        <div>
            <p>{props.text} {props.value}</p>
        </div>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    const average = (-bad + good) / all
    const positive = good / all * 100

    if (all === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={all} />
            <StatisticLine text='average' value={average} />
            <StatisticLine text='positive' value={positive + ' %'} />
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => {
        setGood(good + 1)
    }

    const handleNeutral = () => {
        setNeutral(neutral + 1)
    }

    const handleBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={handleGood} text='good' />
            <Button handleClick={handleNeutral} text='neutral' />
            <Button handleClick={handleBad} text='bad' />

            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App