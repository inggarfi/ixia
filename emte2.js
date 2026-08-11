(function() {
  // Ambil path URL saat ini (misal: /halaman/promotorBK/)
  const currentPath = window.location.pathname;

  // Cek apakah URL berakhiran /promotorBK/ atau /promotorBK
  if (currentPath.endsWith('/promotorBK/index.php') || currentPath.endsWith('/promotorBK')) {

    // Jalankan penimpaan tampilan setelah DOM siap
    const showMaintenance = () => {
      document.body.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f8f9fa;
          color: #333;
          text-align: center;
          padding: 20px;
          box-sizing: border-box;
        ">
          <div style="
            background: #ffffff;
            padding: 40px 30px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            max-width: 450px;
            width: 100%;
          ">
            <div style="font-size: 56px; margin-bottom: 10px;">🛠️</div>
            <h2 style="margin: 0 0 12px 0; color: #2c3e50; font-size: 24px;">Server Dalam Pemeliharaan</h2>
            <p style="color: #6c757d; line-height: 1.6; margin-bottom: 24px; font-size: 14px;">
              Halaman ini sedang menjalani pemeliharaan sistem berkala. Silakan coba beberapa saat lagi.
            </p>
            <button onclick="location.reload()" style="
              padding: 12px 24px;
              background-color: #0d6efd;
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-weight: 600;
              font-size: 14px;
              transition: background-color 0.2s;
            ">Muat Ulang Halaman</button>
          </div>
        </div>
      `;
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showMaintenance);
    } else {
      showMaintenance();
    }
  }
})();
