import { useMemo, useState } from 'react';
import { WeatherContext } from './WeatherContext.jsx';
export default function WeatherProvider({ children }) {
	const [lat, setLat] = useState(null);
	const [lon, setLon] = useState(null);
	const [city, setCity] = useState('');
	const [timeZone, setTimeZone] = useState('UTC');
	const [unit, setUnit] = useState('C°');
	const [cityTime, setcityTime] = useState(null);

	localStorage.setItem('unit', unit);

	const value = useMemo(
		() => ({
			lat,
			setLat,
			lon,
			setLon,
			city,
			setCity,
			timeZone,
			setTimeZone,
			unit,
			setUnit,
			cityTime,
			setcityTime,
		}),
		[lat, lon, city, timeZone, unit, cityTime]
	);

	return <WeatherContext value={value}>{children}</WeatherContext>;
}
