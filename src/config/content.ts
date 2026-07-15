/**
 * Content configuration — all site text and data, both EN and TR.
 *
 * Bilingual fields use { en: string; tr: string } inline.
 * Non-translatable fields (URLs, IDs, tags, years, images) remain plain strings/arrays.
 *
 */

import type { Picture } from 'vite-imagetools';

// Project screenshot imports — vite-imagetools resolves these at build time.
// Missing source files fail `vite build` (NOT runtime), so the file paths here
// are verified at compile time. Source extension is .webp; vite-imagetools then
// emits both webp + jpg variants at 400w / 600w / 1000w.
import pzAdminShot1 from '@/assets/projects/pz-admin/01.webp?w=400;600;1000&format=webp;jpg&as=picture';
import pzAdminShot2 from '@/assets/projects/pz-admin/02.webp?w=400;600;1000&format=webp;jpg&as=picture';
import pzAdminShot3 from '@/assets/projects/pz-admin/03.webp?w=400;600;1000&format=webp;jpg&as=picture';
import pzAdminShot4 from '@/assets/projects/pz-admin/04.webp?w=400;600;1000&format=webp;jpg&as=picture';
import iconiumShot1 from '@/assets/projects/iconium/01.webp?w=400;600;1000&format=webp;jpg&as=picture';
import iconiumShot2 from '@/assets/projects/iconium/02.webp?w=400;600;1000&format=webp;jpg&as=picture';
import gradefulShot1 from '@/assets/projects/gradeful/01.webp?w=400;600;1000&format=webp;jpg&as=picture';
import gradefulShot2 from '@/assets/projects/gradeful/02.webp?w=400;600;1000&format=webp;jpg&as=picture';
import autostartstopShot1 from '@/assets/projects/autostartstop/01.webp?w=400;600;1000&format=webp;jpg&as=picture';
import toDoShot1 from '@/assets/projects/to-do/01.webp?w=400;600;1000&format=webp;jpg&as=picture';
import toDoShot2 from '@/assets/projects/to-do/02.webp?w=400;600;1000&format=webp;jpg&as=picture';
import fatigueShot1 from '@/assets/projects/fatigue-detection/01.webp?w=400;600;1000&format=webp;jpg&as=picture';
import fatigueShot2 from '@/assets/projects/fatigue-detection/02.webp?w=400;600;1000&format=webp;jpg&as=picture';

interface BilingualString {
  en: string;
  tr: string;
}

interface Project {
  /** Unique slug used for keys and filtering */
  id: string;
  /** Display title */
  title: BilingualString;
  /** Release year */
  year: string;
  /** Technology tags for chip filter */
  tags: string[];
  /** Sort weight — higher appears first (default 0, invisible to users) */
  weight?: number;
  /** Showcased badge + filter chip (default false) */
  showcased?: boolean;
  /** GitHub repository URL (optional) */
  github?: string;
  /** Live site URL (optional) */
  website?: string;
  /** Short one-liner displayed on card */
  blurb: BilingualString;
  /** Picture imports from vite-imagetools (?w=400;600;1000&format=webp;jpg&as=picture). */
  images: Picture[];
}

interface ExperienceEntry {
  /** Unique slug */
  id: string;
  /** Company name (non-translatable) */
  company: string;
  /** Job title */
  role: BilingualString;
  /** ISO "YYYY-MM" start date */
  start: string;
  /** ISO "YYYY-MM" end date */
  end: string;
  /** City, country, work mode */
  location: BilingualString;
  /** Technology tags */
  tags: string[];
  /** Bullet points — each element is a bilingual string */
  bullets: BilingualString[];
}

interface EducationEntry {
  /** Unique slug */
  id: string;
  /** University name */
  school: BilingualString;
  /** Degree name */
  degree: BilingualString;
  /** City / country */
  where: BilingualString;
  /** Start year */
  start: string;
  /** End year (expected graduation) */
  end: string;
  /** Whether currently enrolled */
  ongoing: boolean;
  /** Cumulative GPA, e.g. "3.78" */
  gpa: string;
  /** GPA scale maximum, e.g. "4.00" */
  gpaMax: string;
}

interface I18nLabels {
  /** Hero section — role, title template, description */
  hero: {
    /** Non-translatable display name */
    name: string;
    /** Role / tagline displayed in hero title ({role} placeholder) */
    role: BilingualString;
    /** Role displayed standalone below mobile avatar name */
    roleMobile: BilingualString;
    /** Hero headline template — use {role} as placeholder */
    heroTitle: BilingualString;
    /** Hero description paragraph */
    heroDesc: BilingualString;
    /** Short description for SEO meta + OG/Twitter cards (≤160 chars) */
    ogDesc: BilingualString;
  };
  /** Navigation section labels */
  nav: {
    profile: BilingualString;
    experience: BilingualString;
    projects: BilingualString;
    education: BilingualString;
    contact: BilingualString;
  };
  /** Shared UI labels used across sections */
  labels: {
    projects: BilingualString;
    experience: BilingualString;
    education: BilingualString;
    contact: BilingualString;
    contactHeading: BilingualString;
    filter: BilingualString;
    all: BilingualString;
    github: BilingualString;
    website: BilingualString;
    email: BilingualString;
    cvEn: BilingualString;
    cvTr: BilingualString;
    sendEmail: BilingualString;
    present: BilingualString;
    selectedLower: BilingualString;
    toggleTheme: BilingualString;
    language: BilingualString;
    ongoing: BilingualString;
    gpaLabel: BilingualString;
    emptyBody: BilingualString;
    emptyRest: BilingualString;
    emptyAccent: BilingualString;
    clearFilter: BilingualString;
    skipToContent: BilingualString;
    sourceCode: BilingualString;
    lightboxEyebrow: BilingualString;
    showcased: BilingualString;
  };
}

interface SiteLinks {
  /** Public contact email */
  email: string;
  /** GitHub profile URL */
  github: string;
  /** LinkedIn profile URL */
  linkedin: string;
  /** English CV PDF URL */
  cvEn: string;
  /** Turkish CV PDF URL */
  cvTr: string;
}

export interface SiteContent {
  links: SiteLinks;
  i18n: I18nLabels;
  projects: Project[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
}

export const content = {
  links: {
    email: 'yenilmezbedirhan@gmail.com',
    github: 'https://github.com/beyenilmez',
    linkedin: 'https://www.linkedin.com/in/bedirhan-yenilmez',
    cvEn: 'https://cv.bedirhanyenilmez.com/en/bedirhan_yenilmez_cv.pdf',
    cvTr: 'https://cv.bedirhanyenilmez.com/tr/bedirhan_yenilmez_cv.pdf',
  },

  i18n: {
    hero: {
      name: 'Bedirhan Yenilmez',
      role: {
        en: 'software engineer',
        tr: 'yazılım mühendisiyim',
      },
      roleMobile: {
        en: 'Software Engineer',
        tr: 'Yazılım Mühendisi',
      },
      heroTitle: {
        en: 'Hello, I am Bedirhan Yenilmez. I am a {role}.',
        tr: 'Merhaba, ben Bedirhan Yenilmez. Ben bir {role}.',
      },
      heroDesc: {
        en: "I'm a software engineer dedicated to building side projects and exploring open-source. The practical experience I gain from creating things from scratch simply drives my curiosity and forms the foundation of the software I build.",
        tr: 'Yan projeler geli\u015Ftirmeye ve a\u00E7\u0131k kaynak d\u00FCnyas\u0131n\u0131 ke\u015Ffetmeye odaklanan bir yaz\u0131l\u0131m m\u00FChendisiyim. S\u0131f\u0131rdan bir \u015Feyler in\u015Fa ederken kazand\u0131\u011F\u0131m pratik tecr\u00FCbe hem merak\u0131m\u0131 canl\u0131 tutuyor hem de geli\u015Ftirdi\u011Fim yaz\u0131l\u0131mlar\u0131n temelini olu\u015Fturuyor.',
      },
      ogDesc: {
        en: 'Software engineer dedicated to side projects & open-source. Hands-on experience forms the foundation of my work.',
        tr: 'S\u00FCrekli yeni yan projeler geli\u015Ftiren, a\u00E7\u0131k kayna\u011Fa merakl\u0131 bir yaz\u0131l\u0131m m\u00FChendisiyim. Deneyerek ve \u00FCreterek \u00F6\u011Freniyorum.',
      },
    },
    nav: {
      profile: { en: 'Profile', tr: 'Profil' },
      experience: { en: 'Experience', tr: 'Deneyim' },
      projects: { en: 'Projects', tr: 'Projeler' },
      education: { en: 'Education', tr: 'E\u011Fitim' },
      contact: { en: 'Contact', tr: '\u0130leti\u015Fim' },
    },
    labels: {
      projects: { en: 'Projects', tr: 'Projeler' },
      experience: { en: 'Experience', tr: 'Deneyim' },
      education: { en: 'Education', tr: 'E\u011Fitim' },
      contact: { en: 'Contact', tr: '\u0130leti\u015Fim' },
      contactHeading: { en: 'Get in touch', tr: '\u0130leti\u015Fime ge\u00E7in' },
      filter: { en: 'Filter', tr: 'Filtre' },
      all: { en: 'All', tr: 'Hepsi' },
      github: { en: 'GitHub', tr: 'GitHub' },
      website: { en: 'Website', tr: 'Web sitesi' },
      email: { en: 'Email', tr: 'E-posta' },
      cvEn: { en: 'CV (EN)', tr: 'CV (EN)' },
      cvTr: { en: 'CV (TR)', tr: 'CV (TR)' },
      sendEmail: { en: 'Send email', tr: 'E-posta g\u00F6nder' },
      present: { en: 'Present', tr: 'Devam ediyor' },
      selectedLower: { en: 'selected', tr: 'se\u00E7ili' },
      toggleTheme: { en: 'Toggle theme', tr: 'Temay\u0131 de\u011Fi\u015Ftir' },
      language: { en: 'Language', tr: 'Dil' },
      ongoing: { en: 'ONGOING', tr: 'DEVAM ED\u0130YOR' },
      gpaLabel: { en: 'GPA', tr: 'GNO' },
      emptyBody: {
        en: 'No projects match that filter. Clear it to see all the work.',
        tr: 'Bu filtreyle e\u015Fle\u015Fen bir proje yok. T\u00FCm \u00E7al\u0131\u015Fmay\u0131 g\u00F6rmek i\u00E7in filtreyi temizleyin.',
      },
      clearFilter: { en: 'Clear filter', tr: 'Filtreyi temizle' },
      skipToContent: { en: 'Skip to content', tr: 'Ana içeriğe atla' },
      sourceCode: { en: 'Source', tr: 'Kaynak' },
      lightboxEyebrow: { en: 'PROJECT', tr: 'PROJE' },
      showcased: { en: 'Showcased', tr: 'Öne Çıkan' },
      emptyRest: { en: 'Nothing here ', tr: 'Burada bir şey ' },
      emptyAccent: { en: 'yet', tr: 'yok' },
    },
  },

  projects: [
    {
      id: 'fatigue-detection',
      title: {
        en: 'AI Driver Fatigue Detection in Military Ground Vehicles',
        tr: 'Askeri Kara Araçlarında Yapay Zeka ile Sürücü Yorgunluk Tespiti',
      },
      year: '2026',
      tags: ['Python', 'Machine Learning', 'AI'],
      weight: 30,
      showcased: true,
      blurb: {
        en: 'An on-device, real-time machine learning system that detects driver fatigue in military ground vehicles using facial landmarks. Built as a graduation project.',
        tr: 'Askeri kara araçlarında sürücü yorgunluğunu yüz işaret noktalarıyla tespit eden, cihaz üzerinde ve gerçek zamanlı çalışan bir makine öğrenmesi sistemi. Lisans bitirme projesi olarak geliştirildi.',
      },
      images: [fatigueShot1, fatigueShot2],
    },
    {
      id: 'autostartstop',
      title: { en: 'AutoStartStop', tr: 'AutoStartStop' },
      year: '2026',
      tags: ['Java', 'Plugin'],
      weight: 20,
      showcased: true,
      github: 'https://github.com/beyenilmez/autostartstop',
      website: 'https://beyenilmez.github.io/autostartstop',
      blurb: {
        en: 'An automation plugin designed for Minecraft networks. It allows administrators to define specific triggers and actions to automatically manage connected servers without manual intervention.',
        tr: 'Minecraft ağları için tasarlanmış; yöneticilerin belirli tetikleyiciler ve eylemler tanımlayarak bağlı sunucuları insan müdahalesi olmadan otomatik yönetmesini sağlayan bir otomasyon eklentisi.',
      },
      images: [autostartstopShot1],
    },
    {
      id: 'pz-admin',
      title: { en: 'PZ Admin', tr: 'PZ Admin' },
      year: '2024',
      tags: ['Go', 'React', 'Desktop', 'TailwindCSS'],
      weight: 11,
      showcased: true,
      github: 'https://github.com/beyenilmez/pz-admin',
      website: 'https://beyenilmez.github.io/pz-admin',
      blurb: {
        en: 'Cross-platform desktop admin for Project Zomboid servers over RCON. Go backend, React frontend, shipped for Windows, Linux, macOS.',
        tr: "RCON destekli, çapraz platform Project Zomboid sunucu yönetim aracı. Backend'de Go, frontend'de React kullanıldı. Windows, Linux ve macOS'ta çalışıyor.",
      },
      images: [pzAdminShot1, pzAdminShot2, pzAdminShot3, pzAdminShot4],
    },
    {
      id: 'iconium',
      title: { en: 'Iconium', tr: 'Iconium' },
      year: '2024',
      tags: ['Go', 'React', 'Desktop', 'TailwindCSS'],
      weight: 10,
      showcased: true,
      github: 'https://github.com/beyenilmez/iconium',
      website: 'https://beyenilmez.github.io/iconium',
      blurb: {
        en: 'Windows desktop app for creating, managing and applying icon packs to shortcuts and folders.',
        tr: 'Kısayollar ve klasörler için simge paketleri oluşturmayı, yönetmeyi ve uygulamayı sağlayan Windows masaüstü uygulaması.',
      },
      images: [iconiumShot1, iconiumShot2],
    },
    {
      id: 'gradeful',
      title: { en: 'Gradeful', tr: 'Gradeful' },
      year: '2023',
      tags: ['React', 'JavaScript', 'Web', 'TailwindCSS'],
      weight: 0,
      github: 'https://github.com/beyenilmez/gradeful',
      website: 'https://beyenilmez.github.io/gradeful',
      blurb: {
        en: 'Web app for tracking academic grades with automatic GPA calculation and presets for multiple universities.',
        tr: 'Akademik notları takip etmek için geliştirilen; otomatik GNO (Genel Not Ortalaması) hesaplama ve farklı üniversitelere özel hazır ayarlar sunan web uygulaması.',
      },
      images: [gradefulShot1, gradefulShot2],
    },
    {
      id: 'to-do',
      title: { en: 'To Do', tr: 'To Do' },
      year: '2025',
      tags: ['Avalonia', 'C#', '.NET', 'Desktop'],
      weight: 1,
      github: 'https://github.com/beyenilmez/to-do',
      blurb: {
        en: 'A cross-platform desktop to-do list application with reminders, tabbed lists, and widget mode.',
        tr: 'Hatırlatıcı, sekmeli liste ve widget modu özelliklerine sahip, çapraz platform bir masaüstü yapılacaklar listesi uygulaması.',
      },
      images: [toDoShot1, toDoShot2],
    },
  ],

  experience: [
    {
      id: 'semafor',
      company: 'Semafor Teknoloji',
      role: {
        en: 'Software Engineering Intern',
        tr: 'Yaz\u0131l\u0131m M\u00FChendisli\u011Fi Stajyeri',
      },
      start: '2025-12',
      end: '2026-02',
      location: {
        en: '\u0130zmir, Turkey',
        tr: '\u0130zmir, T\u00FCrkiye',
      },
      tags: ['Python', 'YOLO', 'Kotlin', 'Next.js', 'Firebase'],
      bullets: [
        {
          en: 'Built a voice-driven AI assistant on **FastAPI** + **Gemini LLM** that orchestrates field operations with two-way TTS/STT.',
          tr: 'Saha operasyonlar\u0131n\u0131 \u00E7ift y\u00F6nl\u00FC TTS/STT (Metin-Ses/Ses-Metin) entegrasyonuyla y\u00F6neten, **FastAPI** ve **Gemini LLM** tabanl\u0131 ses odakl\u0131 bir yapay zeka asistan\u0131 geli\u015Ftirildi.',
        },
        {
          en: 'Integrated **YOLOv8** and **EasyOCR** to autonomously verify PPE compliance and worker location from live camera feeds.',
          tr: 'Canl\u0131 kamera g\u00F6r\u00FCnt\u00FClerinden personelin konumunu ve ki\u015Fisel koruyucu donan\u0131m (KKD) uygunlu\u011Funu otonom olarak denetlemek amac\u0131yla **YOLOv8** ve **EasyOCR** entegrasyonlar\u0131 ger\u00E7ekle\u015Ftirildi.',
        },
        {
          en: 'Developed a smartwatch health-telemetry pipeline: **Kotlin** Android app collects heart-rate, BP, SpO\u2082 over BLE, ships it to **Firestore**, and a **Next.js** dashboard visualizes it.',
          tr: 'Ak\u0131ll\u0131 saat i\u00E7in u\u00E7tan uca bir sa\u011Fl\u0131k telemetrisi altyap\u0131s\u0131 kuruldu: BLE \u00FCzerinden kalp at\u0131\u015F h\u0131z\u0131, tansiyon ve SpO\u2082 verilerini toplayarak **Firestore**\u2019a aktaran bir **Kotlin** Android uygulamas\u0131 ile bu verileri canl\u0131 g\u00F6rselle\u015Ftiren bir **Next.js** paneli geli\u015Ftirildi.',
        },
      ],
    },
    {
      id: 'aselsan',
      company: 'ASELSAN',
      role: {
        en: 'Software Engineering Intern',
        tr: 'Yaz\u0131l\u0131m M\u00FChendisli\u011Fi Stajyeri',
      },
      start: '2025-08',
      end: '2025-09',
      location: { en: 'Ankara, Turkey', tr: 'Ankara, T\u00FCrkiye' },
      tags: ['C++', 'ROS 2'],
      bullets: [
        {
          en: 'Worked on **ROS 2** infrastructure, writing **C++** interface software that bridges bidirectional data between hardware units and the ROS 2 environment.',
          tr: 'Donan\u0131m birimleri ile ROS 2 ortam\u0131 aras\u0131nda \u00E7ift y\u00F6nl\u00FC veri ak\u0131\u015F\u0131n\u0131 sa\u011Flayan **C++** aray\u00FCz yaz\u0131l\u0131mlar\u0131 geli\u015Ftirildi ve **ROS 2** altyap\u0131 \u00E7al\u0131\u015Fmalar\u0131 y\u00FCr\u00FCt\u00FCld\u00FC.',
        },
        {
          en: 'Processed and validated raw hardware data, converting it into appropriate **ROS 2** message formats.',
          tr: 'Donan\u0131mdan gelen ham veriler i\u015Flenip do\u011Fruland\u0131 ve bu verilerin uygun **ROS 2** mesaj formatlar\u0131na d\u00F6n\u00FC\u015Ft\u00FCr\u00FClmesi sa\u011Fland\u0131.',
        },
        {
          en: 'Verified transmission pipelines with **ros2cli**, **Foxglove Studio**, and **Lichtblick**.',
          tr: 'Veri iletim hatlar\u0131n\u0131n test ve do\u011Frulamalar\u0131 **ros2cli**, **Foxglove Studio** ve **Lichtblick** ara\u00E7lar\u0131 kullan\u0131larak ger\u00E7ekle\u015Ftirildi.',
        },
      ],
    },
    {
      id: 'havelsan',
      company: 'HAVELSAN',
      role: {
        en: 'Software Engineering Intern',
        tr: 'Yaz\u0131l\u0131m M\u00FChendisli\u011Fi Stajyeri',
      },
      start: '2025-07',
      end: '2025-08',
      location: { en: 'Ankara, Turkey', tr: 'Ankara, T\u00FCrkiye' },
      tags: ['C#', '.NET 9', 'Avalonia', 'Docker'],
      bullets: [
        {
          en: 'Built a cross-platform (Windows + Linux) task-tracking application with **.NET 9** and **Avalonia UI**.',
          tr: '**.NET 9** ve **Avalonia UI** kullan\u0131larak Windows ve Linux destekli, \u00E7oklu platformda \u00E7al\u0131\u015Fabilen bir g\u00F6rev takip uygulamas\u0131 geli\u015Ftirildi.',
        },
        {
          en: 'Applied **MVVM** architecture and dependency injection; wrote **xUnit** unit tests.',
          tr: 'Geli\u015Ftirme s\u00FCrecinde **MVVM** mimarisi kullan\u0131ld\u0131 ve **xUnit** kullan\u0131larak birim testleri yaz\u0131ld\u0131.',
        },
        {
          en: 'Set up **Docker** + **Bullseye**-based automation to produce installer packages for multiple OS/architecture targets.',
          tr: 'Farkl\u0131 i\u015Fletim sistemleri ve i\u015Flemci mimarileri i\u00E7in kurulum paketleri \u00FCretmek amac\u0131yla **Docker** ve **Bullseye** tabanl\u0131 bir otomasyon s\u00FCreci kuruldu.',
        },
      ],
    },
  ],

  education: [
    {
      id: 'deu',
      school: { en: 'Dokuz Eyl\u00FCl University', tr: 'Dokuz Eyl\u00FCl \u00DCniversitesi' },
      degree: {
        en: 'B.Sc. in Computer Engineering',
        tr: 'Bilgisayar M\u00FChendisli\u011Fi, Lisans',
      },
      where: { en: '\u0130zmir, Turkey', tr: '\u0130zmir, T\u00FCrkiye' },
      start: '2022',
      end: '2026',
      ongoing: false,
      gpa: '3.8',
      gpaMax: '4.0',
    },
  ],
} satisfies SiteContent;
