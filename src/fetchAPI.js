import { up } from 'up-fetch';

const { VITE_openweathermap_API_KEY_V3 } = import.meta.env;

export const fetchweatherUrl = up(fetch, () => ({
	baseUrl: 'https://api.openweathermap.org/data/2.5',
	params: {
		appid: VITE_openweathermap_API_KEY_V3,
		lang: 'de',
		units: 'metric',
	},
	headers: {},
}));

export const fetchLocalweatherUrl = up(fetch, () => ({
	baseUrl: 'https://api.openweathermap.org/data/2.5',
	params: {
		appid: VITE_openweathermap_API_KEY_V3,
		lang: 'de',
		units: 'metric',
	},
	headers: {},
}));
export const fetchweatherUrlForcast = up(fetch, () => ({
	baseUrl: 'https://api.openweathermap.org/data/2.5',
	params: {
		appid: VITE_openweathermap_API_KEY_V3,
		lang: 'de',
		units: 'metric',
	},
	headers: {},
}));
