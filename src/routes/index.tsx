import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/hero-face.jpg";
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
      className={`inline-flex items-center gap-2 rounded-md bg-primary font-semibold text-primary-foreground shadow-glow transition hover:bg-accent ${big ? "px-8 py-4 text-lg" : "px-5 py-2.5"}`}>
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
            className={`flex w-full items-center justify-between rounded-md border bg-card p-4 text-left transition hover:border-primary ${sel === i ? "border-primary shadow-glow" : ""}`}>
            <span className="font-mono">{x.name}</span>
            <span className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{x.type === "Voice" ? t.voice : t.video}</span>
          </button>
        ))}
      </div>
      <div className="relative min-h-72 overflow-hidden rounded-lg border bg-card p-6 font-mono">
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
            <p className={`mt-2 font-display text-4xl font-bold ${s.fake ? "text-danger" : "text-signal"}`}>{s.fake ? t.fake : t.real}</p>
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
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="font-display text-xl font-bold"><span className="text-primary">◆</span> DFS <span className="hidden text-sm font-normal text-muted-foreground sm:inline">DeepFake Security</span></span>
        <div className="flex items-center gap-3">
          <div className="flex rounded-md border p-0.5 font-mono text-sm">
            {LANGS.map((l: Lang) => (
              <button key={l} onClick={() => setLang(l)} className={`rounded px-2.5 py-1 uppercase transition ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{l}</button>
            ))}
          </div>
          <span className="hidden md:inline"><BotButton label={t.launch} /></span>
        </div>
      </header>

      <section className="grid-bg relative">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <p className="font-mono text-sm text-signal">{t.tagline}</p>
            <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl">{t.h1a}<br /><span className="text-primary">{t.h1b}</span></h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">{t.sub}</p>
            <div className="mt-8 flex flex-wrap gap-4"><BotButton big label={t.launch} /><a href="#demo" className="rounded-md border px-8 py-4 text-lg hover:border-primary">{t.tryDemo}</a></div>
            <div className="mt-10 flex gap-10 font-mono">
              <div><p className="text-2xl text-primary">98.7%</p><p className="text-xs text-muted-foreground">{t.stats[0]}</p></div>
              <div><p className="text-2xl text-primary">&lt;5s</p><p className="text-xs text-muted-foreground">{t.stats[1]}</p></div>
              <div><p className="text-2xl text-primary">24/7</p><p className="text-xs text-muted-foreground">{t.stats[2]}</p></div>
            </div>
          </div>
          <img src={hero} alt={t.heroAlt} width={1280} height={960} className="rounded-lg border shadow-glow" />
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-4xl font-bold">{t.demoTitle}</h2>
        <p className="mb-10 mt-2 text-muted-foreground">{t.demoSub}</p>
        <Demo t={t} />
      </section>

      <section className="border-y bg-card/50">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="mb-12 text-4xl font-bold">{t.howTitle}</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {t.steps.map(([title, d], i) => { const n = `0${i + 1}`; return (
              <div key={n} className="rounded-lg border bg-background p-6 transition hover:border-primary">
                <p className="font-mono text-3xl text-primary">{n}</p>
                <h3 className="mt-4 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ); })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="text-4xl font-bold">{t.ctaTitle}</h2>
        <p className="mb-8 mt-4 text-muted-foreground">{t.ctaSub}</p>
        <BotButton big label={t.launch} />
      </section>
      <footer className="border-t py-8 text-center font-mono text-xs text-muted-foreground">© 2026 DFS — DeepFake Security</footer>
    </div>
  );
}
