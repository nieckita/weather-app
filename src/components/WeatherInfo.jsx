import WeatherIcon from './WeatherIcon.jsx';

import WeatherAlert from './WeatherAlert.jsx';
import { useWeather } from '../context/WeatherContext.jsx';

import { useEffect } from 'react';
import { getCityTime } from '../helpers.js';

/**
 * Renders the weather information component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the weather location.
 * @param {string} props.name - The name of the weather location.
 * @param {number} props.temp_max - The maximum temperature in Celsius.
 * @param {number} props.temp_min - The minimum temperature in Celsius.
 * @param {number} props.wind - The wind speed in kilometers per hour.
 * @param {number} props.humidity - The humidity percentage.
 * @param {number} props.lon - The longitude of the weather location.
 * @param {number} props.lat - The latitude of the weather location.
 * @param {string} props.desc - The weather description.
 * @param {number} props.timezone - The timezone offset in seconds.
 * @param {number} props.feels_like - The "feels like" temperature in Celsius.
 * @param {number} props.iconId - The ID of the weather icon.
 * @return {JSX.Element} The rendered weather information component.
 */
export default function WeatherInfo({
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
	const { setLat, setLon, setTimeZone, setCity, setcityTime } = useWeather();

	const cityTime = getCityTime(timezone);

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
		if (timezone !== undefined && timezone !== null) {
			setTimeZone(timezone);
			setcityTime(getCityTime(timezone));
		}
	}, [
		lat,
		lon,
		name,
		timezone,
		cityTime,
		setLat,
		setLon,
		setCity,
		setTimeZone,
		setcityTime,
	]);

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

/**
 * Converts Celsius to Fahrenheit.

 */
function cToF(celsius) {
	const f = (Number(celsius) * 9) / 5 + 32;
	localStorage.setItem('unit', 'F°');
	return f;
}
