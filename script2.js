// --- 1. LOGO / HOME LINK LOGIC ---
const homeLink = document.getElementById("homeLink");
if (homeLink) {
    homeLink.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// --- 2. SCROLL TRACKER ---
window.addEventListener('scroll', function() {
    // A. Progress Bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("progressBar");
    if (progressBar) progressBar.style.width = scrolled + "%";

    // B. Back to Top Button
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        if (winScroll > 400) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    }

    // C. Navigation Tracker
    // Note: We only target links that start with # (in-page links)
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    if (window.scrollY < 200) {
        navLinks.forEach(link => link.classList.remove('active'));
        return; 
    }

    let currentSectionId = "";
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 300) {
            currentSectionId = sec.getAttribute('id');
        }
    });

    if (currentSectionId !== "") {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
});

// --- 3. BACK TO TOP CLICK ---
const backToTop = document.getElementById("backToTop");
if (backToTop) {
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// --- 4. CAROUSEL ---
const track = document.getElementById('carouselTrack');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dots = document.querySelectorAll('.dot');

if (track && nextBtn && prevBtn) {
    let currentIndex = 0;
    const totalCards = 3;

    function updateCarousel() {
        const movePercent = -(currentIndex * (100 / totalCards));
        track.style.transform = `translateX(${movePercent}%)`;
        
        dots.forEach(dot => dot.classList.remove('active'));
        if(dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < totalCards - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalCards - 1;
        updateCarousel();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
}

// --- 5. AUDIO PLAYER ---
const playBtn = document.getElementById('playBtn');
const audio = document.getElementById('visionAudio');
const audioTrack = document.getElementById('audioTrack');
const progressBarAudio = document.getElementById('audioProgress');
const currentTimeEl = document.getElementById('currentTime');

if (playBtn && audio) {
    const playIcon = playBtn.querySelector('i');

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            if(playIcon) playIcon.classList.replace('fa-play', 'fa-pause'); 
        } else {
            audio.pause();
            if(playIcon) playIcon.classList.replace('fa-pause', 'fa-play'); 
        }
    });

    audio.addEventListener('timeupdate', () => {
        if (!isNaN(audio.duration)) {
            const percent = (audio.currentTime / audio.duration) * 100;
            if(progressBarAudio) progressBarAudio.style.width = percent + '%';

            let currentMins = Math.floor(audio.currentTime / 60);
            let currentSecs = Math.floor(audio.currentTime % 60);
            if (currentSecs < 10) currentSecs = "0" + currentSecs;
            if(currentTimeEl) currentTimeEl.innerText = currentMins + ":" + currentSecs;
        }
    });

    audio.addEventListener('ended', () => {
        if(playIcon) playIcon.classList.replace('fa-pause', 'fa-play');
        if(progressBarAudio) progressBarAudio.style.width = '0%';
        if(currentTimeEl) currentTimeEl.innerText = '0:00';
    });

    if (audioTrack) {
        audioTrack.addEventListener('click', (e) => {
            const trackWidth = audioTrack.clientWidth;
            const clickX = e.offsetX;
            if (!isNaN(audio.duration)) {
                audio.currentTime = (clickX / trackWidth) * audio.duration;
            }
        });
    }
}

// --- 6. MENTOR SPOTLIGHT DASHBOARD ---
const mentorBtns = document.querySelectorAll('.mentor-tab-btn');
const mentorPanes = document.querySelectorAll('.mentor-content-pane');

if (mentorBtns.length > 0) {
    mentorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Remove the 'active' class from all buttons and screens
            mentorBtns.forEach(b => b.classList.remove('active'));
            mentorPanes.forEach(p => p.classList.remove('active'));
            
            // 2. Add the 'active' class to the button you just clicked
            btn.classList.add('active');
            
            // 3. Find the matching screen ID and make it visible!
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
}