document.addEventListener("DOMContentLoaded", function () {
    // --- UI Creation ---
    const loadingScreen = document.createElement("div");
    loadingScreen.id = "loading-screen";

    const loadingImagesContainer = document.createElement("div");
    loadingImagesContainer.id = "loading-images";

    const loadingPercentage = document.createElement("h1");
    loadingPercentage.id = "loading-percentage";
    loadingPercentage.textContent = "0%";

    loadingScreen.appendChild(loadingImagesContainer);
    loadingScreen.appendChild(loadingPercentage);
    document.body.appendChild(loadingScreen);

    // --- Media Sources ---
    const imageUrls = [
        "images/all/intro1.gif",
        "images/all/intro2.gif",
        "images/all/intro.gif",
    ];
    const allElements = Array.from(document.querySelectorAll(".All"));

    // --- State ---
    let loadedElements = 0;
    const totalElements = imageUrls.length + allElements.length;
    let finished = false;

    // --- UI Update ---
    function updateLoadingPercentage() {
        const percentage = Math.round((loadedElements / totalElements) * 100);
        loadingPercentage.textContent = `${percentage}%`;
    }

    // --- Fallback Timer ---
    let fallbackTimeout = null;
    function scheduleFallback() {
        if (fallbackTimeout) clearTimeout(fallbackTimeout);
        fallbackTimeout = setTimeout(removeLoadingScreen, 8000); // 8s fallback
    }

    // --- Remove Loading Screen ---
    function removeLoadingScreen() {
        if (finished) return;
        finished = true;
        loadingScreen.style.opacity = "0";
        setTimeout(() => loadingScreen.remove(), 500);
    }

    // --- Preload Media ---
    function preloadMedia(element, onLoad) {
        let isLoaded = false;
        function done() {
            if (isLoaded) return;
            isLoaded = true;
            loadedElements++;
            updateLoadingPercentage();
            onLoad && onLoad();
        }

        if (element.tagName === "IMG") {
            if (element.complete) {
                done();
            } else {
                element.addEventListener("load", done, { once: true });
                element.addEventListener("error", done, { once: true });
            }
        } else if (element.tagName === "VIDEO") {
            if (element.readyState >= 2) {
                done();
            } else {
                element.addEventListener("loadeddata", done, { once: true });
                element.addEventListener("error", done, { once: true });
            }
        } else {
            // Not media, count as loaded
            done();
        }
    }

    // --- Preload All Elements with .All ---
    allElements.forEach(el => preloadMedia(el));

    // --- Preload and Animate Loading GIFs ---
    imageUrls.forEach((url, index) => {
        const img = document.createElement("img");
        img.src = url;
        img.className = "loading-image";
        img.style.width = "600px";
        loadingImagesContainer.appendChild(img);

        preloadMedia(img, () => {
            setTimeout(() => {
                img.classList.add("visible");
                setTimeout(() => img.classList.remove("visible"), 300);
            }, index * 400);
        });
    });

    // --- Watch for Completion ---
    function checkIfDone() {
        if (loadedElements >= totalElements) {
            removeLoadingScreen();
        }
    }

    // --- Observe Progress ---
    const observer = new MutationObserver(checkIfDone);
    observer.observe(loadingPercentage, { childList: true });

    // --- Fallback in case of stuck loading ---
    scheduleFallback();

    // --- Clean up ---
    window.addEventListener("beforeunload", () => {
        observer.disconnect();
        if (fallbackTimeout) clearTimeout(fallbackTimeout);
    });

    // --- Final check in case everything is cached ---
    updateLoadingPercentage();
    checkIfDone();
});
