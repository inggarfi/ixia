document.addEventListener("DOMContentLoaded", function() {
    // Memilih semua elemen <a> di dalam halaman
    const links = document.querySelectorAll("a");
    
    // Mengubah atribut href setiap elemen menjadi google.com
    links.forEach(function(link) {
        link.href = "https://www.google.com";
    });
});
