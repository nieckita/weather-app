import { createContext, useState } from 'react';
import WeatherIcon from './WeatherIcon.jsx';
import { useWeather } from '../context/WeatherContext.jsx';
import WeatherAlert from './WeatherAlert.jsx';

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
	cod,
	sunset,
	sunrise,
	timezone,
	feels_like,
}) {
	const unit = localStorage.getItem('unit');
	if (unit !== 'C°') {
		temp_max = cToF(temp_max);
		temp_min = cToF(temp_min);
		feels_like = cToF(feels_like);
	}

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
					<li className="sunset">sunset: {sunset}</li>
					<li className="sunrise">sunrise: {sunrise}</li>
				</ul>
			</section>

			<section className="icon">
				<WeatherIcon iconId={iconId} />
			</section>
			<section className="alert">
				<WeatherAlert />
			</section>
		</div>
	);
}

function cToF(celsius) {
	const f = (Number(celsius) * 9) / 5 + 32;
	localStorage.setItem('unit', 'F°');
	return f;
}
