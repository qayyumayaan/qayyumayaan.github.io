// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const jumbotron = document.querySelector('.jumbotron');
    let animationId;

    function createStarFirework(x, y) {
        const star = document.createElement('div');
        star.classList.add('firework', 'star');
        star.style.left = x + 'px';
        star.style.top = y + 'px';

        jumbotron.appendChild(star);

        setTimeout(() => {
            star.classList.add('explode');
        }, 50); // Explode quickly for a star effect

        setTimeout(() => {
            star.classList.add('fade-out');
        }, 800); // Start fading out after the explosion

        setTimeout(() => {
            jumbotron.removeChild(star);
        }, 1500); // Remove after the fade-out
    }

    function animateFireworks() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const startX = Math.random() * windowWidth;
        const startY = Math.random() * windowHeight;

        createStarFirework(startX, startY);

        animationId = requestAnimationFrame(animateFireworks);
    }

    animateFireworks(); 
});