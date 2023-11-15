<script lang="ts">
	import { onMount } from 'svelte';
	import { ImageEncoder } from 'svelte-image-input';
	import { supabase } from '$lib/supabaseClient';
	import { base64ToFileBody } from '$lib/util';
	import { v4 as uuidv4 } from 'uuid';
	import { goto } from '$app/navigation';
	import {
		PUBLIC_BUCKET_NAME,
		PUBLIC_SUPABASE_STORE_URL,
		PUBLIC_TABLE_NAME
	} from '$env/static/public';

	let imageURL: string | null = null;
	let imageBase64: string;

	let descriptionList = [''];
	let inputPoint = '';

	let latitude: any = null;
	let longitude: any = null;
	let locationError: any = null;

	let storeId: string = '';
	let storeName: string;

	let isLoading: boolean = false;
	let isDisabled: boolean = true;

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

	const removePoint = (itemToRemove: string) => {
		descriptionList = descriptionList.filter((item) => item !== itemToRemove);
		validateInput();
	};

	function addPoint() {
		if (inputPoint) {
			descriptionList = [...descriptionList, inputPoint];
			inputPoint = '';
			scrollToBottom();
			validateInput();
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

	function handleFileSelect(event: any) {
		const inputElement = event.target as HTMLInputElement;
		const selectedFile = inputElement.files?.[0];

		if (selectedFile) {
			imageURL = URL.createObjectURL(selectedFile);
			base64ToFileBody(imageBase64);
		}
	}

	async function handleUploadFile(path: string) {
		const filePath = '/' + path;

		isLoading = true;
		const { data, error } = await supabase.storage
			.from(PUBLIC_BUCKET_NAME)
			.upload(filePath, base64ToFileBody(imageBase64));

		if (error) {
			isLoading = false;
			alert(error.message);
			return null;
		} else {
			isLoading = false;
			return data;
		}
	}
	async function handleSubmit() {
		if (locationError) {
			alert(locationError);
		} else {
			storeId = uuidv4();
			let res = await handleUploadFile(storeId);
			if (res) {
				const insertData = {
					storeId,
					storeName,
					descriptionList: descriptionList.filter((item) => item !== ''),
					url: PUBLIC_SUPABASE_STORE_URL + storeId,
					location: `POINT(${longitude} ${latitude})`
				};
				isLoading = true;
				const { data, error } = await supabase.from(PUBLIC_TABLE_NAME).insert(insertData);
				if (error) {
					isLoading = false;
					alert(error.message);
				} else {
					isLoading = false;
					alert('Submit complete');
					goto('/');
				}
			}
		}
	}

	function validateInput() {
		if (storeName.length > 3 && descriptionList.length > 1 && imageURL) {
			isDisabled = false;
		} else {
			isDisabled = true;
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
				bind:url={imageBase64}
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
		<p>Size ({imageBase64 && (imageBase64.length / (1024 * 1024)).toFixed(2)} MB):</p>
	{/if}
	<input type="text" placeholder="Store name" bind:value={storeName} on:input={validateInput} />
	<small>Or any name that can related to the store</small>
	<div class="add-container">
		<div style="width: 100%; margin-right:1rem">
			<input
				bind:value={inputPoint}
				type="text"
				placeholder="Why tak sedap"
				on:change={addPoint}
				on:input={validateInput}
			/>
			<small>Too expensive (example)</small>
		</div>
		<button class="outline" on:click={addPoint}>+</button>
	</div>

	{#if descriptionList}
		<ul>
			{#each descriptionList as item}
				{#if item}
					<li>
						<span>{item}</span>
						<button on:click={() => removePoint(item)}>&times;</button>
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
	<button class="submit" aria-busy={isLoading} disabled={isDisabled} on:click={handleSubmit}>
		{#if !isLoading}
			Submit
		{:else}
			Please wait…
		{/if}
	</button>
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
		margin-bottom: 4rem;
	}
</style>
