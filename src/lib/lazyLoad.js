let options = {
	root: null,
	rootMargin: '0px',
	threshold: 0
};

export const lazyLoad = (image, src) => {
	const placeholderSrc = 'https://placehold.co/600x400'; // Replace 'placeholder.jpg' with your placeholder image URL

	const loaded = () => {
		image.classList.add('visible');
	};

	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			// Load placeholder image initially
			image.src = placeholderSrc;

			// replace placeholder src with the image src on observe
			image.src = src;

			if (image.complete) {
				loaded();
			} else {
				// if the image isn't loaded yet, add an event listener
				image.addEventListener('load', loaded);
			}
		}
	}, options);

	observer.observe(image);

	return {
		destroy() {
			image.removeEventListener('load', loaded);
			observer.disconnect();
		}
	};
};
