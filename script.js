// Initialize counters for AI and Traditional SEO elements
let aiCount = 0;
let traditionalCount = 0;

// Initialize the chart
const ctx = document.getElementById('strategyChart').getContext('2d');
let strategyChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['AI SEO', 'Traditional SEO'],
        datasets: [{
            data: [0, 0],
            backgroundColor: [
                '#3498db',  // AI SEO color
                '#e74c3c'   // Traditional SEO color
            ]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Strategy Distribution'
            }
        }
    }
});

// Make strategy blocks draggable
document.querySelectorAll('.strategy-block').forEach(block => {
    block.addEventListener('dragstart', handleDragStart);
});

// Handle drag start
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.type);
    e.target.classList.add('dragging');
}

// Handle drag end
function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

// Handle drop zone events
const dropZone = document.getElementById('strategy-container');

dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
});

dropZone.addEventListener('dragenter', e => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', e => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    
    const type = e.dataTransfer.getData('text/plain');
    const originalBlock = document.querySelector(`.strategy-block[data-type="${type}"]`);
    
    if (originalBlock) {
        // Create a copy of the block
        const newBlock = originalBlock.cloneNode(true);
        newBlock.classList.add('dropped-block');
        
        // Remove the drop message if it exists
        const dropMessage = dropZone.querySelector('.drop-message');
        if (dropMessage) {
            dropMessage.remove();
        }
        
        // Add the new block to the drop zone
        dropZone.appendChild(newBlock);
        
        // Update counters and chart
        if (type === 'ai') {
            aiCount++;
        } else {
            traditionalCount++;
        }
        
        updateChart();
    }
});

// Update the chart with new data
function updateChart() {
    strategyChart.data.datasets[0].data = [aiCount, traditionalCount];
    strategyChart.update();
}

// Add drag end event listeners to all blocks
document.addEventListener('dragend', handleDragEnd); 