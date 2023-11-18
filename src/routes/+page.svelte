<script lang="ts">
	import { PUBLIC_TABLE_NAME } from '$env/static/public';
	import Card from './Card.svelte';
	import type { IStore } from '$lib/interface';
	import { supabase } from '$lib/supabaseClient';
	import {
		addOrUpdateReaction,
		deleteReaction,
		getNearbyStore,
		isReaction,
		updateReactionCountDb
	} from '$lib/util';
	import { onMount, onDestroy } from 'svelte';
	import Tutorial from '../lib/Tutorial.svelte';
	import Feedback from '$lib/Feedback.svelte';
	let data: any = [];

	let isVisible = true;
	let scrollTimeout: any;
	let isLoading = true;
	let isTutorial = false;
	const nearbyRadiusInMeter: number = 4000;

	supabase
		.channel(PUBLIC_TABLE_NAME)
		.on(
			'postgres_changes',
			{
				event: 'UPDATE',
				schema: 'public'
			},
			(payload) => {
				const updatedStore = payload.new as IStore;
				data = data.map((store: IStore) =>
					store.storeId === updatedStore.storeId ? updatedStore : store
				);
			}
		)
		.subscribe();

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					try {
						data = await getNearbyStore(latitude, longitude);
						data = data.filter(
							(store: { distMeters: number }) => store.distMeters <= nearbyRadiusInMeter
						);
						isLoading = false;
					} catch (error) {
						isLoading = false;
						alert(error);
					}
				},
				(err) => {
					alert(err.message);
				}
			);
		} else {
			alert('Geolocation is not supported by this browser.');
		}
	};
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
			isReactionSwitch: store.isReactionSwitch,
			previousReaction: store.previousReaction
		});
	}

	onMount(async () => {
		if (!localStorage.getItem('isTutorial')) {
			isTutorial = true;
		}
		
		// TODO: Will implement when needed
		// let visit = localStorage.getItem('visit');
		// if (!visit) {
		// 	localStorage.setItem('visit', '1');
		// } else {
		// 	let count = parseInt(visit);
		// 	count++;
		// 	localStorage.setItem('visit', count.toString());
		// }

		getLocation();

		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<div class="cardList_container">
	<Tutorial isOpen={isTutorial} />
	<Feedback />
	{#if isLoading}
		<Card reaction={undefined} {isLoading} />
		<br />
		<Card reaction={undefined} {isLoading} />
		<br />
		<Card reaction={undefined} {isLoading} />
	{:else}
		{#if data.length === 0}
			<article>
				<h3>No "tak sedap" store nearby</h3>
				<small>Press + button to add new store</small>
				<small>Don't simply add!</small>
			</article>
		{/if}
		{#each data as store}
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

	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 1rem;
		text-align: center;
	}
</style>
