import React, { useState, useEffect } from 'react';
import { getMultiWeatherServiceSearch } from '../service/weather.service';

const MultiWeather = () => {

	const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('modena');


	useEffect(() => {
		getWeather();
	}, []);

	const getWeather = async () => {
        const lang = "it"
        const metric = "metric"

		const data = await getMultiWeatherServiceSearch(city, lang, metric);
		setWeather(data);
	}


    return (        
        <>
            {JSON.stringify(weather)}
		</>
    );
}

export default MultiWeather;