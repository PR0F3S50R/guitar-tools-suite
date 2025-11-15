// Metronome Application
class Metronome {
    constructor() {
        this.bpm = 120;
        this.isRunning = false;
        this.intervalId = null;
        this.beatCount = 0;
        this.timeSignature = '4/4';
        this.beatsPerMeasure = 4;
        this.audioContext = null;
        this.tickSound = null;
        this.accentSound = null;
        
        this.init();
    }
    
    init() {
        const bpmSlider = document.getElementById('bpmSlider');
        const bpmDisplay = document.getElementById('bpmDisplay');
        const startButton = document.getElementById('startButton');
        const timeSignature = document.getElementById('timeSignature');
        const bpmButtons = document.querySelectorAll('.bpm-button');
        
        bpmSlider.addEventListener('input', (e) => {
            this.bpm = parseInt(e.target.value);
            bpmDisplay.textContent = this.bpm;
            if (this.isRunning) {
                this.restart();
            }
        });
        
        startButton.addEventListener('click', () => this.toggle());
        
        timeSignature.addEventListener('change', (e) => {
            this.timeSignature = e.target.value;
            this.beatsPerMeasure = parseInt(this.timeSignature.split('/')[0]);
            this.beatCount = 0;
        });
        
        bpmButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.bpm = parseInt(button.dataset.bpm);
                bpmSlider.value = this.bpm;
                bpmDisplay.textContent = this.bpm;
                if (this.isRunning) {
                    this.restart();
                }
            });
        });
        
        this.initAudio();
    }
    
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createTickSound();
        } catch (error) {
            console.error('Audio context initialization failed:', error);
        }
    }
    
    createTickSound() {
        // Create a simple beep sound for the tick
        const createBeep = (frequency, duration) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };
        
        this.tickSound = () => createBeep(800, 0.05);
        this.accentSound = () => createBeep(1000, 0.1);
    }
    
    toggle() {
        if (this.isRunning) {
            this.stop();
        } else {
            this.start();
        }
    }
    
    start() {
        if (!this.audioContext) {
            this.initAudio();
        }
        
        this.isRunning = true;
        document.getElementById('startButton').textContent = 'Stop';
        document.getElementById('startButton').classList.add('active');
        
        const interval = (60 / this.bpm) * 1000;
        
        this.intervalId = setInterval(() => {
            this.beat();
        }, interval);
        
        // Play first beat immediately
        this.beat();
    }
    
    stop() {
        this.isRunning = false;
        document.getElementById('startButton').textContent = 'Start';
        document.getElementById('startButton').classList.remove('active');
        
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        
        this.beatCount = 0;
        const beatIndicator = document.getElementById('beatIndicator');
        beatIndicator.classList.remove('active');
    }
    
    restart() {
        this.stop();
        setTimeout(() => this.start(), 100);
    }
    
    beat() {
        const beatIndicator = document.getElementById('beatIndicator');
        
        // Visual feedback
        beatIndicator.classList.add('active');
        setTimeout(() => {
            beatIndicator.classList.remove('active');
        }, 100);
        
        // Audio feedback
        if (this.audioContext && this.audioContext.state === 'running') {
            if (this.beatCount === 0) {
                this.accentSound();
            } else {
                this.tickSound();
            }
        }
        
        this.beatCount = (this.beatCount + 1) % this.beatsPerMeasure;
    }
}

// Initialize metronome when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Metronome();
});

