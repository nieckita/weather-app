import { useMemo, useState, useEffect } from 'react';
import { WeatherContext } from './WeatherContext.jsx';
/**
 * A context provider component that provides state and functions for managing weather location, unit, and time.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @return {ReactElement} The rendered context provider component.
 */
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
		/**
		 * Handles the storage event when the unit key is updated in localStorage.
		 *
		 * @param {StorageEvent} e - The storage event object.
		 * @return {void}
		 */
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
