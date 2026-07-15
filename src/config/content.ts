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
  /** Extra tags for llms.txt only — not shown on website */
  aiTags?: string[];
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
  /** Detailed technical description for AI/LLM consumption (optional) */
  aiDesc?: BilingualString;
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
  /** Extra tags for llms.txt only — not shown on website */
  aiTags?: string[];
  /** Bullet points — each element is a bilingual string */
  bullets: BilingualString[];
  /** Detailed technical description for AI/LLM consumption (optional) */
  aiDesc?: BilingualString;
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
  /** Detailed technical description for AI/LLM consumption (optional) */
  aiDesc?: BilingualString;
}

interface CertificationEntry {
  /** Unique slug */
  id: string;
  /** Certification title */
  title: BilingualString;
  /** Issuing organization */
  issuer: BilingualString;
  /** Display date, e.g. "Sep 2025" / "Eyl 2025" */
  date: BilingualString;
  /** Verification URL (optional) */
  url?: string;
  /** Detailed description for AI/LLM consumption */
  aiDesc: BilingualString;
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
    /** Richer bio for llms.txt blockquote (optional, falls back to heroDesc) */
    llmsBio?: BilingualString;
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
  certifications: CertificationEntry[];
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
      llmsBio: {
        en: 'Recent B.Sc. graduate in Computer Engineering (June 2026) and early-career software engineer with a passion for independent development and open-source projects. I work across the full stack -- from desktop and web apps to game server tools and AI/ML systems -- applying self-directed learnings, practical skills, and technical insights, aiming to deliver high-impact results in my professional career. Bilingual in English and Turkish, based in Turkey. Outside of work, I manage a homelab and contribute to open-source software and personal projects.',
        tr: 'Bilgisayar M\u00FChendisli\u011Fi\u2019nden yeni mezun (Haziran 2026) ve kariyerimin ba\u015F\u0131ndaki bir yaz\u0131l\u0131m m\u00FChendisiyim. A\u00E7\u0131k kaynak projelere ve ba\u011F\u0131ms\u0131z geli\u015Ftirmeye ilgi duyuyorum. Masa\u00FCst\u00FC ve web uygulamalar\u0131ndan oyun sunucu ara\u00E7lar\u0131na ve yapay zeka sistemlerine kadar geni\u015F bir yelpazede \u00E7al\u0131\u015F\u0131yorum; kendi kendime \u00F6\u011Frendiklerimi profesyonel kariyerimde somut sonu\u00E7lara d\u00F6n\u00FC\u015Ft\u00FCrmeyi hedefliyorum. \u0130ngilizce ve T\u00FCrk\u00E7e konuşabiliyorum, T\u00FCrkiye\u2019de ya\u015F\u0131yorum. Bo\u015F zamanlar\u0131mda ev sunucusu (homelab) y\u00F6netiyorum, a\u00E7\u0131k kaynakl\u0131 yaz\u0131l\u0131mlara ve ki\u015Fisel projelerime katk\u0131da bulunuyorum.',
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
      aiTags: ['MediaPipe', 'scikit-learn', 'XGBoost', 'CatBoost', 'LightGBM', 'ONNX', 'DeepAR'],
      weight: 30,
      showcased: true,
      blurb: {
        en: 'An on-device, real-time machine learning system that detects driver fatigue in military ground vehicles using facial landmarks. Built as a graduation project.',
        tr: 'Askeri kara araçlarında sürücü yorgunluğunu yüz işaret noktalarıyla tespit eden, cihaz üzerinde ve gerçek zamanlı çalışan bir makine öğrenmesi sistemi. Lisans bitirme projesi olarak geliştirildi.',
      },
      aiDesc: {
        en: 'A lightweight, fully on-device driver fatigue and attention detection system designed for military ground vehicles where operators wear protective equipment that occludes the face. The pipeline extracts interpretable eye and mouth-based features from MediaPipe facial landmarks over sliding temporal windows, normalizes each feature against a per-subject alert baseline, and classifies every window with a Random Forest classifier. Synthetic augmentation via DeepAR addresses facial occlusion from helmets, goggles, and masks. Evaluated under subject-independent cross-validation, per-subject calibration significantly improves F1 scores, and the pipeline achieves strong results on independent datasets. The trained model exports to a compact ONNX file with substantial real-time headroom. Built with Python, MediaPipe, scikit-learn, XGBoost, CatBoost, LightGBM, and ONNX Runtime. Includes a browser-based real-time demonstration interface. Developed as a B.Sc. graduation thesis at Dokuz Eylul University.',
        tr: 'Askeri kara araçlarında kask, gözlük ve maske gibi yüzü örten koruyucu ekipman kullanan operatörler için tasarlanmış, hafif ve tamamen cihaz üzerinde çalışan bir sürücü yorgunluğu ve dikkat tespit sistemi. MediaPipe yüz işaret noktalarından kayan zaman pencereleri üzerinde hesaplanan, göz ve ağız tabanlı yorumlanabilir öznitelikler çıkarır; her özniteliği kişi bazlı uyanık durum referansına göre normalize eder ve her pencereyi Random Forest ile uyanık veya uykulu olarak sınıflandırır. Yüz örtülmesini ele almak için DeepAR ile sentetik donanım artırımı uygulanmıştır. Kişi bazlı kalibrasyon ile çapraz doğrulamada F1 skoru anlamlı şekilde iyileşmiş, bağımsız veri kümelerinde de güçlü sonuçlar elde edilmiştir. Eğitilen model küçük boyutlu ONNX dosyasına dışa aktarılabilmektedir. Python, MediaPipe, scikit-learn, XGBoost, CatBoost, LightGBM ve ONNX Runtime ile geliştirilmiştir. Tarayıcı tabanlı gerçek zamanlı bir demo arayüzü içerir. Dokuz Eylül Üniversitesi lisans bitirme tezi olarak geliştirilmiştir.',
      },
      images: [fatigueShot1, fatigueShot2],
    },
    {
      id: 'autostartstop',
      title: { en: 'AutoStartStop', tr: 'AutoStartStop' },
      year: '2026',
      tags: ['Java', 'Plugin'],
      aiTags: ['Velocity', 'Minecraft', 'Gradle', 'software-architecture', 'github-actions'],
      weight: 20,
      showcased: true,
      github: 'https://github.com/beyenilmez/autostartstop',
      website: 'https://beyenilmez.github.io/autostartstop',
      blurb: {
        en: 'An automation plugin designed for Minecraft networks. It allows administrators to define specific triggers and actions to automatically manage connected servers without manual intervention.',
        tr: 'Minecraft ağları için tasarlanmış; yöneticilerin belirli tetikleyiciler ve eylemler tanımlayarak bağlı sunucuları insan müdahalesi olmadan otomatik yönetmesini sağlayan bir otomasyon eklentisi.',
      },
      aiDesc: {
        en: 'A Velocity proxy plugin for rule-based Minecraft server automation. Implements a reactive event-driven architecture where administrators define declarative trigger-action rules through a YAML configuration system, with optional conditions that gate execution. The plugin manages server lifecycle operations across a network of connected game servers through three supported control APIs (Shell commands, AMP panel, Pterodactyl panel). Includes a built-in template system for common patterns, a variable resolution engine for dynamic rule parameters, and support for conditional branching and loop actions. Designed with a registry-based service-layer abstraction that decouples trigger evaluation, condition checking, and action execution from server control, enabling hot-reload of configuration. Provides comprehensive player communication, ping/MOTD customization, cron-based scheduling, and concurrent server management. Built with Java 21 and Gradle, distributed on GitHub, Modrinth and Hangar.',
        tr: 'Kural tabanlı Minecraft sunucu otomasyonu için geliştirilmiş bir Velocity proxy plugin\'i. Yöneticilerin bir YAML yapılandırma sistemi üzerinden, yürütmeyi şarta bağlayan isteğe bağlı koşullarla birlikte bildirimsel trigger-action (tetikleyici-eylem) kuralları tanımladığı reaktif, event-driven bir mimari uygular. Plugin, desteklenen üç kontrol API\'si (Shell komutları, AMP panel, Pterodactyl panel) aracılığıyla, birbirine bağlı oyun sunucularından oluşan bir ağ üzerinde sunucu yaşam döngüsü operasyonlarını yönetir. Yaygın kullanımlar için yerleşik bir şablon sistemi, dinamik kural parametreleri için bir değişken çözümleme motoru ve conditional branching (koşullu dallanma) ile loop (döngü) eylemleri için destek içerir. Tetikleyici değerlendirmesini, koşul denetimini ve eylem yürütmesini sunucu kontrolünden izole eden registry tabanlı bir servis katmanı soyutlamasıyla tasarlanmış olup, konfigürasyonun hot-reload ile anında yenilenmesine olanak tanır. Kapsamlı oyuncu iletişimi, ping/MOTD özelleştirmesi, cron tabanlı zamanlama ve eşzamanlı sunucu yönetimi sağlar. Java 21 ve Gradle ile geliştirilmiş olup GitHub, Modrinth ve Hangar üzerinden dağıtılmaktadır.',
      },
      images: [autostartstopShot1],
    },
    {
      id: 'pz-admin',
      title: { en: 'PZ Admin', tr: 'PZ Admin' },
      year: '2024',
      tags: ['Go', 'React', 'Desktop', 'TailwindCSS'],
      aiTags: ['Wails', 'TypeScript', 'RCON', 'github-actions'],
      weight: 11,
      showcased: true,
      github: 'https://github.com/beyenilmez/pz-admin',
      website: 'https://beyenilmez.github.io/pz-admin',
      blurb: {
        en: 'Cross-platform desktop admin for Project Zomboid servers over RCON. Go backend, React frontend, shipped for Windows, Linux, macOS.',
        tr: "RCON destekli, çapraz platform Project Zomboid sunucu yönetim aracı. Backend'de Go, frontend'de React kullanıldı. Windows, Linux ve macOS'ta çalışıyor.",
      },
      aiDesc: {
        en: 'A cross-platform desktop administration tool for Project Zomboid game servers, built with Wails v2 (Go Framework for cross-platform desktop application development) and React (TypeScript). Communicates entirely over the RCON protocol via the gorcon/rcon library. The Go backend maintains a single RCON TCP connection with a background goroutine that periodically polls server state. RCON commands are dispatched through a reusable abstraction with template-based construction, response validation, and player state synchronization. The config system uses Go reflection for dynamic field access with JSON persistence and automatic default merging. The server options editor uses hash-based change detection to diff modified fields and apply only changed options. Saved RCON credentials are encrypted before storage. A self-update mechanism queries GitHub Releases and performs binary patching. The React frontend features a tabbed dashboard with a validated connection form, server management, player management, a full RCON terminal with autocomplete, a categorized server options editor with search and import/export, and standalone tools. The player table supports sorting, filtering, and batch operations. Features multiple color schemes for both light/dark themes and Windows backdrop effects. Internationalization uses i18next and supports four languages (Turkish/English/Russian/Ukrainian). GitHub Actions CI produces native installers for Windows and Linux. Application state persists as JSON files. App supports configurable logging and log rotation.',
        tr: 'Project Zomboid oyun sunucuları için Wails v2 (cross-platform masaüstü uygulama geliştirme amaçlı Go Framework\'ü) ve React (TypeScript) ile geliştirilmiş, cross-platform bir masaüstü yönetim aracı. gorcon/rcon kütüphanesi aracılığıyla tamamen RCON protokolü üzerinden iletişim kurar. Go backend\'i, sunucu durumunu periyodik olarak sorgulayan (poll) bir arka plan *goroutine*\'i ile tek bir RCON TCP bağlantısını sürdürür. RCON komutları; şablon tabanlı oluşturma, yanıt doğrulama ve oyuncu durumu senkronizasyonu barındıran, yeniden kullanılabilir bir soyutlama üzerinden iletilir. Config sistemi, JSON persistence ve otomatik default merging özellikleriyle birlikte, dinamik alan erişimi için Go *reflection*\'ı kullanır. Sunucu ayarları editörü, değiştirilmiş alanların farkını almak ve yalnızca değişen ayarları uygulamak için *hash* tabanlı değişiklik algılama kullanır. Kaydedilen RCON kimlik bilgileri depolanmadan önce şifrelenir. Kendi kendini güncelleme (self-update) mekanizması, GitHub Releases\'i sorgular ve *binary patching* gerçekleştirir. React frontend\'i; sunucu bağlantı formu, sunucu yönetimi, oyuncu yönetimi, otomatik tamamlama özellikli kapsamlı bir RCON terminali, arama ve import/export özelliklerine sahip kategorize edilmiş bir sunucu ayarları editörü ve bağımsız araçlar içeren sekmeli bir *dashboard* sunar. Oyuncu tablosu; sıralama, filtreleme ve *batch* (toplu) işlemleri destekler. Açık/koyu tema, çoklu renk şemaları, ve Windows *backdrop* efektleri için destek sunar. Uluslararasılaştırma (internationalization), dört dili (Türkçe/İngilizce/Rusça/Ukraynaca) destekler ve i18next kullanır. GitHub Actions CI, Windows ve Linux için *native* yükleyiciler üretir. Uygulama durumu JSON dosyaları olarak tutulur. Uygulama, yapılandırılabilir loglama ve log rotasyonu seçenekleri sunar.',
      },
      images: [pzAdminShot1, pzAdminShot2, pzAdminShot3, pzAdminShot4],
    },
    {
      id: 'iconium',
      title: { en: 'Iconium', tr: 'Iconium' },
      year: '2024',
      tags: ['Go', 'React', 'Desktop', 'TailwindCSS'],
      aiTags: ['Wails', 'TypeScript', 'ImageMagick', 'shadcnUI', 'github-actions'],
      weight: 10,
      showcased: true,
      github: 'https://github.com/beyenilmez/iconium',
      website: 'https://beyenilmez.github.io/iconium',
      blurb: {
        en: 'Windows desktop app for creating, managing and applying icon packs to shortcuts and folders.',
        tr: 'Kısayollar ve klasörler için simge paketleri oluşturmayı, yönetmeyi ve uygulamayı sağlayan Windows masaüstü uygulaması.',
      },
      aiDesc: {
        en: 'A Windows desktop application for creating, managing, and applying custom icon packs to shortcuts and directories. Built with Go/Wails v2 backend (Go Framework for cross-platform desktop application development) and React frontend with TailwindCSS and shadcnUI. The Go layer handles icon extraction from a wide range of source formats (.ico, .exe, .lnk, .url, .png, .jpg, .jpeg, .webp, .svg, .bmp) using ImageMagick and ExtractIcon (external binaries), then applies icons to Windows Shell objects via LNK, URL and INI file manipulations, and VBScript fallback scripts. Icon packs support per-pack corner radius and opacity settings. File matching supports environment variables, wildcards, and destination-path resolution. Packs are importable and exportable as .icnm archives (dedicated format for this app, a zip archive). A self-update mechanism queries GitHub Releases and performs binary patching. Features multiple color schemes for both light/dark themes and Windows backdrop effects. Internationalization uses i18next and supports two languages (Turkish/English). GitHub Actions CI produces native installers for Windows. Application state persists as JSON files. App supports configurable logging and log rotation.',
        tr: 'Kısayollar ve dizinler için özel ikon paketleri oluşturmak, yönetmek ve uygulamak amacıyla geliştirilmiş bir Windows masaüstü uygulaması. Go/Wails v2 (*cross-platform* masaüstü uygulama geliştirme amaçlı Go Framework\'ü) *backend*\'i ve TailwindCSS ile shadcnUI kullanan React *frontend*\'i ile geliştirilmiştir. Go katmanı, ImageMagick ve ExtractIcon (harici *binary*\'ler) kullanarak çeşitli kaynak formatlarından (.ico, .exe, .lnk, .url, .png, .jpg, .jpeg, .webp, .svg, .bmp) ikon çıkarma (*extraction*) işlemlerini yürütür; ardından LNK, URL ve INI dosyası manipülasyonları ve VBScript *fallback* betikleri aracılığıyla ikonları Windows Shell nesnelerine uygular. İkon paketleri, paket başına köşe yuvarlatma (*corner radius*) ve opaklık (*opacity*) ayarlarını destekler. Dosya eşleştirme mekanizması; ortam değişkenlerini (*environment variables*), *wildcard*\'ları ve hedef yol çözümlemesini (*destination-path resolution*) destekler. Paketler, .icnm arşivleri (bu uygulamaya özel bir format olan bir zip arşivi) şeklinde *import* ve *export* edilebilir. Kendi kendini güncelleme (*self-update*) mekanizması, GitHub Releases\'i sorgular ve *binary patching* gerçekleştirir. Açık/koyu tema, çoklu renk şemaları, ve Windows *backdrop* efektleri için destek sunar. Uluslararasılaştırma (*internationalization*), iki dili (Türkçe/İngilizce) destekler ve i18next kullanır. GitHub Actions CI, Windows için *native* yükleyiciler üretir. Uygulama durumu JSON dosyaları olarak tutulur. Uygulama, yapılandırılabilir loglama ve log rotasyonu seçenekleri sunar.',
      },
      images: [iconiumShot1, iconiumShot2],
    },
    {
      id: 'gradeful',
      title: { en: 'Gradeful', tr: 'Gradeful' },
      year: '2023',
      tags: ['React', 'JavaScript', 'Web', 'TailwindCSS'],
      aiTags: ['github-actions'],
      weight: 0,
      github: 'https://github.com/beyenilmez/gradeful',
      website: 'https://beyenilmez.github.io/gradeful',
      blurb: {
        en: 'Web app for tracking academic grades with automatic GPA calculation and presets for multiple universities.',
        tr: 'Akademik notları takip etmek için geliştirilen; otomatik GNO (Genel Not Ortalaması) hesaplama ve farklı üniversitelere özel hazır ayarlar sunan web uygulaması.',
      },
      aiDesc: {
        en: 'A single-page React application for tracking academic grades across multiple courses and semesters. Implements a client-side GPA calculation engine with configurable letter-grade scales, score thresholds, and GPA multipliers customizable per university. The data model relies on a four-level hierarchy (GPA > semesters > courses > notes) where each level supports configurable percentages, weights, and credits. Computations are optimized to recalculate only modified nodes, efficiently propagating updates upwards through the hierarchy. Features drag-and-drop reordering, import/export via file download or URL sharing, dark/light/system theme switching, and a two-step quick-start wizard. Includes preset grading scales for several Turkish universities and a department preset with Dokuz Eylül University Computer Engineering curriculum data. Academic data persists in browser localStorage.',
        tr: 'Birden fazla ders ve dönem boyunca akademik notları takip etmek için geliştirilmiş bir web uygulaması (React SPA). Üniversiteye göre özelleştirilebilen yapılandırılabilir harf notu ölçekleri, puan eşikleri ve GPA çarpanları ile *client-side* bir GPA hesaplama motoru barındırır. Veri modeli, her seviyenin yapılandırılabilir yüzdeleri, ağırlıkları ve kredileri desteklediği dört seviyeli bir hiyerarşiye (GPA > dönemler > dersler > notlar) dayanır. Hesaplamalar, güncellemeleri hiyerarşi boyunca yukarıya doğru ileterek (*propagate*) yalnızca modifiye edilmiş kısımları yeniden hesaplayacak şekilde tasarlanmıştır. *Drag-and-drop* (sürükle-bırak) yeniden sıralama, dosya indirme veya URL paylaşımı yoluyla *import/export*, koyu/açık/sistem tema geçişi ve iki adımlı bir *quick-start* sihirbazı sunar. Çeşitli Türk üniversiteleri için hazır not ölçekleri (*preset grading scales*) ve Dokuz Eylül Üniversitesi Bilgisayar Mühendisliği müfredat verilerini barındıran bir bölüm *preset*\'i içerir. Akademik veriler tarayıcının *localStorage*\'ında tutulur.',
      },
      images: [gradefulShot1, gradefulShot2],
    },
    {
      id: 'to-do',
      title: { en: 'To Do', tr: 'To Do' },
      year: '2025',
      tags: ['Avalonia', 'C#', '.NET', 'Desktop'],
      aiTags: ['MVVM', 'xUnit', 'Docker', 'software-architecture', 'github-actions'],
      weight: 1,
      github: 'https://github.com/beyenilmez/to-do',
      blurb: {
        en: 'A cross-platform desktop to-do list application with reminders, tabbed lists, and widget mode.',
        tr: 'Hatırlatıcı, sekmeli liste ve widget modu özelliklerine sahip, çapraz platform bir masaüstü yapılacaklar listesi uygulaması.',
      },
      aiDesc: {
        en: 'A cross-platform desktop to-do list application built with Avalonia UI 11 (cross-platform .NET UI framework) and .NET 9, targeting Windows and Linux. Features tabbed lists for organizing tasks into separate projects, configurable one-time and recurring reminders with desktop notifications, and a desktop widget mode that embeds the window onto the desktop background. Uses MVVM (Model-View-ViewModel) architecture, JSON file-based persistence, multi-instance support via file-lock management, and a configurable theme system with accent color selection (featuring dynamic palette generation) and light/dark/system-default variants. The build pipeline uses Docker to produce native installers across multiple CPU architectures and operating systems. CI/CD via GitHub Actions. Includes comprehensive xUnit unit tests.',
        tr: 'Avalonia UI (cross-platform .NET UI framework) ve .NET 9 ile geliştirilmiş, Windows ve Linux\'u hedefleyen, *cross-platform* bir masaüstü *to-do list* uygulaması. Görevleri ayrı projelere organize etmek için sekmeli listeler, masaüstü bildirimleri için yapılandırılabilir hatırlatıcılar ve pencereyi masaüstü arka planına yerleştiren bir masaüstü *widget* modu sunar. MVVM (Model-View-ViewModel) mimarisi, JSON dosyası tabanlı (*persistence*), dosya kilidi (*file-lock*) aracılığıyla çoklu örnek (*multi-instance*) desteği ve vurgu rengi seçimi (dinamik palet üretimi barındıran) ile açık/koyu/sistem varsayılanı varyantlarına sahip yapılandırılabilir bir tema sistemi kullanır. Derleme hattı (*build pipeline*), birden fazla CPU mimarisi ve işletim sistemi genelinde *native* yükleyiciler üretmek için Docker kullanır. CI/CD süreçleri GitHub Actions üzerinden yürütülür. Kapsamlı xUnit birim testleri (*unit tests*) içerir.',
      },
      images: [toDoShot1, toDoShot2],
    },
  ],

  experience: [
    {
      id: 'semafor',
      company: 'Semafor Teknoloji',
      role: {
        en: 'Software Engineering Intern (Full-Stack)',
        tr: 'Yaz\u0131l\u0131m M\u00FChendisli\u011Fi Stajyeri (Full-Stack)',
      },
      start: '2025-12',
      end: '2026-02',
      location: {
        en: '\u0130zmir, Turkey',
        tr: '\u0130zmir, T\u00FCrkiye',
      },
      tags: ['Python', 'YOLO', 'Kotlin', 'Next.js', 'Firebase'],
      aiTags: ['FastAPI', 'PostgreSQL', 'BLE', 'Gemini', 'Whisper', 'MUI', 'Recharts', 'software-architecture'],
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
      aiDesc: {
        en: 'Designed and implemented three systems for the company\'s projects. Built a voice-driven AI assistant using FastAPI + Gemini LLM + OpenAI Whisper orchestrating field operations with bidirectional TTS/STT (Text to Speech/Speech to Text). Architected ToolServer, a FastAPI-based centralized REST API that consolidated previously standalone AI modules (YOLOv8 PPE detection, EasyOCR-based transformer ID recognition, object detection) into a unified service layer. The video analysis pipeline captures multiple frames with its API, applies YOLOv8 pose estimation for body-region segmentation, performs targeted item detection, then uses a voting mechanism for final classification. All critical parameters are externalized to a central configuration file. Migrated from static data structures to a PostgreSQL relational database with a modular schema covering task definitions, user and session management, and task tracking. For the healthcare domain, built a complete BLE-based (Bluetooth Low Energy) health telemetry system centered on the ASUS VivoWatch 5 smartwatch. Developed a Kotlin Android application handling BLE communication and real-time health data reception. Implemented binary parsers for the watch\'s proprietary hourly health blocks containing per-minute vital signs. Built a historical data sync mechanism with verification. The cloud infrastructure uses Firebase Firestore with Firebase Authentication and role-based access control. Built a Next.js web dashboard with MUI and Recharts providing role-specific views for health data.',
        tr: 'Şirket projeleri için üç farklı sistem tasarlanıp geliştirildi. FastAPI + Gemini LLM + OpenAI Whisper ile çalışan, saha operasyonlarını çift yönlü TTS/STT (Text to Speech/Speech to Text) ile yöneten ses odaklı (*voice-driven*) bir yapay zeka asistanı hayata geçirildi. Daha önce bağımsız çalışan yapay zeka modüllerini (YOLOv8 PPE algılama, EasyOCR tabanlı trafo ID tanıma, nesne algılama) birleşik bir servis katmanında konsolide eden, FastAPI tabanlı merkezi bir REST API olan ToolServer\'ın mimarisi tasarlandı. Video analiz *pipeline*\'ı, API\'si üzerinden video kareleri yakalar, vücut bölgesi segmentasyonu için YOLOv8 *pose estimation* uygular, hedeflenen nesne tespitini gerçekleştirir ve ardından nihai sınıflandırma için bir oylama mekanizması kullanır. Tüm kritik parametreler merkezi bir konfigürasyon dosyasına taşınarak merkezileştirildi. Statik veri yapılarından; görev tanımları, kullanıcı ve oturum yönetimi ile görev takibini kapsayan modüler bir şemaya sahip PostgreSQL ilişkisel veri tabanına geçiş yapıldı. Sağlık alanı için, ASUS VivoWatch 5 akıllı saatini merkeze alan, kapsamlı bir BLE (Bluetooth Low Energy) tabanlı sağlık telemetri sistemi kuruldu. BLE iletişimini ve gerçek zamanlı sağlık verisi alımını yöneten bir Kotlin Android uygulaması geliştirildi. Saatin, dakikalık verilerini barındıran kendine özgü (*proprietary*) saatlik sağlık bloklarını okumak için *binary parser*\'lar geliştirildi. Geçmiş veri senkronizasyon mekanizması oluşturuldu. Bulut altyapısı, Firebase Authentication ve rol tabanlı erişim kontrolü (*role-based access control*) ile birlikte Firebase Firestore kullanır. Sağlık verileri için role özgü görünümler sunan, MUI ve Recharts kullanılarak bir Next.js web *dashboard*\'u geliştirildi.',
      },
    },
    {
      id: 'aselsan',
      company: 'ASELSAN',
      role: {
        en: 'Software Engineering Intern (C++/ROS 2)',
        tr: 'Yaz\u0131l\u0131m M\u00FChendisli\u011Fi Stajyeri (C++/ROS 2)',
      },
      start: '2025-08',
      end: '2025-09',
      location: { en: 'Ankara, Turkey', tr: 'Ankara, T\u00FCrkiye' },
      tags: ['C++', 'ROS 2'],
      aiTags: ['UDP', 'RS485', 'software-architecture'],
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
      aiDesc: {
        en: 'Developed C++ interface software at ASELSAN, a leading Turkish defense electronics company, establishing bidirectional communication between hardware units and a ROS 2 environment. Built two interface implementations \u2014 one using UDP and another using RS485 \u2014 each with custom packet formats and CRC/checksum verifications. Both implementations used a layered architecture that decouples hardware communication from ROS 2 interaction through C++ abstract interface classes, with data type conversion from hardware-specific structures to ROS 2 message types for publish/subscribe operations. Used ROS 2 Humble Hawksbill on Ubuntu 22.04 LTS with the colcon build system. Verified transmission pipelines using ros2cli, Foxglove Studio, and Lichtblick.',
        tr: 'Türkiye’nin önde gelen savunma elektroniği şirketi ASELSAN’da, donanım birimleri ile bir ROS 2 ortamı arasında çift yönlü iletişim kuran C++ arayüz yazılımları geliştirildi. Her biri özel paket formatlarına ve CRC/checksum doğrulamalarına sahip, biri UDP diğeri ise RS485 kullanan iki arayüz implementasyonu oluşturuldu. Her iki implementasyon da, donanım iletişimini ROS 2 etkileşiminden C++ *abstract interface* sınıfları aracılığıyla izole eden ve *publish/subscribe* operasyonları için donanıma özgü yapılardan ROS 2 mesaj tiplerine veri tipi dönüşümü sağlayan katmanlı bir mimari kullandı. Ubuntu 22.04 LTS üzerinde *colcon build* sistemi ile ROS 2 Humble Hawksbill kullanıldı. Veri iletim hatları ros2cli, Foxglove Studio ve Lichtblick kullanılarak doğrulandı.',
      },
    },
    {
      id: 'havelsan',
      company: 'HAVELSAN',
      role: {
        en: 'Software Engineering Intern (.NET/Avalonia)',
        tr: 'Yaz\u0131l\u0131m M\u00FChendisli\u011Fi Stajyeri (.NET/Avalonia)',
      },
      start: '2025-07',
      end: '2025-08',
      location: { en: 'Ankara, Turkey', tr: 'Ankara, T\u00FCrkiye' },
      tags: ['C#', '.NET 9', 'Avalonia', 'Docker'],
      aiTags: ['MVVM', 'xUnit', 'software-architecture'],
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
      aiDesc: {
        en: 'Developed a cross-platform desktop application at HAVELSAN, a major Turkish defense software company, using .NET 9 and Avalonia UI, targeting both Windows and Linux. Used Docker-based automation to produce installer packages for multiple OS/architecture targets. Worked within a Scrum team and delivered a final presentation and live demo.',
        tr: 'Türkiye\'nin önde gelen savunma yazılımı şirketi HAVELSAN\'da, .NET 9 ve Avalonia UI kullanılarak Windows ve Linux hedefli çapraz platform masaüstü uygulaması geliştirildi. Docker tabanlı otomasyon ile farklı işletim sistemi ve mimariler için kurulum paketleri üretildi. Bir Scrum takımı içinde çalışıldı, ekibe final sunumu ve canlı demo ile teslim edildi.',
      },
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
      aiDesc: {
        en: 'Graduated with High Honor and ranked 3rd in the department. 100% English instruction. Core CS coursework: data structures, algorithm analysis, operating systems, software engineering, computer architecture, computer networks, programming language concepts, computation theory, embedded systems principles, and database management. AI/ML electives: artificial intelligence, data warehousing, business intelligence, data mining, decision support systems. Specialized electives: network security, robotics, bioinformatics. Senior project: AI Driver Fatigue Detection using computer vision and machine learning (see Projects).',
        tr: 'Yüksek Onur Belgesi ve bölüm üçüncülüğü ile mezun oldu. Programın tamamı %100 İngilizce. Temel bilgisayar bilimleri dersleri: veri yapıları, algoritma analizi, işletim sistemleri, yazılım mühendisliği, bilgisayar mimarisi, bilgisayar ağları, programlama dilleri kavramları, hesaplama teorisi, gömülü sistem prensipleri ve veritabanı yönetim sistemleri. Yapay zeka/veri seçmeli dersleri: yapay zekaya giriş, veri ambarları ve iş zekası, karar destek sistemleri, veri madenciliği. Özelleşmiş seçmeli dersler: ağ güvenliği, robotik temelleri, biyoinformatik algoritmaları. Bitirme projesi: Yapay Zeka ile Sürücü Yorgunluk Tespiti (bkz. Projeler).',
      },
    },
  ],

  certifications: [
    {
      id: 'ai-specialization',
      title: {
        en: 'AI Specialization Program — Specialization Training Certificate',
        tr: 'Yapay Zeka Uzmanlık Programı Uzmanlık Eğitim Sertifikası',
      },
      issuer: {
        en: 'Ministry of Industry and Technology — National Technology Academy',
        tr: 'T.C. Sanayi ve Teknoloji Bakanlığı — Milli Teknoloji Akademisi',
      },
      date: { en: 'Sep 2025', tr: 'Eyl 2025' },
      url: 'https://drdogrulama.sanayi.gov.tr/tr/verify/07249146037237/',
      aiDesc: {
        en: 'Completed the 50-session "Artificial Intelligence Specialization Training Program" (Dec 17, 2024 – May 25, 2025), the advanced phase of the National Technology Academy\'s AI program. Selected for the synchronous track — one of only 100 students advanced from ~2,500 basic training graduates based on attendance, quiz scores, and exam performance. The 110+ hour curriculum spanned 25–35 weeks online and covered Advanced Python, Data-Intensive Applications, Advanced Data Processing, Cloud Systems, Parallel Programming, and GPU Parallel Programming. Delivered through hands-on training led by industry professionals. Program partners: Arçelik, Baykar, Cezeri, HAVELSAN, Huawei, TÜBİTAK.',
        tr: 'Milli Teknoloji Akademisi Yapay Zeka Uzmanlık Programı\'nın ileri aşaması olan 50 oturumluk "Yapay Zeka Uzmanlık Eğitim Programı"nı (17 Aralık 2024 – 25 Mayıs 2025) tamamladı. Temel eğitimdeki derse katılım oranı, quiz puanları ve değerlendirme sınavı sonuçlarına göre ~2.500 temel eğitim mezunu arasından senkron gruba seçilen yalnızca 100 öğrenciden biri oldu. 110+ saatlik müfredat 25–35 hafta boyunca çevrimiçi olarak işlendi; İleri Seviye Python, Veri Yoğun Uygulamalar, İleri Veri İşleme, Bulut Sistemler, Paralel Programlama ve GPU ile Paralel Programlama konularını kapsadı. Sektör profesyonellerinden uygulamalı eğitimler sunuldu. Program paydaşları: Arçelik, Baykar, Cezeri, HAVELSAN, Huawei, TÜBİTAK.',
      },
    },
    {
      id: 'ai-basic',
      title: {
        en: 'AI Specialization Program — Basic Training Certificate',
        tr: 'Yapay Zeka Uzmanlık Programı Temel Eğitim Sertifikası',
      },
      issuer: {
        en: 'Ministry of Industry and Technology — National Technology Academy',
        tr: 'T.C. Sanayi ve Teknoloji Bakanlığı — Milli Teknoloji Akademisi',
      },
      date: { en: 'Feb 2025', tr: 'Şub 2025' },
      url: 'https://drdogrulama.sanayi.gov.tr/tr/verify/23183487331203/',
      aiDesc: {
        en: 'Completed the 10-session "AI Basic Training Program" (Nov 6 – Dec 7, 2024), the foundational phase of the Artificial Intelligence Specialization Program run by the National Technology Academy. Selected as one of ~2,500 students from 7,500+ applicants across eligible engineering and science departments (3rd/4th year undergraduates with ≥2.50 GPA). The 5-week, 24+ hour curriculum was delivered online and covered Programming Fundamentals, Data Structures & Algorithms, System Programming, Data Management, and Cloud, Parallel & Distributed Programming. Successful completion earned a digital badge and qualified for entry into the Specialization Training phase. Program partners included Arçelik, Baykar, Cezeri, HAVELSAN, Huawei, and TÜBİTAK.',
        tr: 'Milli Teknoloji Akademisi tarafından yürütülen Yapay Zeka Uzmanlık Programı\'nın temel eğitim aşaması olan 10 oturumluk "Yapay Zeka Temel Eğitim Programı"nı (6 Kasım – 7 Aralık 2024) tamamladı. Uygun mühendislik ve fen bölümlerinden (3. ve 4. sınıf lisans öğrencileri, ≥2.50 GPA) 7.500+ başvuru arasından seçilen ~2.500 öğrenciden biri olarak katıldı. 5 hafta süren, 24+ saatlik çevrimiçi müfredat; Programlama Temelleri, Veri Yapıları ve Algoritmalar, Sistem Programlama, Veri Yönetimi ve Bulut, Paralel ve Dağıtık Programlama konularını kapsadı. Başarıyla tamamlayarak dijital rozet almaya ve Uzmanlık Eğitimi aşamasına katılmaya hak kazandı. Program paydaşları: Arçelik, Baykar, Cezeri, HAVELSAN, Huawei ve TÜBİTAK.',
      },
    },
    {
      id: 'defence-401',
      title: {
        en: 'Defence Industry 401 Certificate',
        tr: 'Savunma Sanayii 401 Sertifikası',
      },
      issuer: {
        en: 'Presidency of Defence Industries & Council of Higher Education (YÖK)',
        tr: 'Savunma Sanayii Başkanlığı & Yükseköğretim Kurulu',
      },
      date: { en: 'Feb 2025', tr: 'Şub 2025' },
      url: 'https://bedirhanyenilmez.com/ssa401.webp',
      aiDesc: {
        en: 'Completed the 13-week "Defence Industry 401" program (Oct 2 – Dec 25, 2024), a joint initiative of the Presidency of Defence Industries and the Council of Higher Education (YÖK). Delivered online and synchronously by senior professionals from leading defence organizations. The curriculum covered the full defence industry lifecycle: defence technologies and systems, Turkish defence industry structure, system engineering and lifecycle approach (concept through integration and verification), digital engineering and transformation (MBSE, PLM, digital twin), project management, contract management, supply chain management, quality assurance and certification standards, and integrated logistics support (ILS). Earned a BA grade and a certificate.',
        tr: 'Savunma Sanayii Başkanlığı ve Yükseköğretim Kurulu (YÖK) iş birliğiyle hazırlanan 13 haftalık "Savunma Sanayii 401" programını (2 Ekim – 25 Aralık 2024) BA notuyla tamamladı. Müfredat, önde gelen savunma kuruluşlarından üst düzey profesyoneller tarafından çevrim içi ve senkron olarak sunuldu. Program; savunma teknolojileri ve sistemleri, Türk savunma sanayii yapısı, sistem mühendisliği ve ömür devri yaklaşımı (konseptten entegrasyon ve doğrulamaya), dijital mühendislik ve dönüşüm (MBSE, PLM, dijital ikiz), proje yönetimi, sözleşme yönetimi, tedarik zinciri yönetimi, kalite güvence ve sertifikasyon standartları ile entegre lojistik destek (ELD) konularını kapsadı. Program sonunda sertifika almaya hak kazandı.',
      },
    },
  ],
} satisfies SiteContent;
