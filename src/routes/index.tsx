import { createFileRoute } from "@tanstack/react-router";
import { useState, lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";
const HeroScene = lazy(() => import("@/components/HeroScene"));
import { useLang, LANGS, type Lang, dict } from "@/lib/i18n";

type T = (typeof dict)["uz"];

const BOT_URL = "https://t.me/DFSecurityBot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DFS — DeepFake Security | Soxta ovoz va videolarni aniqlash" },
      { name: "description", content: "Telegramda soxta ovozli xabar va videolarni sun'iy intellekt yordamida aniqlang." },
      { property: "og:title", content: "DFS — DeepFake Security" },
      { property: "og:description", content: "Ovoz yoki videoni Telegram botga yuboring va soniyalarda natija oling." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function BotButton({ big, label }: { big?: boolean; label: string }) {
  return (
    <a href={BOT_URL} target="_blank" rel="noreferrer"
      className={`liquid-btn liquid-primary inline-flex items-center gap-2 rounded-full font-semibold justify-center ${big ? "px-6 py-3.5 text-base sm:px-8 sm:py-4 sm:text-lg" : "px-5 py-2.5 text-sm"}`}>
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M9.8 15.3 9.4 20c.6 0 .8-.3 1.1-.5l2.6-2.5 5.4 4c1 .5 1.7.3 2-.9l3.5-16.6c.4-1.5-.5-2.1-1.5-1.7L1.7 9.4c-1.4.6-1.4 1.4-.2 1.8l5.4 1.7L19.3 5c.6-.4 1.1-.2.7.2z"/></svg>
      {label}
    </a>
  );
}

const samples = [
  { name: "voice_note_ceo.ogg", type: "Voice", fake: true, score: 94, notes: ["Spectral artifacts at 4–8 kHz", "Unnatural breath cadence", "Cloned-voice signature match"] },
  { name: "interview_clip.mp4", type: "Video", fake: false, score: 7, notes: ["Consistent lip-sync", "Natural blink rate", "No GAN frequency traces"] },
  { name: "bank_call.mp3", type: "Voice", fake: true, score: 88, notes: ["Phase discontinuities", "Flat prosody", "TTS vocoder fingerprint"] },
];

function Demo({ t }: { t: T }) {
  const [sel, setSel] = useState<number | null>(null);
  const [state, setState] = useState<"idle" | "scan" | "done">("idle");
  const run = (i: number) => { setSel(i); setState("scan"); setTimeout(() => setState("done"), 2200); };
  const s = sel !== null ? samples[sel] : null;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-3">
        <p className="font-mono text-sm text-muted-foreground">{t.pick}</p>
        {samples.map((x, i) => (
          <button key={x.name} onClick={() => run(i)} disabled={state === "scan"}
            className={`glass flex w-full items-center justify-between rounded-2xl p-4 text-left transition duration-300 hover:-translate-y-0.5 ${sel === i ? "ring-2 ring-primary/60" : ""}`}>
            <span className="font-mono">{x.name}</span>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">{x.type === "Voice" ? t.voice : t.video}</span>
          </button>
        ))}
      </div>
      <div className="glass relative min-h-72 overflow-hidden rounded-3xl p-8 font-mono">
        {state === "idle" && <p className="text-muted-foreground">{t.awaiting}</p>}
        {state === "scan" && (<>
          <div className="scanline absolute inset-x-0 h-0.5 bg-primary shadow-glow" />
          <p className="text-primary">{t.analyzing} {s?.name}...</p>
          <p className="mt-2 text-muted-foreground">{t.extracting}</p>
          <p className="text-muted-foreground">{t.ensemble}</p>
        </>)}
        {state === "done" && s && (
          <div>
            <p className="text-muted-foreground">{t.verdict}</p>
            <p className={`mt-2 font-display text-3xl font-extrabold sm:text-5xl ${s.fake ? "text-danger" : "text-signal"}`}>{s.fake ? t.fake : t.real}</p>
            <div className="mt-4 h-2 rounded bg-secondary"><div className={`h-2 rounded ${s.fake ? "bg-danger" : "bg-signal"}`} style={{ width: `${s.score}%` }} /></div>
            <p className="mt-1 text-sm text-muted-foreground">{t.prob}: {s.score}%</p>
            <ul className="mt-4 space-y-1 text-sm">{(t.samples[sel ?? 0]?.notes ?? []).map(n => <li key={n}>• {n}</li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}


function Index() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-0"><div className="blob left-[-10%] top-[-10%] h-[40rem] w-[40rem] bg-blob-1" /><div className="blob right-[-10%] top-[20%] h-[34rem] w-[34rem] bg-blob-2 [animation-delay:-6s]" /><div className="blob bottom-[-15%] left-[30%] h-[36rem] w-[36rem] bg-blob-3 [animation-delay:-12s]" /></div>
      <div aria-hidden className="top-fade pointer-events-none fixed inset-x-0 top-0 z-10 h-24 sm:h-28" />
      <div className="relative pt-16 sm:pt-20">
      <header className="glass fixed inset-x-3 top-3 z-20 mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-full px-4 py-2 sm:top-4 sm:px-5 sm:py-2.5">
        <span className="font-display text-xl font-bold"><span className="text-gradient">●</span> DFS <span className="hidden text-sm font-normal text-muted-foreground sm:inline">DeepFake Security</span></span>
        <div className="flex items-center gap-3">
          <div className="liquid-btn flex rounded-full p-1 text-xs font-semibold">
            {LANGS.map((l: Lang) => (
              <button key={l} onClick={() => setLang(l)} className={`rounded-full px-3 py-1 uppercase transition ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{l}</button>
            ))}
          </div>
          <span className="hidden md:inline"><BotButton label={t.launch} /></span>
        </div>
      </header>

      <section className="relative">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-16 pt-10 sm:px-6 md:grid-cols-2 md:gap-10 md:py-24 reveal">
          <div>
            <p className="glass inline-block rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground">{t.tagline}</p>
            <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.02] sm:text-5xl md:text-7xl">{t.h1a}<br /><span className="text-gradient">{t.h1b}</span></h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">{t.sub}</p>
            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap sm:gap-4"><BotButton big label={t.launch} /><a href="#demo" className="liquid-btn rounded-full px-8 py-3.5 text-center text-base font-semibold sm:py-4 sm:text-lg">{t.tryDemo}</a></div>
            <div className="mt-10 grid grid-cols-3 gap-4 sm:flex sm:gap-10">
              <div><p className="text-2xl font-extrabold text-gradient sm:text-3xl">98.7%</p><p className="text-xs text-muted-foreground">{t.stats[0]}</p></div>
              <div><p className="text-2xl font-extrabold text-gradient sm:text-3xl">&lt;5s</p><p className="text-xs text-muted-foreground">{t.stats[1]}</p></div>
              <div><p className="text-2xl font-extrabold text-gradient sm:text-3xl">24/7</p><p className="text-xs text-muted-foreground">{t.stats[2]}</p></div>
            </div>
          </div>
          <div className="glass mx-auto aspect-square w-full max-w-[22rem] cursor-grab md:max-w-none rounded-[2rem] active:cursor-grabbing" aria-label={t.heroAlt}><ClientOnly><Suspense fallback={null}><HeroScene /></Suspense></ClientOnly></div>
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-24">
        <h2 className="text-3xl font-extrabold sm:text-5xl">{t.demoTitle}</h2>
        <p className="mb-10 mt-2 text-muted-foreground">{t.demoSub}</p>
        <Demo t={t} />
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-24">
          <h2 className="mb-8 text-3xl font-extrabold sm:text-5xl">{t.howTitle}</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {t.steps.map(([title, d], i) => { const n = `0${i + 1}`; return (
              <div key={n} className="glass rounded-3xl p-7 transition duration-500 hover:-translate-y-1.5">
                <p className="font-mono text-3xl text-gradient font-semibold">{n}</p>
                <h3 className="mt-4 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ); })}
          </div>
        </div>
      </section>

      <section className="glass mx-4 mb-16 max-w-3xl rounded-[2rem] px-5 py-14 sm:mx-auto sm:mb-24 sm:rounded-[2.5rem] sm:px-6 sm:py-20 text-center">
        <h2 className="text-3xl font-extrabold sm:text-5xl">{t.ctaTitle}</h2>
        <p className="mb-8 mt-4 text-muted-foreground">{t.ctaSub}</p>
        <BotButton big label={t.launch} />
      </section>
      <footer className="py-10 text-center font-mono text-xs text-muted-foreground">© 2026 DFS — DeepFake Security</footer>
      </div>
    </div>
  );
}
