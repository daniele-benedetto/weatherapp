import React, { useState, useEffect } from 'react';
import { getWeatherServiceSearch } from '../service/weather.service';
import styled from 'styled-components';
import dateBuilder from '../utils/dateBuilder';
import timeBuilder from '../utils/timeBuilder';
import { BsCloudsFill, BsFillSunFill, BsSearch } from 'react-icons/bs';

const Weather = () => {

	const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('#3096F5');
    const [icon, setIcon] = useState(null);
    const [form, setForm] = useState('opacity-0');

	useEffect(() => {
		getWeather();
        getLayout();
	}, []);

	const getWeather = async () => {
        const lang = "it"
        const metric = "metric"

		const data = await getWeatherServiceSearch(city, lang, metric);

		setWeather(data);
	}

    const getLayout = async () => {
        const data = await getWeatherServiceSearch(city);

        if(data.weather[0].main == 'Clear') {
            setColor('#F6AF42');
            setIcon(<BsFillSunFill />)
        } else if(data.weather[0].main == 'Clouds') {
            setColor('#42519B');
            setIcon(<BsCloudsFill />)
        }
    }

    const revealForm = () => {
        setForm('opacity-1');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(city != '') {
            setMessage('');
            setForm('opacity-0');
            getWeather();
            getLayout();
        } else {
            setMessage('Inserisci il nome di una città');
        }
        setCity('');
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setCity(value)
    }

    return (   
        <>
            <WeatherContainer>
                {/* {JSON.stringify(weather)} */}
                {
                    weather && <>
                        {icon}
                        <h1>{Math.round(weather.main.temp)}°</h1>
                        <h2>{weather.name}</h2>
                        {
                            weather.weather && weather.weather.length > 0 && weather.weather.map((item,idx) => {
                                return <>
                                    <h3>{item.description}</h3>
                                    {/* <h3>{item.main}</h3> */}
                                </>
                            })
                        }
                        <p>Temp min: {weather.main.temp_min}° - Temp Max: {weather.main.temp_max}°<br/>
                        Umidità: {weather.main.humidity}° - Pressione: {weather.main.pressure}°</p>
                        <Time>{dateBuilder(new Date())} - {timeBuilder(new Date())}</Time>
                    </>
                }
                <form onSubmit={handleSubmit} className={form}>
                    <div>
                        <input placeholder='Cerca' type='text' value={city} onChange={handleChange} />
                        <Button>Cerca</Button>
                    </div>
                </form>
            </WeatherContainer>
            <BackgroundColor style={{backgroundColor: `${color}`}} />
            <Search onClick={revealForm} ><BsSearch /></Search>
		</>
    );
}

const WeatherContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    color: white;
    h1 {
        margin-top: 20px;
        font-weight: bold;
        font-size: 80px;
        margin-left: 40px;
    }
    h2 {
        font-weight: bold;
        font-size: 48px;
    }
    h3 {
        font-weight: bold;
        font-size: 32px;
    }
    p{
        text-align: center;
    }
    svg {
        fill: white;
        width: 120px;
        height: 120px;
    }
    form {
        width: 100%;
        position: absolute;
        top: 0%;
        left: 0%;
        background-color: rgba(0, 0, 0, 0.5);
        height: 100%;
        display:flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        div {
            width: 100%;
            max-width: 400px;
            input {
                width: 100%;
                height: 60px;
                border: none;
                border-radius: 20px;
                padding: 20px;
                font-size: 20px;
                box-shadow: 0 5px 20px rgba(0,0,0,.1);
            }
        }
    }
`;

const BackgroundColor = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
`;

const Time = styled.div`
    font-weight: 700;
    font-size: 24px;
    margin: 40px 0 20px 0;
    color: white;
`;

const Button = styled.button`
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border: none;
    border-radius: 10px;
    margin: 20px auto;
    display: block;
    box-shadow: 0 5px 20px rgba(0,0,0,.1);
    font-weight: bold;
    font-size 16px;
`;

const Search = styled.a`
    position: absolute;
    bottom: 20px;
    left: 50%;
    width: 30px;
    height: 30px;
    svg {
        width: 100%;
        height: 100%;
        fill: white;
        transform: translateX(-50%);
    }
`;

export default Weather;
