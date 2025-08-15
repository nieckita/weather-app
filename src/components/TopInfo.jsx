import { localTimezoneOffset, getDate } from '../helpers.js';
import { useEffect } from 'react';
import { useWeather } from '../context/WeatherContext.jsx';
/**
 * TopInfo component displays the current date, local time, and city time. It also
 * allows the user to toggle between Celsius and Fahrenheit temperature units.
 *
 * @return {JSX.Element} The rendered TopInfo component.
 */
export default function TopInfo() {
	const { cityTime, unit, setUnit } = useWeather();

	useEffect(() => {
		setUnit(unit);
	}, [unit]);

	const localTime = localTimezoneOffset();

	const datum = getDate();

	return (
		<>
			<section className="dateInfo ">
				<span className="date">
					<p>{datum}</p>
				</span>
				<span className="local-time">{localTime}</span>
				<span className="city-time">{cityTime}</span>
			</section>
			<section className="settingBtn ">
				<section className="temperature">
					<button
						className="temp-btn temperature-celcius"
						aria-pressed={unit === 'C°' ? 'true' : 'false'}
						onClick={() => setUnit('C°')}
					>
						C°
					</button>
					<button
						className="temp-btn temperature-farenhite"
						aria-pressed={unit === 'F°' ? 'true' : 'false'}
						onClick={() => {
							setUnit('F°');
						}}
					>
						F°
					</button>
				</section>
			</section>
		</>
	);
}
