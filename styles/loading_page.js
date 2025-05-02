document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.createElement("div");
    loadingScreen.id = "loading-screen";

    const loadingImagesContainer = document.createElement("div");
    loadingImagesContainer.id = "loading-images";

    const loadingPercentage = document.createElement("h1");
    loadingPercentage.id = "loading-percentage";
    loadingPercentage.textContent = "0%";

    const allElements = document.querySelectorAll(".All");
    const imageUrls = [

        "images/all/intro.gif",
        "images/all/intro1.gif",
        "images/all/intro2.gif",


    ];

    let loadedElements = 0;
    const totalElements = imageUrls.length + allElements.length;

    const updateLoadingPercentage = () => {
        const percentage = Math.round((loadedElements / totalElements) * 100);
        loadingPercentage.textContent = `${percentage}%`;
    };

    // Load elements with class "All"
    allElements.forEach((element, index) => {
        if (element.tagName === "IMG" || element.tagName === "VIDEO") {
            element.onload = () => {
                loadedElements++;
                updateLoadingPercentage();
            };
            element.onerror = () => {
                loadedElements++;
                updateLoadingPercentage();
            };
        } else {
            loadedElements++;
            updateLoadingPercentage();
        }
    });

    // Load images
    imageUrls.forEach((url, index) => {
        const img = document.createElement("img");
        img.src = url;
        img.className = "loading-image";
        img.style.width = "600px"; // Fixed size for consistency
        loadingImagesContainer.appendChild(img);

        img.onload = () => {
            loadedElements++;
            updateLoadingPercentage();

            setTimeout(() => {
                img.classList.add("visible");
                setTimeout(() => {
                    img.classList.remove("visible");
                }, 300); // Quickly hide the image after it appears
            }, index * 400); // Show images one by one quickly
        };

        img.onerror = () => {
            loadedElements++;
            updateLoadingPercentage();
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
    }, totalElements * 400 + 500); // Remove loading screen after all elements are loaded
});
