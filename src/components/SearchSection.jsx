import { useState } from 'react';
import { getCurrentUrl } from '../helpers.js';
import { useDebouncedValue } from '../hooks/useDebouncedValue.js';

import WeatherLocal from './WeatherLocal.jsx';
import WeatherCity from './WeatherCity.jsx';
import WeatherForcast from './WeatherForcast.jsx';

/**
 * SearchSection component.
 * @param {Function} onSubmitSearch - Callback to be called when search is submitted.
 * @returns {JSX.Element} - The rendered SearchSection component.
 */
export default function SearchSection({ onSubmitSearch }) {
	const [search, setSearch] = useState(getInitialSearch);

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

/**
 * Pushes the given search value to the URL as a search parameter.
 * If the value is falsy, deletes the 'search' parameter from the URL.
 * @param {string} value - The search value to be pushed to the URL.
 */
function pushSearchToUrl(value) {
	const url = getCurrentUrl();
	if (!value) url.searchParams.delete('search');
	else url.searchParams.set('search', value);
	window.history.replaceState({}, '', url);
}

/**
 * Retrieves the initial search value from the URL.
 * If the 'search' parameter is present in the URL, returns its value.
 * Otherwise, returns an empty string.
 * @return {string} The initial search value.
 */
function getInitialSearch() {
	const url = getCurrentUrl();
	return url.searchParams.get('search') ?? '';
}
