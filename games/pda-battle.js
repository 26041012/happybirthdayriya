// Game elements
const rotationPrompt = document.getElementById('rotation-prompt');
const promptDoneBtn = document.getElementById('prompt-done');
const gameContainer = document.getElementById('game-container');
const sid = document.getElementById('sid');
const riya = document.getElementById('riya');
const jumpBtn = document.getElementById('jump-btn');
const shootBtn = document.getElementById('shoot-btn');
const gameOver = document.getElementById('game-over');
const resultText = document.getElementById('result-text');
const playAgainBtn = document.getElementById('play-again');

// Audio elements
const backgroundMusic = new Audio('../assets/audio/Rewrite the Stars (16-Bit).mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;

const jumpSound = new Audio('../assets/audio/jump.mp3');
jumpSound.volume = 0.4;

const shootSound = new Audio('../assets/audio/gunshot.mp3');
shootSound.volume = 0.3;

const winSound = new Audio('../assets/audio/riya win.mp3');
winSound.volume = 0.5;

const loseSound = new Audio('../assets/audio/riya lose.mp3');
loseSound.volume = 0.5;

// Game state
let gameActive = false;
let sidHealth = 100;
let riyaHealth = 100;
let canJump = true;
let canShoot = true;
let sidCanJump = true;
let sidCanShoot = true;

// Constants
const JUMP_COOLDOWN = 900; // 0.9 seconds to match the new jump animation
const SHOOT_COOLDOWN = 300; // 0.3 seconds for faster shooting
const DAMAGE = 20;
const BULLET_SPEED = 1000; // 1 second to cross screen

// Initialize game
function initGame() {
    rotationPrompt.classList.remove('hidden');
    gameContainer.classList.add('hidden');
    updateHealthBars();
    requestFullscreen();
}

// Request fullscreen
function requestFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

// Start game
function startGame() {
    rotationPrompt.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    gameActive = true;
    sidHealth = 100;
    riyaHealth = 100;
    updateHealthBars();
    startSidAI();
    backgroundMusic.play().catch(console.error);
    requestFullscreen();
}

// Update health bars
function updateHealthBars() {
    document.querySelector('.sid-health .health-fill').style.width = `${sidHealth}%`;
    document.querySelector('.riya-health .health-fill').style.width = `${riyaHealth}%`;
}

// Character jump function
function jump(character, isRiya = false) {
    if ((isRiya && !canJump) || (!isRiya && !sidCanJump)) return;
    
    character.classList.add('jumping');
    jumpSound.currentTime = 0;
    jumpSound.play().catch(console.error);
    
    if (isRiya) {
        canJump = false;
        // Don't prevent shooting while jumping
        setTimeout(() => {
            canJump = true;
            character.classList.remove('jumping');
        }, JUMP_COOLDOWN);
    } else {
        sidCanJump = false;
        setTimeout(() => {
            sidCanJump = true;
            character.classList.remove('jumping');
        }, JUMP_COOLDOWN);
    }
}

// Shoot function
function shoot(isRiya = false) {
    if ((isRiya && !canShoot) || (!isRiya && !sidCanShoot)) return;
    
    shootSound.currentTime = 0;
    shootSound.play().catch(console.error);
    
    const bullet = document.createElement('div');
    bullet.className = `bullet ${isRiya ? 'normal-bullet' : 'pda-bullet'}`;
    
    // Get shooter and target characters
    const shooter = isRiya ? riya : sid;
    const target = isRiya ? sid : riya;
    
    // Store initial jumping states
    const shooterWasJumping = shooter.classList.contains('jumping');
    
    // Adjust bullet position based on whether character is jumping
    const isJumping = shooter.classList.contains('jumping');
    const baseBottom = 95;
    const jumpOffset = isJumping ? 100 : 0; // Add offset when jumping
    bullet.style.bottom = `${baseBottom + jumpOffset}px`;
    
    // Create and set bullet image
    const bulletImg = document.createElement('img');
    bulletImg.src = isRiya ? '../assets/game/riya bullet.png' : '../assets/game/sid bullet.png';
    bulletImg.style.width = '100%';
    bulletImg.style.height = '100%';
    bullet.appendChild(bulletImg);
    
    if (isRiya) {
        bullet.classList.add('shooting-left');
        bullet.style.right = '150px';
        canShoot = false;
        setTimeout(() => canShoot = true, SHOOT_COOLDOWN);
    } else {
        bullet.classList.add('shooting-right');
        bullet.style.left = '150px';
        sidCanShoot = false;
        setTimeout(() => sidCanShoot = true, SHOOT_COOLDOWN);
    }
    
    gameContainer.appendChild(bullet);
    
    // Remove bullet and check collision after animation
    setTimeout(() => {
        const targetIsJumping = target.classList.contains('jumping');
        
        // Hit detection logic:
        // If bullet was shot from ground and target is on ground -> HIT
        // If bullet was shot while jumping and target is jumping -> HIT
        // If bullet was shot from ground and target is jumping -> MISS
        // If bullet was shot while jumping and target is on ground -> MISS
        if (shooterWasJumping === targetIsJumping) {
            // Both in air or both on ground = HIT
            if (isRiya) {
                sidHealth -= DAMAGE;
            } else {
                riyaHealth -= DAMAGE;
            }
            updateHealthBars();
            checkGameOver();
        }
        bullet.remove();
    }, BULLET_SPEED);
}

// Sid AI
function startSidAI() {
    if (!gameActive) return;
    
    // Random actions for Sid
    setInterval(() => {
        if (!gameActive) return;
        
        const action = Math.random();
        if (action < 0.3) {
            jump(sid);
        } else if (action < 0.6) {
            shoot(false);
        }
    }, 1500);
}

// Check game over
function checkGameOver() {
    if (sidHealth <= 0) {
        endGame("Congratulations! You convinced Sid to not hold hands in campus! 🎉", true);
    } else if (riyaHealth <= 0) {
        endGame("Game Over! You have to hold hands the whole time while being in campus! ��", false);
    }
}

// End game
function endGame(message, isWin) {
    gameActive = false;
    resultText.textContent = message;
    gameOver.classList.remove('hidden');
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    
    if (isWin) {
        winSound.play().catch(console.error);
    } else {
        loseSound.play().catch(console.error);
    }
}

// Event listeners with improved responsiveness
promptDoneBtn.addEventListener('click', () => {
    startGame();
    requestFullscreen();
});

// Using both touch and mouse events for better responsiveness
['touchstart', 'mousedown'].forEach(eventType => {
    jumpBtn.addEventListener(eventType, (e) => {
        e.preventDefault();
        if (e.type === 'touchstart' || (e.type === 'mousedown' && e.button === 0)) {
            jump(riya, true);
        }
    }, { passive: false });

    shootBtn.addEventListener(eventType, (e) => {
        e.preventDefault();
        if (e.type === 'touchstart' || (e.type === 'mousedown' && e.button === 0)) {
            shoot(true);
        }
    }, { passive: false });
});

playAgainBtn.addEventListener('click', () => {
    gameOver.classList.add('hidden');
    startGame();
});

// Initialize game on load
window.addEventListener('load', initGame);

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(requestFullscreen, 300);
}); 