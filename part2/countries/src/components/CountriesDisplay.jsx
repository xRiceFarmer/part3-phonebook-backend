const CountriesDisplay = ({ filteredCountries, showCountry}) => {
  if (filteredCountries.length < 11 && filteredCountries.length !== 1) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <div key={country.id}>
            {country.name.common}
            <button onClick = {() => {
                showCountry(country.name.common)
            }}>show</button> 
            </div>
        ))}
      </ul>
    );
  }
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.entries(country.languages).map(
            ([languageCode, languageName]) => (
              <li key={languageCode}>{languageName}</li>
            )
          )}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
    );
  }
};
export default CountriesDisplay;
