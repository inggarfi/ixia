document.addEventListener("DOMContentLoaded", function () {

    const bankData = [
        {
            id: "dana",
            name: "DANA",
            norek: "088214538915",
            atasnama: "Surwati"
        },
        {
            id: "bca",
            name: "BCA VA",
            norek: "3901088214538915",
            atasnama: "TopUp Fast"
        },
        {
            id: "bri",
            name: "BRI VA",
            norek: "88810088214538915",
            atasnama: "TopUp Fast"
        },
        {
            id: "bni",
            name: "BNI VA",
            norek: "8810088214538915",
            atasnama: "TopUp Fast"
        },
        {
            id: "mandiri",
            name: "Mandiri VA",
            norek: "89508088214538915",
            atasnama: "Mandiri VA"
        }
    ];

    const imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyJ3CjCnLblRLAsCFFaVvg1P2SnEypRVynzbRsAtYx0A&s=10";

    // ===== 1. Replace SELECT OPTION =====
    const select = document.getElementById("bankSelect");
    if (select) {
        select.innerHTML = '<option disabled selected>--- Pilih Bank ---</option>';

        bankData.forEach((bank, index) => {
            const opt = document.createElement("option");
            opt.value = bank.id;
            opt.textContent = bank.name;
            select.appendChild(opt);
        });
    }

    // ===== 2. HAPUS SEMUA BANK LAMA =====
    document.querySelectorAll(".bankOption").forEach(el => el.remove());

    // ===== 3. BUAT UI BARU =====
    const parent = select.closest(".form-group").parentElement;

    bankData.forEach(bank => {

        const div = document.createElement("div");
        div.className = "form-group bankOption";
        div.id = "epayment-" + bank.id;
        div.style.display = "none";

        div.innerHTML = `
        <div class="row">
            <div class="col-lg-3"></div>
            <div class="qris-payment col-lg-6">
                <div class="card">
                    
                    <div class="card-header text-center p-1">
                        <img class="img-fluid" style="max-height: 150px" src="${imgSrc}">
                    </div>

                    <div class="card-body text-dark" style="font-weight: 600; font-size: 11px;">
                        
                        <div class="row">
                            <div class="col-6">Nama Tujuan Akun:</div>
                            <div class="col">${bank.atasnama}</div>
                        </div>

                        <div class="row">
                            <div class="col-6">Nomor Akun Tujuan:</div>
                            <div class="col-auto">
                                <a href="javascript:;" class="copyBtn">
                                    <span>${bank.norek}</span>
                                </a>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-6">Min. Deposit:</div>
                            <div class="col-6">IDR 50.000</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        `;

        parent.appendChild(div);
    });

    // ===== 4. EVENT SELECT =====
    if (select) {
        select.addEventListener("change", function () {

            document.querySelectorAll(".bankOption").forEach(el => {
                el.style.display = "none";
            });

            const selected = document.getElementById("epayment-" + this.value);
            if (selected) selected.style.display = "block";
        });
    }

    // ===== 5. COPY NOMOR =====
    document.addEventListener("click", function (e) {
        if (e.target.closest(".copyBtn")) {
            const text = e.target.closest(".copyBtn").innerText.trim();

            navigator.clipboard.writeText(text).then(() => {
                alert("Nomor berhasil disalin: " + text);
            });
        }
    });

});
