document.addEventListener('DOMContentLoaded', function() {
    generateTable();
});

function generateTable() {
    const tableBody = document.getElementById('generatedTable').getElementsByTagName('tbody')[0];
    let penyakitsWithPercentage = localStorage.getItem("hasilPenyakit");

    // Check if data exists in localStorage
    if (penyakitsWithPercentage) {
        // Parse the data into JSON format
        penyakitsWithPercentage = JSON.parse(penyakitsWithPercentage);
        
        // Iterate over the data and add rows to the table
        penyakitsWithPercentage.forEach(({ penyakit, percentage }, index) => {
            const row = tableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            
            cell1.textContent = `${penyakit.name}`;
            cell2.textContent = `${percentage.toFixed(2)}%`;
        });
    } else {
        console.log("No data found in localStorage.");
    }
}