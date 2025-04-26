// Main functionality
document.addEventListener('DOMContentLoaded', () => {
    // Background music
    const bgMusic = new Audio('assets/audio/background-music.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.4;

    // Initialize music on page load
    function initMusic() {
        const musicToggle = document.querySelector('.music-toggle');
        
        // Try to play music automatically
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Playback started successfully
                musicToggle.classList.add('playing');
            }).catch(error => {
                // Auto-play was prevented
                console.log("Auto-play prevented:", error);
                musicToggle.classList.remove('playing');
            });
        }

        // Toggle music on button click
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play()
                    .then(() => musicToggle.classList.add('playing'))
                    .catch(console.error);
            } else {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
            }
        });
    }

    // Initialize music when document is ready
    initMusic();

    // Start journey button
    const startButton = document.getElementById('start-journey');
    startButton.addEventListener('click', () => {
        document.getElementById('timeline').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Initialize floating hearts
    createFloatingHearts();
    
    // Auto-play music (optional)
    // backgroundMusic.play();
    // isMusicPlaying = true;
});

// Create Floating Hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const heartIcons = ['💖', '💝', '💗', '💓', '💕', '💘', '💞', '💟', '❣️', '❤️‍🔥'];
    let heartCount = 0;

    function addHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        heart.style.position = 'absolute';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        heart.style.animation = `float ${Math.random() * 5 + 5}s ease-in-out infinite`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.filter = 'drop-shadow(0 0 5px rgba(255, 0, 0, 0.5))';
        heartsContainer.appendChild(heart);
        heartCount++;
    }

    // Add initial hearts
    for (let i = 0; i < 10; i++) {
        addHeart();
    }
}

// Scroll Reveal Animation
const sections = document.querySelectorAll('.section');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
}); 