import { supabase } from '$lib/supabaseClient'
import { TABLE_NAME } from '$lib/constants'
import { error } from '@sveltejs/kit';


export async function load() {
	const response = await fetchStore();
	console.log(response)
	return {
		stores: response
	};
}

async function fetchStore() {
	const { data: stores, error: errorMessage } = await supabase
		.from(TABLE_NAME)
		.select('*')
	if (errorMessage) {
		throw error(500, {
			message: errorMessage.message
		});

	}
	return stores;
}
