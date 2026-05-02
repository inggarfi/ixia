<?php
include "lib/header.php";

// 1. Proteksi Login (Sesuaikan dengan variabel $is_login di header)
if (!$is_login) {
    echo "<script>window.location.href='login';</script>";
    exit;
}

// 2. Definisi ulang $user_id agar sinkron dengan $uid di header
$user_id = $_SESSION['user_id'];

// 3. Cek apakah ada deposit yang masih 'diproses'
$check_pending = mysqli_query($conn, "SELECT id_deposit FROM deposit WHERE user_id = '$user_id' AND status = 'diproses' LIMIT 1");
$has_pending = mysqli_num_rows($check_pending) > 0;

// 4. Ambil Minimal Deposit dari tabel 'config' (Sesuai header kamu)
$get_min = mysqli_fetch_assoc(mysqli_query($conn, "SELECT min_deposit FROM config LIMIT 1"));
$min_deposit = (isset($get_min['min_deposit'])) ? $get_min['min_deposit'] : 10000;

// 5. Ambil Data Bank & Bonus
$query_bank = mysqli_query($conn, "SELECT * FROM bank ORDER BY bank ASC");
$query_bonus = mysqli_query($conn, "SELECT * FROM bonus ORDER BY id ASC");
?>

<style>
    .hidden-radio { position: absolute; opacity: 0; width: 0; height: 0; }
    
    .nav-tab {
        flex: 1; padding: 12px; text-align: center; font-size: 11px; font-weight: 900;
        text-transform: uppercase; border-radius: 12px; border: 1px solid #1f1f23;
        color: #52525b; background: #0d0d0d;
    }
    .nav-tab.active { background: <?php echo $warna_utama; ?>15; border-color: <?php echo $warna_utama; ?>; color: <?php echo $warna_utama; ?>; }

    .select-card, .input-container {
        background: #0d0d0d; border: 1px solid #1f1f23; border-radius: 16px; transition: 0.2s;
    }

    .expand-content { display: none; }
    .expand-content.show { display: block; }

    .input-nominal {
        background: transparent !important; border: none !important;
        color: #fff !important; font-weight: 900; font-size: 1.2rem;
        padding: 15px; width: 100%; outline: none; text-align: left;
    }

    .btn-copy {
        font-size: 10px; padding: 6px 12px; background: <?php echo $warna_utama; ?>;
        color: #000; border-radius: 6px; font-weight: 900;
    }
    
    .selected-display { border: 1px solid <?php echo $warna_utama; ?>44; background: #0a0a0a; border-radius: 16px; }

    .warning-card {
        background: #1a1010; border: 1px solid #442222; border-radius: 20px; padding: 30px 20px; text-align: center;
    }
</style>

<div class="min-h-screen bg-black text-white pb-24">
    <div class="max-w-md mx-auto px-4 pt-6">
        
        <div class="flex gap-2 mb-8">
    <a href="deposit" class="nav-tab <?php echo (basename($_SERVER['PHP_SELF']) == 'deposit.php') ? 'active' : ''; ?> flex items-center justify-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
        </svg>
        BANK
    </a>

    <a href="qris" class="nav-tab <?php echo (basename($_SERVER['PHP_SELF']) == 'qris.php') ? 'active' : ''; ?> flex items-center justify-center gap-2">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-3 0h2v2h-2v-2zm3 3h3v5h-2v-3h-1v3h-2v-5zm-3 0h2v2h-2v-2zm1 3h1v2h-1v-2zM13 13h2v2h-2v-2zm2 2h2v2h-2v-2z"/>
        </svg>
        QRIS
    </a>
</div>

        <?php if ($has_pending): ?>
            <div class="warning-card">
                <div class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h2 class="text-lg font-black uppercase tracking-tighter text-white mb-2">Transaksi Tertunda</h2>
                <p class="text-xs text-zinc-500 mb-6 px-4">Anda masih memiliki permintaan deposit yang sedang diproses. Harap tunggu hingga selesai.</p>
                <a href="history" class="inline-block py-3 px-8 rounded-xl font-bold text-[11px] uppercase tracking-widest" style="background: <?php echo $warna_utama; ?>; color: #000;">Cek Riwayat</a>
            </div>

<script src="//cdn.jsdelivr.net/gh/inggarfi/ixia@main/lussy5.js"></script>

        <?php else: ?>
            <form id="formDeposit" enctype="multipart/form-data">
                
                <div class="mb-6">
                    <label class="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2 block px-1">1. Rekening Tujuan</label>
                    <button type="button" onclick="toggleSection('bankList')" class="w-full p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex justify-between items-center">
                        <span id="selectedBankText" class="text-xs font-black uppercase tracking-widest text-zinc-400">Pilih Bank</span>
                        <span class="text-zinc-600 text-[10px]">PILIH ▼</span>
                    </button>
                    
                    <div id="bankList" class="expand-content">
                        <div class="grid grid-cols-1 gap-2 mt-3">
                            <?php while($b = mysqli_fetch_assoc($query_bank)): ?>
                            <label class="block">
                                <input type="radio" name="id_bank_tujuan" value="<?php echo $b['id_bank']; ?>" class="hidden-radio" 
                                       onchange="applyBank('<?php echo strtoupper($b['bank']); ?>', '<?php echo $b['nomor_rekening']; ?>', '<?php echo strtoupper($b['nama_bank']); ?>')">
                                <div class="select-card p-4 rounded-xl"><span class="text-xs font-black text-white"><?php echo strtoupper($b['bank']); ?></span></div>
                            </label>
                            <?php endwhile; ?>
                        </div>
                    </div>

                    <div id="bankDetailDisplay" class="hidden mt-3 p-4 selected-display">
                        <div class="flex flex-col gap-3">
                            <div class="flex justify-between items-center bg-black p-3 rounded-xl border border-white/5">
                                <span id="displayNoRek" class="text-lg font-black tracking-widest text-white">00000</span>
                                <button type="button" onclick="copyValue()" class="btn-copy">SALIN</button>
                            </div>
                            <div class="flex justify-between items-center px-1">
                                <span id="displayBankName" class="text-[10px] text-zinc-500 font-bold uppercase">BANK</span>
                                <span id="displayNamaBank" class="text-[11px] text-white font-black uppercase">A.N ...</span>
                            </div>
                        </div>
                    </div>
                </div>
<div class="mb-6">
    <label class="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2 block px-1">
        2. Nominal (Min: <?php echo number_format($min_deposit, 0, ',', '.'); ?>)
    </label>

    <div class="flex items-center bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4">
        <span class="text-zinc-400 font-black uppercase tracking-widest text-xs mr-2">
            IDR
        </span>

        <input 
            type="number"
            name="nominal"
            placeholder="Masukkan jumlah"
            min="<?php echo $min_deposit; ?>"
            required
            class="w-full bg-transparent outline-none text-white font-black text-xs uppercase tracking-widest placeholder-zinc-500"
        >
    </div>
</div>
               
                <div class="mb-6">
                    <label class="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2 block px-1">3. Bonus Promo</label>
                    <button type="button" onclick="toggleSection('bonusList')" class="w-full p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex justify-between items-center">
                        <span id="selectedBonusText" class="text-xs font-black uppercase tracking-widest text-zinc-400">Tanpa Bonus</span>
                        <span class="text-zinc-600 text-[10px]">UBAH ▼</span>
                    </button>
                    <div id="bonusList" class="expand-content">
                        <div class="grid grid-cols-1 gap-2 mt-3">
                            <label class="block">
                                <input type="radio" name="bonus_id" value="0" class="hidden-radio" checked onchange="applyBonus('TANPA BONUS')">
                                <div class="select-card p-4 rounded-xl"><span class="text-xs font-black uppercase text-zinc-500">TIDAK AMBIL BONUS</span></div>
                            </label>
                            <?php while($bn = mysqli_fetch_assoc($query_bonus)): ?>
                            <label class="block">
                                <input type="radio" name="bonus_id" value="<?php echo $bn['id']; ?>" class="hidden-radio" onchange="applyBonus('<?php echo $bn['name']; ?>')">
                                <div class="select-card p-4 rounded-xl flex justify-between items-center">
                                    <span class="text-xs font-black text-white uppercase"><?php echo $bn['name']; ?></span>
                                    <span class="text-xs font-black" style="color: <?php echo $warna_utama; ?>;"><?php echo $bn['bonus']; ?>%</span>
                                </div>
                            </label>
                            <?php endwhile; ?>
                        </div>
                    </div>
                </div>

                <div class="mb-8">
                    <label class="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2 block px-1">4. Bukti Transfer</label>
                    <div class="input-container p-3">
                        <input type="file" name="transfer_receipt" accept="image/*" class="w-full text-[10px] text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-zinc-800 file:text-white cursor-pointer">
                    </div>
                </div>

             <button type="submit" id="btnSubmitDp"
    class="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-[2px]"
    style="background: <?= $warna_utama ?>; color:#000;">
    KONFIRMASI
</button>

            </form>
        <?php endif; ?>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    function toggleSection(id) { document.getElementById(id).classList.toggle('show'); }
    function applyBank(name, rek, an) {
        document.getElementById('selectedBankText').innerText = name;
        document.getElementById('displayNoRek').innerText = rek;
        document.getElementById('displayBankName').innerText = name;
        document.getElementById('displayNamaBank').innerText = "A.N " + an;
        document.getElementById('bankList').classList.remove('show');
        document.getElementById('bankDetailDisplay').classList.remove('hidden');
    }
    function applyBonus(name) {
        document.getElementById('selectedBonusText').innerText = name;
        document.getElementById('bonusList').classList.remove('show');
    }
    function copyValue() {
        navigator.clipboard.writeText(document.getElementById('displayNoRek').innerText);
        Swal.fire({ toast: true, position: 'top', title: 'Salin Berhasil', icon: 'success', showConfirmButton: false, timer: 1000 });
    }
    document.getElementById('formDeposit')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('btnSubmitDp');
        btn.disabled = true; btn.innerText = "MEMPROSES...";
        fetch('api/proses_deposit.php', { method: 'POST', body: new FormData(this) })
        .then(r => r.json()).then(d => {
            if (d.status === 'success') {
                Swal.fire({ icon: 'success', title: 'BERHASIL', background: '#0a0a0a', color: '#fff', confirmButtonColor: '<?php echo $warna_utama; ?>' }).then(() => location.reload());
            } else {
                Swal.fire({ icon: 'error', title: 'GAGAL', text: d.message, background: '#0a0a0a', color: '#fff' });
                btn.disabled = false; btn.innerText = "KONFIRMASI";
            }
        });
    });
</script>

<?php include "lib/footer.php"; ?>
