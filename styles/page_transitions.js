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


// Function to lazy load images and videos based on user scroll
function lazyLoadMedia() {
    const mediaElements = [...document.querySelectorAll('img[data-src], video[data-src]')];

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const media = entry.target;

                if (media.tagName === 'IMG') {
                    media.src = media.dataset.src;
                    media.removeAttribute('data-src');
                } else if (media.tagName === 'VIDEO') {
                    media.src = media.dataset.src;
                    media.removeAttribute('data-src');
                    media.load();
                }

                observer.unobserve(media);
            }
        });
    });

    mediaElements.forEach((media) => observer.observe(media));
}

// Prioritize loading header and main content
function prioritizeHeaderAndMain() {
    const headerAndMain = document.querySelectorAll('header img[data-src], header video[data-src], main img[data-src], main video[data-src]');

    headerAndMain.forEach((media) => {
        if (media.tagName === 'IMG') {
            media.src = media.dataset.src;
            media.removeAttribute('data-src');
        } else if (media.tagName === 'VIDEO') {
            media.src = media.dataset.src;
            media.removeAttribute('data-src');
            media.load();
        }
    });
}

// Call lazy load and prioritize header/main content
document.addEventListener('DOMContentLoaded', () => {
    prioritizeHeaderAndMain();
    lazyLoadMedia();
});