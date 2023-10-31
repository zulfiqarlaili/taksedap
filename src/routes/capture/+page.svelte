<script lang="ts">
	import { onMount } from 'svelte';
	import { ImageEncoder } from 'svelte-image-input';
	import { supabase } from '$lib/supabaseClient';
	import { base64ToFileBody } from '$lib/util';
	import { v4 as uuidv4 } from "uuid";

	let imageURL: string | null = null;
	let url: string;
	const example = 'Too expensive (example)';
	let pointArray = [example];
	let inputPoint = '';
	let latitude: any = null;
	let longitude: any = null;
	let locationError = null;

	function scrollToBottom() {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth'
		});
	}

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

	const removePoint = (itemToRemove: string) =>
		(pointArray = pointArray.filter((item) => item !== itemToRemove));

	function addPoint() {
		if (inputPoint) {
			removePoint(example);
			pointArray = [...pointArray, inputPoint];
			inputPoint = '';
			scrollToBottom();
		}
	}

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					latitude = position.coords.latitude;
					longitude = position.coords.longitude;
				},
				(err) => {
					locationError = err.message;
				}
			);
		} else {
			locationError = 'Geolocation is not supported by this browser.';
		}
	};

	function submit() {
		uploadFile();
	}

	async function uploadFile() {
		const bucketName = 'storeImage';
		const filePath = '/'+ uuidv4();

		const { data, error } = await supabase.storage.from(bucketName).upload(filePath,base64ToFileBody(url));
		if (error) {
			console.log(error);
		} else {
			console.log(data);
		}
	}

	onMount(() => {
		const inputElement = document.getElementById('cameraInput') as HTMLInputElement;
		inputElement.accept = 'image/*';
		openCamera();
		getLocation();
	});
</script>

<div class="container">
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
				classes="image-place-holder"
				showCompressedResult={false}
			/>
		</div>
		<br />
		<p>Size ({url && (url.length / (1024 * 1024)).toFixed(2)} MB):</p>
	{/if}
	<input type="text" placeholder="Store name" />
	<div class="add-container">
		<input bind:value={inputPoint} type="text" placeholder="Why tak sedap" on:change={addPoint} />
		<button class="outline" on:click={addPoint}>+</button>
	</div>

	{#if pointArray}
		<ul>
			{#each pointArray as item}
				{#if item}
					<li>
						<span>{item}</span>
						<button on:click={() => removePoint(item)}>&times;</button>
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
	<button class="submit" on:click={submit}>Submit</button>
</div>

<style>
	.container {
		max-width: 30rem;
	}
	:global(.image-place-holder) {
		width: 100%;
		height: 100%;
	}
	.image-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.add-container {
		display: flex;
		align-items: baseline;
	}
	.add-container input {
		margin-right: 1rem;
	}
	li button {
		float: right;
		border: none;
		background: transparent;
		padding: 0;
		margin: 0;
		color: #dc4f21;
		font-size: 18px;
		cursor: pointer;
		box-shadow: none;
	}
	li button:hover {
		transform: scale(2);
	}

	.submit {
		width: 100%;
		margin-top: 3rem;
	}
</style>
