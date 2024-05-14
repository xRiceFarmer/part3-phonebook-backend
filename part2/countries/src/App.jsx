import { useState, useEffect } from 'react'
import axios from 'axios'
import countrydb from './services/countries'
import Filter from './components/Filter';
import CountriesDisplay from './components/CountriesDisplay';
const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  /**useEffect(()=>{
    countrydb
      .getAll()
      .then((initialData) => {
        setCountries(initialData);
        console.log('retrieved countries data')
      })
      .catch(error => 
        console.log('fail'))
  },[]) **/
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
  const showCountry = (name) => {
    setSearchQuery(name)
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
      <CountriesDisplay filteredCountries={filteredCountries} showCountry={showCountry}/>

    </div>
  )
}

export default App
