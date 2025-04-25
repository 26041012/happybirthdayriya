// Animations functionality
document.addEventListener('DOMContentLoaded', () => {
    // Floating hearts animation
    const floatingHearts = document.querySelector('.floating-hearts');
    const heartIcons = ['💖', '💝', '💗', '💓', '💕', '💘', '💞', '💟', '❣️', '❤️‍🔥'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animation = `float ${Math.random() * 3 + 2}s linear forwards`;
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.filter = 'drop-shadow(0 0 5px rgba(255, 0, 0, 0.5))';
        floatingHearts.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
    
    setInterval(createHeart, 300);
    
    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}); 