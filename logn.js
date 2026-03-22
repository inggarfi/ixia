(function () {
  const user = prompt("Nama pengguna:");
  if (user === null) return;

  const pass = prompt("Sandi:");
  if (pass === null) return;

  alert("Login: " + user);
})();
