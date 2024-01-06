<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		localStorage.setItem('isLandingPage', 'false');
	});
</script>

<main class="container main">
	<p />
	<hgroup style="margin-bottom: 2;">
		<h1>Avoid Unpleasant Spots with <br />'Tak Sedap'!</h1>
		<p>
			'Tak Sedap' guides you from bad street food. Share your finds, let's enhance our street food
			experience together!
		</p>
	</hgroup>
	<button
		class="secondary"
		on:click={() => {
			goto('/');
		}}>Lets Go!</button
	>
</main>
<i class="fa-solid fa-circle-chevron-down bounce-arrow" />
<div class="steps">
	<div style="text-align:center; padding-bottom:2rem">
		<h2>3 Easy Steps to Make a Difference!</h2>
	</div>
	<ul>
		<div>
			<span
				><i class="fa-solid fa-magnifying-glass"></i> If you found 'tak sedap' spot</span
			>
			<br />
			<span
				><i class="fa-solid fa-circle-plus" />Open our site and simply add store details with
				picture</span
			>
			<br />
			<span>
				<i class="fa-regular fa-face-laugh-beam" />Submit and make the world a better place
			</span>
		</div>
	</ul>
</div>
<div class="container features">
	<hgroup style="margin-bottom: 6rem; max-width: 25rem; ">
		<h2>Contribute, Discover, Delight: Your Guide to Tastier Streets!</h2>
		<h3>
			Contribute to the Flavor Revolution! Shape Flavorful Streets, Earn Appreciation, and Share the
			Joy: Be a 'Tak Sedap' Hero, Making Every Bite Count!
		</h3>
	</hgroup>
	<div class="grid">
		<div class="mobile">
			<svg xmlns="http://www.w3.org/2000/svg" height="42" width="42" viewBox="0 0 512 512"
				><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
					d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
				/></svg
			>
			<h4>No login needed</h4>
			<p>
				Enjoy hassle-free participation! Contribute to the 'Tak Sedap' community without the need
				for any login credentials. Your input, your way
			</p>
		</div>
		<div class="mobile">
			<svg xmlns="http://www.w3.org/2000/svg" height="42" width="42" viewBox="0 0 512 512"
				><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
					d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"
				/></svg
			>
			<h4>Voting system</h4>
			<p>
				Have a say in the tastiness rating! Utilize our intuitive voting system to express your
				preferences. Like or dislike, your opinion matters!
			</p>
		</div>
		<div class="mobile">
			<svg xmlns="http://www.w3.org/2000/svg" height="42" width="42" viewBox="0 0 384 512"
				><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
					d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
				/></svg
			>

			<h4>List Nearby</h4>
			<p>
				Discover what's around you! 'Tak Sedap' customizes your experience by listing street food
				spots based on your current location. Explore the flavors nearby with ease.s
			</p>
		</div>
		<div class="mobile">
			<svg xmlns="http://www.w3.org/2000/svg" height="42" width="42" viewBox="0 0 512 512"
				><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
					d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
				/></svg
			>
			<h4>Light or Dark mode</h4>
			<p>
				Shipped with two beautiful color themes, automatically enabled according to the user
				preference.
			</p>
		</div>
	</div>
</div>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 90vh;
		margin: 0;
	}

	h1 {
		text-align: center;
	}
	p {
		text-align: center;
		color: hsl(205, 10%, 50%);
	}

	button {
		margin-top: 1rem;
		width: 15rem;
	}

	i {
		font-size: xx-large;
		margin-right: 1rem;
	}
	span {
		display: flex;
		align-items: center;
		text-align: center;
	}
	.steps {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 90vh;
		margin: 0;
	}

	.features {
		padding-top: 10rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0;
		text-align: center;
	}

	.features p {
		text-align: justify;
	}

	.features h4 {
		padding-top: 1rem;
	}

	@media only screen and (max-width: 767px) {
		.mobile {
			max-width: 25rem;
		}
	}

	/* bouncy arrow */

	.bounce-arrow {
		position: absolute;
		right: 0px;
		bottom: 20px;
		cursor: pointer;
		animation: bounce 2s infinite;
	}

	@keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-15px);
		}
		60% {
			transform: translateY(-10px);
		}
	}
</style>
