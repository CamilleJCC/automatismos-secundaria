/*import { db } from './firebase-config.js';
import { ref, set, push } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

// Test connection outside DOMContentLoaded
const testRef = ref(db, 'connection-test');
set(testRef, {
    lastAccess: new Date().toISOString(),
    status: 'connected'
});
*/
// Add this at the very top of your script.js, outside any event listeners
let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'K0wOir-29fY', // Your video ID
        playerVars: {
            'autoplay': 0,
            'controls': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    const audioBtn = document.getElementById('playPauseBtn');
    audioBtn.addEventListener('click', () => {
        if (player.getPlayerState() !== 1) {
            player.playVideo();
        } else {
            player.pauseVideo();
        }
    });
}

function onPlayerStateChange(event) {
    const playIcon = document.querySelector('.play-icon');
    if (event.data === YT.PlayerState.PLAYING) {
        playIcon.classList.remove('play-icon');
        playIcon.classList.add('pause-icon');
    } else {
        playIcon.classList.remove('pause-icon');
        playIcon.classList.add('play-icon');
    }
}

function updateProgress() {
    const progress = document.getElementById('progress');
    setInterval(() => {
        if (player && player.getCurrentTime && player.getDuration) {
            const percentage = (player.getCurrentTime() / player.getDuration()) * 100;
            progress.style.width = percentage + '%';
        }
    }, 1000);
}


document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const magnifier = document.querySelector('.magnifying-glass');
    const artwork = document.querySelector('.artwork');
    const revealBtn = document.querySelector('.reveal-btn');
    const inputs = document.querySelectorAll('.magic-input');
    const plusIcon = document.querySelector('.plus-icon');
    const overlay = document.getElementById('overlay');
    const bioPopup = document.getElementById('bioPopup');
    const transportPopup = document.getElementById('transportPopup');
    const dreamPopup = document.getElementById('dreamPopup');
    const closeButtons = document.querySelectorAll('.close-btn');
    audioBtn = document.getElementById('playPauseBtn');
    playIcon = audioBtn.querySelector('.play-icon');

    function updateZoom(e) {
        const rect = artwork.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const maxX = rect.width - magnifier.offsetWidth;
        const maxY = rect.height - magnifier.offsetHeight;
        
        const boundedX = Math.max(0, Math.min(maxX, x - magnifier.offsetWidth / 2));
        const boundedY = Math.max(0, Math.min(maxY, y - magnifier.offsetHeight / 2));
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            magnifier.style.display = 'block';
            magnifier.style.left = `${boundedX}px`;
            magnifier.style.top = `${boundedY}px`;
            magnifier.style.backgroundImage = `url(${artwork.src})`;
            magnifier.style.backgroundPosition = `${-x * 2 + magnifier.offsetWidth/2}px ${-y * 2 + magnifier.offsetHeight/2}px`;
            magnifier.style.backgroundSize = `${artwork.width * 2}px`;
        } else {
            magnifier.style.display = 'none';
        }
    }

    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
            
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1500);
        }
    }

    function getRandomColor() {
        const colors = [
            '#b5f0de',
            '#fab8a1',
            '#faf7ba',
            '#c2b2ff'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function showAnswerPopup(answer, index) {
        overlay.style.display = 'block';
        const popup = document.getElementById(`answer${index + 1}Popup`);
        popup.querySelector('.answer-text').textContent = answer;
        popup.style.display = 'block';
        setTimeout(() => {
            popup.classList.add('show');
        }, 10);
    }

    function handleReveal() {
        inputs.forEach((input, index) => {
            if (input.value.trim()) {
                showAnswerPopup(input.value, index);
            }
        });
    }

    // Event Listeners
    artwork.addEventListener('mousemove', updateZoom);
    artwork.addEventListener('mouseleave', () => {
        magnifier.style.display = 'none';
    });

    plusIcon.addEventListener('click', () => {
        overlay.style.display = 'block';
        bioPopup.style.display = 'block';
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.parentElement;
            if (popup.classList.contains('answer-popup')) {
                popup.classList.remove('show');
                setTimeout(() => {
                    popup.style.display = 'none';
                    overlay.style.display = 'none';
                }, 500);
            } else {
                overlay.style.display = 'none';
                popup.style.display = 'none';
            }
        });
    });

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        bioPopup.style.display = 'none';
        transportPopup.style.display = 'none';
        dreamPopup.style.display = 'none';
    });

    revealBtn.addEventListener('click', handleReveal);
    
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleReveal();
            }
        });
    });

    audioBtn.addEventListener('click', () => {
        if (player.getPlayerState() !== 1) {
            player.playVideo();
        } else {
            player.pauseVideo();
        }
    });
});



