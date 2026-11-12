import { useEffect, useState } from "react";

export type Lang = "uz" | "en" | "ru";
export const LANGS: Lang[] = ["uz", "en", "ru"];

type Sample = { notes: string[] };
type Dict = {
  launch: string; tagline: string; h1a: string; h1b: string; sub: string; tryDemo: string;
  stats: [string, string, string]; demoTitle: string; demoSub: string; pick: string;
  awaiting: string; analyzing: string; extracting: string; ensemble: string; verdict: string;
  fake: string; real: string; prob: string; voice: string; video: string; samples: Sample[];
  howTitle: string; steps: [string, string][]; ctaTitle: string; ctaSub: string; heroAlt: string;
};

export const dict: Record<Lang, Dict> = {
  uz: {
    launch: "Telegram botni ochish", tagline: "● SUN'IY INTELLEKT ASOSIDA HIMOYA",
    h1a: "Ishonmang.", h1b: "Tekshiring.",
    sub: "Soxta ovozlar va o'zgartirilgan videolarni soniyalar ichida aniqlang — to'g'ridan-to'g'ri Telegramda.",
    tryDemo: "Demoni sinash", stats: ["aniqlik", "har bir tekshiruv", "himoya"],
    demoTitle: "Jonli demo", demoSub: "DFS mediani real vaqtda qanday tahlil qilishini ko'ring.",
    pick: "// tahlil uchun namunani tanlang", awaiting: "> fayl kutilmoqda_",
    analyzing: "> tahlil qilinmoqda", extracting: "> spektral belgilar ajratilmoqda",
    ensemble: "> neyron tarmoqlar ishga tushirildi", verdict: "> xulosa",
    fake: "SOXTA", real: "HAQIQIY", prob: "Soxtalashtirish ehtimoli", voice: "Ovoz", video: "Video",
    samples: [
      { notes: ["4–8 kHz oralig'ida spektral nuqsonlar", "Nafas olish ritmi g'ayritabiiy", "Klonlangan ovoz belgisi topildi"] },
      { notes: ["Lab harakati ovozga mos", "Ko'z qisish tabiiy", "GAN izlari topilmadi"] },
      { notes: ["Faza uzilishlari", "Intonatsiya bir xil", "TTS vokoder izi"] },
    ],
    howTitle: "Qanday ishlaydi",
    steps: [
      ["Botni oching", "DFS botini Telegramda ishga tushiring — ro'yxatdan o'tish shart emas."],
      ["Media yuboring", "Shubhali ovozli xabar yoki videoni yuboring yoki forward qiling."],
      ["AI tahlil", "Modellarimiz audio spektri, yuz va kadrlardagi nuqsonlarni tekshiradi."],
      ["Natijani oling", "Soniyalar ichida ishonch darajasi va izoh bilan javob oling."],
    ],
    ctaTitle: "Himoyangiz bir bosish narida", ctaSub: "Firibgarlikni boshlanishidan oldin to'xtating.",
    heroAlt: "Piksellarga tarqalayotgan sim karkasli yuz",
  },
  en: {
    launch: "Launch Telegram Bot", tagline: "● AI-POWERED THREAT DETECTION",
    h1a: "Don't trust it.", h1b: "Verify it.",
    sub: "Detect fake voices and manipulated videos in seconds — directly inside Telegram.",
    tryDemo: "Try demo", stats: ["accuracy", "per scan", "protection"],
    demoTitle: "Live demo", demoSub: "See how DFS analyzes media in real time.",
    pick: "// pick a sample to analyze", awaiting: "> awaiting input_",
    analyzing: "> analyzing", extracting: "> extracting spectral features",
    ensemble: "> running neural ensemble", verdict: "> verdict",
    fake: "DEEPFAKE", real: "AUTHENTIC", prob: "Manipulation probability", voice: "Voice", video: "Video",
    samples: [
      { notes: ["Spectral artifacts at 4–8 kHz", "Unnatural breath cadence", "Cloned-voice signature match"] },
      { notes: ["Consistent lip-sync", "Natural blink rate", "No GAN frequency traces"] },
      { notes: ["Phase discontinuities", "Flat prosody", "TTS vocoder fingerprint"] },
    ],
    howTitle: "How it works",
    steps: [
      ["Open the bot", "Start DFS in Telegram — no signup needed."],
      ["Forward media", "Send or forward any suspicious voice note or video."],
      ["AI analysis", "Our models scan audio spectra, faces and frame artifacts."],
      ["Get a verdict", "Receive a confidence score and explanation in seconds."],
    ],
    ctaTitle: "Your shield is one tap away", ctaSub: "Stop scams before they start.",
    heroAlt: "Wireframe face dissolving into pixels",
  },
  ru: {
    launch: "Открыть Telegram-бот", tagline: "● ЗАЩИТА НА ОСНОВЕ ИИ",
    h1a: "Не верьте.", h1b: "Проверяйте.",
    sub: "Распознавайте поддельные голоса и видео за секунды — прямо в Telegram.",
    tryDemo: "Попробовать демо", stats: ["точность", "на проверку", "защита"],
    demoTitle: "Живое демо", demoSub: "Посмотрите, как DFS анализирует медиа в реальном времени.",
    pick: "// выберите образец для анализа", awaiting: "> ожидание файла_",
    analyzing: "> анализ", extracting: "> извлечение спектральных признаков",
    ensemble: "> запуск нейросетей", verdict: "> вердикт",
    fake: "ПОДДЕЛКА", real: "ПОДЛИННОЕ", prob: "Вероятность подделки", voice: "Голос", video: "Видео",
    samples: [
      { notes: ["Спектральные артефакты на 4–8 кГц", "Неестественный ритм дыхания", "Признаки клонированного голоса"] },
      { notes: ["Синхронность губ", "Естественное моргание", "Нет следов GAN"] },
      { notes: ["Разрывы фазы", "Монотонная интонация", "След TTS-вокодера"] },
    ],
    howTitle: "Как это работает",
    steps: [
      ["Откройте бот", "Запустите DFS в Telegram — без регистрации."],
      ["Отправьте медиа", "Отправьте или перешлите подозрительное голосовое или видео."],
      ["ИИ-анализ", "Модели проверяют аудиоспектр, лица и артефакты кадров."],
      ["Получите вердикт", "Оценка достоверности и пояснение за секунды."],
    ],
    ctaTitle: "Защита в одно касание", ctaSub: "Остановите мошенников заранее.",
    heroAlt: "Каркасное лицо, распадающееся на пиксели",
  },
};

export function useLang() {
  const [lang, setLangState] = useState<Lang>("uz");
  useEffect(() => {
    const s = localStorage.getItem("dfs-lang") as Lang | null;
    if (s && LANGS.includes(s)) setLangState(s);
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem("dfs-lang", l); };
  return { lang, setLang, t: dict[lang] };
}
