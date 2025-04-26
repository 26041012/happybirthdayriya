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
let isPaused = false;
let sidHealth = 100;
let riyaHealth = 100;
let canJump = true;
let canShoot = true;
let sidCanJump = true;
let sidCanShoot = true;
let sidAIInterval;
let riyaPattern = [];
let sidStrategy = 'balanced'; // balanced, defensive, aggressive

// Constants
const JUMP_COOLDOWN = 900; // 0.9 seconds to match the new jump animation
const SHOOT_COOLDOWN = 300; // 0.3 seconds for faster shooting
const DAMAGE = 10; // Reduced from 20 to 10
const BULLET_SPEED = 1000; // 1 second to cross screen
const SID_AI_INTERVAL = 1000; // Reduced from 1500 to 1000 for more responsive AI

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
        riyaPattern.push('jump');
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
    
    if (isRiya) {
        riyaPattern.push('shoot');
    }
    
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

// Sid AI with improved intelligence
function startSidAI() {
    if (!gameActive) return;
    
    sidAIInterval = setInterval(() => {
        if (!gameActive || isPaused) return;
        
        // Analyze Riya's pattern
        if (riyaPattern.length > 3) {
            riyaPattern.shift();
        }
        
        // Determine strategy based on health
        if (sidHealth < 30) {
            sidStrategy = 'defensive';
        } else if (riyaHealth < 30) {
            sidStrategy = 'aggressive';
        } else {
            sidStrategy = 'balanced';
        }
        
        // Make decision based on strategy and pattern
        const action = Math.random();
        let shouldJump = false;
        let shouldShoot = false;
        
        switch (sidStrategy) {
            case 'defensive':
                // More likely to jump when low health
                shouldJump = action < 0.6;
                shouldShoot = action < 0.3;
                break;
            case 'aggressive':
                // More likely to shoot when Riya is low health
                shouldJump = action < 0.3;
                shouldShoot = action < 0.7;
                break;
            case 'balanced':
                // Balanced approach
                shouldJump = action < 0.4;
                shouldShoot = action < 0.5;
                break;
        }
        
        // React to Riya's recent actions
        if (riyaPattern.includes('jump') && !sidCanJump) {
            shouldShoot = true;
        }
        if (riyaPattern.includes('shoot') && sidCanJump) {
            shouldJump = true;
        }
        
        // Execute actions
        if (shouldJump && sidCanJump) {
            jump(sid);
            riyaPattern.push('jump');
        } else if (shouldShoot && sidCanShoot) {
            shoot(false);
            riyaPattern.push('shoot');
        }
    }, SID_AI_INTERVAL);
}

// Pause game
function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        backgroundMusic.pause();
        clearInterval(sidAIInterval);
        document.getElementById('pause-btn').textContent = 'Resume';
    } else {
        backgroundMusic.play().catch(console.error);
        startSidAI();
        document.getElementById('pause-btn').textContent = 'Pause';
    }
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

// Add pause button event listener
document.getElementById('pause-btn').addEventListener('click', togglePause);

// Initialize game on load
window.addEventListener('load', initGame);

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(requestFullscreen, 300);
}); 