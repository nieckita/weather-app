import { useQuery } from '@tanstack/react-query';
import { wait } from '../helpers.js';
import { fetchweatherUrlForcast } from '../fetchAPI';

export default function WeatherForcast({ city }) {
	console.log('forcast', city);

	const {
		data: DataForcast = [],
		isError,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['city', city],
		queryFn: fetchWeatherForcast,
		staleTime: 5 * 60 * 1000,
		enabled: !!city,
		select: (r) => ({
			id: r.id,
			city: r.name,
			temp_max: r.main.temp_max,
			temp_min: r.main.temp_min,
			dt_txt: r.dt_txt,
			cod: r.cod,
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
		<div className="weather-forcast ">
			<h4>{city}</h4>
		</div>
	);
}
async function fetchWeatherForcast({ queryKey }) {
	const [, city] = queryKey;

	if (city.length < 2) {
		return [];
	}

	const resultsForcast = await fetchweatherUrlForcast('/forecast/daily', {
		params: {
			q: city,
		},
	});

	console.log('resultsForcast', resultsForcast);

	await wait(2000);
	return resultsForcast;
}
