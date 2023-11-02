<script lang="ts">
	import Card from '$lib/card.svelte';
	import { onMount, onDestroy } from 'svelte';
	export let data;

	// Handle floating button START
	let isVisible = true;
	let scrollTimeout: any;

	function handleScroll() {
		isVisible = false;
		clearTimeout(scrollTimeout);
		scrollTimeout = setTimeout(() => {
			isVisible = true;
		}, 1000);
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', handleScroll);
		}
	});
	// Handle floating button END
</script>

<div class="cardList_container">
	{#each data.cardList as item}
		<Card
			title={item.storeName}
			src={item.url}
			like={Math.random() < 0.5}
			dislike={Math.random() < 0.5}
		/>
		<br />
	{/each}
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
