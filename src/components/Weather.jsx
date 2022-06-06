import React, { useState, useEffect } from 'react';
import { getWeatherServiceSearch } from '../service/weather.service';
import styled from 'styled-components';
import dateBuilder from '../utils/dateBuilder';

const linkIcon = "https://openweathermap.org/img/w/";
const extIcon = "png";

const linkImage = "https://source.unsplash.com/600x900/?";

const Weather = () => {

	const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [message, setMessage] = useState('');


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
            setMessage('');
            getWeather();
        } else if (city == '') {
            setMessage('Inserisci il nome di una città')
        } else {
            
        }
        setCity('');
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setCity(value)
    }

    const getIcon = (icon) => {
        return `${linkIcon}${icon}.${extIcon}`
    }

    const getImage = (img) => {
        return `${linkImage}${img}`;
    }

    return (        
        <>
            <WeatherContainer>
                <Message>{message}</Message>
                <Time>{dateBuilder(new Date())}</Time>
                <form onSubmit={handleSubmit}>
                    <input placeholder='Cerca' type='text' value={city} onChange={handleChange} />
                    <Button>Cerca</Button>
                </form>
                {/* {JSON.stringify(weather)} */}
                {
                    weather && <>
                        <h1>{weather.name}</h1>
                        {
                            weather.weather && weather.weather.length > 0 && weather.weather.map((item,idx) => {
                                return <>
                                    <img src={getIcon(item.icon)} alt="" />
                                    <h2>{item.description}</h2>
                                </>
                            })
                        }
                        <h3>Temperatura:  {weather.main.temp}°</h3>
                        <p>Temp min: {weather.main.temp_min}° - Temp Max: {weather.main.temp_max}°</p>
                    </>
                }
            </WeatherContainer>
            {
                weather && <ImageBackground style={{backgroundImage: `url(${getImage(weather.weather[0].main)})`}} />
            }
                        {
                !weather && <ImageBackground style={{backgroundImage: `url(${getImage('weather')})`}} />
            }
		</>
    );
}

const WeatherContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    box-shadow: 0 5px 20px rgba(0,0,0,.5);
    position: relative;
    background-color: rgba(255,255,255,0.5);
    width: 100%;
    max-width: 500px; 
    margin: 0 auto;
    img{
        widht: 100%;
    }
    h1 {
        margin-top: 20px;
    }
    form {
        width: 100%;
        input {
            width: 100%;
            height: 60px;
            border: none;
            border-radius: 20px;
            padding: 20px;
            font-size: 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,.1);
            opacity: 0.75;
        }
    }
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
    top: 30px; 
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
    margin: 40px 0 20px 0;
`;

const Button = styled.button`
    width: 100%;
    max-width: 300px;
    background-color: azure;
    padding: 10px;
    border: none;
    border-radius: 10px;
    margin: 20px auto;
    display: block;
    box-shadow: 0 5px 20px rgba(0,0,0,.1);
    font-weight: bold;
    font-size 16px;
`;

export default Weather;
