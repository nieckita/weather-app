import WeatherIcon from './WeatherIcon.jsx';

import WeatherAlert from './WeatherAlert.jsx';
import { useWeather } from '../context/WeatherContext.jsx';
import { useEffect } from 'react';

export default function WeatherInfo({
	id,
	name,
	temp_max,
	temp_min,
	wind,
	humidity,
	lon,
	lat,
	desc,
	timezone,
	feels_like,
	iconId,
}) {
	const { setLat, setLon, setTimeZone, setCity } = useWeather();
	const ctx = useWeather();

	console.log(setLat, setLon, setTimeZone, setCity);

	console.log('types:', {
		setLat: typeof ctx.setLat,
		setLon: typeof ctx.setLon,
		setTimeZone: typeof ctx.setTimeZone,
		setCity: typeof ctx.setCity,
	});

	const unit = localStorage.getItem('unit');
	if (unit !== 'C°') {
		temp_max = cToF(temp_max);
		temp_min = cToF(temp_min);
		feels_like = cToF(feels_like);
	}

	useEffect(() => {
		if (lat != null) setLat(lat);
		if (lon != null) setLon(Number(lon));
		if (name) setCity(name);
		if (timezone) setTimeZone(timezone);
	}, [lat, lon, name, timezone, setLat, setLon, setCity, setTimeZone]);

	return (
		<div className="weather-info ">
			<section className="info">
				{' '}
				<h4>{name}</h4>
				<ul className="info-list lists">
					<li className="temp">
						temp_max: {`${Math.round(temp_max)} ${unit}`}
					</li>
					<li className="temp">
						temp_min: {`${Math.round(temp_min)} ${unit}`}
					</li>
					<li className="feels_like">
						feels_like: {`${Math.round(feels_like)} ${unit}`}
					</li>
					<li className="wind">wind: {`${Math.round(wind)} Km/h`}</li>
					<li className="humidity">humidity: {humidity}</li>
					<li className="desc">desc: {desc}</li>
				</ul>
			</section>

			<section className="icon">
				<WeatherIcon iconId={iconId} />
			</section>
			<section className="alert">
				<WeatherAlert max={temp_max} wind={wind} />
			</section>
		</div>
	);
}

function cToF(celsius) {
	const f = (Number(celsius) * 9) / 5 + 32;
	localStorage.setItem('unit', 'F°');
	return f;
}
