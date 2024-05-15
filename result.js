document.addEventListener('DOMContentLoaded', function() {
    generateTable();
    displayHighestPercentageDisease();
});

function generateTable() {
    const tableBody = document.getElementById('generatedTable').getElementsByTagName('tbody')[0];
    let penyakitsWithPercentage = localStorage.getItem("hasilPenyakit");

    // Check if data exists in localStorage
    if (penyakitsWithPercentage) {
        // Parse the data into JSON format
        penyakitsWithPercentage = JSON.parse(penyakitsWithPercentage);
        
        let highestPercentage = 0;
        let penyakitWithHighestPercentage = "";
        // Iterate over the data and add rows to the table
        penyakitsWithPercentage.forEach(({ penyakit, percentage }, index) => {
            if(percentage > highestPercentage) {
                highestPercentage = percentage;
                penyakitWithHighestPercentage = penyakit.name;
            }
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
function displayHighestPercentageDisease() {
    let penyakitsWithPercentage = localStorage.getItem("hasilPenyakit");
    const highestPercentageContainer = document.getElementById('penyakitWithHighestPercentage');
    // Check if data exists in localStorage
    if (penyakitsWithPercentage) {
        // Parse the data into JSON format
        penyakitsWithPercentage = JSON.parse(penyakitsWithPercentage);
        
        let highestPercentage = 0;
        let penyakitWithHighestPercentage = "";
        // Iterate over the data and add rows to the table
        penyakitsWithPercentage.forEach(({ penyakit, percentage }, index) => {
            if(percentage > highestPercentage) {
                highestPercentage = percentage;
                penyakitWithHighestPercentage = penyakit.name;
            }
        });

        let message = "";
        if(highestPercentage >= 1 && highestPercentage <= 50) {
            message = `*Anda memiliki kemungkinan kecil mengidap penyakit ${penyakitWithHighestPercentage} dengan peluang terkena sebesar ${highestPercentage.toFixed(2)}%`;
        } else if(highestPercentage >= 51 && highestPercentage <= 99) {
            message = `*Anda memiliki kemungkinan besar mengidap penyakit ${penyakitWithHighestPercentage} dengan peluang terkena sebesar ${highestPercentage.toFixed(2)}%`;
        } else if(highestPercentage == 100) {
            message = `*Anda mengidap penyakit ${penyakitWithHighestPercentage} dengan peluang terkena sebesar ${highestPercentage.toFixed(2)}% segera periksa ke dokter!`;
        } else {
            message = `Anda tidak didiagnosis memiliki kemungkinan penyakit THT`;
        }
        // Adding newline

        highestPercentageContainer.innerHTML = message;
        
    } else {
        highestPercentageContainer.textContent = "Data penyakit tidak ditemukan.";
    }
}