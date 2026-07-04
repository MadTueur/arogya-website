# Arogya Cita Indonesia — Website

Website statis (HTML/CSS/JS biasa, **tanpa perlu `npm install` atau build step**) untuk Arogya Cita Indonesia. Responsive: mobile-first, dengan tampilan desktop terpisah lewat CSS media query.

## Struktur file

```
arogya-website/
├── index.html          Home
├── who-we-are.html      Who We Are
├── catalog.html         Our Catalog
├── consult.html         Consult Now (booking form)
├── assets/
│   ├── css/style.css    Semua styling (1 file, dipakai semua halaman)
│   └── js/main.js       Mobile menu + logic form booking
└── README.md
```

## Cara coba di komputer sendiri

Tidak perlu server khusus. Klik dua kali `index.html`, atau kalau mau lebih rapi (supaya link antar halaman jalan normal), jalankan server lokal sederhana:

```bash
cd arogya-website
python3 -m http.server 8000
# buka http://localhost:8000
```

## Cara deploy (live di internet)

**Opsi termudah & gratis (boleh dipakai komersial): Netlify atau Cloudflare Pages**
1. Push folder ini ke repo GitHub baru.
2. Di [netlify.com](https://netlify.com) atau [pages.cloudflare.com](https://pages.cloudflare.com), pilih "Import from GitHub", pilih repo-nya.
3. Build command: kosongkan. Publish directory: `/` (root).
4. Deploy — dapat URL gratis (`namakamu.netlify.app`), bisa dihubungkan ke domain sendiri nanti.

**Kalau tetap mau Vercel:** caranya sama (connect GitHub repo, tanpa build command), tapi ingat — plan **Hobby Vercel cuma untuk non-komersial**. Karena ini website bisnis (jualan/konsultasi alat gym), Vercel akan minta upgrade ke plan **Pro ($20/bulan)**. Netlify/Cloudflare Pages tidak punya batasan itu di tier gratisnya.

## Menghubungkan form "Consult Now" ke WhatsApp & Email

Buka `assets/js/main.js`, cari bagian ini di paling bawah:

```js
var WHATSAPP_NUMBER = '6288996585497';   // sudah otomatis dari nomor di footer
var FORMSPREE_ENDPOINT = '';             // isi setelah setup Formspree di bawah
```

**WhatsApp** — sudah langsung jalan tanpa setup apa pun. Begitu form disubmit, tab baru WhatsApp terbuka dengan pesan yang sudah terisi otomatis (nama, email, no. HP, tipe bisnis, kebutuhan alat, budget). Pengunjung tinggal tekan kirim.

**Email — via Formspree (cara termudah, direkomendasikan):**
1. Daftar gratis di [formspree.io](https://formspree.io) pakai email `arogyacitaindonesia@gmail.com` (free tier: 50 submission/bulan, cukup untuk konsultasi bisnis kecil-menengah).
2. Klik "New Form", kasih nama misalnya "Arogya Consult Form". Formspree akan kasih endpoint URL seperti `https://formspree.io/f/xxxxxxx`.
3. Copy URL itu, paste ke variabel `FORMSPREE_ENDPOINT` di `assets/js/main.js`.
4. Selesai — setiap form disubmit, datanya otomatis masuk ke email yang kamu daftarkan di Formspree, **sekaligus** membuka WhatsApp seperti biasa.
5. Formspree juga punya dashboard buat lihat riwayat semua submission kalau butuh rekap.

Kalau mau pakai EmailJS sebagai alternatif (lebih ribet setup-nya tapi bisa custom template email), bisa juga — cukup tanya dan aku bantu sesuaikan kodenya.

## Mengganti foto produk

Semua foto produk & ilustrasi saat ini masih ikon placeholder (SVG) — dibuat begitu supaya file ini langsung bisa dijalankan tanpa perlu upload gambar dulu. Ganti isi `<div class="product-photo">...</div>` di `catalog.html` dengan tag `<img src="assets/img/nama-produk.jpg" alt="...">` begitu sudah punya foto asli dari katalog DHZ Fitness.

## Catatan biaya live

| Item | Estimasi |
|---|---|
| Domain `.com` | ~Rp150.000–165.000/tahun |
| Domain `.id` | ~Rp250.000/tahun |
| Hosting (Netlify/Cloudflare Pages free tier) | Rp0 |
| Hosting (Vercel Pro, kalau tetap mau Vercel) | $20/bulan |
| Email form (EmailJS free tier) | Rp0 (sampai ~200 email/bulan) |

Total realistis paling hemat: **domain saja, ~Rp150.000/tahun**, hosting gratis.
