document.addEventListener('DOMContentLoaded', function() {
    generateTable();
});

function generateTable() {
    const tableBody = document.getElementById('generatedTable').getElementsByTagName('tbody')[0];
    let diseasesWithPercentage = localStorage.getItem("hasilPenyakit");

    // Check if data exists in localStorage
    if (diseasesWithPercentage) {
        // Parse the data into JSON format
        diseasesWithPercentage = JSON.parse(diseasesWithPercentage);
        
        // Iterate over the data and add rows to the table
        diseasesWithPercentage.forEach(({ disease, percentage }, index) => {
            const row = tableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            
            cell1.textContent = index + 1;
            cell2.textContent = `${disease.name}: ${percentage.toFixed(2)}%`;
        });
    } else {
        console.log("No data found in localStorage.");
    }
}