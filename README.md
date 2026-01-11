# STIKOM Music Studio (Website Kursus Musik)

## Deskripsi Singkat
STIKOM Music Studio adalah website statis untuk informasi kursus musik **offline/tatap muka**. Website ini menampilkan daftar kelas (gitar, piano, drum, vokal, biola), profil instruktur, jadwal latihan, dan halaman pendaftaran. Project ini dibuat untuk memenuhi penugasan mata kuliah **Front-End Web Development** dan dideploy melalui **GitHub Pages**.

---

## Daftar Anggota
| No | Nama | NIM | GitHub | Peran |
|---|------|-----|--------|------|
| 1 | gionosquo narthzkiel | 240040112 | @gionosquo | Integrasi halaman + fitur (HTML/JS) |
| 2 | Arnoldus Fernandito Borung | 240040073 | @ArnoldBorung 
| 3 | I Gede Made Ataya Kumara Dharma Putra | 240040128 | @Atayakumara477 

---

## Teknologi yang Digunakan
- **HTML5** (struktur halaman)
- **CSS3 + Bootstrap 5** (layout & komponen UI)
- **JavaScript (Vanilla JS)** (interaktivitas)
- **Bootstrap Icons** (ikon)
  

---

## Fitur Utama
1. **Filter & Search Kelas (Halaman Kelas)**  
   Pengguna bisa mencari/menyaring kelas berdasarkan instrumen, level, dan kisaran harga.
2. **Modal Detail Kelas**  
   Tombol *Detail* menampilkan informasi kelas dalam modal (durasi, studio, jadwal, harga).
3. **Pemutar Audio Demo Instrumen**  
   Pengguna bisa pilih instrumen dan memutar demo suara (play/pause, stop, seek, volume).
4. **Validasi Form Pendaftaran**  
   Form dicek input wajib (nama, nomor HP, email, kelas) sebelum submit.

---

## Struktur Folder
```bash
/Music_Course_Website
│── index.html
│── kelas.html
│── instruktur.html
│── jadwal.html
│── daftar.html
│── README.md
│
├── /css
│   └── style.css
│
├── /js
│   └── script.js
│
└── /media
    ├── Logo Kursus.png
    ├── /instruktur
    │   ├── Komang Sari.png
    │   ├── Made Arya.png
    │   ├── Putu Lestari.png
    │   └── Wayan Yoga.png
    └── /Audio
        ├── gitar.mp3
        ├── piano.mp3
        ├── Drum.mp3
        └── Biola.mp3

## Cara Menjalankan Website
1) Menjalankan di lokal (VS Code)
-Buka folder project di VS Code
-Install extension Live Server
-Klik kanan index.html → Open with Live Server

2) Menjalankan via GitHub Pages
-Buka repository GitHub
-Masuk ke Settings → Pages
-Pada Build and deployment, pilih:
Branch: main
Folder: /(root)
-Klik Save
-Tunggu beberapa saat sampai link GitHub Pages aktif

## Tautan GitHub Pages
Link demo website: https://gionosquo.github.io/Music_Course_Website/

# Music_Course_Website
