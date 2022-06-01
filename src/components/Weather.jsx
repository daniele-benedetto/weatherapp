import React, { useState, useEffect } from 'react';
import { getWeatherServiceSearch } from '../service/weather.service';
import styled from 'styled-components';

const linkImage = "https://openweathermap.org/img/w/"
const extImage = "png"

const Weather = () => {

	const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [message, setMessage] = useState('')

	useEffect(() => {
		getWeather();
	}, []);

	const getWeather = async () => {
        const lang = "it"
        const metric = "metric"

		const data = await getWeatherServiceSearch(city, lang, metric);
		setWeather(data);
	}

    const handleSubmit = (e) => {
        e.preventDefault();
        if(city != '') {
            setMessage('')
            getWeather();
        } else {
            setMessage('Inserisci il nome di una città')
        }
        setCity('');
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setCity(value)
    }

    const getImage = (img) => {
        return `${linkImage}${img}.${extImage}`
    }

    return (        
        <>
            <WeatherContainer>
                <form onSubmit={handleSubmit}>
                    <h3>
                        Che tempo fa a <input type='text' value={city} onChange={handleChange} />?
                    </h3>
                </form>
                <div>{message}</div>
                {/* {JSON.stringify(weather)} */}
                {
                    weather && <>
                            <h1>{weather.name}</h1>
                            {
                                weather.weather && weather.weather.length > 0 && weather.weather.map((item,idx) => {
                                    return <>
                                        <img src={getImage(item.icon)} alt="" />
                                        <h2>{item.description}</h2>
                                    </>
                                })
                            }
                            <h3>Temperatura:  {weather.main.temp}°</h3>
                            <p>Temp min: {weather.main.temp_min}° - Temp Max: {weather.main.temp_max}°</p>
                    </>
                }
            </WeatherContainer>
		</>
    );
}

const WeatherContainer = styled.div`
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    box-shadow: 0 5px 20px rgba(0,0,0,.05);
    img{widht: 100%;}
`;

export default Weather;
