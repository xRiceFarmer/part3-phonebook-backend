import { useEffect } from "react";

const CountriesDisplay = ({
  filteredCountries,
  showCountry,
  weather,
  getWeather,
}) => {
  useEffect(() => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      showCountry(country.name.common, false);
    }
  }, [filteredCountries, showCountry]);

  if (filteredCountries.length < 11 && filteredCountries.length !== 1) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <div key={country.id}>
            {country.name.common}
            <button
              onClick={() => {
                showCountry(country.name.common, true);
              }}
            >
              show
            </button>
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
        {weather && (
          <div>
            <h2>Weather in {weather.name}</h2>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            <img 
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt={weather.weather[0].description}
            />
          </div>
        )}
      </div>
    );
  }
};
export default CountriesDisplay;
