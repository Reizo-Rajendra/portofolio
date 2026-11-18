# 🏡 Reizo's Village — Interactive 2D RPG Portfolio

[![Framework: Svelte 5](https://img.shields.io/badge/Framework-Svelte%205-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev/)
[![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Styling: Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Email: Resend](https://img.shields.io/badge/Email%20Service-Resend%20API-black?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)
[![Bundler: Vite](https://img.shields.io/badge/Bundler-Vite%208-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Developer: Reizo Rajendra](https://img.shields.io/badge/Developer-Reizo%20Rajendra-28a745?style=for-the-badge)](https://github.com/Reizo-Rajendra)

Portofolio interaktif bergaya **2D Pixel-Art Cozy RPG Village** yang dibangun secara modern menggunakan **Svelte 5 (Runes Architecture) + Tailwind CSS + TypeScript + Resend API**.

Pengunjung dapat menjelajahi desa interaktif, mengontrol karakter, mengunjungi berbagai bangunan (*Home, Gallery, Workshop, Pigeon Coop*), menikmati musik 16-bit prosedural dinamis yang menyesuaikan waktu siang/malam, berinteraksi dengan hewan desa (kucing, bebek, burung merpati), melihat proyek-proyek unggulan, serta mengirimkan pesan langsung ke email Reizo melalui **Resend API**.

---

## 🌟 Fitur Utama

- 🎮 **Interactive 2D RPG World & Click-to-Move**:
  - Kontrol karakter mulus menggunakan Keyboard (WASD / Arrow Keys), Mouse Click-to-Move, atau Virtual Touch Joystick pada perangkat mobile.
  - Pathfinding 2D collision system untuk navigasi desa.
- 📬 **Integrasi Resend API (Merpati Pos / Say Hello)**:
  - Mengirimkan pesan/surat kontak langsung ke email Reizo tanpa perlu membuka aplikasi email eksternal.
  - Type-safe email client service (`src/lib/resend.ts`) & serverless API endpoint (`api/contact.ts`).
- 🎨 **Tailwind CSS v4 & Pixel-Art Styling**:
  - Utility classes Tailwind modern terintegrasi mulus dengan custom 16-bit pixel theme tanpa merusak estetika retro.
- 🔷 **100% TypeScript (Strict Type Safety)**:
  - Antarmuka tipe lengkap (`src/lib/types.ts`), typed components (`<script lang="ts">`), dan validasi compile-time via `svelte-check`.
- 🌅 **Siklus Siang & Malam Dinamis (Day / Night Cycle)**:
  - Widget jam desa interaktif yang sinkron dengan waktu nyata atau dapat diubah manual (Day / Night).
  - Efek pencahayaan dinamis, lentera/obor pemain menyala di malam hari, partikel kunang-kunang (*fireflies*), dan bintang malam.
- 🎵 **16-bit Procedural Web Audio BGM**:
  - Musik latar chiptune retro yang di-generate langsung di browser tanpa file audio berat (*zero bandwidth*).
  - Lagu berganti otomatis sesuai suasana: *"Cozy Village Morning"* (siang) dan *"Starry Night Lullaby"* (malam).
- 🏛️ **Bangunan & Showcase Terintegrasi**:
  - **Home**: Profil lengkap Reizo Rajendra, timeline pengalaman (*Snapandev, Zears Gaming, OSIS, Paskibra*), dan riwayat pendidikan.
  - **Gallery**: Showcase proyek terpilih (*Megantara 3D WebGL, POLANITAS Platform Inklusif AI, Cyber Gesture AI, Vintage Christmas Photobooth, Zears Gaming Stream Hub*).
  - **Workshop**: Pemetaan keahlian (*Frontend, Backend, Cloud, Tools, UI/UX*).
  - **Pigeon Coop**: Kontak email langsung, salin email cepat, dan formulir pengiriman surat via Resend API.

---

## 🚀 Cara Menjalankan di Localhost

### 1. Clone Repositori
```bash
git clone https://github.com/Reizo-Rajendra/portofolio.git
cd portofolio
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Konfigurasi Lingkungan (Opsional untuk Resend Nyata)
Buat file `.env` (atau set environment variable):
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
```
*(Catatan: Tanpa API key pun sistem otomatis beralih ke mode simulasi cerdas sehingga form tetap dapat dites secara lokal).*

### 4. Jalankan Dev Server
```bash
npm run dev
```
Buka browser dan kunjungi:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🛠️ Build untuk Production

```bash
npm run build
npm run preview
```
Hasil build yang optimal dan sangat ringan (~130 KB JS) akan otomatis berada di folder `dist/`.

---

## 📦 Tech Stack

- **Framework**: [Svelte 5](https://svelte.dev/) (`$state`, `$derived`, `$effect` runes)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Retro 16-Bit Pixel CSS
- **Email Service**: [Resend](https://resend.com/)
- **Tooling & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Graphics Engine**: HTML5 Canvas 2D + SVG Layering
- **Audio Engine**: Web Audio API (Procedural Synthesizer & Chiptune Chords)

---

## 👤 Author

**Reizo Rajendra Dianta**
- **GitHub**: [@Reizo-Rajendra](https://github.com/Reizo-Rajendra)
- **YouTube**: [@zears_gaming](https://youtube.com/@zears_gaming?si=lz9bgcOxax5GPQZF)
- **Instagram**: [@reizo_rajendra](https://www.instagram.com/reizo_rajendra)
- **Email**: `reizorjnda@gmail.com`
