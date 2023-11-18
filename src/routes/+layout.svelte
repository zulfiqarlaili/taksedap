<script lang="ts">
	import Feedback from '$lib/Feedback.svelte';
	let showFeedbackDialog = false;

	function handleButton() {
		showFeedbackDialog = true;
	}
</script>

<div class="nav-bar">
	<a href="/"><h1>Tak Sedap</h1></a>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<i on:click={handleButton} class="scale-element feedback fa-regular fa-comment" />
</div>
<Feedback bind:isOpen={showFeedbackDialog} />
<small>beta-release</small>
<slot />

<style>
	.nav-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 2rem;
		margin-top: 0rem;
	}
	a {
		text-decoration: none;
	}
	a:hover {
		text-decoration: none;
	}

	.feedback {
		margin-bottom: 1rem;
		margin-right: 0.5rem;
		font-size: x-large;
		cursor: pointer;
	}

	small {
		position: absolute;
		top: 0;
		right: 1rem;
		opacity: 40%;
	}
</style>
