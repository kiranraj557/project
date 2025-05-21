// Step 1: Get DOM elements
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let timeDom = document.querySelector('.carousel .time');

// Move the first thumbnail to the end to allow seamless looping
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

// Timing settings
let timeRunning = 3000;       // duration of transition animation
let timeAutoNext = 7000;      // auto-switch time

// Manual next/prev controls
nextDom.onclick = function () {
    showSlider('next');
};

prevDom.onclick = function () {
    showSlider('prev');
};

// Automatic next slide
let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

// Core function to handle slide transition
function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

    // Pause and reset all videos before switching
    SliderItemsDom.forEach(item => {
        let video = item.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });

    if (type === 'next') {
        // Move first item to end (loop forward)
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        // Move last item to front (loop backward)
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    // Clear animation class after transition
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');

        // Play the currently visible video
        let currentVideo = SliderDom.querySelector('.carousel .list .item:nth-child(1) video');
        if (currentVideo) {
            currentVideo.play();
        }
    }, timeRunning);

    // Restart auto-next timer
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
}
