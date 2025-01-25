import { useState } from 'react'

const StatisticLine = ({text, value}) => (
    <p>{text} : {value}</p>
);

const Statistics = ({good, bad, neutral, total}) => {
  return (
    <div>
      <StatisticLine text = {'good'} value={good}/>
      <StatisticLine text = {'neutral'} value = {neutral}/>
      <StatisticLine text = {'bad'} value = {bad}/>
      <StatisticLine text = {'all'} value={total}/>
      <StatisticLine text={'average'} value = {(good - bad) / total} />
      <StatisticLine text={'positive'} value={good / total * 100} />
    </div>
  );
}

const Button = ({text, onClick}) => (
    <button onClick={onClick}>{text}</button>
);

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

      <Button onClick={() => handleClick(setGood, good)} text={'good'}/>
      <Button onClick={() => handleClick(setNeutral, neutral)} text={'neutral'}/>
      <Button onClick={() => handleClick(setBad, bad)} text={'bad'}/>

      <h1>statistics</h1>

      {total ? <Statistics good = {good} bad = {bad} neutral={neutral} total={total}/> : <div>No feedback given</div>}
    </div>
  );
}

export default App
