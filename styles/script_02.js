let attached = false;

let imageContainer = document.querySelector("#image_projeto");

const followMouse = (event) => {
    imageContainer.style.left = event.x + "px";
    imageContainer.style.top = event.y + "px";
}

function showImage() {
    if (!attached) {
        attached = true;
        imageContainer.style.display = "block";
        document.addEventListener("pointermove", followMouse);
    }
}

function hideImage() {
    attached = false;
    imageContainer.style.display = "";
    document.removeEventListener("pointermove", followMouse);
}