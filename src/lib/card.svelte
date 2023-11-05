<script lang="ts">
	import { onMount } from 'svelte';
	import type { IStore } from './interface.js';
	import { lazyLoad } from './lazyLoad.js';
	export let store: IStore = {
		storeId: '', // Empty string
		storeName: '', // Empty string
		descriptionList: [], // Empty array
		url: '', // Empty string
		likeCount: 0, // Default to 0
		dislikeCount: 0 // Default to 0
	};

	export let isLoading = false;
	let isReacted: boolean | undefined;

	function handleReaction(input: boolean | undefined) {
		switch (isReacted) {
			case undefined:
				isReacted = input;
				break;
			case true:
				isReacted = input === true ? undefined : false;
				break;
			case false:
				isReacted = input === false ? undefined : true;
				break;
			default:
				break;
		}
	}

	onMount(() => {
		console.log(isReacted);
	});
</script>

<div class="container">
	{#if isLoading}
		<article class="skeleton-loading">
			<div class="skeleton-title">
				<div class="skeleton-title-inner" />
			</div>
		</article>
	{:else}
		<details>
			<summary>
				<article class="image-container">
					<img use:lazyLoad={store.url} alt="Card details" />
					<div class="card-title">
						{store.storeName}
						<div class="reaction-container">
							<button
								on:click={() => {
									handleReaction(true);
								}}
							>
								<i class={`fa-solid fa-thumbs-up ${isReacted === true ? 'reacted-true' : ''}`} />
								{store.likeCount}
							</button>
							<button
								on:click={() => {
									handleReaction(false);
								}}
							>
								<i class={`fa-solid fa-thumbs-up ${isReacted === false ? 'reacted-false' : ''}`} />
								{store.dislikeCount}
							</button>
						</div>
					</div>
				</article>
			</summary>
			<article class="description-container">
				<ul>
					{#each store.descriptionList as item}
						<li>{item}</li>
					{/each}
				</ul>
			</article>
		</details>
	{/if}
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
	}
	.image-container {
		max-width: 25rem;
		max-height: 25rem;
		position: relative;
		border-radius: 1rem;
		overflow: hidden; /* Hide any overflowing content */
		margin: 0;
		padding: 0;
	}

	.description-container {
		max-width: 25rem;
		padding-left: 0;
		padding-right: 0;
		border-radius: 1rem;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.card-title {
		display: flex;
		flex-direction: column;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0.6); /* Adjust the background color and opacity as needed */
		color: white; /* Adjust the text color */
		padding: 10px; /* Adjust the padding as needed */
		text-align: center;
		margin: 0;
		border-bottom-left-radius: 1rem;
		border-bottom-right-radius: 1rem;
		backdrop-filter: blur(1px); /* Add a blur effect to the background */
	}
	.reaction-container {
		display: flex;
		flex-direction: row;
		align-self: flex-end;
	}
	.reaction-container button {
		width: 4rem;
		border: none;
		background: transparent;
		padding: 0.3rem;
		margin: 0;
		font-size: 18px;
		box-shadow: none;
		position: relative;
	}
	.reaction-container button:active {
		transform: scale(1.2);
	}

	.reacted-true {
		color: #54aff1;
	}

	.reacted-false {
		color: #ff868f;
	}

	.skeleton-loading {
		height: 25rem;
		width: 25rem;
		position: relative;
		overflow: hidden;
		background: linear-gradient(
			to right,
			rgba(0, 0, 0, 0.2) 0%,
			rgba(255, 255, 255, 0.05) 50%,
			rgba(0, 0, 0, 0.2) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}

	.skeleton-title {
		display: flex;
		flex-direction: column;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 5rem;
		background: rgba(0, 0, 0, 0.6); /* Adjust the background color and opacity as needed */
		color: white; /* Adjust the text color */
		padding: 10px; /* Adjust the padding as needed */
		text-align: center;
		margin: 0;
		border-bottom-left-radius: 1rem;
		border-bottom-right-radius: 1rem;
		backdrop-filter: blur(1px); /* Add a blur effect to the background */
	}
	.skeleton-title-inner {
		display: flex;
		flex-direction: column;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 5rem;
		background: rgba(0, 0, 0, 0.6); /* Adjust the background color and opacity as needed */
		color: white; /* Adjust the text color */
		padding: 10px; /* Adjust the padding as needed */
		text-align: center;
		margin: 0;
		border-bottom-left-radius: 1rem;
		border-bottom-right-radius: 1rem;
		backdrop-filter: blur(1px); /* Add a blur effect to the background */
		background: linear-gradient(
			to right,
			rgba(0, 0, 0, 0.2) 0%,
			rgba(255, 255, 255, 0.05) 50%,
			rgba(0, 0, 0, 0.2) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}

	@keyframes shimmer {
		100% {
			background-position: -200% 0;
		}
	}

	details summary::after {
		width: 0;
	}

	img:active {
		transform: scale(1.02);
	}

	@media only screen and (min-width: 768px) {
		details summary:hover {
			transform: scale(1.01);
		}
	}
</style>
