import { useQuery } from '@tanstack/react-query';
import { fetchweatherUrl } from '../fetchAPI';
import WeatherInfo from './WeatherInfo.jsx';

export default function WeatherCity({ city }) {
	const {
		data: cityData = [],
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['city', city],
		queryFn: fetchWeather,
		staleTime: 5 * 60 * 1000,
		enabled: !!city,
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

			timezone: r.timezone,
			feels_like: r.main.feels_like,
			iconId: r.weather?.[0]?.id,
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

	return (
		<div className="weather-city">
			{cityData && (
				<WeatherInfo
					data={cityData.id}
					name={cityData.city}
					temp_max={cityData.temp_max}
					temp_min={cityData.temp_min}
					wind={cityData.wind}
					humidity={cityData.humidity}
					lon={cityData.lon}
					lat={cityData.lat}
					desc={cityData.desc}
					cod={cityData.cod}
					timezone={cityData.timezone}
					feels_like={cityData.feels_like}
					iconId={cityData.iconId}
				/>
			)}
		</div>
	);
}
async function fetchWeather({ queryKey }) {
	const [, city] = queryKey;

	if (city.length < 2) {
		return [];
	}
	const results = await fetchweatherUrl('/weather', {
		params: {
			q: city,
		},
	});

	console.log(results);

	return results;
}
