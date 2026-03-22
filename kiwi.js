(function () {
  // Cegah double inject
  if (document.getElementById("customLoginPopup")) return;

  const popup = document.createElement("div");
  popup.id = "customLoginPopup";
  popup.innerHTML = `
    <div style="
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      font-family: Arial;
    ">
      <div style="
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        width: 260px;
        text-align: center;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
      ">
        <h3 style="margin-bottom:15px;">Authentication Required</h3>

        <input id="login_user" type="text" placeholder="Nama pengguna"
          style="width:100%;padding:8px;margin-bottom:10px;border:1px solid #ccc;border-radius:4px;">

        <input id="login_pass" type="password" placeholder="Sandi"
          style="width:100%;padding:8px;margin-bottom:15px;border:1px solid #ccc;border-radius:4px;">

        <button id="login_btn" style="
          width:100%;
          padding:8px;
          background:#007bff;
          color:white;
          border:none;
          border-radius:4px;
          cursor:pointer;
        ">Masuk</button>
      </div>
    </div>
  `;

  document.body.appendChild(popup);

  document.getElementById("login_btn").onclick = function () {
    const user = document.getElementById("login_user").value;
    const pass = document.getElementById("login_pass").value;

    if (!user || !pass) {
      alert("Isi semua field!");
      return;
    }

    alert("Username: " + user);
    
    // Tutup popup
    document.getElementById("customLoginPopup").remove();
  };
})();
