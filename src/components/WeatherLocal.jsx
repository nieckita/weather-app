// import { fetchCityApiGeo } from '../fetchAPI.js';
import { useQuery } from '@tanstack/react-query';
import { fetchLocalweatherUrl } from '../fetchAPI.js';
import WeatherInfo from './WeatherInfo.jsx';
import { wait } from '../helpers.js';
import { useEffect, useState } from 'react';

export default function WeatherLocal() {
	const [coords, setCoords] = useState('');
	const [err, setErr] = useState(null);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setCoords({
					lat: pos.coords.latitude,
					lon: pos.coords.longitude,
				});
			},
			(e) => {
				setErr(e);
				console.error('Error getting current position:', e);
				console.log(err);
			},
			{ timeout: 10000 }
		);
	}, []);

	const {
		data: localData = [],
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['local', coords],
		queryFn: fetchWeatherlocal,
		staleTime: 5 * 60 * 1000,
		enabled: !!coords,
		select: (r) => ({
			id: r.id,
			city: r.name,
			temp_max: r.main.temp_max,
			temp_min: r.main.temp_min,
			wind: r.wind.speed,
			humidity: r.main.humidity,
			lon: r.coord.lon,
			lat: r.coord.lat,
			desc: r.weather?.[0]?.description,
			cod: r.cod,
			sunset: r.sys.sunset,
			sunrise: r.sys.sunrise,
			timezone: r.timezone,
			feels_like: r.main.feels_like,
		}),
	});

	if (isError) {
		if (error?.status === 404) {
			return <strong>City wurde nicht gefunden</strong>;
		}

		return <strong>Fehler beim Laden der Daten.</strong>;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	console.log(localData);

	return (
		<div>
			{localData && (
				<WeatherInfo
					data={localData.id}
					name={localData.city}
					temp_max={localData.temp_max}
					temp_min={localData.temp_min}
					wind={localData.wind}
					humidity={localData.humidity}
					lon={localData.lon}
					lat={localData.lat}
					desc={localData.desc}
					cod={localData.cod}
					sunset={localData.sunset}
					sunrise={localData.sunrise}
					timezone={localData.timezone}
					feels_like={localData.feels_like}
				/>
			)}
		</div>
	);
}

async function fetchWeatherlocal({ queryKey }) {
	const [, local] = queryKey;
	// console.log(local);

	const { lat, lon } = local;

	const results = await fetchLocalweatherUrl('/weather', {
		params: {
			lat: parseInt(lat),
			lon: parseInt(lon),
		},
	});
	console.log(results);

	await wait(2000);
	return results;
}
