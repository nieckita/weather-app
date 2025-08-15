import { useMemo, useState, useEffect } from 'react';
import { WeatherContext } from './WeatherContext.jsx';
export default function WeatherProvider({ children }) {
	const [lat, setLat] = useState(null);
	const [lon, setLon] = useState(null);
	const [city, setCity] = useState('');
	const [timeZone, setTimeZone] = useState('UTC');
	const [cityTime, setcityTime] = useState(null);

	const [unit, setUnit] = useState(() => localStorage.getItem('unit') || 'C°');

	useEffect(() => {
		localStorage.setItem('unit', unit);
	}, [unit]);

	useEffect(() => {
		const onStorage = (e) => {
			if (e.key === 'unit' && e.newValue) setUnit(e.newValue);
		};
		window.addEventListener('storage', onStorage);
		return () => window.removeEventListener('storage', onStorage);
	}, []);

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
