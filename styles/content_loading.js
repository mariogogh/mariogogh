document.addEventListener("DOMContentLoaded", function () {
  let images = document.querySelectorAll("img[data-src]");
  let iframes = document.querySelectorAll("iframe[data-src]");
  let videos = document.querySelectorAll("video[data-src]");

  function lazyLoad() {
    images.forEach(img => {
      if (img.getBoundingClientRect().top < window.innerHeight) {
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
      }
    });

    iframes.forEach(iframe => {
      if (iframe.getBoundingClientRect().top < window.innerHeight) {
        iframe.src = iframe.getAttribute("data-src");
        iframe.removeAttribute("data-src");
      }
    });

    videos.forEach(video => {
      if (video.getBoundingClientRect().top < window.innerHeight) {
        video.src = video.getAttribute("data-src");
        video.removeAttribute("data-src");
      }
    });
  }

  lazyLoad();

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
});