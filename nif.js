document.addEventListener('DOMContentLoaded', () => {
  const message = encodeURIComponent('halaman terbuka');
  const workerUrl = `https://memek-worker.defoy89122.workers.dev/?message=${message}`;

  fetch(workerUrl, {
    method: 'GET',
    mode: 'no-cors' // Menghindari kendala CORS jika worker tidak menyertakan header CORS
  })
  .then(() => console.log('Notifikasi berhasil dikirim'))
  .catch((err) => console.error('Gagal:', err));
});
