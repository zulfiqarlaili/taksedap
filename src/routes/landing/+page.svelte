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
<div class="steps">
	<div style="text-align:center; padding-bottom:2rem">
		<h2>3 Easy Steps to Make a Difference!</h2>
	</div>
	<ul>
		<div>
			<span
				><i class="fa-regular fa-magnifying-glass-location" /> If you found 'tak sedap' spot</span
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
			<svg
				fill="#000000"
				width="64px"
				height="64px"
				viewBox="-576 -576 3072.00 3072.00"
				xmlns="http://www.w3.org/2000/svg"
				><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				/><g id="SVGRepo_iconCarrier">
					<path
						d="M213.333 960c0-167.36 56-321.707 149.44-446.4L1406.4 1557.227c-124.693 93.44-279.04 149.44-446.4 149.44-411.627 0-746.667-335.04-746.667-746.667m1493.334 0c0 167.36-56 321.707-149.44 446.4L513.6 362.773c124.693-93.44 279.04-149.44 446.4-149.44 411.627 0 746.667 335.04 746.667 746.667M960 0C429.76 0 0 429.76 0 960s429.76 960 960 960 960-429.76 960-960S1490.24 0 960 0"
						fill-rule="evenodd"
					/>
				</g></svg
			>
			<h4>No login needed</h4>
			<p>
				Enjoy hassle-free participation! Contribute to the 'Tak Sedap' community without the need
				for any login credentials. Your input, your way
			</p>
		</div>
		<div class="mobile">
			<svg
				fill="#000000"
				width="64px"
				height="64px"
				viewBox="-6.4 -6.4 28.80 28.80"
				xmlns="http://www.w3.org/2000/svg"
				><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				/><g id="SVGRepo_iconCarrier">
					<g>
						<path
							d="M1,15h1.8V6H1Zm12.6-9.38H10L10.64,4a3.31,3.31,0,0,0,.21-1.76A2.72,2.72,0,0,0,10.21.87,2.77,2.77,0,0,0,9.54.31,1.17,1.17,0,0,0,8.65,0,1,1,0,0,0,8,.66c-.11.29-.22.59-.34.88l-.57,1.4L4,6v9h7.11a1.82,1.82,0,0,0,1.61-1l1.94-3.68A3,3,0,0,0,15,8.94V7.07A1.42,1.42,0,0,0,13.61,5.62Z"
						/>
					</g>
				</g></svg
			>
			<h4>Voting system</h4>
			<p>
				Have a say in the tastiness rating! Utilize our intuitive voting system to express your
				preferences. Like or dislike, your opinion matters!
			</p>
		</div>
		<div class="mobile">
			<svg
				width="64px"
				height="64px"
				viewBox="-4.8 -4.8 57.60 57.60"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				/><g id="SVGRepo_iconCarrier">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M23.4236 41.8172C23.424 41.8174 23.4243 41.8176 24 41L23.4236 41.8172ZM24.5764 41.8172L24.58 41.8146L24.5891 41.8082L24.6209 41.7854C24.6482 41.7658 24.6875 41.7374 24.7379 41.7004C24.8387 41.6263 24.9842 41.5178 25.1681 41.3765C25.5357 41.0938 26.0571 40.6794 26.6811 40.1459C27.9277 39.08 29.5908 37.5328 31.2565 35.6059C34.5639 31.7799 38 26.3195 38 20.0769C38 16.3454 36.5264 12.7655 33.9016 10.1251C31.2765 7.48454 27.7149 6 24 6C20.2851 6 16.7235 7.48454 14.0984 10.1251C11.4736 12.7655 10 16.3454 10 20.0769C10 26.3195 13.4361 31.7799 16.7435 35.6059C18.4092 37.5328 20.0723 39.08 21.3189 40.1459C21.9429 40.6794 22.4643 41.0938 22.8319 41.3765C23.0158 41.5178 23.1613 41.6263 23.2621 41.7004C23.3125 41.7374 23.3518 41.7658 23.3791 41.7854L23.4109 41.8082L23.42 41.8146L23.4236 41.8172C23.7689 42.0603 24.2311 42.0603 24.5764 41.8172ZM24 41L24.5764 41.8172C24.576 41.8174 24.5757 41.8176 24 41ZM29 20C29 22.7614 26.7614 25 24 25C21.2386 25 19 22.7614 19 20C19 17.2386 21.2386 15 24 15C26.7614 15 29 17.2386 29 20Z"
						fill="#333333"
					/>
				</g></svg
			>

			<h4>List Nearby</h4>
			<p>
				Discover what's around you! 'Tak Sedap' customizes your experience by listing street food
				spots based on your current location. Explore the flavors nearby with ease.s
			</p>
		</div>
		<div class="mobile">
			<svg
				width="64px"
				height="64px"
				viewBox="-14.4 -14.4 76.80 76.80"
				xmlns="http://www.w3.org/2000/svg"
				fill="#000000"
				><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				/><g id="SVGRepo_iconCarrier">
					<title>dark-mode-solid</title>
					<g id="Layer_2" data-name="Layer 2">
						<g id="Icons">
							<g>
								<rect width="48" height="48" fill="none" />
								<g>
									<path d="M14,24A10,10,0,0,0,24,34V14A10,10,0,0,0,14,24Z" />
									<path
										d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM6,24A18.1,18.1,0,0,1,24,6v8a10,10,0,0,1,0,20v8A18.1,18.1,0,0,1,6,24Z"
									/>
								</g>
							</g>
						</g>
					</g>
				</g></svg
			>
			<h4>Light or Dark mode</h4>
			<p>
				Shipped with two beautiful color themes, automatically enabled according to the user
				preference.
			</p>
		</div>
	</div>
</div>

<!-- <div>
    <div style="background-color: #2c3e50; color: #ecf0f1; text-align: center; padding: 1em;">
        <h1>'Tak Sedap' - Street Food Guide</h1>
    </div>

    <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2>Welcome to 'Tak Sedap'!</h2>
        <p>Discover a street food adventure like never before. 'Tak Sedap' is your guide to avoiding less-than-tasty spots. Here's what we offer:</p>

        <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 10px;">Find and avoid unpleasant street food spots.</li>
            <li style="margin-bottom: 10px;">No login required to contribute and add new stores.</li>
            <li style="margin-bottom: 10px;">List based on stores near your location using geolocation.</li>
            <li style="margin-bottom: 10px;">Vote for existing stores with a like or dislike.</li>
        </ul>

        <p>Ready to enhance your street food experience? Be a part of the 'Tak Sedap' community now!</p>
        
        <a href="#" style="display: block; width: 100%; padding: 10px; background-color: #3498db; color: #fff; text-align: center; text-decoration: none; border-radius: 5px; transition: background-color 0.3s ease;" onmouseover="this.style.backgroundColor='#2980b9'" onmouseout="this.style.backgroundColor='#3498db'">Start Exploring</a>
    </div>
</div> -->

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

	@media only screen and (max-width: 767px) {
		.mobile {
			max-width: 25rem;
		}
	}
</style>
