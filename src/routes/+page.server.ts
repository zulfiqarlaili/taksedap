import { supabase } from '$lib/supabaseClient'
import { error } from '@sveltejs/kit';


export async function load() {
	const response = await runGeoQuery();
	return {
		stores: response
	};
}


async function runGeoQuery() {
	const { data, error: errorMessage } = await supabase.rpc('get_nearby_stores', {
		lat: 3.0977558846850135,
		long: 101.69056201972212,
	})

	if (errorMessage) {
		throw error(500, {
			message: errorMessage.message
		});
	} else {
		return data
	}
}
