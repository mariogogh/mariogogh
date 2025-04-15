document.addEventL</button > istener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let </svg > cntIndex = 0;

    functshowSlide(index) {
        sliderEach((slide, i) => {
            slidele.display = i === index ? 'block' : 'none';
        });


        cumgetElementById('prev').addEventListener('click', () => {
            curredex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            showS(currentIndex);
        });

        documgetElementById('next').addEventListener('click', () => {
            curredex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            showS(currentIndex);
        });

        showS(currentIndex);
    });
