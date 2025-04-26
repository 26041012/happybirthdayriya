document.addEventListener('DOMContentLoaded', () => {
    const musicToggle = document.querySelector('.music-toggle');
    const musicIcon = musicToggle.querySelector('i');
    const srText = musicToggle.querySelector('.sr-only');
    const bgMusic = new Audio('assets/audio/background-music.mp3');
    
    bgMusic.loop = true;
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicIcon.classList.remove('fa-volume-high');
            musicIcon.classList.add('fa-volume-xmark');
            srText.textContent = 'Play music';
        } else {
            bgMusic.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            musicIcon.classList.remove('fa-volume-xmark');
            musicIcon.classList.add('fa-volume-high');
            srText.textContent = 'Mute music';
        }
        isPlaying = !isPlaying;
        musicToggle.classList.toggle('playing');
    });

    // Handle page visibility change to pause music when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isPlaying) {
            bgMusic.pause();
        } else if (!document.hidden && isPlaying) {
            bgMusic.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    });
}); 