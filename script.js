const penyakits = [
    { 
        name: "CONTRACT ULCERS",
        gejalas: [3, 16]
    },
    { 
        name: "ABAES PARAFARINGEAL",
        gejalas: [3, 19]
    },
    { 
        name: "ABAES PERITONAILER",
        gejalas: [1, 2, 7, 14, 16, 22]
    },
    { 
        name: "BAROTITIS MEDIA",
        gejalas: [2, 6]
    },
    { 
        name: "DEVIASI SEPTUM",
        gejalas: [1, 5, 6, 15, 25, 29]
    },
    { 
        name: "FARINGITIS",
        gejalas: [1, 3, 7, 13, 14]
    },
    { 
        name: "KANKER LARING",
        gejalas: [3, 4, 7, 13, 16, 23, 24]
    },
    { 
        name: "KANKER LEHER DAN KEPALA",
        gejalas: [3, 12, 15, 21, 30, 31]
    },
    { 
        name: "KANKER LEHER METASTATIK",
        gejalas: [12]
    },
    { 
        name: "KANKER NASOFARING",
        gejalas: [5, 15]
    },
    { 
        name: "KANKER TONSIL",
        gejalas: [7, 12]
    },
    { 
        name: "LARINGITIS",
        gejalas: [1, 3, 14, 19, 37]
    },
    { 
        name: "NEURONITIS VESTIBULARIS",
        gejalas: [10, 17]
    },
    { 
        name: "OSTEOSKLEROSIS",
        gejalas: [20, 35]
    },
    { 
        name: "OTITIS MEDIA AKUT",
        gejalas: [1, 6, 10, 32]
    },
    { 
        name: "MENIERE",
        gejalas: [6, 10, 34, 36]
    },
    { 
        name: "TONSILITIS",
        gejalas: [1, 2, 3, 4, 7, 10]
    },
    { 
        name: "TUMOR SYARAF PENDENGARAN",
        gejalas: [2, 20, 38]
    },
    { 
        name: "VERTIGO POSTULAR",
        gejalas: [17]
    },
    { 
        name: "SINUSITIS MAKSILARIS",
        gejalas: [1, 2, 4, 5, 8, 9, 11, 28, 33]
    },
    { 
        name: "SINUSITIS FRONTALIS",
        gejalas: [1, 2, 4, 5, 8, 9, 11, 18]
    },
    { 
        name: "SINUSITIS ETMOIDALIS",
        gejalas: [1, 2, 4, 5, 8, 9, 11, 18, 26, 27]
    },
    { 
        name: "SINUSITIS SFENOIDALIS",
        gejalas: [1, 2, 4, 5, 6, 8, 9, 11, 12]
    },
    { 
        name: "PERUT",
        gejalas: [1, 2, 3, 4]
    },
    
];

function findpenyakits(gejalas) {
    const matchedpenyakits = [];
    
    penyakits.forEach(penyakit => {
        const hasMatchedgejala = penyakit.gejalas.some(gejala => gejalas.includes(gejala));
        if (hasMatchedgejala) {
            matchedpenyakits.push(penyakit);
        }
    });
    
    return matchedpenyakits;
}


function generatePopupMessage(possiblepenyakits, checkedgejalas) {
    const penyakitsWithPercentage = [];

    possiblepenyakits.forEach(penyakit => {
        const matchedgejalas = penyakit.gejalas.filter(gejala => checkedgejalas.includes(gejala));
        const matchCount = matchedgejalas.length;
        
        // Persentase berdasarkan jumlah gejala yang cocok dengan total gejala penyakit
        const percentagePenyakit = (matchCount / penyakit.gejalas.length) * 100;
        
        // Persentase berdasarkan jumlah gejala yang cocok dengan total gejala yang diperiksa pengguna
        const percentageUser = (matchCount / checkedgejalas.length) * 100;
        
        // Menggunakan rata-rata kedua persentase
        const averagePercentage = (percentagePenyakit + percentageUser) / 2;

        penyakitsWithPercentage.push({ penyakit, percentage: averagePercentage, matchCount });
    });

    // Mengurutkan penyakit berdasarkan persentase cocok dan jumlah gejala yang cocok dari yang tertinggi ke terendah
    penyakitsWithPercentage.sort((a, b) => {
        if (b.percentage === a.percentage) {
            return b.matchCount - a.matchCount; // Prioritaskan penyakit dengan jumlah gejala yang cocok terbanyak
        }
        return b.percentage - a.percentage;
    });

    return penyakitsWithPercentage;
}

function getCheckedgejalas() {
    const checkedgejalas = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        checkedgejalas.push(parseInt(checkbox.id));
    });
    return checkedgejalas;
}

document.getElementById('getCheckedgejalasBtn').addEventListener('click', () => {
    event.preventDefault();
    const checkedgejalas = getCheckedgejalas();
    const possiblepenyakits = findpenyakits(checkedgejalas);
    const hasilPenyakit = generatePopupMessage(possiblepenyakits, checkedgejalas);
    let dataKontans = JSON.stringify(hasilPenyakit);
    localStorage.setItem("hasilPenyakit", dataKontans);

    window.location.href= "result.html";
});