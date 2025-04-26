// Reasons Data
const reasons = [
    "YOU",
    "that YOU is Riya",
    "youre fucking pretty",
    "you smell soo gooodd",
    "your voice aaaajfiojjf",
    "your maturity",
    "you are dependable",
    "you are cutee af",
    '"aree yaar pareshan mt kro" sounds cute',
    "you are a good listener",
    "i feel safe around you",
    "you dont judge (questionable)",
    "your smile is the best in business",
    "good kisser (hehe)",
    "you always take my stand in front of others",
    "make me feel that somebody has my back",
    "you are smart (me dumb)",
    "pahadi aakho vali ho",
    "you never leave me when you know I'm hurting",
    "you push yourself from your comfort zone for me",
    "you are kind (haa tu hai)",
    "your bitching is cute too",
    "your sleepy face (chef kiss)",
    "the way you will keep yourself up all night taki jo kaam shuru kiya hai vo khtm krdu :)",
    "every actions that you do make me want to aggressively pamper you",
    "i love you for who you are",
    "you made the checklist and you ticked all of them"
];

let currentReasonIndex = 0;
const reasonDisplay = document.getElementById('reason-display');
const heartButton = document.getElementById('heart-button');
let heartCount = 0;
let hearts = [];

// Display a new reason
function displayNewReason() {
    reasonDisplay.style.opacity = '0';
    
    setTimeout(() => {
        reasonDisplay.textContent = reasons[currentReasonIndex];
        reasonDisplay.style.opacity = '1';
        
        currentReasonIndex = (currentReasonIndex + 1) % reasons.length;

        // If it's the last reason, create extra hearts
        if (currentReasonIndex === reasons.length - 1) {
            createHeartExplosion();
        }
    }, 500);
}

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(heart);
    hearts.push(heart);

    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
            hearts = hearts.filter(h => h !== heart);
        }
    }, 5000);
}

function createHeartExplosion() {
    // Create many hearts for the explosion effect
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 100); // Stagger the creation for a more natural effect
    }
}

function showMessage() {
    const message = document.createElement('div');
    message.className = 'heart-overflow-message';
    message.textContent = 'Saans lene de! 🫣';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    message.style.padding = '20px';
    message.style.borderRadius = '10px';
    message.style.fontSize = '24px';
    message.style.zIndex = '1000';
    document.body.appendChild(message);

    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 3000);
}

heartButton.addEventListener('click', () => {
    heartCount++;
    displayNewReason(); // Display new reason on each click
    
    // Create multiple hearts with aggressive scaling
    const baseHearts = 15; // Higher minimum hearts per click
    const additionalHearts = Math.min(heartCount * 5, 35); // Much more aggressive scaling, higher max
    const totalHearts = baseHearts + additionalHearts;
    
    for (let i = 0; i < totalHearts; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 30); // Faster creation for more intense effect
    }

    // If too many hearts, show message
    if (hearts.length > 200) { // Higher threshold
        showMessage();
        // Clear some hearts
        hearts.forEach(heart => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        });
        hearts = [];
        heartCount = 0; // Reset heart count
    }
});

// Add CSS for floating hearts
const style = document.createElement('style');
style.textContent = `
    .floating-heart {
        position: fixed;
        z-index: 999;
        animation: floatUp linear forwards;
        pointer-events: none;
    }

    @keyframes floatUp {
        0% {
            transform: translateY(100vh) rotate(0deg) scale(1);
            opacity: 1;
        }
        50% {
            transform: translateY(-50vh) rotate(180deg) scale(1.2);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg) scale(1);
            opacity: 0;
        }
    }

    #reason-display {
        transition: opacity 0.5s ease;
        font-size: 1.5rem;
        text-align: center;
        margin: 1rem 0;
        font-family: var(--font-primary);
        color: var(--primary-color);
    }
`;
document.head.appendChild(style);

// Initialize with first reason
document.addEventListener('DOMContentLoaded', () => {
    reasonDisplay.textContent = reasons[0];
}); 