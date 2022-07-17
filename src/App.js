import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import ForecastWeather from './components/forecast-weather/forecast-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api'
import { useState } from 'react';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastWeather({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  }
  
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />} {/*ce imamo podatke za currentWeather prikazi stvar, da ne vrze napake*/}
      {forecastWeather && <ForecastWeather data={forecastWeather} />} {/*ce imamo podatke za forecastWeather prikazi stvar, da ne vrze napake*/}
    </div>
  );
}

export default App;
