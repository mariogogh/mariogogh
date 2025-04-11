
document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.createElement("div");
    loadingScreen.id = "loading-screen";

    const loadingImagesContainer = document.createElement("div");
    loadingImagesContainer.id = "loading-images";

    const loadingPercentage = document.createElement("h1");
    loadingPercentage.id = "loading-percentage";
    loadingPercentage.textContent = "0%";

    const imageUrls = [
        "https://github.com/mariogogh/mariogogh/blob/gh-pages/Images/random/image_top_mariogogh.jpg?raw=true",
        "https://github.com/mariogogh/mariogogh/blob/gh-pages/Images/random/image_bottom_mariogogh.jpg?raw=true",
        "https://github.com/mariogogh/mariogogh/blob/gh-pages/Images/Thumbs/image_creditas_02.gif?raw=true",
        "https://github.com/mariogogh/mariogogh/blob/gh-pages/Images/Thumbs/image_itau_02.gif?raw=true",
        "https://github.com/mariogogh/mariogogh/blob/gh-pages/Images/Thumbs/image_ambev_02.gif?raw=true"
    ];

    let loadedImages = 0;

    imageUrls.forEach((url, index) => {
        const img = document.createElement("img");
        img.src = url;
        img.className = "loading-image";
        img.style.width = "300px"; // Fixed size for consistency
        loadingImagesContainer.appendChild(img);

        img.onload = () => {
            loadedImages++;
            const percentage = Math.round((loadedImages / imageUrls.length) * 100);
            loadingPercentage.textContent = `${percentage}%`;

            setTimeout(() => {
                img.classList.add("visible");
                setTimeout(() => {
                    img.classList.remove("visible");
                }, 300); // Quickly hide the image after it appears
            }, index * 400); // Show images one by one quickly
        };
    });

    loadingScreen.appendChild(loadingImagesContainer);
    loadingScreen.appendChild(loadingPercentage);
    document.body.appendChild(loadingScreen);

    setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, imageUrls.length * 400 + 500); // Remove loading screen after all images are shown
});
