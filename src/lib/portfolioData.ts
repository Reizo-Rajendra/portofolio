import type {
  Building,
  AboutMe,
  Experience,
  Project,
  SkillCategory,
  ContactInfo,
} from './types.js';

export const BUILDINGS: Building[] = [
  {
    id: "home",
    name: "Home",
    subtitle: "About me",
    asset: "home",
    x: 445,
    y: 420,
    door: { x: 445, y: 451 },
    labelY: 440,
  },
  {
    id: "projects",
    name: "Gallery",
    subtitle: "Selected work",
    asset: "project-shop",
    x: 950,
    y: 255,
    door: { x: 950, y: 287 },
    labelY: 273,
  },
  {
    id: "skills",
    name: "Workshop",
    subtitle: "My toolkit",
    asset: "workshop",
    x: 1335,
    y: 430,
    door: { x: 1335, y: 467 },
    labelY: 449,
  },
  {
    id: "contact",
    name: "Pigeon Coop",
    subtitle: "Say hello",
    asset: "pigeon-coop",
    x: 1045,
    y: 700,
    door: { x: 1045, y: 740 },
    labelY: 720,
  },
];

export const BUILDING_COPY: Record<string, string> = {
  home: "About me",
  projects: "Selected projects",
  skills: "Skills & tools",
  contact: "Say hello",
};

export const ABOUT_ME: AboutMe = {
  eyebrow: "01 / HOME / ABOUT ME",
  title: "Hey, I'm Reizo.",
  titleSub: "Welcome to my world.",
  lead: "I'm Reizo Rajendra, a Full Stack Developer & Gaming Creator based in Semarang, Indonesia.",
  note: "I build fast, responsive web applications and interactive digital experiences with Svelte, React, Next.js, and Node.js. Alongside coding, I run @zears_gaming on YouTube where I dive into gaming adventures, walkthroughs, and developer tech.",
  coreStack: [
    "Svelte / SvelteKit",
    "React.js",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Supabase",
    "Tailwind CSS",
    "YouTube Creator",
  ],
  education: [
    {
      year: "2024 – PRESENT",
      degree: "Software Engineering (Rekayasa Perangkat Lunak)",
      institution: "SMKN 8 Semarang",
      status: "Active Student · Class of 2026/2027",
      details:
        "Ketua & Full Stack Developer di Snapandev SMKN 8 Semarang. Focus on modern full-stack engineering, scalable APIs, and interactive web systems.",
    },
    {
      year: "GRADUATED 2024",
      degree: "Junior High School Diploma",
      institution: "SMPN 20 Semarang",
      status: "Consistently Top 3 Academic Student (Selalu Top 3)",
      details:
        "Ketua Seksi Kewirausahaan OSIS & Anggota Paskibra. Actively led student business initiatives and ceremonial flag-raising leadership.",
    },
  ],
};

export const EXPERIENCES: Experience[] = [
  {
    id: "snapandev-lead",
    company: "Snapandev — SMKN 8 Semarang",
    role: "Ketua & Full Stack Developer",
    period: "2026 – Present",
    placement: "SMKN 8 Semarang · Software Engineering Team",
    summary:
      "Memimpin divisi development Snapandev dan merancang arsitektur aplikasi web full-stack modern untuk proyek inovasi sekolah dan klien.",
    highlights: [
      "Menjabat sebagai Ketua tim pengembang Snapandev, mengarahkan roadmap teknologi dan standar koding tim.",
      "Mengembangkan aplikasi web responsif menggunakan SvelteKit, React, Next.js, Node.js, dan Supabase.",
      "Merancang skema database relasional (PostgreSQL & MySQL/MariaDB) dan integrasi REST API yang aman.",
      "Menerapkan UI/UX yang modern dan intuitif dengan Tailwind CSS dan Material UI.",
    ],
    stack: [
      "Svelte / SvelteKit",
      "React.js",
      "Next.js",
      "Node.js",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "TypeScript",
    ],
  },
  {
    id: "zears-gaming",
    company: "Zears Gaming (YouTube Channel)",
    role: "Gaming & Tech Content Creator",
    period: "2026 – Present",
    placement: "YouTube @zears_gaming",
    summary:
      "Membuat konten gameplay seru, tips & trik gaming, live streaming interaktif, dan eksplorasi teknologi seputar dunia gaming & coding.",
    highlights: [
      "Membangun komunitas gamer aktif lewat streaming berkualitas tinggi dan interaksi komunitas yang solid.",
      "Memproduksi video kreatif dengan visual editing yang dinamis dan storytelling menarik.",
      "Mengkombinasikan passion gaming dan logika programmer untuk konten yang edukatif dan menghibur.",
    ],
    stack: [
      "YouTube Gaming",
      "Live Streaming",
      "Content Strategy",
      "Audio/Video Editing",
      "Community Engagement",
    ],
  },
  {
    id: "international-study",
    company: "International Tech & Cultural Exploration",
    role: "Tech Immersion & Cross-Cultural Study",
    period: "2023",
    placement: "Singapore (NUS), Malaysia & Thailand",
    summary:
      "Berkunjung ke National University of Singapore (NUS) untuk eksplorasi kurikulum Computer Science & koding kelas dunia, mempelajari ekosistem teknologi cerdas di Singapura, serta studi budaya dan perkembangan industri kreatif di Malaysia & Thailand.",
    highlights: [
      "Campus exploration di NUS School of Computing untuk memahami standar internasional kurikulum software engineering.",
      "Mempelajari adopsi teknologi cerdas, otomasi, dan infrastruktur digital modern di Singapura.",
      "Mempelajari kolaborasi masyarakat multikultural dan perkembangan industri kreatif di Malaysia & Thailand.",
    ],
    stack: [
      "NUS Computing",
      "Smart City Tech",
      "Cultural Intelligence",
      "Global Benchmarking",
    ],
  },
  {
    id: "osis-entrepreneurship",
    company: "OSIS SMPN 20 Semarang",
    role: "Ketua Seksi Kewirausahaan",
    period: "2023",
    placement: "SMP Negeri 20 Semarang",
    summary:
      "Memimpin seksi kewirausahaan OSIS dalam mengorganisir program usaha kreatif siswa dan penggalangan dana sekolah.",
    highlights: [
      "Menggagas bazaar dan program kewirausahaan siswa yang sukses meningkatkan kas organisasi.",
      "Mengelola perencanaan anggaran, strategi pemasaran produk siswa, dan laporan keuangan transparan.",
    ],
    stack: ["Leadership", "Entrepreneurship", "Financial Budgeting", "Team Coordination"],
  },
  {
    id: "osis-paskibra",
    company: "OSIS & Paskibra SMPN 20 Semarang",
    role: "Anggota Pengurus OSIS & Paskibra",
    period: "2022",
    placement: "SMP Negeri 20 Semarang",
    summary:
      "Aktif dalam kepengurusan OSIS dan pasukan pengibar bendera (Paskibra) sekolah dengan disiplin tinggi.",
    highlights: [
      "Bertugas dalam upacara resmi dan peringatan hari besar dengan ketepatan dan kedisiplinan tinggi.",
      "Mengasah jiwa kepemimpinan, tanggung jawab, dan soliditas tim sejak bangku SMP.",
    ],
    stack: ["Discipline", "Teamwork", "Public Responsibility", "Event Organization"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "megantara",
    name: "Megantara (Batik Mega Mendung 3D)",
    category: "SPATIAL 3D WEBGL & CULTURE",
    tagline: "Interactive 3D spatial Indonesian cultural exploration platform.",
    description:
      "Platform edukasi budaya Indonesia interaktif berbasis Spatial 3D WebGL dengan estetika luhur motif Batik Mega Mendung. Menghadirkan panggung inspeksi pusaka 3D 360° (Gamelan Ageng, Angklung, Keris, Sasando), peta spasial diorama 5 pulau Nusantara, 6 sahabat maskot kebudayaan, serta 10 mini games edukasi budaya dengan audio prosedural realtime.",
    cover: "/assets/projects/megantara/cover.webp",
    images: [
      "/assets/projects/megantara/cover.webp",
      "/assets/projects/megantara/preview-1.webp",
      "/assets/projects/megantara/preview-2.webp",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "Three.js (r182)",
      "@react-three/fiber",
      "Tailwind CSS v4",
      "Framer Motion",
      "WebGL",
    ],
    links: [
      { label: "Live Demo", href: "https://megantara-eight.vercel.app" },
      { label: "GitHub Repo", href: "https://github.com/Reizo-Rajendra/Megantara" },
    ],
    highlights: [
      {
        title: "Panggung Pusaka 3D 360°",
        description:
          "Inspeksi artefak dan instrumen pusaka nusantara secara real-time di browser dengan kontrol rotasi dan gestur sentuh mulus via Three.js.",
      },
      {
        title: "Peta Spasial Diorama 5 Kepulauan",
        description:
          "Eksplorasi interaktif pulau Sumatera, Jawa, Kalimantan, Sulawesi, dan Papua lengkap dengan maskot khas dan mini games budaya.",
      },
      {
        title: "Mega Mendung Theme & Audio Prosedural",
        description:
          "Desain estetika gradasi biru tradisional Mega Mendung dipadukan dengan arsitektur audio gamelan dan instrumen otentik.",
      },
    ],
  },
  {
    id: "polanitas",
    name: "POLANITAS — Platform Inklusif AI",
    category: "AI ACCESSIBILITY & INCLUSION",
    tagline: "Platform AI inklusif untuk kemandirian penyandang disabilitas.",
    description:
      "Platform cerdas komprehensif yang dirancang untuk memberdayakan penyandang disabilitas. Menghadirkan TanganBicara AI untuk menerjemahkan bahasa isyarat BISINDO menjadi suara vokal bahasa Indonesia secara real-time, Mata AI (Gemini Vision) untuk mendeskripsikan lingkungan dan rintangan bagi tunanetra, serta sistem navigasi suara dan pelacak mata (eye tracking).",
    cover: "/assets/projects/polanitas/features.svg",
    images: [
      "/assets/projects/polanitas/features.svg",
      "/assets/projects/polanitas/system.svg",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "Google Gemini AI (@google/generative-ai)",
      "Groq SDK",
      "Firebase & Admin SDK",
      "Tailwind CSS v4",
      "Framer Motion",
      "TypeScript",
    ],
    links: [
      {
        label: "GitHub Repo",
        href: "https://github.com/Reizo-Rajendra/AI-Berkebutuhan-khusus",
      },
    ],
    highlights: [
      {
        title: "TanganBicara AI (Sign-to-Voice)",
        description:
          "Pengenalan gestur tangan dan bahasa isyarat BISINDO secara instan yang dikonversi ke suara vokal bahasa Indonesia dengan dialog interaktif 2 arah.",
      },
      {
        title: "Mata AI (Gemini Vision Multimodal)",
        description:
          "Analisis visual ruangan, pembacaan teks dokumen, pengenalan pecahan uang rupiah, dan deteksi rintangan untuk penyandang disabilitas netra.",
      },
      {
        title: "Navigasi Suara & Eye-Tracking",
        description:
          "Kontrol aplikasi tanpa sentuhan menggunakan perintah suara berbahasa Indonesia dan pelacakan pergerakan bola mata.",
      },
    ],
  },
  {
    id: "ai-gesture",
    name: "Cyber Gesture AI",
    category: "COMPUTER VISION & REAL-TIME AI",
    tagline: "Real-time hand landmark tracking, cybernetic 3D mesh & voice synthesis.",
    description:
      "Aplikasi Computer Vision futuristik berbasis AI yang mengenali gestur tangan secara instan di depan webcam, menampilkan efek jaring-jaring 3D hologram neon sci-fi, dan mengeksekusi sintesis suara perkenalan diri dalam Bahasa Indonesia secara otomatis tanpa jeda / lag.",
    cover: "/assets/projects/ai-gesture/cover.svg",
    images: ["/assets/projects/ai-gesture/cover.svg"],
    stack: [
      "Python 3.11",
      "MediaPipe (0.10.14)",
      "OpenCV",
      "Pygame Audio Engine",
      "Computer Vision",
      "Mathematical Normalization",
    ],
    links: [
      {
        label: "GitHub Repo",
        href: "https://github.com/Reizo-Rajendra/AI-Gesture",
      },
    ],
    highlights: [
      {
        title: "Respon Kilat (< 60 ms) & Palm-Normalized Ratio",
        description:
          "Deteksi instan dalam 2 frame konfirmasi menggunakan algoritma normalisasi telapak tangan yang akurat pada berbagai jarak kamera dan sudut miring.",
      },
      {
        title: "Visual Mesh Cybernetic 3D Hologram",
        description:
          "Rendering 21 titik koordinat sendi tangan bercahaya neon hijau dan garis sambung bertema sci-fi HUD telemetry.",
      },
      {
        title: "Sintesis Vokal Bahasa Indonesia Zero-Lag",
        description:
          "Integrasi audio engine multi-threading dengan latency super rendah untuk ucapan sambutan dan interaksi suara langsung.",
      },
    ],
  },
  {
    id: "christmas-booth",
    name: "Vintage Christmas Photobooth",
    category: "INTERACTIVE RETRO WEB EXPERIENCE",
    tagline: "Artisanal vintage Korean 3-cut photobooth studio & 3D wax-sealed letter.",
    description:
      "Website interaktif bertema Artisanal Vintage Christmas & 3-Cut Photobooth Studio yang terinspirasi dari tren viral photobooth Korea (Life 3-Cuts). Dilengkapi amplop beludru merah 3D interaktif berstempel lilin emas asli dengan efek audio retakan lilin fisik, generator strip foto Polaroid vintage, filter film analog, dan studio stiker ornamen Natal.",
    cover: "/assets/projects/christmas-booth/cover.jpg",
    images: [
      "/assets/projects/christmas-booth/cover.jpg",
      "/assets/projects/christmas-booth/preview-1.jpg",
    ],
    stack: [
      "JavaScript (ES6+)",
      "HTML5 Canvas 2D",
      "Web Audio API",
      "CSS 3D Transforms",
      "Canvas Image Processing",
    ],
    links: [
      {
        label: "GitHub Repo",
        href: "https://github.com/Reizo-Rajendra/christmas-booth",
      },
    ],
    highlights: [
      {
        title: "Amplop Beludru 3D & Segel Lilin Fisik",
        description:
          "Pengalaman membuka kartu pos vintage dengan animasi 3D CSS dan efek audio retakan segel lilin realistis saat diklik.",
      },
      {
        title: "Studio Photobooth 3-Cut & Filter Film Retro",
        description:
          "Pengambilan foto webcam atau upload gambar dengan efek grain analog, palette hangat nostalgia, dan frame photobooth klasik.",
      },
      {
        title: "Export & Cetak Instan Berkualitas Tinggi",
        description:
          "Komposisi strip foto beresolusi tinggi yang siap diunduh dan dicetak sebagai memorabilia liburan.",
      },
    ],
  },
  {
    id: "zears-hub",
    name: "Zears Gaming Stream Hub",
    category: "GAMING & CONTENT CREATOR",
    tagline: "Live streams, community hub & game walkthroughs.",
    description:
      "Portal interaktif untuk kanal YouTube @zears_gaming, menampilkan jadwal streaming langsung, galeri gameplay pilihan, highlight klip gaming, dan koneksi langsung dengan komunitas penonton.",
    cover: "/assets/projects/instafy/profile-cover.webp",
    images: [
      "/assets/projects/instafy/profile-dark.webp",
      "/assets/projects/instafy/profile-light.webp",
    ],
    stack: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "REST API integration",
      "YouTube Data API",
    ],
    links: [
      {
        label: "Visit Channel",
        href: "https://youtube.com/@zears_gaming?si=lz9bgcOxax5GPQZF",
      },
    ],
    highlights: [
      {
        title: "Stream & Content Showcase",
        description:
          "Integrasi feed video dan streaming langsung dengan antarmuka gaming bertema dark-mode futuristik.",
      },
      {
        title: "Community Integration",
        description:
          "Pusat interaksi penonton dengan tombol cepat ke media sosial dan live chat stream.",
      },
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "⌘",
    items: [
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Svelte / SvelteKit",
      "React Native",
    ],
  },
  {
    title: "State & data fetching",
    icon: "⇄",
    items: [
      "Svelte Runes & Stores",
      "TanStack Query",
      "Redux Saga",
      "SWR",
      "REST API & Fetch / Axios",
    ],
  },
  {
    title: "Styling & UI",
    icon: "✧",
    items: ["Tailwind CSS", "Material UI", "Bootstrap", "Headless UI"],
  },
  {
    title: "Backend & databases",
    icon: "▦",
    items: [
      "Node.js",
      "Supabase (BaaS & PostgreSQL)",
      "PostgreSQL",
      "MySQL / MariaDB",
      "MongoDB",
    ],
  },
  {
    title: "Cloud & infrastructure",
    icon: "☁",
    items: [
      "AWS (Amazon Web Services)",
      "Google Cloud Platform",
      "Firebase",
    ],
  },
  {
    title: "Tools & services",
    icon: "⚒",
    items: ["Git & GitHub", "Vite", "Postman", "Figma", "Vercel"],
  },
  {
    title: "Integration",
    icon: "↗",
    items: [
      "REST API integration",
      "Payment gateways",
      "Mobile WebView integration",
    ],
  },
];

export const CONTACT_INFO: ContactInfo = {
  email: "reizorjnda@gmail.com",
  location: "Based in Semarang, Indonesia · UTC+7",
  socials: [
    {
      icon: "youtube",
      name: "YouTube",
      description: "@zears_gaming · Gaming & tech",
      href: "https://youtube.com/@zears_gaming?si=lz9bgcOxax5GPQZF",
    },
    {
      icon: "github",
      name: "GitHub",
      description: "Code & repositories",
      href: "https://github.com/Reizo-Rajendra",
    },
    {
      icon: "instagram",
      name: "Instagram",
      description: "@reizo_rajendra",
      href: "https://www.instagram.com/reizo_rajendra?psln=MWxoeTlmcWt6YzRuaw==",
    },
    {
      icon: "threads",
      name: "Threads",
      description: "@reizo_rajendra",
      href: "https://www.threads.com/@reizo_rajendra",
    },
  ],
};
