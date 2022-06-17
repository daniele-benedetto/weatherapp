import React from 'react'

import MultiWeatherContainer from '../ui/MultiWeatherContainer';
import Card from '../ui/Card';

const iconImg = "https://openweathermap.org/img/w/";
const extImg = ".png";

const MultiWeather = ({multiWeather}) => {

	return (
		<>
			<MultiWeatherContainer>
				{
					multiWeather.list && multiWeather.list.length > 0 && multiWeather.list.slice(8).map((item, idx) => {
						return <>
							{!(idx % 8) ?
								<Card key={idx}>
									<p>
										{new Date(item.dt * 1000).toLocaleString('it', { month: 'numeric', day: 'numeric' })}
									</p>
									{
										item.weather.map((subItem, id) => {
											return <>
												<img src={`${iconImg}${subItem.icon}${extImg}`} alt={subItem.description} />
												<i>{subItem.description}</i>
											</>
										})
									}
								</Card>
							: ''}
						</>
					})
				}
			</MultiWeatherContainer>
         </>
	)
}

export default MultiWeather
