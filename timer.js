// Practice Timer Application
class PracticeTimer {
    constructor() {
        this.startTime = null;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.intervalId = null;
        this.totalTime = 0;
        this.todayTime = 0;
        this.sessionsCount = 0;
        
        this.loadStats();
        this.init();
    }
    
    init() {
        const startButton = document.getElementById('startButton');
        const stopButton = document.getElementById('stopButton');
        const resetButton = document.getElementById('resetButton');
        const presetButtons = document.querySelectorAll('.preset-button');
        
        startButton.addEventListener('click', () => this.start());
        stopButton.addEventListener('click', () => this.stop());
        resetButton.addEventListener('click', () => this.reset());
        
        presetButtons.forEach(button => {
            button.addEventListener('click', () => {
                const minutes = parseInt(button.dataset.minutes);
                this.setTime(minutes * 60);
            });
        });
        
        this.updateDisplay();
        this.updateStats();
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startTime = Date.now() - this.elapsedTime;
            
            this.intervalId = setInterval(() => {
                this.elapsedTime = Date.now() - this.startTime;
                this.updateDisplay();
            }, 100);
            
            document.getElementById('startButton').disabled = true;
        }
    }
    
    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.intervalId);
            
            // Only count as a session if timer ran for at least 1 second
            if (this.elapsedTime >= 1000) {
                this.totalTime += this.elapsedTime;
                this.todayTime += this.elapsedTime;
                this.sessionsCount++;
            }
            
            this.saveStats();
            this.updateStats();
            document.getElementById('startButton').disabled = false;
        }
    }
    
    reset() {
        const wasRunning = this.isRunning;
        const elapsedBeforeReset = this.elapsedTime;
        
        if (wasRunning) {
            this.isRunning = false;
            clearInterval(this.intervalId);
            document.getElementById('startButton').disabled = false;
        }
        
        // Revert the stats if timer was running
        if (wasRunning && elapsedBeforeReset >= 1000) {
            this.totalTime -= elapsedBeforeReset;
            this.todayTime -= elapsedBeforeReset;
            this.sessionsCount--;
        }
        
        this.elapsedTime = 0;
        this.startTime = null;
        this.updateDisplay();
        this.updateStats();
    }
    
    setTime(seconds) {
        if (!this.isRunning) {
            this.elapsedTime = seconds * 1000;
            this.updateDisplay();
        }
    }
    
    formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    
    updateDisplay() {
        document.getElementById('timerDisplay').textContent = this.formatTime(this.elapsedTime);
    }
    
    updateStats() {
        document.getElementById('totalTime').textContent = this.formatTime(this.totalTime);
        document.getElementById('todayTime').textContent = this.formatTime(this.todayTime);
        document.getElementById('sessionsCount').textContent = this.sessionsCount;
    }
    
    saveStats() {
        const today = new Date().toDateString();
        const lastDate = localStorage.getItem('lastPracticeDate');
        
        // Reset today's time if it's a new day
        if (lastDate !== today) {
            this.todayTime = 0;
            localStorage.setItem('lastPracticeDate', today);
        }
        
        localStorage.setItem('totalPracticeTime', this.totalTime.toString());
        localStorage.setItem('todayPracticeTime', this.todayTime.toString());
        localStorage.setItem('practiceSessions', this.sessionsCount.toString());
    }
    
    loadStats() {
        const today = new Date().toDateString();
        const lastDate = localStorage.getItem('lastPracticeDate');
        
        // Reset today's time if it's a new day
        if (lastDate !== today) {
            this.todayTime = 0;
        } else {
            this.todayTime = parseInt(localStorage.getItem('todayPracticeTime') || '0');
        }
        
        this.totalTime = parseInt(localStorage.getItem('totalPracticeTime') || '0');
        this.sessionsCount = parseInt(localStorage.getItem('practiceSessions') || '0');
    }
}

// Initialize timer when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PracticeTimer();
});

