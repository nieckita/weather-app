import WeatherAlert from './WeatherAlert.jsx';
import WeatherIcon from './WeatherIcon.jsx';
import SearchSection from './SearchSection.jsx';

import { useState, useMemo } from 'react';
import WeatherLocal from './WeatherLocal.jsx';
import WeatherCity from './WeatherCity.jsx';
import { WeatherContext } from '../context/WeatherContext.jsx';

export default function MainContent() {
	const [view, setView] = useState('idle'); // 'idle' | 'city' | 'local'
	const [city, setCity] = useState('');
	const values = useMemo(() => ({ view, setView }), [view, setView]);

	function handleSearchSubmit(value) {
		const v = value.trim();
		if (v.length >= 2) {
			setCity(v);
			setView('city');
		} else {
			setView('local');
		}
	}

	console.log(values);

	return (
		// <WeatherContext value={values}>
		<div className="main-content ">
			<SearchSection onSubmitSearch={handleSearchSubmit} />
			<div className="weatherSection background-glass  content-display">
				{view === 'local' && <WeatherLocal />}
				{view === 'city' && <WeatherCity city={city} view={view} />}
				{view === 'idle' && <WeatherLocal />}
			</div>

			<div className="weatherForcast background-glass content-display">
				{/* {view === 'city' && <WeatherForcast city={city} />} */}
			</div>
		</div>
		// </WeatherContext>
	);
}
