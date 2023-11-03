let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0
}

export const lazyLoad = (image, src) => {
    const loaded = () => {
        image.classList.add('visible')
    }
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            // replace placeholder src with the image src on observe
            image.src = src
            // check if instantly loaded
            if (image.complete) {
                loaded()
            } else {
                // if the image isn't loaded yet, add an event listener
                image.addEventListener('load', loaded)
            }
        }
    }, options)
    // intersection observer
    observer.observe(image)

    return {
        destroy() {
            // clean up the event listener
            image.removeEventListener('load', loaded)
        }
    }
}