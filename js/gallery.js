// Gallery functionality
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery-container');
    const filmRoll = document.querySelector('.film-roll');
    
    // Gallery data with all photos and split text captions
    const galleryData = [
        {
            image: "assets/gallery/IMG-20250426-WA0011.jpg",
            caption: "To..."
        },
        {
            image: "assets/gallery/IMG-20250426-WA0010.jpg",
            caption: "the bestest..."
        },
        {
            image: "assets/gallery/IMG-20250426-WA0009.jpg",
            caption: "person of my life..."
        },
        {
            image: "assets/gallery/IMG-20250426-WA0008.jpg",
            caption: "Thank you so much..."
        },
        {
            image: "assets/gallery/IMG-20250426-WA0007.jpg",
            caption: "for staying with me."
        },
        {
            image: "assets/gallery/IMG-20250426-WA0006.jpg",
            caption: "Even though..."
        },
        {
            image: "assets/gallery/IMG-20250426-WA0005.jpg",
            caption: "I am really possessive..."
        },
        {
            image: "assets/gallery/IMG-20250426-WA0004.jpg",
            caption: "and insecure..."
        },
        {
            image: "assets/gallery/IMG-20250426-WA0003.jpg",
            caption: "Well why wouldn't I be?"
        },
        {
            image: "assets/gallery/IMG-20250425-WA0026.jpg",
            caption: "I pulled someone..."
        },
        {
            image: "assets/gallery/IMG-20250425-WA0025.jpg",
            caption: "who's out of my league."
        },
        {
            image: "assets/gallery/IMG-20250425-WA0024.jpg",
            caption: "Can't let anyone..."
        },
        {
            image: "assets/gallery/IMG-20250425-WA0023.jpg",
            caption: "try on you."
        },
        {
            image: "assets/gallery/IMG-20250425-WA0022.jpg",
            caption: "Your smile..."
        },
        {
            image: "assets/gallery/IMG-20250425-WA0021.jpg",
            caption: "your nature..."
        },
        {
            image: "assets/gallery/IMG-20250425-WA0019.jpg",
            caption: "I love everything..."
        },
        {
            image: "assets/gallery/IMG-20250425-WA0018.jpg",
            caption: "about you."
        },
        {
            image: "assets/gallery/IMG-20250425-WA0017.jpg",
            caption: "The memories..."
        },
        {
            image: "assets/gallery/IMG-20250425-WA0016.jpg",
            caption: "that we make..."
        },
        {
            image: "assets/gallery/IMG-20250425-WA0015.jpg",
            caption: "are my core memories..."
        },
        {
            image: "assets/gallery/IMG-20250425-WA0014.jpg",
            caption: "for the rest of my life."
        },
        {
            image: "assets/gallery/IMG-20250425-WA0013.jpg",
            caption: "Thank you for taking..."
        },
        {
            image: "assets/gallery/IMG-20250425-WA0012.jpg",
            caption: "that sweet 1 year..."
        },
        {
            image: "assets/gallery/IMG-20250425-WA0009.jpg",
            caption: "for saying yes..."
        },
        {
            image: "assets/gallery/IMG-20250425-WA0008.jpg",
            caption: "Thank you for saying..."
        },
        {
            image: "assets/gallery/IMG-20250425-WA0007.jpg",
            caption: '"Btao kya hua..."'
        },
        {
            image: "assets/gallery/IMG-20250425-WA0006.jpg",
            caption: '"me sunn rhi hu"'
        },
        {
            image: "assets/gallery/IMG-20250425-WA0005.jpg",
            caption: "Thank you for..."
        },
        {
            image: "assets/gallery/IMG-20250413-WA0061.jpg",
            caption: "holding my hand."
        },
        {
            image: "assets/gallery/IMG-20250413-WA0024.jpg",
            caption: "whenever I looked tired."
        },
        {
            image: "assets/gallery/Screenshot 2024-05-02 085244.png",
            caption: "You are literally..."
        },
        {
            image: "assets/gallery/Screenshot 2024-09-25 014309.png",
            caption: "the bestest human being alive."
        },
        {
            image: "assets/gallery/Screenshot 2024-08-13 005728.png",
            caption: "I feel so proud and content..."
        },
        {
            image: "assets/gallery/Screenshot 2024-08-06 211312.png",
            caption: "knowing that you are the one I am together with ❤️"
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

    // Smooth scrolling function
    function scrollToImage(index) {
        const targetScroll = index * filmRoll.offsetWidth;
        filmRoll.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
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

    // Add touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    filmRoll.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    filmRoll.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchEndX - touchStartX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe right
                filmRoll.scrollBy({
                    left: -filmRoll.clientWidth,
                    behavior: 'smooth'
                });
            } else {
                // Swipe left
                filmRoll.scrollBy({
                    left: filmRoll.clientWidth,
                    behavior: 'smooth'
                });
            }
        }
    }

    // Update progress on scroll
    filmRoll.addEventListener('scroll', () => {
        updateProgress();
    });

    // Initial progress update
    updateProgress();
}); 