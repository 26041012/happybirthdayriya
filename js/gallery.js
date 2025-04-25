// Gallery functionality
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.film-roll');
    
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

    // Create film frames
    galleryData.forEach((item, index) => {
        const filmFrame = document.createElement('div');
        filmFrame.className = 'film-frame';
        
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.caption;
        image.loading = 'lazy'; // Add lazy loading for better performance
        
        const caption = document.createElement('div');
        caption.className = 'film-caption';
        caption.textContent = item.caption;
        
        filmFrame.appendChild(image);
        filmFrame.appendChild(caption);
        galleryContainer.appendChild(filmFrame);
    });

    // Add scroll indicators
    const scrollLeft = document.createElement('button');
    scrollLeft.className = 'scroll-indicator left';
    scrollLeft.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    const scrollRight = document.createElement('button');
    scrollRight.className = 'scroll-indicator right';
    scrollRight.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    galleryContainer.parentElement.insertBefore(scrollLeft, galleryContainer);
    galleryContainer.parentElement.appendChild(scrollRight);

    // Add scroll functionality
    scrollLeft.addEventListener('click', () => {
        galleryContainer.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });

    scrollRight.addEventListener('click', () => {
        galleryContainer.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });

    // Add touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    galleryContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    galleryContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
            galleryContainer.scrollBy({
                left: swipeDistance > 0 ? -300 : 300,
                behavior: 'smooth'
            });
        }
    }
}); 