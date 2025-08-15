import { useMemo } from 'react';

export default function WeatherAlert({ max, wind }) {
	const { temp, windMsg, severity } = useMemo(
		() => warnungGenerate(max, wind),
		[max, wind]
	);

	return (
		<div
			className={[
				'weather-alert p-4 rounded-xl border',
				severity === 'danger'
					? 'bg-red-50 border-red-300'
					: severity === 'warn'
					? 'bg-yellow-50 border-yellow-300'
					: 'bg-blue-50 border-blue-300',
			].join(' ')}
		>
			<p className="alert-title">{temp}</p>
			<p className="alert-message">{windMsg}</p>
		</div>
	);
}

function warnungGenerate(maxTemp, wind) {
	// --- Temp Alert ---
	let tempMsg = '';
	let severity = 'info'; // "info" | "warn" | "danger"

	if (maxTemp < 0) {
		tempMsg = '❄️  Eiskalt! Bitte warm anziehen.';
		severity = 'warn';
	} else if (maxTemp >= 0 && maxTemp < 10) {
		tempMsg = '🧥  Kühl. Eine Jacke ist empfehlenswert.';
	} else if (maxTemp >= 10 && maxTemp < 20) {
		tempMsg = '🌤️  Mildes Wetter heute.';
	} else if (maxTemp >= 20 && maxTemp < 25) {
		tempMsg = '😎  Angenehm warm.';
	} else if (maxTemp >= 25 && maxTemp < 30) {
		tempMsg = '☀️  Es ist warm heute.';
	} else if (maxTemp >= 30 && maxTemp < 35) {
		tempMsg = '🔥  Sehr heiß! Viel trinken nicht vergessen.';
		severity = 'warn';
	} else if (maxTemp >= 35) {
		tempMsg = '🚨  Extreme Hitze! Bleiben Sie möglichst im Schatten.';
		severity = 'danger';
	} else {
		tempMsg = 'ℹ️  Wetterdaten nicht verfügbar.';
	}

	// --- Wind Alert ---
	let windMsg = '';
	if (wind < 20) {
		windMsg = '🍃  Leichte Brise.';
	} else if (wind >= 20 && wind < 40) {
		windMsg = '🌬️  Mäßiger Wind.';
	} else if (wind >= 40 && wind < 60) {
		windMsg = '💨  Starker Wind! Vorsicht geboten.';
		severity = severity === 'danger' ? 'danger' : 'warn';
	} else if (wind >= 60 && wind < 90) {
		windMsg = '🌪️  Sturmwarnung! Bitte draußen aufpassen.';
		severity = 'danger';
	} else if (wind >= 90 && wind < 120) {
		windMsg = '🚨  Schwerer Sturm! Große Vorsicht im Freien.';
		severity = 'danger';
	} else if (wind >= 120) {
		windMsg = '🛑  Orkan! Bleiben Sie unbedingt zu Hause.';
		severity = 'danger';
	} else {
		windMsg = 'ℹ️  Winddaten nicht verfügbar.';
	}

	return { temp: tempMsg, windMsg, severity };
}
