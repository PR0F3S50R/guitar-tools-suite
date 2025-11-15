// Visual Effects and Animations
document.addEventListener('DOMContentLoaded', () => {
    createFloatingParticles();
    createAnimatedWaves();
    createGeometricShapes();
    createMusicNotes();
    createOrbs();
    addCardAnimations();
    addScrollAnimations();
});

// Create floating particles in the background
function createFloatingParticles() {
    const particleCount = 25;
    const container = document.body;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 15px and 60px
        const size = Math.random() * 45 + 15;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.2 + 0.1;
        
        container.appendChild(particle);
    }
}

// Create animated waves at the bottom
function createAnimatedWaves() {
    const container = document.body;
    
    for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.className = 'wave';
        wave.style.bottom = (i * -50) + 'px';
        wave.style.animationDelay = (i * 2) + 's';
        container.appendChild(wave);
    }
}

// Create geometric shapes
function createGeometricShapes() {
    const container = document.body;
    const shapeCount = 8;
    const shapes = ['circle', 'triangle', 'square'];
    
    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        shape.className = `geometric-shape shape-${shapeType}`;
        
        const size = Math.random() * 100 + 50;
        
        if (shapeType === 'circle') {
            shape.style.width = size + 'px';
            shape.style.height = size + 'px';
        } else if (shapeType === 'triangle') {
            const borderSize = size / 2;
            shape.style.borderLeftWidth = borderSize + 'px';
            shape.style.borderRightWidth = borderSize + 'px';
            shape.style.borderBottomWidth = (size * 0.87) + 'px';
        } else {
            shape.style.width = size + 'px';
            shape.style.height = size + 'px';
            shape.style.transform = 'rotate(45deg)';
        }
        
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        shape.style.animation = `float ${(Math.random() * 20 + 15)}s infinite ease-in-out`;
        shape.style.animationDelay = Math.random() * 10 + 's';
        
        container.appendChild(shape);
    }
}

// Create floating music notes
function createMusicNotes() {
    const container = document.body;
    const notes = ['♪', '♫', '♬', '♩', '♭', '♯'];
    const noteCount = 12;
    
    for (let i = 0; i < noteCount; i++) {
        const note = document.createElement('div');
        note.className = 'music-note';
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        note.style.left = Math.random() * 100 + '%';
        note.style.top = Math.random() * 100 + '%';
        note.style.fontSize = (Math.random() * 2 + 1.5) + 'em';
        note.style.animationDelay = Math.random() * 20 + 's';
        note.style.animationDuration = (Math.random() * 15 + 15) + 's';
        container.appendChild(note);
    }
}

// Create glowing orbs
function createOrbs() {
    const container = document.body;
    const orbCount = 5;
    
    for (let i = 0; i < orbCount; i++) {
        const orb = document.createElement('div');
        orb.className = 'orb';
        
        const size = Math.random() * 200 + 150;
        orb.style.width = size + 'px';
        orb.style.height = size + 'px';
        
        orb.style.left = Math.random() * 100 + '%';
        orb.style.top = Math.random() * 100 + '%';
        orb.style.animationDelay = Math.random() * 25 + 's';
        orb.style.animationDuration = (Math.random() * 15 + 20) + 's';
        
        container.appendChild(orb);
    }
}

// Add staggered animations to cards
function addCardAnimations() {
    const cards = document.querySelectorAll('.app-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.1) + 's';
        card.style.animation = 'fadeInUp 0.6s ease-out forwards';
        card.style.opacity = '0';
        
        // Add mouse move parallax effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.app-card').forEach(card => {
        observer.observe(card);
    });
}

// Add ripple effect to buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tune-button') || 
        e.target.classList.contains('timer-button') || 
        e.target.classList.contains('back-button')) {
        createRipple(e, e.target);
    }
});

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

