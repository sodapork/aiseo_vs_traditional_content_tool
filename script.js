// Picklist logic for strategy selection
let strategyChart;
const picklistBlocks = Array.from(document.querySelectorAll('.picklist-block'));
const submitBtn = document.getElementById('submit-btn');
const picklistForm = document.getElementById('picklist-form');
const resultsSection = document.getElementById('results-section');
const chosenStrategyList = document.getElementById('chosen-strategy-list');

let selectedBlocks = [];

function updateSubmitState() {
    submitBtn.disabled = selectedBlocks.length === 0;
}

function toggleBlockSelection(block) {
    const idx = selectedBlocks.indexOf(block);
    if (idx > -1) {
        selectedBlocks.splice(idx, 1);
        block.classList.remove('selected');
    } else {
        selectedBlocks.push(block);
        block.classList.add('selected');
    }
    updateSubmitState();
}

picklistBlocks.forEach(block => {
    block.addEventListener('click', () => toggleBlockSelection(block));
    block.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggleBlockSelection(block);
        }
    });
});

picklistForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Hide picklist, show results
    picklistForm.style.display = 'none';
    resultsSection.style.display = '';

    // Prepare results
    let aiCount = 0;
    let traditionalCount = 0;
    chosenStrategyList.innerHTML = '';
    selectedBlocks.forEach(block => {
        const strategy = block.getAttribute('data-strategy');
        const type = block.getAttribute('data-type');
        if (type === 'ai') aiCount++;
        else traditionalCount++;
        const blockDiv = document.createElement('div');
        blockDiv.className = `chosen-strategy-block ${type}`;
        blockDiv.innerHTML = `
            <div class="block-label">${strategy}</div>
            <div class="block-type">${type === 'ai' ? 'AI SEO' : 'Traditional SEO'}</div>
        `;
        chosenStrategyList.appendChild(blockDiv);
    });

    // Show chart
    showResultsChart(aiCount, traditionalCount);
});

// Chart logic for results
function showResultsChart(aiCount, traditionalCount) {
    const ctx = document.getElementById('strategyChart').getContext('2d');
    if (strategyChart) strategyChart.destroy();
    strategyChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['AI SEO', 'Traditional SEO'],
            datasets: [{
                data: [aiCount, traditionalCount],
                backgroundColor: [
                    '#3498db',  // AI SEO color
                    '#e74c3c'   // Traditional SEO color
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
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
} 