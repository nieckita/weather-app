import { createContext, useContext } from 'react';

export const WeatherContext = createContext(null);

export function useWeather() {
	const ctx = useContext(WeatherContext);
	if (!ctx)
		throw new Error('useWeather باید داخل <WeatherProvider> استفاده شود');

	console.log(ctx);

	return ctx;
}
