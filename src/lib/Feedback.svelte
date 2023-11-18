<script lang="ts">
	import { PUBLIC_TABLE_NAME_FEEDBACK } from '$env/static/public';
	import { supabase } from './supabaseClient';

	let feedbackText: string = '';
	let isButtonDisabled: boolean = true;
	export let isOpen = false;

	async function handleButtonClick(): Promise<void> {
		if (feedbackText.length > 3) {
			const { data, error } = await supabase
				.from(PUBLIC_TABLE_NAME_FEEDBACK)
				.insert([{ feedback: feedbackText }])
				.select();

			if (error) {
				console.log(error);
				handleCloseDialog()
			}
			if (data) {
				handleCloseDialog()
				feedbackText = '';
			}
		}
	}

	function handleCloseDialog(){
		isOpen = false
	}

	function handleTextAreaInput(event: any): void {
		feedbackText = (event.target as HTMLTextAreaElement).value;
		isButtonDisabled = feedbackText.length <= 3;
	}
</script>

{#if isOpen}
	<dialog open>
		<article>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-missing-attribute -->
			<!-- svelte-ignore a11y-missing-content -->
			<a on:click={handleCloseDialog} class="close" />
			<p>
				<strong>Feedback!</strong>
			</p>
			<textarea
				bind:value={feedbackText}
				placeholder="We're not mind readers, so spill the tea! Your thoughts are like VIP access – we need 'em..."
				aria-label="Professional short bio"
				on:input={handleTextAreaInput}
				aria-invalid={isButtonDisabled}
			/>
			<button on:click={handleButtonClick} disabled={isButtonDisabled}> Spill the Tea </button>
		</article>
	</dialog>
{/if}

<style>
	article {
		border-radius: 1rem;
	}
	p {
		text-align: center;
	}
	button {
		width: 100%;
	}
</style>
