const diseases = [
    { 
        name: "CONTRACT ULCERS",
        symptoms: [3, 16]
    },
    { 
        name: "ABAES PARAFARINGEAL",
        symptoms: [3, 19]
    },
    { 
        name: "ABAES PERITONAILER",
        symptoms: [1, 2, 7, 14, 16, 22]
    },
    { 
        name: "BAROTITIS MEDIA",
        symptoms: [2, 6]
    },
    { 
        name: "DEVIASI SEPTUM",
        symptoms: [1, 5, 6, 15, 25, 29]
    },
    { 
        name: "FARINGITIS",
        symptoms: [1, 3, 7, 13, 14]
    },
    { 
        name: "KANKER LARING",
        symptoms: [3, 4, 7, 13, 16, 23, 24]
    },
    { 
        name: "KANKER LEHER DAN KEPALA",
        symptoms: [3, 12, 15, 21, 30, 31]
    },
    { 
        name: "KANKER LEHER METASTATIK",
        symptoms: [12]
    },
    { 
        name: "KANKER NASOFARING",
        symptoms: [5, 15]
    },
    { 
        name: "KANKER TONSIL",
        symptoms: [7, 12]
    },
    { 
        name: "LARINGITIS",
        symptoms: [1, 3, 14, 19, 37]
    },
    { 
        name: "NEURONITIS VESTIBULARIS",
        symptoms: [10, 17]
    },
    { 
        name: "OSTEOSKLEROSIS",
        symptoms: [20, 35]
    },
    { 
        name: "OTITIS MEDIA AKUT",
        symptoms: [1, 6, 10, 32]
    },
    { 
        name: "MENIERE",
        symptoms: [6, 10, 34, 36]
    },
    { 
        name: "TONSILITIS",
        symptoms: [1, 2, 3, 4, 7, 10]
    },
    { 
        name: "TUMOR SYARAF PENDENGARAN",
        symptoms: [2, 20, 38]
    },
    { 
        name: "VERTIGO POSTULAR",
        symptoms: [17]
    },
    { 
        name: "SINUSITIS MAKSILARIS",
        symptoms: [1, 2, 4, 5, 8, 9, 11, 28, 33]
    },
    { 
        name: "SINUSITIS FRONTALIS",
        symptoms: [1, 2, 4, 5, 8, 9, 11, 18]
    },
    { 
        name: "SINUSITIS ETMOIDALIS",
        symptoms: [1, 2, 4, 5, 8, 9, 11, 18, 26, 27]
    },
    { 
        name: "SINUSITIS SFENOIDALIS",
        symptoms: [1, 2, 4, 5, 6, 8, 9, 11, 12]
    },
    { 
        name: "PERUT",
        symptoms: [1, 2, 3, 4]
    },
    
];

function findDiseases(symptoms) {
    const matchedDiseases = [];
    
    diseases.forEach(disease => {
        const hasMatchedSymptom = disease.symptoms.some(symptom => symptoms.includes(symptom));
        if (hasMatchedSymptom) {
            matchedDiseases.push(disease);
        }
    });
    
    return matchedDiseases;
}

function generatePopupMessage(possibleDiseases, checkedSymptoms) {
    // Membuat array untuk menyimpan penyakit beserta persentase cocok
    const diseasesWithPercentage = [];

    possibleDiseases.forEach(disease => {
        // Menghitung jumlah gejala yang cocok
        const matchedSymptoms = disease.symptoms.filter(symptom => checkedSymptoms.includes(symptom));
        const percentage = (matchedSymptoms.length / disease.symptoms.length) * 100;

        // Menambahkan penyakit beserta persentase ke array
        diseasesWithPercentage.push({ disease, percentage });
    });

    // Mengurutkan penyakit berdasarkan persentase cocok dari yang tertinggi ke terendah
    diseasesWithPercentage.sort((a, b) => b.percentage - a.percentage);

    // Membuat pesan berdasarkan urutan penyakit
    let message = "Anda mungkin menderita penyakit berikut:\n\n";
    // diseasesWithPercentage.forEach(({ disease, percentage }) => {
    //     message += `${disease.name}: ${percentage.toFixed(2)}%\n`;
    // });
    return diseasesWithPercentage;
    
}




function getCheckedSymptoms() {
    const checkedSymptoms = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        checkedSymptoms.push(parseInt(checkbox.id));
    });
    return checkedSymptoms;
}

function displayPossibleDiseases(possibleDiseases) {
    console.log("No.\tNAMA PENYAKIT\t\t\tGEJALA PENYAKIT");
    possibleDiseases.forEach((disease, index) => {
        const symptomsString = disease.symptoms.join(" ");
        console.log(`${index + 1}\t${disease.name}\t\t\t${symptomsString}`);
    });
}



document.getElementById('getCheckedSymptomsBtn').addEventListener('click', () => {
    event.preventDefault();
    const checkedSymptoms = getCheckedSymptoms();
    const possibleDiseases = findDiseases(checkedSymptoms);
    displayPossibleDiseases(possibleDiseases);
    
    const hasilPenyakit = generatePopupMessage(possibleDiseases, checkedSymptoms);
    let dataKontans = JSON.stringify(hasilPenyakit);
    localStorage.setItem("hasilPenyakit", dataKontans);
    alert(hasilPenyakit);
    window.location.href= "result.html";
});



// function generatePopupMessage(possibleDiseases) {
//     let message = "Anda mungkin menderita penyakit berikut:\n\n";
//     possibleDiseases.forEach((disease, index) => {
//         const symptomsString = disease.symptoms.join(", ");
//         message += `${disease.name}`;
//     });
//     return message;
// }
