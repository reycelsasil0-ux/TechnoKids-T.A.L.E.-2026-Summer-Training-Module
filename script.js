// --- 1. REVEAL BUTTON LOGIC ---
document.getElementById("revealBtn").addEventListener("click", function() {
    var mainContent = document.getElementById("main-content");
    
    mainContent.style.display = "block";
    setTimeout(function() {
        mainContent.classList.add("visible");
    }, 50);
    
    document.getElementById("reflection").scrollIntoView({ behavior: "smooth" });
    
    this.style.opacity = "0";
    setTimeout(() => { this.style.display = "none"; }, 300); 
});

// --- 2. RESET/HOME LINK LOGIC ---
document.getElementById("homeLink").addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    setTimeout(function() {
        var mainContent = document.getElementById("main-content");
        var revealBtn = document.getElementById("revealBtn");
        
        mainContent.classList.remove("visible");
        mainContent.style.display = "none";
        revealBtn.style.display = "inline-block";
        setTimeout(function() { revealBtn.style.opacity = "1"; }, 50);
    }, 600); 
});

// --- 3. SCROLL TRACKER (Progress Bar, Back to Top, & Active Nav) ---
window.addEventListener('scroll', function() {
    
    // A. Fill the Progress Bar
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";

    // B. Show/Hide Back to Top Button
    var backToTopBtn = document.getElementById("backToTop");
    if (winScroll > 400) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }

    // C. The Laser-Accurate Navigation Tracker
    const navLinks = document.querySelectorAll('.nav a');
    
    // If we are at the very top (Hero Section), clear all highlights
    if (window.scrollY < 200) {
        navLinks.forEach(link => link.classList.remove('active'));
        return; 
    }

    let currentSectionId = "";
    const sections = document.querySelectorAll('.section');
    
    // Scan the screen for which section is currently near the top
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        
        // 300px is the "tripwire" just below your navigation bar
        if (rect.top <= 300) {
            currentSectionId = sec.getAttribute('id');
        }
    });

    // Apply the highlight to the correct word
    if (currentSectionId !== "") {
        navLinks.forEach(link => {
            link.classList.remove('active');
            // If the link matches the section we are looking at, highlight it!
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
});
// --- 4. BACK TO TOP BUTTON CLICK ---
document.getElementById("backToTop").addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// --- 6. LEARNING ACTIVITY CAROUSEL ---
const track = document.getElementById('carouselTrack');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
const totalCards = 3;

function updateCarousel() {
    // Math to slide exactly one card width
    const movePercent = -(currentIndex * (100 / totalCards));
    track.style.transform = `translateX(${movePercent}%)`;
    
    // Update the active dot
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Next Button Click
nextBtn.addEventListener('click', () => {
    if (currentIndex < totalCards - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loops back to the first card
    }
    updateCarousel();
});

// Previous Button Click
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalCards - 1; // Loops to the last card
    }
    updateCarousel();
});

// Clickable Dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// --- 8. CUSTOM AUDIO PLAYER LOGIC ---
const playBtn = document.getElementById('playBtn');
const audio = document.getElementById('visionAudio');
const playIcon = playBtn.querySelector('i');
const progressBar = document.getElementById('audioProgress');
const currentTimeEl = document.getElementById('currentTime');
const audioTrack = document.getElementById('audioTrack');

// 1. Click to Play / Pause
playBtn.addEventListener('click', () => {
    // Check if the audio is paused
    if (audio.paused) {
        audio.play();
        playIcon.classList.replace('fa-play', 'fa-pause'); // Change icon to Pause
    } else {
        audio.pause();
        playIcon.classList.replace('fa-pause', 'fa-play'); // Change icon to Play
    }
});

// 2. Update the Progress Bar and Time as it plays
audio.addEventListener('timeupdate', () => {
    // Avoid calculation errors before the audio loads
    if (!isNaN(audio.duration)) {
        // Move the bar
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percent + '%';

        // Calculate minutes and seconds
        let currentMins = Math.floor(audio.currentTime / 60);
        let currentSecs = Math.floor(audio.currentTime % 60);
        
        // Add a leading zero if seconds are under 10 (e.g., 0:05)
        if (currentSecs < 10) {
            currentSecs = "0" + currentSecs;
        }
        
        currentTimeEl.innerText = currentMins + ":" + currentSecs;
    }
});

// 3. Reset everything when the audio finishes
audio.addEventListener('ended', () => {
    playIcon.classList.replace('fa-pause', 'fa-play');
    progressBar.style.width = '0%';
    currentTimeEl.innerText = '0:00';
});

// 4. Click anywhere on the track to skip ahead!
audioTrack.addEventListener('click', (e) => {
    const trackWidth = audioTrack.clientWidth;
    const clickX = e.offsetX;
    
    // Jump the audio to where the user clicked
    if (!isNaN(audio.duration)) {
        audio.currentTime = (clickX / trackWidth) * audio.duration;
    }
});
const totalTimeEl = document.getElementById('totalTime');

audio.addEventListener('loadedmetadata', () => {
    let mins = Math.floor(audio.duration / 60);
    let secs = Math.floor(audio.duration % 60);

    if (secs < 10) secs = "0" + secs;

    totalTimeEl.innerText = `${mins}:${secs}`;
});