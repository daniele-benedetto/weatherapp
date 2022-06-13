import React, { useState, useEffect } from 'react';
import { getWeatherServiceSearch } from '../service/weather.service';
import dateBuilder from '../utils/dateBuilder';
import timeBuilder from '../utils/timeBuilder';
import BackgroundColor from '../ui/BackgroundColor';
import WeatherContainer from '../ui/WeatherContainer';
import Time from '../ui/Time';
import { 
    BsCloudsFill, 
    BsFillCloudDrizzleFill,
    BsFillCloudLightningRainFill, 
    BsFillCloudRainHeavyFill, 
    BsFillCloudSnowFill, 
    BsFillSunFill, 
    BsSearch 
} from 'react-icons/bs';

const Weather = () => {

	const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('#3096F5');
    const [icon, setIcon] = useState(null);

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
        } else if(data.weather[0].main == 'Thunderstorm') {
            setColor('#004F63');
            setIcon(<BsFillCloudLightningRainFill />)
        } else if(data.weather[0].main == 'Drizzle') {
            setColor('#1858C2');
            setIcon(<BsFillCloudDrizzleFill />)
        } else if(data.weather[0].main == 'Rain') {
            setColor('#3A1EEA');
            setIcon(<BsFillCloudRainHeavyFill />)
        } else if(data.weather[0].main == 'Snow') {
            setColor('#AAB1FA');
            setIcon(<BsFillCloudSnowFill />)
        } else {
            setColor('#42519B');
            setIcon(<BsCloudsFill />)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(city != '') {
            setMessage('');
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
                <Time>{dateBuilder(new Date())} - {timeBuilder(new Date())}</Time>
                {
                    weather && <>
                        {icon}
                        <h1>{Math.round(weather.main.temp)}°</h1>
                        <h2>{weather.name}</h2>
                        {
                            weather.weather && weather.weather.length > 0 && weather.weather.map((item,idx) => {
                                return <>
                                    <h3>{item.description}</h3>
                                </>
                            })
                        }
                        <p>Temp min: {weather.main.temp_min}° - Temp Max: {weather.main.temp_max}°<br/>
                        Umidità: {weather.main.humidity}° - Pressione: {weather.main.pressure}°</p>
                    </>
                }
                <form onSubmit={handleSubmit}>
                    <div>
                        <input placeholder='Cerca' type='text' value={city} onChange={handleChange} />
                        <button><BsSearch/></button>
                    </div>
                </form>
            </WeatherContainer>
            <BackgroundColor style={{backgroundColor: `${color}`}} />
		</>
    );
}

export default Weather;
