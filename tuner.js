// Guitar Tuner Application
class GuitarTuner {
    constructor() {
        this.audioContext = null;
        this.analyser = null;
        this.microphone = null;
        this.stream = null;
        this.isListening = false;
        this.currentString = 'E2';
        this.targetFrequencies = {
            'E2': 82.41,
            'A2': 110.00,
            'D3': 146.83,
            'G3': 196.00,
            'B3': 246.94,
            'E4': 329.63
        };
        this.noteNames = {
            'E2': 'E',
            'A2': 'A',
            'D3': 'D',
            'G3': 'G',
            'B3': 'B',
            'E4': 'E'
        };
        
        this.init();
    }
    
    init() {
        const tuneButton = document.getElementById('tuneButton');
        const stringButtons = document.querySelectorAll('.string-button');
        
        tuneButton.addEventListener('click', () => this.toggleTuning());
        
        stringButtons.forEach(button => {
            button.addEventListener('click', () => {
                stringButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.currentString = button.dataset.string;
                this.updateDisplay();
            });
        });
    }
    
    async toggleTuning() {
        if (!this.isListening) {
            await this.startTuning();
        } else {
            this.stopTuning();
        }
    }
    
    async startTuning() {
        try {
            // Request microphone access with better constraints
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: false,
                    autoGainControl: false,
                    noiseSuppression: false,
                    sampleRate: 44100
                } 
            });
            
            // Create or resume audio context
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
                    sampleRate: 44100
                });
            }
            
            // Resume audio context if suspended (required by some browsers)
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
            
            this.analyser = this.audioContext.createAnalyser();
            this.microphone = this.audioContext.createMediaStreamSource(stream);
            
            // Store stream for cleanup
            this.stream = stream;
            
            // Configure analyser for better frequency detection
            this.analyser.fftSize = 16384; // Higher FFT size for better frequency resolution
            this.analyser.smoothingTimeConstant = 0.8; // More smoothing for stability
            this.analyser.minDecibels = -90;
            this.analyser.maxDecibels = -10;
            
            this.microphone.connect(this.analyser);
            
            this.isListening = true;
            document.getElementById('tuneButton').textContent = 'Stop Tuning';
            document.getElementById('tuneButton').classList.add('active');
            document.getElementById('tuningStatus').textContent = 'Listening... Pluck a string!';
            document.getElementById('tuningStatus').style.color = '#667eea';
            
            this.analyzeAudio();
        } catch (error) {
            console.error('Error accessing microphone:', error);
            let errorMsg = 'Please allow microphone access to use the tuner.';
            if (error.name === 'NotAllowedError') {
                errorMsg = 'Microphone access denied. Please allow access and try again.';
            } else if (error.name === 'NotFoundError') {
                errorMsg = 'No microphone found. Please connect a microphone.';
            }
            alert(errorMsg);
            document.getElementById('tuningStatus').textContent = errorMsg;
            document.getElementById('tuningStatus').style.color = '#ff6b6b';
        }
    }
    
    stopTuning() {
        // Stop all tracks in the stream
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        
        // Disconnect microphone
        if (this.microphone) {
            this.microphone.disconnect();
            this.microphone = null;
        }
        
        // Don't close audio context, just suspend it
        if (this.audioContext && this.audioContext.state !== 'closed') {
            this.audioContext.suspend();
        }
        
        this.isListening = false;
        document.getElementById('tuneButton').textContent = 'Start Tuning';
        document.getElementById('tuneButton').classList.remove('active');
        document.getElementById('noteDisplay').textContent = '--';
        document.getElementById('frequencyDisplay').textContent = '0 Hz';
        document.getElementById('tuningStatus').textContent = 'Click "Start Tuning" to begin';
        document.getElementById('tuningStatus').style.color = '#666';
        document.getElementById('tuningBar').style.width = '0%';
        const audioLevelIndicator = document.getElementById('audioLevelIndicator');
        if (audioLevelIndicator) {
            audioLevelIndicator.style.display = 'none';
        }
    }
    
    analyzeAudio() {
        if (!this.isListening || !this.analyser) return;
        
        // Use frequency domain data (FFT) for better accuracy
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(dataArray);
        
        // Also get time domain for volume check
        const timeDataArray = new Float32Array(bufferLength);
        this.analyser.getFloatTimeDomainData(timeDataArray);
        
        // Check if there's significant audio input
        const volume = this.getVolume(timeDataArray);
        
        // Update audio level indicator
        const audioLevelIndicator = document.getElementById('audioLevelIndicator');
        const audioLevelBar = document.getElementById('audioLevelBar');
        if (audioLevelIndicator) {
            audioLevelIndicator.style.display = 'block';
            const levelPercent = Math.min(100, volume * 1000);
            audioLevelBar.style.width = levelPercent + '%';
        }
        
        if (volume < 0.01) {
            // No significant audio input
            document.getElementById('tuningStatus').textContent = 'Listening... Pluck a string!';
            document.getElementById('tuningStatus').style.color = '#667eea';
            requestAnimationFrame(() => this.analyzeAudio());
            return;
        }
        
        // Find the dominant frequency using FFT
        const frequency = this.getDominantFrequencyFFT(dataArray, this.audioContext.sampleRate);
        
        if (frequency > 0 && frequency < 1000) {
            this.updateDisplay(frequency);
        }
        
        requestAnimationFrame(() => this.analyzeAudio());
    }
    
    getVolume(dataArray) {
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
            sum += Math.abs(dataArray[i]);
        }
        return sum / dataArray.length;
    }
    
    getDominantFrequencyFFT(dataArray, sampleRate) {
        // Find the peak frequency in the FFT data
        let maxValue = 0;
        let maxIndex = 0;
        
        // Search in the range of guitar frequencies (50-500 Hz)
        const minBin = Math.floor(50 * dataArray.length / (sampleRate / 2));
        const maxBin = Math.floor(500 * dataArray.length / (sampleRate / 2));
        
        for (let i = minBin; i < maxBin && i < dataArray.length; i++) {
            if (dataArray[i] > maxValue) {
                maxValue = dataArray[i];
                maxIndex = i;
            }
        }
        
        // Only return frequency if signal is strong enough
        if (maxValue > 50) {
            const frequency = (maxIndex * sampleRate) / (2 * dataArray.length);
            return frequency;
        }
        
        return 0;
    }
    
    // Keep autocorrelation as fallback
    getDominantFrequency(dataArray, sampleRate) {
        const minPeriod = Math.floor(sampleRate / 1000);
        const maxPeriod = Math.floor(sampleRate / 50);
        
        let maxCorrelation = 0;
        let bestPeriod = 0;
        
        for (let period = minPeriod; period < maxPeriod && period < dataArray.length / 2; period++) {
            let correlation = 0;
            for (let i = 0; i < dataArray.length - period; i++) {
                correlation += Math.abs(dataArray[i] * dataArray[i + period]);
            }
            
            if (correlation > maxCorrelation) {
                maxCorrelation = correlation;
                bestPeriod = period;
            }
        }
        
        if (bestPeriod > 0 && maxCorrelation > 0.1) {
            return sampleRate / bestPeriod;
        }
        
        return 0;
    }
    
    updateDisplay(frequency = null) {
        if (!frequency) {
            document.getElementById('noteDisplay').textContent = this.noteNames[this.currentString];
            return;
        }
        
        const targetFreq = this.targetFrequencies[this.currentString];
        const difference = frequency - targetFreq;
        const percentDifference = (difference / targetFreq) * 100;
        
        document.getElementById('frequencyDisplay').textContent = `${frequency.toFixed(2)} Hz`;
        document.getElementById('noteDisplay').textContent = this.noteNames[this.currentString];
        
        // Update tuning indicator
        const tuningBar = document.getElementById('tuningBar');
        const tuningStatus = document.getElementById('tuningStatus');
        
        // Center the bar at 50% when in tune
        let barPosition = 50 + (percentDifference * 2); // Scale: 1% = 2% of bar
        barPosition = Math.max(0, Math.min(100, barPosition));
        
        tuningBar.style.width = `${barPosition}%`;
        
        // Update status text
        if (Math.abs(percentDifference) < 0.5) {
            tuningStatus.textContent = '✓ Perfect!';
            tuningStatus.style.color = '#6bcf7f';
        } else if (percentDifference < 0) {
            tuningStatus.textContent = `Too Low (${Math.abs(percentDifference).toFixed(1)}%)`;
            tuningStatus.style.color = '#ff6b6b';
        } else {
            tuningStatus.textContent = `Too High (+${percentDifference.toFixed(1)}%)`;
            tuningStatus.style.color = '#ff6b6b';
        }
    }
}

// Initialize tuner when page loads
document.addEventListener('DOMContentLoaded', () => {
    new GuitarTuner();
});

