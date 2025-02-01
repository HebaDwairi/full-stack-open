import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const apikey = import.meta.env.VITE_WEATHER_API_KEY;

const Country = ({data}) =>{
  const [weather, setWeather] = useState(null);

  useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${data.capital[0]}&appid=${apikey}&units=metric`)
        .then(res => {
          setWeather(res.data);
        });
  }, []);

  return(
    <>
      {!weather ? <p>Loading data...</p>:
      <div>
        <h2>{data.name.common}</h2>
        <p>Capital: {data.capital[0]}</p>
        <p>Area: {data.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.keys(data.languages).map(key => (
            <li key={key}>{data.languages[key]}</li>
          ))}
        </ul>
        <img src={data.flags.png} />
        <h3>Weather in {data.capital[0]}</h3>
        <p>Temperature: {weather.main.temp} celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>Weather: {weather.weather[0].description}</p>
        <p>Wind: {weather.wind.speed} m/s</p>
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
        setCountries(res.data);
      })
      .catch((err) => console.log(err))
  }, []);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    const filteredList = countries.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    setMatches(filteredList);
  }

  const showCountry = (country) => {
    setMatches([country]);
    setQuery('');
  }

  

  return(
    <>
      <h2>Find countries</h2>
      <input type="text" onChange={handleQueryChange} value={query}/>

      {matches.length === 1 ? <Country data={matches[0]}/> : 
        matches.length > 10 ? <p>Too many matches, specify another filter</p>:
        <ul className='countries'>
          {matches.map((country) => (
            <li key={country.name.common} className='countryName'>{country.name.common} 
            <button onClick={() => showCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      }
    </>
  );
}

export default App;