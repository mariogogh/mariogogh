
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".button");
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetUrl = this.href;

            const transitionOverlay = document.createElement("div");
            transitionOverlay.style.position = "fixed";
            transitionOverlay.style.top = "0";
            transitionOverlay.style.left = "0";
            transitionOverlay.style.width = "100%";
            transitionOverlay.style.height = "100%";
            transitionOverlay.style.backgroundColor = "black";
            transitionOverlay.style.zIndex = "9999";
            transitionOverlay.style.opacity = "0";
            transitionOverlay.style.transition = "opacity 0.5s ease";

            document.body.appendChild(transitionOverlay);

            setTimeout(() => {
                transitionOverlay.style.opacity = "1";
            }, 10);

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500);
        });
    });
});
