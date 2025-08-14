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
