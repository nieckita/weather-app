import { useQuery } from '@tanstack/react-query';
import { wait } from '../helpers.js';
import { fetchweatherUrlForcast } from '../fetchAPI';
import { useWeather } from '../context/WeatherContext.jsx';

export default function WeatherForcast() {
	const { city, unit } = useWeather();

	console.log(city);

	const {
		data: forecastData,
		isError,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['cityForecast', city],
		queryFn: fetchWeatherForcast,
		staleTime: 5 * 60 * 1000,
		enabled: !!city,
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

	if (!forecastData?.list) {
		return <div>Loading..</div>;
	}

	// فیلتر فقط رکوردهای ساعت 12:00:00
	const dailyForecast = forecastData.list
		.filter((item) => item.dt_txt.includes('12:00:00'))
		.map((item) => ({
			date: item.dt_txt.split(' ')[0],
			temp: item.main.temp,
			tempMax: item.main.temp_max,
			tempMin: item.main.temp_min,
			id: item.weather[0]?.id,
		}));

	return (
		<div className="weather-forecast">
			<h4>{city}</h4>
			<ul>
				{dailyForecast.map((day) => (
					<li key={day.date}>
						{day.date} — {Math.round(day.temp)}
						{unit} (Max: {Math.round(day.tempMax)}, Min:{' '}
						{Math.round(day.tempMin)})
					</li>
				))}
			</ul>
		</div>
	);
}

async function fetchWeatherForcast({ queryKey }) {
	const [, city] = queryKey;

	if (!city || city.length < 2) {
		return [];
	}

	const resultsForcast = await fetchweatherUrlForcast('/forecast', {
		params: {
			q: city,
			units: 'metric', // یا هر واحدی که بخوای
		},
	});

	await wait(2000);
	return resultsForcast;
}
