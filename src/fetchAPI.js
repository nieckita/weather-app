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

// export async function fetchCityApiGeo(lat, lon) {
// 	try {
// 		const urlLocaleApi = await fetch(
// 			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${VITE_openweathermap_API_KEY_V3}&units=metric&lang=de`
// 		).then((urlLocaleApi) => urlLocaleApi.json());
// 		// if (!urlLocaleApi.ok) {
// 		// 	throw new Error('Fehler beim Laden der Daten!');
// 		// }
// 		console.log(urlLocaleApi);
// 		return urlLocaleApi;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }
