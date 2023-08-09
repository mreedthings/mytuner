document.addEventListener("DOMContentLoaded", function() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Function to play a note
    function playTone(frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const filter = audioContext.createBiquadFilter();
        
        oscillator.type = 'sawtooth'; 
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, audioContext.currentTime); 
    
        oscillator.connect(filter);
        filter.connect(audioContext.destination);
    
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    

    const strings = [
        { name: 'E (Lowest)', note: 'E2', freq: 82.41 },
        { name: 'A', note: 'A2', freq: 110.00 },
        { name: 'D', note: 'D3', freq: 146.83 },
        { name: 'G', note: 'G3', freq: 196.00 },
        { name: 'B', note: 'B3', freq: 246.94 },
        { name: 'E (Highest)', note: 'E4', freq: 329.63 }
    ];

    const container = document.getElementById('guitarStrings');

    strings.forEach(str => {
        let stringDiv = document.createElement('div');
        stringDiv.className = 'string';
        stringDiv.innerHTML = `<strong>String:</strong> ${str.name} - <strong>Note:</strong> ${str.note}`;
        
        // Add click listener
        stringDiv.addEventListener('click', function() {
            let duration = parseFloat(document.getElementById('durationSelect').value);
            playTone(str.freq, duration);
        });
        
        
        container.appendChild(stringDiv);
    });
});
