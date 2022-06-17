import React from 'react';

import Single from '../ui/Single';

const SingleWeather = ({ weather, icon }) => {
    return (
        <Single>
        {icon}
        <h1>{Math.round(weather.main.temp)}°</h1>
        <h2>{weather.name}</h2>
        {
            weather.weather && weather.weather.length > 0 && weather.weather.map((item,id) => {
                return <>
                    <h3 key={id}>{item.description}</h3>
                </>
            })
        }
        <p>Temp min: {weather.main.temp_min}° - Temp Max: {weather.main.temp_max}°<br/>
        Umidità: {weather.main.humidity}° - Pressione: {weather.main.pressure}°</p>
    </Single>
    )
}

export default SingleWeather;
