import { useState, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Download, MessagesSquare, ExternalLink } from "lucide-react";

const CLASSES = [
  { id: "guerreiro", name: "Guerreiro", portrait: { M: "/classes/guerreiro_m.png", F: "/classes/guerreiro_f.png" }, accentHex: "#B41E1E", glowHex: "#ff4444", accentRgb: "180,30,30", videoSrc: { M: "/guerreiro.mp4", F: "/guerreiro_f.mp4" } },
  { id: "ninja",     name: "Ninja",     portrait: { M: "/classes/ninja_m.png",     F: "/classes/ninja_f.png"     }, accentHex: "#14A078", glowHex: "#00ffcc", accentRgb: "20,160,120", videoSrc: { M: "/ninja.mp4",     F: "/ninja_f.mp4"     } },
  { id: "shura",     name: "Shura",     portrait: { M: "/classes/shura_m.png",     F: "/classes/shura_f.png"     }, accentHex: "#8228C8", glowHex: "#cc44ff", accentRgb: "130,40,200", videoSrc: { M: "/shura.mp4",     F: "/shura_f.mp4"     } },
  { id: "shaman",    name: "Shaman",    portrait: { M: "/classes/shaman_m.png",    F: "/classes/shaman_f.png"    }, accentHex: "#2882DC", glowHex: "#44aaff", accentRgb: "40,130,220", videoSrc: { M: "/shaman.mp4",    F: "/shaman_f.mp4"    } },
] as const;

type ClassId = (typeof CLASSES)[number]["id"];
type Gender  = "M" | "F";
type VideoKey = `${ClassId}-${"M" | "F"}`;

const ALL_VIDEOS: { key: VideoKey; src: string }[] = CLASSES.flatMap((cls) =>
  (["M", "F"] as Gender[]).map((g) => ({ key: `${cls.id}-${g}` as VideoKey, src: cls.videoSrc[g] }))
);

const POSTS = [
  { id: 1, category: "Eventos",  categoryColor: "#c0392b", title: "Cronograma de Eventos",  ago: "há 1 mês",   gradient: "linear-gradient(135deg, #3a0a0a 0%, #7a1515 100%)" },
  { id: 2, category: "Notícias", categoryColor: "#2471a3", title: "Patch Notes 13.05",       ago: "há 6 dias",  gradient: "linear-gradient(135deg, #0a1a3a 0%, #153060 100%)" },
  { id: 3, category: "Eventos",  categoryColor: "#c0392b", title: "Bônus do Dia das Mães",   ago: "há 1 semana",gradient: "linear-gradient(135deg, #2a0a2a 0%, #601560 100%)" },
  { id: 4, category: "Eventos",  categoryColor: "#c0392b", title: "Batalha Todos x Todos",   ago: "há 2 semanas",gradient: "linear-gradient(135deg, #1a1a0a 0%, #3a3010 100%)" },
];

export default function Home() {
  const [selected, setSelected] = useState<ClassId | null>(null);
  const [gender,   setGender]   = useState<Gender>("M");
  const videoRefs = useRef<Partial<Record<VideoKey, HTMLVideoElement>>>({});

  const activeClass = CLASSES.find((c) => c.id === selected) ?? null;
  const activeKey: VideoKey | null = selected ? `${selected}-${gender}` : null;

  function showVideo(key: VideoKey) {
    for (const [k, v] of Object.entries(videoRefs.current)) {
      if (!v) continue;
      if (k === key) { v.currentTime = 0; v.play().catch(() => {}); }
      else v.pause();
    }
  }

  function handleClassClick(cls: (typeof CLASSES)[number]) {
    if (selected === cls.id) {
      setSelected(null);
      Object.values(videoRefs.current).forEach((v) => v?.pause());
      return;
    }
    setSelected(cls.id);
    showVideo(`${cls.id}-${gender}`);
  }

  function handleGenderChange(g: Gender) {
    setGender(g);
    if (selected) showVideo(`${selected}-${g}`);
  }

  return (
    <div className="w-full flex-1 flex flex-col">

      {/* ══════════════════════════════════════════
          HERO — full viewport height
      ══════════════════════════════════════════ */}
      <div className="relative flex flex-col">

        {/* Preloaded video pool */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {ALL_VIDEOS.map(({ key, src }) => (
            <video
              key={key}
              ref={(el) => { if (el) videoRefs.current[key] = el; }}
              src={src} muted loop playsInline preload="auto"
              className="absolute w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: activeKey === key ? 0.85 : 0 }}
            />
          ))}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,5,2,0.92) 30%, rgba(8,5,2,0.3) 100%)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-background/70 transition-opacity duration-500" style={{ opacity: activeClass ? 0 : 1 }} />
        </div>

        {/* ── Top: logo + hero text side-by-side ── */}
        <div className="container mx-auto px-4 pt-10 lg:pt-16 flex flex-col lg:flex-row items-start gap-8">

          {/* Left — text */}
          <div className="flex-1 max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary backdrop-blur-sm">
              <span className="mr-2 flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              × Season 1 Online • Evento Especial Ativo
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight">
              <span className="text-white">UMA NOVA LENDA</span>
              <br />
              <span className="text-primary animate-amber-pulse inline-block">NASCE</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
              Reviva a verdadeira experiência do Metin2 clássico com guerras épicas, PvP competitivo, farm balanceado e uma comunidade ativa.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Button size="lg" asChild className="w-full sm:w-auto h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(212,160,23,0.3)] hover:shadow-[0_0_40px_rgba(212,160,23,0.5)] transition-all">
                <Link href="/download"><Download className="w-5 h-5 mr-2" /> Baixar Agora</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto h-14 px-8 border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-wider backdrop-blur-sm">
                <a href="#"><MessagesSquare className="w-5 h-5 mr-2" /> Entrar no Discord</a>
              </Button>
            </div>

            <div>
              <div className="inline-flex items-center bg-black/40 border border-primary/20 rounded-lg p-4 backdrop-blur-sm gap-4">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Players Online</p>
                <p className="text-2xl font-display text-white font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> 4.892
                </p>
              </div>
            </div>
          </div>

          {/* Right — Metin2 logo (top-aligned, fades on class select) */}
          <div className="hidden lg:flex flex-shrink-0 w-[420px] flex-col items-center pt-2">
            <div
              style={{
                opacity: selected ? 0 : 1,
                transform: selected ? "translateY(-10px)" : "translateY(0)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
                pointerEvents: selected ? "none" : "auto",
              }}
              className="flex flex-col items-center"
            >
              <div className="w-full overflow-hidden animate-amber-pulse" style={{ clipPath: "inset(0 0 28% 0)" }}>
                <img src="/metin2_logo_nobg.png" alt="Metin2" className="w-full object-contain"
                  style={{ filter: "drop-shadow(0 0 24px rgba(212,160,23,0.55))" }} />
              </div>
              <p className="animate-amber-pulse font-display font-black uppercase tracking-[0.35em] text-primary"
                style={{ fontSize: "clamp(1.8rem,4vw,3rem)", filter: "drop-shadow(0 0 18px rgba(212,160,23,0.7))", marginTop: "-2.5rem" }}>
                AURA
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom: class selector ── */}
        <div className="container mx-auto px-4 pb-10 mt-10">
          <div className="flex flex-col gap-3">

            {/* Gender toggle */}
            <div
              className="flex items-center gap-2"
              style={{ opacity: selected ? 1 : 0, transition: "opacity 0.3s ease", pointerEvents: selected ? "auto" : "none" }}
            >
              {(["M", "F"] as Gender[]).map((g) => (
                <button key={g} type="button" onClick={() => handleGenderChange(g)}
                  className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all"
                  style={{
                    background: gender === g ? (activeClass?.accentHex ?? "#D4A017") : "rgba(255,255,255,0.08)",
                    color: gender === g ? "#fff" : "rgba(255,255,255,0.4)",
                    border: gender === g ? "none" : "1px solid rgba(255,255,255,0.12)",
                  }}>
                  {g === "M" ? "Masculino" : "Feminino"}
                </button>
              ))}
            </div>

            {/* Class buttons */}
            <div className="flex justify-center sm:justify-start gap-4 sm:gap-6 overflow-x-auto pb-2">
              {CLASSES.map((cls) => {
                const isActive = selected === cls.id;
                return (
                  <button key={cls.id} type="button" onClick={() => handleClassClick(cls)}
                    className="flex-shrink-0 flex flex-col items-center gap-2 focus:outline-none">
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden transition-all duration-300"
                      style={{
                        border: isActive ? `2px solid ${cls.accentHex}` : "2px solid rgba(255,255,255,0.15)",
                        boxShadow: isActive ? `0 0 22px ${cls.glowHex}99, 0 0 44px ${cls.glowHex}44` : "none",
                        transform: isActive ? "scale(1.12)" : "scale(1)",
                      }}>
                      <img src={cls.portrait[gender]} alt={cls.name} className="w-full h-full object-cover"
                        style={{ filter: isActive ? `brightness(1.15) contrast(1.1)` : "brightness(0.75) contrast(1.05)" }} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-300"
                      style={{ color: isActive ? cls.accentHex : "rgba(255,255,255,0.4)" }}>
                      {cls.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ÚLTIMAS POSTAGENS
      ══════════════════════════════════════════ */}
      <section className="container mx-auto px-4 py-14">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-wide">
            Últimas Postagens
          </h2>
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary border border-white/10 hover:border-primary/40 rounded-lg px-4 py-2 transition-all"
          >
            Ver mais <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer h-52"
              style={{ background: post.gradient }}
            >
              {/* Decorative overlay pattern */}
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 60%)" }} />

              {/* Decorative game-style silhouette area */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-32 h-32 rounded-full border-2 border-white/30" />
              </div>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                {/* Category badge */}
                <span
                  className="inline-block text-xs font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded mb-2"
                  style={{ background: post.categoryColor }}
                >
                  {post.category}
                </span>
                <h3 className="text-white font-bold text-base leading-tight mb-1 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-400">{post.ago}</p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/40 rounded-xl transition-all duration-300" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
