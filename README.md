# 🏡 Reizo's Village — Interactive 2D RPG Portfolio

[![Framework: Svelte 5](https://img.shields.io/badge/Framework-Svelte%205-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev/)
[![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Styling: Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Email: Resend](https://img.shields.io/badge/Email%20Service-Resend%20API-black?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)
[![Bundler: Vite](https://img.shields.io/badge/Bundler-Vite%208-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Developer: Reizo Rajendra](https://img.shields.io/badge/Developer-Reizo%20Rajendra-28a745?style=for-the-badge)](https://github.com/Reizo-Rajendra)

Portofolio interaktif bertema **2D Pixel-Art Cozy RPG Village** yang dibangun secara modern dan berkinerja tinggi menggunakan arsitektur **Svelte 5 (Runes) + Tailwind CSS v4 + TypeScript + Resend API**.

Pengunjung dapat menjelajahi desa piksel yang hidup, menggerakkan karakter dengan navigasi intuitif (WASD), mengunjungi berbagai bangunan utama (*Home, Gallery, Workshop, Pigeon Coop*), menikmati musik 16-bit prosedural yang beradaptasi dengan siklus siang/malam, berinteraksi dengan hewan desa (kucing, bebek kolam, merpati pos), mengeksplorasi karya proyek unggulan, serta mengirimkan surat kontak langsung ke email Reizo melalui **Resend API**.

---

## 🌟 Fitur Utama

- 🎮 **Interactive 2D RPG Village Engine**:
  - Kontrol karakter mulus menggunakan **Keyboard (WASD)**, Mouse Click-to-Move, atau Virtual Touch Joystick di perangkat mobile.
  - Pathfinding 2D collision system untuk navigasi desa tanpa hambatan.
  - Interaksi seru: elus kucing desa, beri makan bebek di kolam tengah, dan terbangkan merpati pos.
- ⚡ **Zero-Lag & High Performance**:
  - Peta desa ultra-ringan teroptimasi (turun dari 9.5 MB ke 733 KB) dengan waktu inisialisasi instan (< 10 ms).
  - Capping *Device Pixel Ratio* (DPR) cerdas untuk performa 60 FPS mulus di laptop, retina display, dan perangkat mobile.
  - Auto-pause canvas render loop saat membaca modal dialog untuk efisiensi CPU/GPU mendekati 0%.
- 📬 **Kirim Surat Merpati (Integrasi Resend API)**:
  - Mengirimkan pesan/surat kontak langsung ke email Reizo (`reizorjnda@gmail.com`) dengan validasi real-time.
  - Layanan email type-safe (`src/lib/resend.ts`) & serverless API endpoint (`api/contact.ts`).
- 🎨 **Estetika Cozy Pixel & Modern Clean UI**:
  - Menggabungkan elemen pixel-art 16-bit otentik dengan layout modern kertas perkamen yang rapi dan elegan.
  - Dilengkapi foto profil pengembang resmi (*Developer Hero Section*) dengan indikator status aktif.
- 🔷 **100% Type-Safe TypeScript & Svelte 5 Runes**:
  - Menggunakan reaktivitas modern Svelte 5 (`$state`, `$derived`, `$effect`, `$props`).
  - Strict type checking dengan 0 linter warning dan 0 compiler error.
- 🌅 **Siklus Siang & Malam Dinamis (Day / Night Cycle)**:
  - Widget jam desa interaktif yang sinkron otomatis dengan waktu lokal nyata (WIB/UTC+7) atau dapat diubah manual (Day / Night).
  - Lentera dan obor malam, efek pencahayaan dinamis, partikel kunang-kunang berpendar lembut, serta dedaunan siang yang melayang alami.
- 🎵 **16-bit Procedural Web Audio Synthesizer**:
  - Musik latar chiptune retro yang disintesis langsung di browser menggunakan Web Audio API tanpa perlu aset audio eksternal (*zero bandwidth*).
  - Lagu berganti otomatis sesuai suasana: *"Cozy Village Morning"* (siang) dan *"Starry Night Lullaby"* (malam).

---

## 🏛️ Bangunan Desa & Showcase

| Bangunan | Nama Area | Konten & Deskripsi |
| :--- | :--- | :--- |
| 🏡 **Home** | *About Me* | Profil lengkap Reizo Rajendra, foto profil resmi, peran aktif sebagai **Ketua & Lead Full Stack Developer di Ekstrakurikuler Software Engineering SMKN 8 Semarang**, pengalaman kreator YouTube di **@zears_gaming**, serta riwayat pendidikan formal. |
| 🖼️ **Gallery** | *Selected Projects* | Galeri karya inovasi digital dengan visual poster bergaya Canva & presentasi interaktif: **Megantara 3D Culture WebGL**, **POLANITAS Platform Inklusif AI Disabilitas**, **AI Gesture Recognition**, **Vintage Christmas Photobooth**, dan **Zears Gaming Stream Hub**. |
| 🛠️ **Workshop** | *My Toolkit* | Pemetaan keahlian teknis (*Frontend, Backend & DB, Cloud Services, State Management, Tools & Design*). |
| 🕊️ **Pigeon Coop** | *Say Hello* | Jalur komunikasi langsung melalui email resmi, tautan media sosial (*YouTube, GitHub, Instagram, Threads*), dan formulir kirim surat interaktif via **Resend API**. |

---

## 🚀 Cara Menjalankan di Lingkungan Lokal

### 1. Clone Repositori
```bash
git clone https://github.com/Reizo-Rajendra/portofolio.git
cd portofolio
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Konfigurasi Lingkungan (Opsional untuk Resend API Nyata)
Buat file `.env` di root project:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```
*(Catatan: Tanpa API key pun sistem otomatis berjalan dalam mode simulasi cerdas sehingga formulir surat tetap dapat diuji coba secara lokal).*

### 4. Jalankan Server Development
```bash
npm run dev
```
Buka peramban (browser) dan akses:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🛠️ Build untuk Produksi

```bash
# Menjalankan build produksi yang optimal
npm run build

# Menjalankan preview lokal hasil build produksi
npm run preview
```
Hasil kompilasi produksi yang super ringan (~132 KB JS) akan tersimpan di dalam folder `dist/`.

---

## 📦 Tech Stack Utama

- **Frontend Framework**: [Svelte 5](https://svelte.dev/) (Runes reactivity)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Retro 16-Bit Pixel System
- **Bundler & Tooling**: [Vite 8](https://vitejs.dev/)
- **Email Service**: [Resend API](https://resend.com/)
- **Rendering Engine**: HTML5 Canvas 2D + Optimized Lossless WebP Vector Layering
- **Audio Engine**: Web Audio API (Chiptune Procedural Synthesizer)

---

## 👤 Author & Profil

**Reizo Rajendra Dianta**
- **Peran**: Ketua & Lead Full Stack Developer · Ekstrakurikuler Software Engineering SMKN 8 Semarang
- **GitHub**: [@Reizo-Rajendra](https://github.com/Reizo-Rajendra)
- **YouTube**: [@zears_gaming](https://youtube.com/@zears_gaming?si=lz9bgcOxax5GPQZF)
- **Instagram**: [@reizo_rajendra](https://www.instagram.com/reizo_rajendra)
- **Threads**: [@reizo_rajendra](https://www.threads.com/@reizo_rajendra)
- **Email**: [reizorjnda@gmail.com](mailto:reizorjnda@gmail.com)
