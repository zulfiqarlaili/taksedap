import { PUBLIC_TABLE_NAME } from '$env/static/public';
import { supabase } from '$lib/supabaseClient'
import { error } from '@sveltejs/kit';


export async function load() {
	const response = await fetchStore();
	return {
		stores: response
	};
}

async function fetchStore() {
	const { data: stores, error: errorMessage } = await supabase
		.from(PUBLIC_TABLE_NAME)
		.select('*')
	if (errorMessage) {
		throw error(500, {
			message: errorMessage.message
		});
	}
	return stores;
}
