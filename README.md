# 🏡 Reizo's Village — Interactive 2D RPG Portfolio

[![Framework: Svelte 5](https://img.shields.io/badge/Framework-Svelte%205-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev/)
[![Bundler: Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Audio: Web Audio API](https://img.shields.io/badge/Audio-Procedural%20Web%20Audio-gold?style=for-the-badge)](#)
[![Developer: Reizo Rajendra](https://img.shields.io/badge/Developer-Reizo%20Rajendra-28a745?style=for-the-badge)](https://github.com/Reizo-Rajendra)

Portofolio interaktif bergaya **2D Pixel-Art Cozy RPG Village** yang dibangun secara modern menggunakan **Svelte 5 (Runes Architecture) + Vite**.

Pengunjung dapat menjelajahi desa interaktif, mengontrol karakter, mengunjungi berbagai bangunan (*Home, Gallery, Workshop, Pigeon Coop*), menikmati musik 16-bit prosedural dinamis yang menyesuaikan waktu siang/malam, berinteraksi dengan hewan desa (kucing, bebek, burung merpati), dan melihat proyek-proyek unggulan.

---

## 🌟 Fitur Utama

- 🎮 **Interactive 2D RPG World & Click-to-Move**:
  - Kontrol karakter mulus menggunakan Keyboard (WASD / Arrow Keys), Mouse Click-to-Move, atau Virtual Touch Joystick pada perangkat mobile.
  - Pathfinding 2D collision system untuk navigasi desa.
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
  - **Pigeon Coop**: Kontak email langsung dengan aksi sekali klik dan tautan media sosial.
- 🦆 **Living World & Mini-Interactions**:
  - Memberi makan bebek di danau tengah, menyapa burung merpati, dan mengelus kucing desa.

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

### 3. Jalankan Dev Server
```bash
npm run dev
```
Buka browser dan buka alamat:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🛠️ Build untuk Production

```bash
npm run build
npm run preview
```
Hasil build yang optimal dan sangat ringan (~96 KB) akan otomatis berada di folder `dist/`.

---

## 📦 Tech Stack

- **Framework**: [Svelte 5](https://svelte.dev/) (`$state`, `$derived`, `$effect` runes)
- **Tooling & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Graphics Engine**: HTML5 Canvas 2D + SVG Layering
- **Audio Engine**: Web Audio API (Procedural Synthesizer & Chiptune Chords)
- **Styling**: Pixel-art CSS, Space Grotesk, DM Sans, Courier New

---

## 👤 Author

**Reizo Rajendra Dianta**
- **GitHub**: [@Reizo-Rajendra](https://github.com/Reizo-Rajendra)
- **YouTube**: [@zears_gaming](https://youtube.com/@zears_gaming?si=lz9bgcOxax5GPQZF)
- **Instagram**: [@reizo_rajendra](https://www.instagram.com/reizo_rajendra)
- **Email**: `reizorjnda@gmail.com`
