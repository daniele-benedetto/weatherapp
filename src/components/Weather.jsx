import React, { useState, useEffect } from 'react';
import { getWeatherServiceSearch } from '../service/weather.service';

const Weather = () => {

	const [weather, setWeather] = useState([]);
    const [city, setCity] = useState('Palermo');

	useEffect(() => {
		getWeather();
	}, []);

	const getWeather = async () => {
		const data = await getWeatherServiceSearch(city, 'it', 'metric');
		setWeather(data);
	}

    const handleSubmit = (e) => {
        e.preventDefault();
        getWeather();
    }

    return (        
        <>
            <form onSubmit={handleSubmit}>
                <input type='text' value={city} onChange={(e) => {setCity(e.target.value)}} />
            </form>
            {JSON.stringify(weather)}
            <h1>{weather.name}</h1>
            <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="" />
            <h2>{weather.weather[0].description}</h2>
		</>
    );
}

export default Weather;
