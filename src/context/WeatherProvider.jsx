import { useMemo, useState } from 'react';
import { WeatherContext } from './WeatherContext.jsx';
export function WeatherProvider({ children }) {
	const [lat, setLat] = useState(null);
	const [lon, setLon] = useState(null);
	const [city, setCity] = useState('');
	const [timeZone, setTimeZone] = useState('UTC');

	const value = useMemo(
		() => ({ lat, setLat, lon, setLon, city, setCity, timeZone, setTimeZone }),
		[lat, lon, city, timeZone]
	);

	return <WeatherContext value={value}>{children}</WeatherContext>;
}
