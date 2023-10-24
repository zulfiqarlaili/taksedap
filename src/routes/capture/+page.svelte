<script lang="ts">
	import { onMount } from 'svelte';
	import { ImageEncoder } from 'svelte-image-input';

	let imageURL: string | null = null;
	let url: string

	function openCamera() {
		const inputElement = document.getElementById('cameraInput') as HTMLInputElement;
		inputElement.click();
	}

	function handleFileSelect(event: any) {
		const inputElement = event.target as HTMLInputElement;
		const selectedFile = inputElement.files?.[0];

		if (selectedFile) {
			const fileURL = URL.createObjectURL(selectedFile);
			imageURL = fileURL;
		}
	}

	onMount(() => {
		const inputElement = document.getElementById('cameraInput') as HTMLInputElement;
		inputElement.accept = 'image/*';
		openCamera()
	});
</script>

<h3>Add new 'tak sedap' store</h3>
<!-- <button on:click={openCamera}>Open Camera</button> -->
<input
	type="file"
	accept="image/*"
	id="cameraInput"
	style="display: none"
	on:change={handleFileSelect}
/>
{#if imageURL}
	<div class="image-container">
		<ImageEncoder
		bind:url
		src={imageURL}
		quality={0.7}
		width={1000}
		height={1000}
		realTime={true}
		crossOrigin={false}
		classes='test'
		showCompressedResult={false}
		/>
	</div>
	<br />
	<p>Size ({url && (url.length/(1024 * 1024)).toFixed(2)} MB):</p>
{/if}
<input type="text" placeholder="Made-up or real store name" />
<textarea
  placeholder="Why tak sedap">
</textarea>

<style>
	:global(.test){
		width: 100%;
		height: 100%;
	}
	.image-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
