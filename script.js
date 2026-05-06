let dataArray = [];

function generateArray() {
    const input = document.getElementById('arrayInput').value;
    // Ubah string ke array angka dan urutkan (syarat mutlak binary search)
    dataArray = input.split(',')
                     .map(num => parseInt(num.trim()))
                     .filter(num => !isNaN(num))
                     .sort((a, b) => a - b);

    const visualContainer = document.getElementById('arrayVisual');
    visualContainer.innerHTML = '';

    dataArray.forEach((val, index) => {
        const div = document.createElement('div');
        div.className = 'box';
        div.id = `box-${index}`;
        div.innerText = val;
        visualContainer.appendChild(div);
    });

    document.getElementById('btnMulai').disabled = false;
    updateLog("Data berhasil disiapkan. Klik 'Mulai'.", true);
}

function updateLog(msg, clear = false) {
    const logBox = document.getElementById('statusMsg');
    if (clear) logBox.innerHTML = '';
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `> ${msg}`;
    logBox.prepend(entry); // Menambahkan log terbaru di posisi paling atas
}

async function mulaiBinarySearch() {
    const target = parseInt(document.getElementById('targetInput').value);
    document.getElementById('btnMulai').disabled = true;
    
    let low = 0;
    let high = dataArray.length - 1;
    updateLog(`Mencari angka ${target}...`);

    

    while (low <= high) {
        // Reset highlight sebelumnya
        document.querySelectorAll('.box').forEach(el => el.classList.remove('low-high', 'active'));
        
        let mid = Math.floor((low + high) / 2);
        
        // Highlight area pencarian saat ini
        document.getElementById(`box-${low}`).classList.add('low-high');
        document.getElementById(`box-${high}`).classList.add('low-high');
        
        const midElement = document.getElementById(`box-${mid}`);
        midElement.classList.add('active');

        updateLog(`Rentang: index ${low} ke ${high}. Tengah: index ${mid} (Nilai: ${dataArray[mid]})`);

        await new Promise(r => setTimeout(r, 1000)); // Delay 1 detik

        if (dataArray[mid] === target) {
            midElement.classList.remove('active');
            midElement.classList.add('target');
            updateLog(`🎉 <strong>Ditemukan!</strong> ${target} ada di index ${mid}.`);
            return;
        }

        if (dataArray[mid] < target) {
            updateLog(`${dataArray[mid]} < ${target}, geser batas kiri ke index ${mid + 1}`);
            // Tandai elemen yang dibuang
            for (let i = low; i <= mid; i++) {
                document.getElementById(`box-${i}`).classList.add('discarded');
            }
            low = mid + 1;
        } else {
            updateLog(`${dataArray[mid]} > ${target}, geser batas kanan ke index ${mid - 1}`);
            // Tandai elemen yang dibuang
            for (let i = mid; i <= high; i++) {
                document.getElementById(`box-${i}`).classList.add('discarded');
            }
            high = mid - 1;
        }
        
        await new Promise(r => setTimeout(r, 500));
    }

    updateLog(`❌ Angka ${target} tidak ditemukan dalam data.`);
}
