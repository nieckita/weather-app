import { useState } from 'react';
import { localTimezoneOffset, getDate } from '../helpers.js';
import { useEffect } from 'react';
export default function TopInfo() {
	const [unit, setunit] = useState('C°');
	useEffect(() => {
		setunit(unit);
	}, [unit]);
	localStorage.setItem('unit', unit);

	const localTime = localTimezoneOffset();
	const datum = getDate();

	return (
		<>
			<section className="dateInfo content-display">
				<span className="date">
					<p>{datum}</p>
				</span>
				<span className="local-time">{localTime}</span>
				<span className="city-time">city time</span>
			</section>
			<section className="settingBtn ">
				<section className="temperature">
					<button
						className="temp-btn temperature-celcius"
						aria-pressed={unit === 'C°' ? 'true' : 'false'}
						onClick={() => setunit('C°')}
					>
						C°
					</button>
					<button
						className="temp-btn temperature-farenhite"
						aria-pressed={unit === 'F°' ? 'true' : 'false'}
						onClick={() => {
							setunit('F°');
						}}
					>
						F°
					</button>
				</section>
			</section>
		</>
	);
}
