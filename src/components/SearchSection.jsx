import { useState } from 'react';
import { getCurrentUrl } from '../helpers.js';
import { useDebouncedValue } from '../hooks/useDebouncedValue.js';

import WeatherLocal from './WeatherLocal.jsx';
import WeatherCity from './WeatherCity.jsx';
import WeatherForcast from './WeatherForcast.jsx';

export default function SearchSection({ onSubmitSearch }) {
	const [search, setSearch] = useState(getInitialSearch);

	const [city, setCity] = useState('');
	const [view, setView] = useState('idle');
	const debouncedSearch = useDebouncedValue(search, 600);

	pushSearchToUrl(debouncedSearch);

	function submitform(e) {
		e.preventDefault();
		onSubmitSearch(search); // فقط به والد خبر بده
	}

	return (
		<>
			<form className="searchSection background-glass" onSubmit={submitform}>
				<input
					type="text"
					placeholder="Stadt suchen"
					className="searchInput "
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button className="searchBtn" type="submit">
					Suchen
				</button>
			</form>
		</>
	);
}

function pushSearchToUrl(value) {
	const url = getCurrentUrl();
	if (!value) url.searchParams.delete('search');
	else url.searchParams.set('search', value);
	window.history.replaceState({}, '', url);
}

function getInitialSearch() {
	const url = getCurrentUrl();
	return url.searchParams.get('search') ?? '';
}
