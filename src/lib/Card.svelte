<script lang="ts">
	import type { IStore } from '../lib/interface.js';
	import { lazyLoad } from '$lib/lazyLoad.js';
	import { addOrUpdateReaction, deleteReaction, updateReactionCountDb } from './util.js';

	export let store: IStore = {
		storeId: '',
		storeName: '',
		descriptionList: [],
		url: '',
		likeCount: 0,
		dislikeCount: 0
	};
	export let isLoading = false;
	export let isLikeLoading = false;
	export let isDislikeLoading = false;
	export let reaction: boolean | undefined;

	function handleReaction(input: boolean | undefined) {
		switch (reaction) {
			case undefined:
				reaction = input;
				break;
			case true:
				reaction = input === true ? undefined : false;
				break;
			case false:
				reaction = input === false ? undefined : true;
				break;
			default:
				break;
		}
	}

	function handleReactionButton(input: boolean | undefined) {
		input ? isLikeLoading = true : isDislikeLoading = true

		let isReactionSwitch =
			reaction === true && input === false
				? true
				: reaction === false && input === true
				? false
				: undefined;
		let previousReaction =
			reaction === true && input === true
				? true
				: reaction === false && input === false
				? false
				: undefined;

		handleReaction(input);
		let removeReaction = false;
		if ((input === false && reaction == undefined) || (input === true && reaction == undefined)) {
			removeReaction = true;
		}
		removeReaction
			? deleteReaction(store.storeId)
			: addOrUpdateReaction(store.storeId, reaction);
		updateReactionCountDb(store.storeId, {
			reaction,
			removeReaction,
			isReactionSwitch,
			previousReaction
		}).then(()=> input ? isLikeLoading = false : isDislikeLoading = false);
	}
</script>

<div class="container">
	{#if isLoading}
		<article class="skeleton-loading" />
	{:else}
		<details>
			<summary>
				<article class="image-container">
					<img use:lazyLoad={store.url} alt="Card details" />
					<div class="card-title">
						{store.storeName}
						<div class="reaction-container">
							<button
								disabled={isLikeLoading}
								aria-busy={isLikeLoading}
								on:click={() => {
									handleReactionButton(true);
								}}
							>
								{#if !isLikeLoading}
									<i class={`fa-solid fa-thumbs-up ${reaction === true ? 'reacted-true' : ''}`} />
									{store.likeCount}
								{/if}
							</button>
							<button
								disabled={isDislikeLoading}
								aria-busy={isDislikeLoading}
								on:click={() => {
									handleReactionButton(false);
								}}
							>
								{#if !isDislikeLoading}
									<i
										class={`fa-solid fa-thumbs-down ${reaction === false ? 'reacted-false' : ''}`}
									/>
									{store.dislikeCount}
								{/if}
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
		border-radius: 1rem;
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
