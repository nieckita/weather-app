import WeatherAlert from './WeatherAlert.jsx';
import WeatherIcon from './WeatherIcon.jsx';
import SearchSection from './SearchSection.jsx';
import WeatherForcast from './WeatherForcast.jsx';
import { useState } from 'react';
import WeatherLocal from './WeatherLocal.jsx';
import WeatherCity from './WeatherCity.jsx';

export default function MainContent() {
	const [view, setView] = useState('idle'); // 'idle' | 'city' | 'local'
	const [city, setCity] = useState('');

	function handleSearchSubmit(value) {
		const v = value.trim();
		if (v.length >= 2) {
			setCity(v);
			setView('city');
		} else {
			setView('local');
		}
	}
	return (
		<div className="main-content ">
			<SearchSection onSubmitSearch={handleSearchSubmit} />
			<div className="weatherSection background-glass  content-display">
				{view === 'local' && <WeatherLocal />}
				{view === 'city' && <WeatherCity city={city} />}
				{view === 'idle' && <WeatherLocal />}
			</div>
			<div className="weatherIcon background-glass content-display">
				<WeatherIcon />
			</div>
			<div className="weatherAlert background-glass content-display">
				<WeatherAlert />
			</div>
			<div className="weatherForcast background-glass content-display">
				{view === 'city' && <WeatherForcast city={city} />}
			</div>
		</div>
	);
}
