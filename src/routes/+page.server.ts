export async function load() {
	const response = await fetchCardData();
	return {
		cardList: response
	};
}

async function fetchCardData() {
	const response = await fetch('https://jsonplaceholder.typicode.com/photos');
	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}
	let card = await response.json();
	card = card.slice(0, 3);
	return card;
}
