// Gallery functionality
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery-container');
    const filmRoll = document.querySelector('.film-roll');
    
    // Gallery data with actual images and captions
    const galleryData = [
        {
            image: 'assets/gallery/IMG-20250425-WA0026.jpg',
            caption: 'Our special moments together'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0025.jpg',
            caption: 'Making memories that last forever'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0024.jpg',
            caption: 'Every moment with you is precious'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0023.jpg',
            caption: 'Your beautiful smile brightens my day'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0022.jpg',
            caption: 'Together we create magic'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0021.jpg',
            caption: 'Cherishing our journey'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0020.jpg',
            caption: 'Your happiness is my happiness'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0019.jpg',
            caption: 'Every day with you is special'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0018.jpg',
            caption: 'Creating beautiful memories'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0017.jpg',
            caption: 'Your love makes everything better'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0016.jpg',
            caption: 'Our story continues'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0015.jpg',
            caption: 'Forever grateful for you'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0014.jpg',
            caption: 'You make every moment special'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0013.jpg',
            caption: 'Our love story'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0012.jpg',
            caption: 'Together we shine'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0011.jpg',
            caption: 'Your presence is my favorite'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0010.jpg',
            caption: 'Making memories together'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0009.jpg',
            caption: 'Our beautiful journey'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0008.jpg',
            caption: 'Every moment with you is golden'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0007.jpg',
            caption: 'Your love is my strength'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0006.jpg',
            caption: 'Creating our story'
        },
        {
            image: 'assets/gallery/IMG-20250425-WA0005.jpg',
            caption: 'Together forever'
        },
        {
            image: 'assets/gallery/IMG-20250413-WA0061.jpg',
            caption: 'Our special bond'
        },
        {
            image: 'assets/gallery/IMG-20250413-WA0024.jpg',
            caption: 'Love that grows stronger every day'
        }
    ];

    // Create gallery content
    galleryData.forEach((item, index) => {
        const filmFrame = document.createElement('div');
        filmFrame.className = 'film-frame';
        
        const image = document.createElement('img');
        image.className = 'film-image';
        image.src = item.image;
        image.alt = item.caption;
        image.loading = 'lazy';
        
        const caption = document.createElement('div');
        caption.className = 'film-caption';
        caption.textContent = item.caption;
        
        filmFrame.appendChild(image);
        filmFrame.appendChild(caption);
        filmRoll.appendChild(filmFrame);
    });

    // Add navigation dots
    const nav = document.createElement('div');
    nav.className = 'gallery-nav';
    
    galleryData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        if (index === 0) dot.classList.add('active');
        nav.appendChild(dot);
    });
    
    galleryContainer.appendChild(nav);

    // Show swipe indicator on first load
    const swipeIndicator = document.createElement('div');
    swipeIndicator.className = 'swipe-indicator';
    swipeIndicator.textContent = 'Swipe to view more →';
    galleryContainer.appendChild(swipeIndicator);

    // Update active dot on scroll
    let timeout;
    filmRoll.addEventListener('scroll', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const index = Math.round(filmRoll.scrollLeft / filmRoll.offsetWidth);
            document.querySelectorAll('.nav-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }, 150);
    });

    // Handle dot clicks
    const dots = nav.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            filmRoll.scrollTo({
                left: index * filmRoll.offsetWidth,
                behavior: 'smooth'
            });
        });
    });

    // Touch handling
    let startX;
    let scrollLeft;

    filmRoll.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - filmRoll.offsetLeft;
        scrollLeft = filmRoll.scrollLeft;
    });

    filmRoll.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const x = e.touches[0].pageX - filmRoll.offsetLeft;
        const walk = (x - startX) * 2;
        filmRoll.scrollLeft = scrollLeft - walk;
    });

    filmRoll.addEventListener('touchend', () => {
        startX = null;
        // Snap to nearest frame
        const index = Math.round(filmRoll.scrollLeft / filmRoll.offsetWidth);
        filmRoll.scrollTo({
            left: index * filmRoll.offsetWidth,
            behavior: 'smooth'
        });
    });
}); 