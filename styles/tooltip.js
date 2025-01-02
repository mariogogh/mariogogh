const gridItems = document.querySelectorAll(".grid-item_2");
const preview = document.querySelector(".image-preview");

gridItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        const imageUrl = item.getAttribute("data-image");
        preview.style.backgroundImage = `url(${imageUrl})`;
        preview.style.opacity = "1";

        // Get the position of the grid item
        const itemRect = item.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2;
        const itemCenterY = itemRect.top + itemRect.height / 2;
        preview.style.left = `${itemCenterX + window.scrollX}px`;
        preview.style.top = `${itemCenterY + window.scrollY}px`;
        preview.style.transform = "translate(-50%, -50%)"; // Center the preview
    });

    item.addEventListener("mouseleave", () => {
        preview.style.opacity = "0";
    });

    item.addEventListener("mousemove", (e) => {
        const mouseX = e.pageX + 10; // Adjust for closer position
        const mouseY = e.pageY + 10; // Adjust for closer position
        preview.style.left = `${mouseX}px`;
        preview.style.top = `${mouseY}px`;
    });
});