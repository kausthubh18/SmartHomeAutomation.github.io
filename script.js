function updateAISection(aiPrediction) {
    document.getElementById('aiPrediction').innerText = aiPrediction;
}

function fetchData() {
    document.getElementById('loading').style.display = 'block';
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            updateWidgets(data.temperature, data.humidity, data.current, data.prediction);
            updateBarChart(data.temperature, data.humidity, data.current);
            const rainCount = data.prediction === 'Rain' ? 1 : 0;
            updatePieChart(rainCount, 1 - rainCount);
            updateAISection(data.aiPrediction);  // Update AI predictions here
            document.getElementById('loading').style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('loading').style.display = 'none';
        });
}

const ctxPie = document.getElementById('pieChart').getContext('2d');
const ctxBar = document.getElementById('barChart').getContext('2d');

let pieChart, barChart;

async function fetchHistoricalData() {
    const response = await fetch('/historical_data');
    const historicalData = await response.json();

    if (historicalData.length === 0) return; // Exit if no historical data

    const temperatures = historicalData.map(entry => parseFloat(entry.temperature));
    const humidityLevels = historicalData.map(entry => parseFloat(entry.humidity));

    const avgTemperature = temperatures.length > 0 ? temperatures.reduce((a, b) => a + b) / temperatures.length : 0;
    const avgHumidity = humidityLevels.length > 0 ? humidityLevels.reduce((a, b) => a + b) / humidityLevels.length : 0;

    const pieData = {
        labels: ['Temperature', 'Humidity'],
        datasets: [{
            data: [avgTemperature, avgHumidity],
            backgroundColor: ['#FF6384', '#36A2EB']
        }]
    };

    const barData = {
        labels: historicalData.map(entry => entry.timestamp),
        datasets: [
            {
                label: 'Temperature',
                data: temperatures,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Humidity',
                data: humidityLevels,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };

    if (!pieChart) {
        pieChart = new Chart(ctxPie, {
            type: 'pie',
            data: pieData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Average Temperature and Humidity'
                    }
                }
            }
        });
    } else {
        pieChart.data.datasets[0].data = [avgTemperature, avgHumidity];
        pieChart.update();
    }

    if (!barChart) {
        barChart = new Chart(ctxBar, {
            type: 'bar',
            data: barData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        barChart.data.labels = historicalData.map(entry => entry.timestamp);
        barChart.data.datasets[0].data = temperatures;
        barChart.data.datasets[1].data = humidityLevels;
        barChart.update();
    }
}

// Fetch historical data every 10 seconds
setInterval(fetchHistoricalData, 10000);
fetchHistoricalData(); // Fetch historical data on load
