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
        "images/all/img_loading.gif",
        "images/all/img_loading2.gif",
        "images/all/img_loading3.gif",
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

    // --- Remove Loading Screen ---
    function removeLoadingScreen() {
        if (finished) return;
        finished = true;
        loadingScreen.style.opacity = "0";
        setTimeout(() => loadingScreen.remove(), 500);
    }

    // --- Fallback Timer ---
    let fallbackTimeout = setTimeout(removeLoadingScreen, 8000);

    // --- Preload Media ---
    function preloadMedia(element, onLoad) {
        let isLoaded = false;
        function done() {
            if (isLoaded) return;
            isLoaded = true;
            loadedElements++;
            updateLoadingPercentage();
            checkIfDone();
            if (onLoad) onLoad();
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
            done(); // não é mídia
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
            clearTimeout(fallbackTimeout);
            removeLoadingScreen();
        }
    }

    // --- Clean up ---
    window.addEventListener("beforeunload", () => {
        clearTimeout(fallbackTimeout);
    });

    // --- Final check in case everything is cached ---
    updateLoadingPercentage();
    checkIfDone();
});
