document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('emission-form');
    const ctx = document.getElementById('emissionsChart').getContext('2d');
    let chart = null;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const excavation = document.getElementById('excavation').value;
        const transportation = document.getElementById('transportation').value;
        const equipment = document.getElementById('equipment').value;

        try {
            const response = await fetch('http://localhost:5000/calculate-emissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    excavation: parseFloat(excavation),
                    transportation: parseFloat(transportation),
                    equipment: parseFloat(equipment)
                })
            });

            const data = await response.json();
            const emissions = data.emissions;

            if (chart) {
                chart.destroy();
            }

            chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Excavation', 'Transportation', 'Equipment'],
                    datasets: [{
                        label: 'Carbon Emissions',
                        data: emissions,
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error calculating emissions', error);
        }
    });
});
