import { useState, useEffect } from 'react';

export default function WeatherIcon({ iconId }) {
	const [src, setSrc] = useState('../img/default.png');

	useEffect(() => {
		const imgName = srcImg(iconId) || 'default.png';
		setSrc(`../img/${imgName}`);
	}, [iconId]);

	return (
		<div className="weather-icon">
			<img src={src} alt="weather-icon" />
		</div>
	);
}

function srcImg(val) {
	const cloud = [801, 802, 803, 804];
	const rain = [500, 501, 502, 503, 504, 511, 520, 521, 522, 531];
	const clear = 800;
	const atmosphere = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];
	const snow = [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622];
	const drizzle = [300, 301, 302, 310, 311, 312, 313, 314, 321];
	const thunderstorm = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];

	if (cloud.includes(val)) {
		switch (val) {
			case 802:
				return 'scattered.png';
			case 803:
				return 'brokencloud.png';
			case 804:
				return 'overcast.png';
			default:
				return 'default.png';
		}
	}

	if (rain.includes(val)) {
		switch (val) {
			case 500:
			case 501:
				return 'light-rain.png';
			case 502:
				return 'rainy.png';
			case 503:
			case 504:
				return 'drizzle.png';
			case 511:
				return 'freezing-rain.png';
			default:
				return 'shower-rain.png';
		}
	}

	if (atmosphere.includes(val)) return 'mist.png';

	if (snow.includes(val)) {
		switch (val) {
			case 600:
				return 'light-snow.png';
			case 601:
				return 'snow.png';
			case 602:
				return 'heavy-snow.png';
			case 611:
				return 'sleet.png';
			case 616:
				return 'rain-snow.png';
			default:
				return 'heavy-snow.png';
		}
	}

	if (drizzle.includes(val)) {
		if ([302, 312, 313, 314, 321].includes(val))
			return 'heavy-drizzle-rain.png';
		return 'drizzle.png';
	}

	if (thunderstorm.includes(val)) {
		switch (val) {
			case 201:
				return 'thunderstorm-with-rain.png';
			case 202:
				return 'heavy-thunder-with-rain.png';
			case 212:
				return 'heavy-thunder.png';
			default:
				return 'thunderstorm.png';
		}
	}

	if (val === clear) return 'sunny.png';

	return 'default.png';
}
