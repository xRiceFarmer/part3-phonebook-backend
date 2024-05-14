import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import CountriesDisplay from './components/CountriesDisplay';

const api = {
  key: import.meta.env.VITE_SOME_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}
const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    async function getCountries() {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    }
  
    getCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry && selectedCountry.capital) {
      getWeather(selectedCountry.capital[0]);
    }
  }, [selectedCountry]);

  const getWeather = async (capital) => {
    try {
      const response = await axios.get(
        `${api.base}weather?q=${capital}&appid=${api.key}&units=metric`
      );
      setWeather(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('error fetching weather: ',error)
      setWeather(null)
    }
  }

  const showCountry = (name, isMatch) => {
    const selected = countries.find(country => country.name.common === name)
    setSelectedCountry(selected);
    if (isMatch) {
      setSearchQuery(name)
    }
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearchQuery(event.target.value);
  }
  const filteredCountries = searchQuery
  ? countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];

  return (
    <div>
      <Filter
        key={searchQuery.id}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      <CountriesDisplay filteredCountries={filteredCountries} showCountry={showCountry} weather={weather} getWeather = {getWeather}/>

    </div>
  )
}

export default App
