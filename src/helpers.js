export function getFormattedPrice(price, currencySymbol = ' €') {
	const formattedPrice =
		(price / 100).toFixed(2).replace('.', ',') + currencySymbol;

	return formattedPrice;
}

export function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getCurrentUrl() {
	return new URL(window.location.href);
}

export function getSearchParams() {
	return new URLSearchParams(window.location.search);
}

export function localTimezoneOffset() {
	const optionsUhr1 = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	};
	const now = new Date();
	return now.toLocaleTimeString(navigator.language, optionsUhr1);
}

export function getDate() {
	const optionsDatum = {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	};
	const now = new Date();
	return now.toLocaleDateString(navigator.language, optionsDatum);
}

export function getCityTime(tz) {
	if (!tz && tz !== 0) return '—';

	if (typeof tz === 'string') {
		try {
			return new Date().toLocaleTimeString('en-GB', {
				hour: '2-digit',
				minute: '2-digit',
				timeZone: tz,
			});
		} catch (err) {
			console.log(err);
		}
	}

	const offsetSec = Number(tz);
	if (!Number.isFinite(offsetSec)) return '—';

	const now = new Date();
	const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
	const cityMs = utcMs + offsetSec * 1000;
	const cityDate = new Date(cityMs);

	return cityDate.toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
	});
}
