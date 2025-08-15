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

export function getCityTime(timezone) {
	if (!timezone) return '—';

	return new Date().toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		timeZone: timezone,
	});
}
