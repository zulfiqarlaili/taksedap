<script lang="ts">
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	inject({ mode: dev ? 'development' : 'production' });

	function handleChatPopup() {
		const typebotInitScript = document.createElement('script');
		typebotInitScript.type = 'module';
		typebotInitScript.innerHTML = `import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.2.25/dist/web.js'
				Typebot.initPopup({
				typebot: "tak-sedap",
				apiHost: "https://bot.07102020.xyz",
				autoShowDelay: 0,
			});
			`;
		document.body.append(typebotInitScript);
	}
	onMount(() => {});
</script>

{#if $page.url.pathname !== '/landing'}
	<div class="nav-bar">
		<a href="/"><h1>Tak Sedap</h1></a>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<i on:click={handleChatPopup} class="scale-element feedback fa-regular fa-comment" />
	</div>
	<small>beta-release</small>
	<slot />
{:else}
	<slot />
{/if}

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
