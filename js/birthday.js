// Countdown Timer
function updateCountdown() {
    const targetDate = new Date('2024-03-15T00:00:00'); // Set your target date here
    const now = new Date();
    const difference = targetDate - now;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.getElementById('countdown').innerHTML = `
        ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds
    `;
}

// Confetti Animation
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }
    
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// Birthday Message
const birthdayMessage = `
    <h3>Happy Birthday, My Love! 🎉</h3>
    <p>On this special day, I want you to know how much you mean to me...</p>
    <!-- Add your personal message here -->
`;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set up countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Set up confetti button
    document.getElementById('confetti-button').addEventListener('click', createConfetti);
    
    // Set up birthday message
    document.getElementById('birthday-card').innerHTML = birthdayMessage;
}); 