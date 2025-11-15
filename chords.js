// Chord Reference Application
class ChordReference {
    constructor() {
        this.chords = {
            // Major chords
            'C': { type: 'major', diagram: 'x32010\n  |||||\n  01234' },
            'D': { type: 'major', diagram: 'xx0232\n   |||||\n   01234' },
            'E': { type: 'major', diagram: '022100\n ||||||\n 012345' },
            'F': { type: 'major', diagram: '133211\n ||||||\n 012345' },
            'G': { type: 'major', diagram: '320003\n ||||||\n 012345' },
            'A': { type: 'major', diagram: 'x02220\n  |||||\n  01234' },
            'B': { type: 'major', diagram: 'x24442\n  |||||\n  01234' },
            
            // Minor chords
            'Am': { type: 'minor', diagram: 'x02210\n  |||||\n  01234' },
            'Dm': { type: 'minor', diagram: 'xx0231\n   |||||\n   01234' },
            'Em': { type: 'minor', diagram: '022000\n ||||||\n 012345' },
            'Fm': { type: 'minor', diagram: '133111\n ||||||\n 012345' },
            'Gm': { type: 'minor', diagram: '355333\n ||||||\n 012345' },
            'Bm': { type: 'minor', diagram: 'x24432\n  |||||\n  01234' },
            'Cm': { type: 'minor', diagram: 'x35543\n  |||||\n  01234' },
            
            // 7th chords
            'C7': { type: 'seventh', diagram: 'x32310\n  |||||\n  01234' },
            'D7': { type: 'seventh', diagram: 'xx0212\n   |||||\n   01234' },
            'E7': { type: 'seventh', diagram: '020100\n ||||||\n 012345' },
            'G7': { type: 'seventh', diagram: '320001\n ||||||\n 012345' },
            'A7': { type: 'seventh', diagram: 'x02020\n  |||||\n  01234' },
            'B7': { type: 'seventh', diagram: 'x21202\n  |||||\n  01234' },
            
            // Suspended chords
            'Dsus2': { type: 'suspended', diagram: 'xx0230\n   |||||\n   01234' },
            'Dsus4': { type: 'suspended', diagram: 'xx0233\n   |||||\n   01234' },
            'Asus2': { type: 'suspended', diagram: 'x02200\n  |||||\n  01234' },
            'Asus4': { type: 'suspended', diagram: 'x02230\n  |||||\n  01234' },
            'Esus4': { type: 'suspended', diagram: '022200\n ||||||\n 012345' },
        };
        
        this.currentFilter = 'all';
        this.init();
    }
    
    init() {
        const filterButtons = document.querySelectorAll('.filter-button');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.currentFilter = button.dataset.filter;
                this.renderChords();
            });
        });
        
        this.renderChords();
    }
    
    renderChords() {
        const container = document.getElementById('chordContainer');
        container.innerHTML = '';
        
        const filteredChords = Object.entries(this.chords).filter(([name, chord]) => {
            if (this.currentFilter === 'all') return true;
            return chord.type === this.currentFilter;
        });
        
        filteredChords.forEach(([name, chord]) => {
            const card = document.createElement('div');
            card.className = 'chord-card';
            
            card.innerHTML = `
                <div class="chord-name">${name}</div>
                <div class="chord-diagram">${chord.diagram}</div>
            `;
            
            container.appendChild(card);
        });
    }
}

// Initialize chord reference when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChordReference();
});

