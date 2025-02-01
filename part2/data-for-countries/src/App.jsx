import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const Country = ({name}) =>{
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((res) => {
        setData(res.data);
        console.log(data.languages)
      })
      .catch(err => {});
  }, []);
  return(
    <>
      {!data ? null:
      <div>
        <h2>{name}</h2>
        <p>Capital: {data.capital[0]}</p>
        <p>Area: {data.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.keys(data.languages).map(key => (
            <li key={key}>{data.languages[key]}</li>
          ))}
        </ul>
        <img src={data.flags.png} />
      </div>
      }
    </>
  );
}


const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((res) => {
        let all = [];
        res.data.forEach(elem => {
          all.push(elem.name.common);  
        });
        setCountries(all);
      })
      .catch((err) => console.log(err))
  }, []);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);

    const filteredList = countries.filter((country) => country.toLowerCase().includes(e.target.value.toLowerCase()));
    setMatches(filteredList);
  }

  const showCountry = (name) => {
    setMatches([name]);
    setQuery('');
  }

  return(
    <>
      <h2>Find countries</h2>
      <input type="text" onChange={handleQueryChange} value={query}/>

      {matches.length === 1 ? <Country name={matches[0]}/> : 
        matches.length > 10 ? <p>Too many matches, specify another filter</p>:
        <ul className='countries'>
          {matches.map((country) => (
            <li key={country} className='countryName'>{country} 
            <button onClick={() => showCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      }
    </>
  );
}

export default App;