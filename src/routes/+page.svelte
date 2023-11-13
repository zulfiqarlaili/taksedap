<script lang="ts">
	import Card from '$lib/card.svelte';
	import { TABLE_NAME } from '$lib/constants';
	import type { IStore } from '$lib/interface';
	import { supabase } from '$lib/supabaseClient';
	import {
		addOrUpdateReaction,
		deleteReaction,
		isReaction,
		updateReactionCountDb
	} from '$lib/util';
	import { onMount, onDestroy } from 'svelte';
	export let data: any;

	let isVisible = true;
	let scrollTimeout: any;
	let isLoading = true;

	const changes = supabase
		.channel(TABLE_NAME)
		.on(
			'postgres_changes',
			{
				event: 'UPDATE',
				schema: 'public'
			},
			(payload) => {
				const updatedStore = payload.new as IStore
				data.stores = data.stores.map((store: IStore) => (store.storeId === updatedStore.storeId ? updatedStore : store));
			}
		)
		.subscribe();

	function handleScroll() {
		isVisible = false;
		clearTimeout(scrollTimeout);
		scrollTimeout = setTimeout(() => {
			isVisible = true;
		}, 1000);
	}

	function handleReactionButton(event: any) {
		const store: IStore = event.detail;

		store.removeReaction
			? deleteReaction(store.storeId)
			: addOrUpdateReaction(store.storeId, store.reaction);

		updateReactionCountDb(store.storeId, {
			reaction: store.reaction,
			removeReaction: store.removeReaction,
			previousReaction: store.previousReaction,
			previousReaction2: store.previousReaction2
		});
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll);
		}

		if (data) {
			isLoading = false;
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<div class="cardList_container">
	{#if isLoading}
		<Card reaction={undefined} {isLoading} />
		<br />
		<Card reaction={undefined} {isLoading} />
		<br />
		<Card reaction={undefined} {isLoading} />
	{:else}
		{#if data.stores.length === 0}
			<h3>No "tak sedap" store nearby</h3>
			<small>Press + button to add new store</small>
			<small>Don't simply add!</small>
		{/if}
		{#each data.stores as store}
			<Card reaction={isReaction(store.storeId)} bind:store on:cardClicked={handleReactionButton} />
			<br />
		{/each}
	{/if}
</div>

{#if isVisible}
	<a href="/capture" class="circle-button">+</a>
{/if}

<style>
	.cardList_container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 4rem;
		margin-bottom: 5rem;
	}

	a.circle-button {
		display: inline-block;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background-color: #0074d9;
		text-align: center;
		line-height: 60px;
		color: #fff;
		text-decoration: none;
		font-weight: bold;
		transition: background-color 0.3s, color 0.3s;
		position: fixed;
		bottom: 2.5rem;
		right: 1.5rem;
		transition: opacity 5s ease;
		opacity: 1;
	}

	a.circle-button:hover {
		transform: scale(1.1);
	}
</style>
