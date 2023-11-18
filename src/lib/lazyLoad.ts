interface LazyLoadOptions {
	root: null | Element;
	rootMargin: string;
	threshold: number;
  }
  
  const options: LazyLoadOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 0,
  };
  
  export const lazyLoad = (image: HTMLImageElement, src: string): { destroy: () => void } => {
	const placeholderSrc = 'https://placehold.co/600x400';
  
	const loaded = () => {
	  image.classList.add('visible');
	};
  
	const observer = new IntersectionObserver((entries) => {
	  if (entries[0].isIntersecting) {
		// Load placeholder image initially
		image.src = placeholderSrc;
  
		// Replace placeholder src with the image src on observe
		image.src = src;
  
		if (image.complete) {
		  loaded();
		} else {
		  // If the image isn't loaded yet, add an event listener
		  image.addEventListener('load', loaded);
		}
	  }
	}, options);
  
	observer.observe(image);
  
	return {
	  destroy: () => {
		image.removeEventListener('load', loaded);
		observer.disconnect();
	  },
	};
  };
  