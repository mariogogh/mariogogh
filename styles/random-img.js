const storeScroll = () => {
    document.documentElement.dataset.scroll = window.scrollY;
};

window.onscroll = (e) => {
    // called when the window is scrolled.
    storeScroll();
};

storeScroll(); // first attempt