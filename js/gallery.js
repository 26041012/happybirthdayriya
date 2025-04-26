// Gallery functionality
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery-container');
    const filmRoll = document.querySelector('.film-roll');
    
    // Gallery data with all photos and split text captions
    const galleryData = [
        {
            image: "assets/gallery/IMG-20250426-WA0011.jpg",
            caption: "YOU"
        },
        {
            image: "assets/gallery/IMG-20250426-WA0010.jpg",
            caption: "that YOU is Riya"
        },
        {
            image: "assets/gallery/IMG-20250426-WA0009.jpg",
            caption: "youre fucking pretty"
        },
        {
            image: "assets/gallery/IMG-20250426-WA0008.jpg",
            caption: "you smell soo gooodd"
        },
        {
            image: "assets/gallery/IMG-20250426-WA0007.jpg",
            caption: "your voice aaaajfiojjf"
        },
        {
            image: "assets/gallery/IMG-20250426-WA0006.jpg",
            caption: "your maturity"
        },
        {
            image: "assets/gallery/IMG-20250426-WA0005.jpg",
            caption: "you are dependable"
        },
        {
            image: "assets/gallery/IMG-20250426-WA0004.jpg",
            caption: "you are cutee af"
        },
        {
            image: "assets/gallery/IMG-20250426-WA0003.jpg",
            caption: '"aree yaar pareshan mt kro" sounds cute'
        },
        {
            image: "assets/gallery/IMG-20250425-WA0026.jpg",
            caption: "you are a good listener"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0025.jpg",
            caption: "i feel safe around you"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0024.jpg",
            caption: "you dont judge (questionable)"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0023.jpg",
            caption: "your smile is the best in business"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0022.jpg",
            caption: "good kisser (hehe)"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0021.jpg",
            caption: "you always take my stand in front of others"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0019.jpg",
            caption: "make me feel that somebody has my back"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0018.jpg",
            caption: "you are smart (me dumb)"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0017.jpg",
            caption: "pahadi aakho vali ho"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0016.jpg",
            caption: "you never leave me when you know I'm hurting"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0015.jpg",
            caption: "you push yourself from your comfort zone for me"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0014.jpg",
            caption: "you are kind (haa tu hai)"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0013.jpg",
            caption: "your bitching is cute too"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0012.jpg",
            caption: "your sleepy face (chef kiss)"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0009.jpg",
            caption: "the way you will keep yourself up all night taki jo kaam shuru kiya hai vo khtm krdu :)"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0008.jpg",
            caption: "every actions that you do make me want to aggressively pamper you"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0007.jpg",
            caption: "i love you for who you are"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0005.jpg",
            caption: "you made the checklist and you ticked all of them"
        },
        {
            image: "assets/gallery/IMG-20250413-WA0061.jpg",
            caption: "The memories we make..."
        },
        {
            image: "assets/gallery/IMG-20250413-WA0024.jpg",
            caption: "are my core memories..."
        },
        {
            image: "assets/gallery/Screenshot 2024-05-02 085244.png",
            caption: "for the rest of my life"
        },
        {
            image: "assets/gallery/Screenshot 2024-09-25 014309.png",
            caption: "Thank you for being in my life"
        },
        {
            image: "assets/gallery/Screenshot 2024-08-13 005728.png",
            caption: "I feel so proud and content..."
        },
        {
            image: "assets/gallery/Screenshot 2024-08-06 211312.png",
            caption: "knowing that you are the one I am together with"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0006.jpg",
            caption: "You are the bestest thing that has ever happened to me ❤️"
        }
    ];

    // Create gallery content
    galleryData.forEach((item, index) => {
        const frame = document.createElement('div');
        frame.className = 'film-frame';
        
        const image = document.createElement('img');
        image.className = 'film-image';
        image.src = item.image;
        image.alt = item.caption;
        image.loading = 'lazy';
        
        const caption = document.createElement('div');
        caption.className = 'film-caption';
        caption.style.fontFamily = 'var(--font-primary)';
        caption.style.fontSize = '1.2rem';
        caption.style.color = 'var(--primary-color)';
        caption.style.padding = '1rem';
        caption.style.background = 'rgba(255, 255, 255, 0.9)';
        caption.style.borderRadius = '10px';
        caption.style.margin = '1rem 0';
        caption.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        caption.textContent = item.caption;
        
        frame.appendChild(image);
        frame.appendChild(caption);
        filmRoll.appendChild(frame);
    });

    // Add navigation dots
    const nav = document.createElement('div');
    nav.className = 'gallery-nav';
    
    galleryData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToImage(index));
        nav.appendChild(dot);
    });
    
    galleryContainer.appendChild(nav);

    // Add progress bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'gallery-progress';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressContainer.appendChild(progressBar);
    galleryContainer.appendChild(progressContainer);

    // Smooth scrolling function with easing
    function scrollToImage(index) {
        const targetScroll = index * filmRoll.offsetWidth;
        const startScroll = filmRoll.scrollLeft;
        const distance = targetScroll - startScroll;
        const duration = 800; // Increased duration for smoother animation
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function for smoother animation
            const easeInOutCubic = progress => progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            const run = easeInOutCubic(progress);
            filmRoll.scrollLeft = startScroll + (distance * run);

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // Update progress and dots
    function updateProgress() {
        const totalWidth = filmRoll.scrollWidth - filmRoll.offsetWidth;
        const progress = (filmRoll.scrollLeft / totalWidth) * 100;
        progressBar.style.width = `${progress}%`;

        const currentIndex = Math.round(filmRoll.scrollLeft / filmRoll.offsetWidth);
        document.querySelectorAll('.nav-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Add touch swipe support with smooth animation
    let touchStartX = 0;
    let touchEndX = 0;
    let currentIndex = 0;

    filmRoll.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    filmRoll.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchEndX - touchStartX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex > 0) {
                // Swipe right
                currentIndex--;
                scrollToImage(currentIndex);
            } else if (diff < 0 && currentIndex < galleryData.length - 1) {
                // Swipe left
                currentIndex++;
                scrollToImage(currentIndex);
            }
        }
    }

    // Update progress on scroll
    filmRoll.addEventListener('scroll', () => {
        requestAnimationFrame(updateProgress);
    });

    // Initial progress update
    updateProgress();
}); 