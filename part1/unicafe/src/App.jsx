import { useState } from 'react'

const Statistics = ({good, bad, neutral, total}) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {(good - bad) / total}</p>
      <p>positive {good / total * 100} %</p>
    </div>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleClick = (update, val) => {
    update(val + 1);
    setTotal(total + 1);
  }

  return(
    <div>
      <h1>give feedback</h1>

      <button onClick={() => handleClick(setGood, good)}>good</button>
      <button onClick={() => handleClick(setNeutral, neutral)}>neutral</button>
      <button onClick={() => handleClick(setBad, bad)}>bad</button>

      <h1>statistics</h1>

      {total ? <Statistics good = {good} bad = {bad} neutral={neutral} total={total}/> : <div>No feedback given</div>}
    </div>
  );
}

export default App
