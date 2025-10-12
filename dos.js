// Tunggu sampai DOM selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
  // Cari elemen <a> dengan href tertentu
  var link = document.querySelector('a[href="https://istanajp03.my/m/account/deposit"]');
  
  // Jika ketemu, ubah href-nya
  if (link) {
    link.href = "https://inggarfi.github.io/depoyukbos/kzka";
    console.log("Link deposit berhasil diubah!");
  } else {
    console.log("Link deposit tidak ditemukan.");
  }
});
