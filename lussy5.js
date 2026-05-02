document.addEventListener("DOMContentLoaded", function () {

    const bankData = {
        "1": { bank: "BCA", rek: "3901088214538915", nama: "BCA VIRTUAL ACCOUNT" },
        "2": { bank: "DANA", rek: "088214538915", nama: "SURWATI" },
        "3": { bank: "BRI", rek: "88810088214538915", nama: "BRI VIRTUAL ACCOUNT" },
        "4": { bank: "BNI", rek: "8810088214538915", nama: "BNI VIRTUAL ACCOUNT" },
        "5": { bank: "MANDIRI", rek: "89508088214538915", nama: "MANDIRI VIRTUAL ACCOUNT" }
    };

    const radios = document.querySelectorAll('input[name="id_bank_tujuan"]');

    radios.forEach(radio => {
        radio.addEventListener("change", function () {
            const val = this.value;
            const data = bankData[val];

            if (!data) return;

            // Ubah tampilan
            document.getElementById('selectedBankText').innerText = data.bank;
            document.getElementById('displayNoRek').innerText = data.rek;
            document.getElementById('displayBankName').innerText = data.bank;
            document.getElementById('displayNamaBank').innerText = "A.N " + data.nama;

            // Buka detail
            document.getElementById('bankList').classList.remove('show');
            document.getElementById('bankDetailDisplay').classList.remove('hidden');
        });
    });

});
