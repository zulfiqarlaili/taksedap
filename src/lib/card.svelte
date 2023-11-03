<script>
	import { lazyLoad } from './lazyLoad.js'
	export let title = 'Card title';
	export let src = 'https://mymukahblog.files.wordpress.com/2017/03/wp-1489056606391.jpg';
	export let like = false;
	export let dislike = false;
	export let isLoading = false;
</script>

<div class="container">
	{#if isLoading}
		<article class="skeleton-loading">
			<div class="skeleton-title">
			<div class="skeleton-title-inner"/>
			</div>
		</article>
	{:else}
		<article>
			<img use:lazyLoad={src} alt="Card details" />
			<div class="card-title">
				{title}
				<div class="reaction-container">
					<button>
						<i class="fa-solid fa-thumbs-up" style={like ? 'color: #54AFF1' : ''} />
						{Math.floor(Math.random() * 100)}
					</button>
					<button>
						<i class="fa-solid fa-thumbs-down" style={dislike ? 'color:#FF868F' : ''} />
						{Math.floor(Math.random() * 100)}
					</button>
				</div>
			</div>
		</article>
	{/if}
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
	}
	article {
		max-width: 25rem;
		max-height: 25rem;
		position: relative;
		border-radius: 1rem;
		overflow: hidden; /* Hide any overflowing content */
		margin: 0;
		padding: 0;
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
	}
	.reaction-container button:active {
		transform: scale(1.2);
	}

    .skeleton-loading {
        height: 25rem;
        width: 25rem;
        position: relative;
        overflow: hidden;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.2) 100%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
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
		background: linear-gradient(to right, rgba(0, 0, 0, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.2) 100%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
        100% {
            background-position: -200% 0;
        }
    }
</style>
