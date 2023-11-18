<script lang="ts">

	let currentStep: number = 1;
	export let isOpen = true;

	function handleSwipe(event: TouchEvent) {
		let { clientX: startX } = event.touches[0];
		let moved: boolean = false;

		function handleMove(moveEvent: TouchEvent) {
			const { clientX } = moveEvent.touches[0];
			const deltaX = clientX - startX;

			if (Math.abs(deltaX) > 50) {
				moved = true;
				if (deltaX > 0 && currentStep > 1) {
					currentStep--;
				} else if (deltaX < 0 && currentStep <= 3) {
					currentStep++;
					if (currentStep == 4) {
						isOpen = false;
                localStorage.setItem('isTutorial','false') 
					}
				}
				startX = clientX;
			}
		}

		function handleEnd() {
			window.removeEventListener('touchmove', handleMove);
			window.removeEventListener('touchend', handleEnd);
		}

		window.addEventListener('touchmove', handleMove);
		window.addEventListener('touchend', handleEnd);
	}

	function handleCardClick(event: MouseEvent) {
		const { clientX } = event;
		const cardWidth = (event.currentTarget as HTMLElement).clientWidth;
		const clickPosition = clientX / cardWidth;

		if (clickPosition < 0.5 && currentStep > 1) {
			currentStep--;
		} else if (clickPosition > 0.5 && currentStep <= 3) {
			currentStep++;
			if (currentStep == 4) {
				isOpen = false;
                localStorage.setItem('isTutorial','false') 
			}
		}
	}

</script>

{#if isOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<dialog open>
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<article on:touchstart={handleSwipe} on:click={handleCardClick} style="cursor: pointer;">
			{#if currentStep === 3}
				<!-- svelte-ignore a11y-missing-attribute -->
				<a aria-label="Close" class="close" />
			{/if}
			<p>
				{#if currentStep === 1}
					Spot a store that totally <br> <strong>not worth it</strong>!
				{/if}
				{#if currentStep === 2}
					Contribute! <br>Click +, snap a photo, and share what's <strong>wrong</strong> with the store.
				{/if}
				{#if currentStep === 3}
					Be a food <strong>hero</strong>! <br /> Help people discover the
					<strong>"tak sedap"</strong>
					spots, so they can avoid flavor disasters.
				{/if}
			</p>

			<div class="dot-indicator">
				{#each Array(3) as _, i}
					<div class="dot {currentStep === i + 1 ? 'active-dot' : ''}" />
				{/each}
			</div>
		</article>
	</dialog>
{/if}

<style>
	article {
		max-width: 20rem;
		height: 15rem;
		border-radius: 1rem;
		touch-action: pan-y;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	p {
		text-align: center;
	}

	.dot-indicator {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #ccc;
	}

	.active-dot {
		background-color: #333;
	}

	a {
		position: absolute;
		top: 15%;
		right: 1rem;
	}
</style>
