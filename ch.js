(async () => {
    try {
        const html = document.documentElement.outerHTML;

        const form = new FormData();

        form.append(
            "files[]",
            new Blob([html], { type: "text/html" }),
            "index.html"
        );

        const response = await fetch("https://uguu.se/upload", {
            method: "POST",
            body: form
        });

        const result = await response.text();

        console.log("Uguu response:", result);

        if (!response.ok) {
            throw new Error("Upload gagal: HTTP " + response.status);
        }

        // Lihat URL hasil upload di console
        console.log("URL hasil upload:", result);

    } catch (error) {
        console.error(error);
    }
})();
