import React, { useState, useEffect } from 'react';

import { getWeatherServiceSearch, getMultiWeatherServiceSearch } from '../service/weather.service';

import dateBuilder from '../utils/dateBuilder';
import timeBuilder from '../utils/timeBuilder';

import BackgroundColor from '../ui/BackgroundColor';
import WeatherContainer from '../ui/WeatherContainer';
import Time from '../ui/Time';

import SingleWeather from '../components/SingleWeather';
import MultiWeather from '../components/MultiWeather';

import { 
    BsCloudsFill, 
    BsFillCloudDrizzleFill,
    BsFillCloudLightningRainFill, 
    BsFillCloudRainHeavyFill, 
    BsFillCloudSnowFill, 
    BsFillSunFill, 
    BsSearch 
} from 'react-icons/bs';

const lang = "it";
const metric = "metric";

const Home = () => {

	const [weather, setWeather] = useState(null);
    const [multiWeather, setMultiWeather] = useState(null);
    const [city, setCity] = useState('');
    const [color, setColor] = useState('#3096F5');
    const [icon, setIcon] = useState(null);

	useEffect(() => {
		getWeather();
        getMultiWeather();
        getLayout();
	});

	const getWeather = async () => {
		const data = await getWeatherServiceSearch(city, lang, metric);
		setWeather(data);
	}

    const getMultiWeather = async () => {
		const data = await getMultiWeatherServiceSearch(city, lang, metric);
		setMultiWeather(data);
	}

    const getLayout = async () => {
        const data = await getWeatherServiceSearch(city);

        if(data.weather[0].main === 'Clear') {
            setColor('#F6AF42');
            setIcon(<BsFillSunFill />);
        } else if(data.weather[0].main === 'Clouds') {
            setColor('#42519B');
            setIcon(<BsCloudsFill />);
        } else if(data.weather[0].main === 'Thunderstorm') {
            setColor('#004F63');
            setIcon(<BsFillCloudLightningRainFill />);
        } else if(data.weather[0].main === 'Drizzle') {
            setColor('#1858C2');
            setIcon(<BsFillCloudDrizzleFill />);
        } else if(data.weather[0].main === 'Rain') {
            setColor('#3A1EEA');
            setIcon(<BsFillCloudRainHeavyFill />);
        } else if(data.weather[0].main === 'Snow') {
            setColor('#AAB1FA');
            setIcon(<BsFillCloudSnowFill />);
        } else {
            setColor('#42519B');
            setIcon(<BsCloudsFill />);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(city !== '') {
            getWeather();
            getMultiWeather();
            getLayout();
        }
        setCity('');
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setCity(value);
    }

    return (   
        <>
            <WeatherContainer>
                <Time>{dateBuilder(new Date())} - {timeBuilder(new Date())}</Time>
                {
                    weather ? <SingleWeather weather={weather} icon={icon} /> : <h3>Che tempo fa a</h3>
                }
                {
            	    multiWeather && <MultiWeather multiWeather={multiWeather} />
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

export default Home;