import React, { useState, useEffect } from 'react';
import { getMultiWeatherServiceSearch } from '../service/weather.service';
import Card from '../ui/Card';
import MultiWeatherContainer from '../ui/MultiWeatherContainer';
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
		console.log(data.list[0].dt);
	}

    return (        
        <>
            {
            	weather && <>
                        <h2>{weather.city.name}</h2>
						<MultiWeatherContainer>
							{
								weather.list && weather.list.length > 0 && weather.list.slice(8).map((item, idx) => {
									return <>
										{!(idx % 8) ?
											<Card key={idx}>

												{idx}
												<h1>{item.dt_txt}</h1>
											</Card>
										: ''}
									</>
								})
							}
						</MultiWeatherContainer>
                    </>
                }
		</>
    );
}

export default MultiWeather;