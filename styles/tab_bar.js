
document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanels = document.querySelectorAll(".tab-panel");
    const casesDiv = document.querySelector(".cases");
    const allDiv = document.querySelector(".All");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabPanels.forEach(panel => panel.classList.remove("active"));

            // Add active class to the clicked button and corresponding panel
            button.classList.add("active");
            const target = button.getAttribute("data-target");
            document.querySelector(`.${target}`).classList.add("active");

            // Show/hide the All and Cases divs based on the selected tab
            if (target === "all") {
                allDiv.style.display = "block";
                casesDiv.style.display = "none";
            } else if (target === "cases") {
                allDiv.style.display = "none";
                casesDiv.style.display = "block";
            }

            // Preload images in the active tab
            const images = document.querySelectorAll(`.${target} img`);
            images.forEach(img => {
                if (!img.classList.contains("loaded")) {
                    const tempImg = new Image();
                    tempImg.src = img.src;
                    tempImg.onload = () => img.classList.add("loaded");
                }
            });
        });
    });

    // Preload images in the default active tab
    const activeImages = document.querySelectorAll(".tab-panel.active img");
    activeImages.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.src;
        tempImg.onload = () => img.classList.add("loaded");
    });

    // Initialize visibility
    allDiv.style.display = "block";
    casesDiv.style.display = "none";
});
