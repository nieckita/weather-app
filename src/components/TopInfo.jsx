import { useState } from 'react';
export default function TopInfo() {
	const [unit, setunit] = useState('C°');

	localStorage.setItem('unit', unit);

	return (
		<>
			<section className="dateInfo content-display">
				<span className="date">date</span>
				<span className="local-time">local time</span>
				<span className="city-time">city time</span>
			</section>
			<section className="settingBtn ">
				<section className="temperature">
					<button
						className="temp-btn temperature-celcius"
						aria-pressed={unit === 'C°' ? 'true' : 'false'}
						onClick={() => setunit('C°')}
					>
						C°{' '}
					</button>
					<button
						className="temp-btn temperature-farenhite"
						aria-pressed={unit === 'F°' ? 'true' : 'false'}
						onClick={() => {
							setunit('F°');
						}}
					>
						{' '}
						F°{' '}
					</button>
				</section>
			</section>
		</>
	);
}
