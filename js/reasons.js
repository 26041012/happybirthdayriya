// Reasons Data (You can modify this array with your own reasons)
const reasons = [
    "You always make me feel safe.",
    "Your laugh is contagious.",
    "You get excited about the little things.",
    "You understand me like no one else.",
    "Your smile brightens my day.",
    "You're always there when I need you.",
    "You make me want to be a better person.",
    "Your kindness knows no bounds.",
    "You accept me for who I am.",
    "You make every moment special.",
    "Your intelligence inspires me.",
    "You have the most beautiful heart.",
    "You make me feel loved every day.",
    "Your passion is admirable.",
    "You're my best friend.",
    "You make me feel at home.",
    "Your creativity amazes me.",
    "You're my favorite person to talk to.",
    "You make me feel understood.",
    "You're my perfect match."
];

let currentReasonIndex = 0;
const reasonDisplay = document.getElementById('reason-display');
const heartButton = document.getElementById('heart-button');

// Display a new reason
function displayNewReason() {
    reasonDisplay.style.opacity = '0';
    
    setTimeout(() => {
        reasonDisplay.textContent = reasons[currentReasonIndex];
        reasonDisplay.style.opacity = '1';
        
        currentReasonIndex = (currentReasonIndex + 1) % reasons.length;
    }, 500);
}

// Add floating hearts animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.fontSize = `${Math.random() * 20 + 10}px`;
    heart.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out forwards`;
    document.querySelector('.reasons-container').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Heart Button Click Event
heartButton.addEventListener('click', () => {
    displayNewReason();
    createFloatingHeart();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayNewReason();
}); 