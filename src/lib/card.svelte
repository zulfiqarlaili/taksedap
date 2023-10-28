<script>
	export let title = 'Card title';
	export let src = 'https://mymukahblog.files.wordpress.com/2017/03/wp-1489056606391.jpg';
</script>

<article>
	<img {src} alt="Card details" />
	<div class="card-title">{title}</div>
</article>

<style>
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
</style>
