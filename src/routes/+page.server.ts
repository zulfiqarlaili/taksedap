import { supabase } from '$lib/supabaseClient'
import { TABLE_NAME } from '$lib/constants'


export async function load() {
	const response = await fetchStore();
	return {
		stores: response
	};
}

async function fetchStore() {
	const { data: stores, error } = await supabase
		.from(TABLE_NAME)
		.select('*')
	if (error) {
		throw new Error('Failed to fetch data');
	}
	return stores;
}
