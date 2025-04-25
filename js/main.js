// Main functionality
document.addEventListener('DOMContentLoaded', () => {
    // Background music
    const musicToggle = document.getElementById('music-toggle');
    let backgroundMusic = null;

    function initMusic() {
        backgroundMusic = new Audio('assets/audio/background-music.mp3');
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.5;
        
        // Handle music loading errors
        backgroundMusic.onerror = function() {
            console.log('Background music could not be loaded');
            musicToggle.style.display = 'none';
        };
    }

    musicToggle.addEventListener('click', () => {
        if (!backgroundMusic) {
            initMusic();
        }
        
        if (backgroundMusic.paused) {
            backgroundMusic.play()
                .then(() => {
                    musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                })
                .catch(error => {
                    console.log('Error playing music:', error);
                    musicToggle.style.display = 'none';
                });
        } else {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });

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

    // Add more hearts when clicking the heart button
    const heartButton = document.getElementById('heart-button');
    if (heartButton) {
        heartButton.addEventListener('click', () => {
            for (let i = 0; i < 5; i++) {
                addHeart();
            }
        });
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