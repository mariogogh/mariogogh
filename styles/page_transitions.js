// Function to preload all images and videos on the page
function preloadMedia() {
    const mediaElements = [...document.querySelectorAll('img'), ...document.querySelectorAll('video')];

    mediaElements.forEach((media) => {
        if (media.tagName === 'IMG') {
            const tempImg = new Image();
            tempImg.src = media.src;

            // Add a fallback effect for images that fail to load
            tempImg.onerror = () => {
                media.style.filter = 'blur(5px)';
                media.style.opacity = '0.5';
            };

            tempImg.onload = () => {
                media.style.filter = 'none';
                media.style.opacity = '1';
            };
        } else if (media.tagName === 'VIDEO') {
            media.addEventListener('loadeddata', () => {
                media.style.opacity = '1';
            });

            media.addEventListener('error', () => {
                media.style.filter = 'blur(5px)';
                media.style.opacity = '0.5';
            });

            // Preload video
            media.preload = 'auto';
        }
    });
}

// Use requestIdleCallback for better performance
function onLoad() {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(preloadMedia);
    } else {
        setTimeout(preloadMedia, 0);
    }
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', onLoad);
