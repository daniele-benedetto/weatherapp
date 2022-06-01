import React, { useState, useEffect } from 'react';
import { getWeatherServiceSearch } from '../service/weather.service';
import styled from 'styled-components';
import sunClouds from '../assets/images/sunClouds.jpg';

const linkImage = "https://openweathermap.org/img/w/"
const extImage = "png"

const Weather = () => {

	const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('Modena');
    const [message, setMessage] = useState(' ');

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

    const dateBuilder = (d) => {
        let months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
        let days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        
        return `${day} ${date} ${month} ${year}`
      }

    return (        
        <>
            <WeatherContainer>
                <Message>{message}</Message>
                <Time>{dateBuilder(new Date())}</Time>
                <form onSubmit={handleSubmit}>
                    <h3>
                        <input placeholder='Cerca' type='text' value={city} onChange={handleChange} />
                    </h3>
                </form>
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
            <ImageBackground style={{backgroundImage: `url(${sunClouds})`}} />
		</>
    );
}

const WeatherContainer = styled.div`
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    box-shadow: 0 5px 20px rgba(0,0,0,.5);
    position: relative;
    img{
        widht: 100%;
    }
    background-color: white;
    min-height: 420px;
`;

const ImageBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    &::before {
        content: ' ';
        opacity: 0.2;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -5; 
        background-color: black;
    }
`;

const Message = styled.div`
    position: absolute;
    top: 20px; 
    left: 0;
    width: 100%;
    text-align: center;
    background-color: red;
    color: white;
    font-weight: bold;
`;

const Time = styled.div`
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 20px;
`;

export default Weather;
