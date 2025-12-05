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

document.addEventListener("DOMContentLoaded", () => {
    const isMobile = () => window.innerWidth <= 768;
    const slideshows = document.querySelectorAll(".slideshow");

    // Lazy load images inside .slideshow
    const lazyLoadImages = () => {
        const images = document.querySelectorAll(".slideshow img[data-src]");
        if ("IntersectionObserver" in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute("data-src");
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback: load all images
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
            });
        }
    };

    // Pause or play slideshow based on visibility
    const handleSlideshowVisibility = () => {
        if (!("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const slideshow = entry.target;
                if (entry.isIntersecting) {
                    slideshow.classList.add("play");
                } else {
                    slideshow.classList.remove("play");
                }
            });
        });

        slideshows.forEach(slideshow => observer.observe(slideshow));
    };

    // Disable autoplay on mobile
    const disableAutoplayOnMobile = () => {
        if (isMobile()) {
            slideshows.forEach(slideshow => {
                slideshow.classList.remove("autoplay");
            });
        }
    };

    // Initialize all
    lazyLoadImages();
    handleSlideshowVisibility();
    disableAutoplayOnMobile();
});


document.addEventListener("DOMContentLoaded", () => {
    const lazyLoadScopedImages = (selectors) => {
        const containers = document.querySelectorAll(selectors.join(","));
        const images = [];

        containers.forEach(container => {
            const scopedImages = container.querySelectorAll("img[data-src]");
            scopedImages.forEach(img => images.push(img));
        });

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute("data-src");
                        obs.unobserve(img);
                    }
                });
            });

            images.forEach(img => observer.observe(img));
        } else {
            // Fallback: just load everything
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
            });
        }
    };

    lazyLoadScopedImages([".Tabs-container", ".GlobalPadding"]);
});


window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', 'G-X3QP882YD6');