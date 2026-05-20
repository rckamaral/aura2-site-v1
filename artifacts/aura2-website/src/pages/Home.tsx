import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Download, MessagesSquare } from "lucide-react";

const CLASSES = [
  {
    id: "guerreiro",
    name: "Guerreiro",
    title: "O GUERREIRO",
    subtitle: "Força e Honra",
    description:
      "Mestre do combate corpo-a-corpo. Resiste a qualquer golpe e destrói seus inimigos com pura força bruta. O pilar de qualquer grupo de batalha.",
    glyph: "⚔",
    accentRgb: "180, 30, 30",
    accentHex: "#B41E1E",
    glowHex: "#ff3333",
    bgGradient:
      "radial-gradient(ellipse 70% 80% at 75% 50%, rgba(180,30,30,0.45) 0%, rgba(80,5,5,0.25) 50%, transparent 80%)",
    stats: [
      { label: "Força", value: 95 },
      { label: "Defesa", value: 90 },
      { label: "Velocidade", value: 55 },
      { label: "Magia", value: 20 },
    ],
  },
  {
    id: "ninja",
    name: "Ninja",
    title: "O NINJA",
    subtitle: "Sombra e Precisão",
    description:
      "Invisível nas trevas, letal na luz. Domina arco e adagas com igual maestria. Age antes que o inimigo perceba sua presença.",
    glyph: "🗡",
    accentRgb: "20, 160, 120",
    accentHex: "#14A078",
    glowHex: "#00ffcc",
    bgGradient:
      "radial-gradient(ellipse 70% 80% at 75% 50%, rgba(20,160,120,0.4) 0%, rgba(0,60,40,0.25) 50%, transparent 80%)",
    stats: [
      { label: "Força", value: 65 },
      { label: "Defesa", value: 50 },
      { label: "Velocidade", value: 98 },
      { label: "Magia", value: 40 },
    ],
  },
  {
    id: "shura",
    name: "Shura",
    title: "O SHURA",
    subtitle: "Magia das Trevas",
    description:
      "Canaliza poderes de outro mundo. Devasta grupos inteiros com feitiços sombrios. Temido por amigos e inimigos.",
    glyph: "✦",
    accentRgb: "130, 40, 200",
    accentHex: "#8228C8",
    glowHex: "#cc44ff",
    bgGradient:
      "radial-gradient(ellipse 70% 80% at 75% 50%, rgba(130,40,200,0.45) 0%, rgba(50,0,80,0.25) 50%, transparent 80%)",
    stats: [
      { label: "Força", value: 60 },
      { label: "Defesa", value: 45 },
      { label: "Velocidade", value: 65 },
      { label: "Magia", value: 97 },
    ],
  },
  {
    id: "shaman",
    name: "Shaman",
    title: "O SHAMAN",
    subtitle: "Luz e Cura",
    description:
      "Portador da luz divina. Cura aliados e amaldiçoa inimigos com igualfacilidade. Indispensável em qualquer batalha.",
    glyph: "☯",
    accentRgb: "40, 130, 220",
    accentHex: "#2882DC",
    glowHex: "#44aaff",
    bgGradient:
      "radial-gradient(ellipse 70% 80% at 75% 50%, rgba(40,130,220,0.4) 0%, rgba(0,40,100,0.25) 50%, transparent 80%)",
    stats: [
      { label: "Força", value: 45 },
      { label: "Defesa", value: 60 },
      { label: "Velocidade", value: 70 },
      { label: "Magia", value: 90 },
    ],
  },
] as const;

type ClassId = (typeof CLASSES)[number]["id"];

export default function Home() {
  const [selected, setSelected] = useState<ClassId | null>(null);

  const activeClass = CLASSES.find((c) => c.id === selected) ?? null;

  return (
    <div className="relative w-full flex-1 flex flex-col justify-center min-h-[calc(100vh-5rem)]">

      {/* ── Static dark background ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      {/* ── Class atmosphere overlay (appears on selection) ── */}
      <div
        className="absolute inset-0 -z-9 pointer-events-none class-overlay"
        style={{
          background: activeClass ? activeClass.bgGradient : "transparent",
          opacity: activeClass ? 1 : 0,
          transition: "opacity 0.5s ease, background 0.5s ease",
        }}
      />

      {/* ── Full-screen class silhouette glyph ── */}
      {CLASSES.map((cls) => (
        <div
          key={cls.id}
          className="absolute inset-0 -z-8 flex items-center justify-end pr-8 pointer-events-none overflow-hidden select-none"
          style={{
            opacity: selected === cls.id ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          <span
            className="class-glyph-bg"
            style={{
              fontSize: "clamp(18rem, 35vw, 42rem)",
              lineHeight: 1,
              color: cls.accentHex,
              filter: `drop-shadow(0 0 60px ${cls.glowHex}) drop-shadow(0 0 120px ${cls.glowHex})`,
              opacity: 0.18,
              fontFamily: "serif",
              userSelect: "none",
            }}
          >
            {cls.glyph}
          </span>
        </div>
      ))}

      {/* ── Main content ── */}
      <div className="container mx-auto px-4 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12">

        {/* Left: headline + CTAs */}
        <div className="flex-1 max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
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

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Button size="lg" asChild className="w-full sm:w-auto h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(212,160,23,0.3)] hover:shadow-[0_0_40px_rgba(212,160,23,0.5)] transition-all">
              <Link href="/download">
                <Download className="w-5 h-5 mr-2" /> Baixar Agora
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto h-14 px-8 border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-wider backdrop-blur-sm">
              <a href="#">
                <MessagesSquare className="w-5 h-5 mr-2" /> Entrar no Discord
              </a>
            </Button>
          </div>

          <div className="pt-8 flex items-center gap-4">
            <div className="bg-black/40 border border-primary/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Players Online</p>
              <p className="text-2xl font-display text-white font-bold flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> 4.892
              </p>
            </div>
          </div>
        </div>

        {/* Right: Metin2 logo + AURA (hidden when class is selected) OR class info panel */}
        <div className="hidden lg:flex flex-1 flex-col items-center justify-center gap-0 min-h-[320px]">
          {/* Default: logo */}
          <div
            className="flex flex-col items-center gap-0 w-full"
            style={{
              opacity: selected ? 0 : 1,
              transform: selected ? "translateY(-12px)" : "translateY(0)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
              pointerEvents: selected ? "none" : "auto",
              position: selected ? "absolute" : "relative",
            }}
          >
            <div className="w-full max-w-lg overflow-hidden animate-amber-pulse" style={{ clipPath: "inset(0 0 28% 0)" }}>
              <img src="/metin2_logo_nobg.png" alt="Metin2" className="w-full object-contain"
                style={{ filter: "drop-shadow(0 0 24px rgba(212,160,23,0.55))" }} />
            </div>
            <p className="animate-amber-pulse font-display font-black uppercase tracking-[0.35em] text-primary"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", filter: "drop-shadow(0 0 18px rgba(212,160,23,0.7))", marginTop: "-2.5rem" }}>
              AURA
            </p>
          </div>

          {/* Class info panel */}
          {CLASSES.map((cls) => (
            <div
              key={cls.id}
              className="absolute flex flex-col items-start justify-center gap-6 w-full max-w-md"
              style={{
                opacity: selected === cls.id ? 1 : 0,
                transform: selected === cls.id ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
                pointerEvents: selected === cls.id ? "auto" : "none",
              }}
            >
              {/* Class title */}
              <div>
                <p className="text-xs uppercase tracking-[0.3em] font-bold mb-1"
                  style={{ color: cls.accentHex }}>
                  {cls.subtitle}
                </p>
                <h2 className="font-display font-black text-white"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    lineHeight: 1,
                    textShadow: `0 0 30px ${cls.glowHex}66`,
                  }}>
                  {cls.title}
                </h2>
              </div>

              <p className="text-gray-300 text-base leading-relaxed max-w-sm">
                {cls.description}
              </p>

              {/* Stats */}
              <div className="w-full space-y-3">
                {cls.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-xs uppercase tracking-widest font-semibold mb-1">
                      <span className="text-gray-400">{stat.label}</span>
                      <span style={{ color: cls.accentHex }}>{stat.value}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: selected === cls.id ? `${stat.value}%` : "0%",
                          background: `linear-gradient(90deg, ${cls.accentHex}, ${cls.glowHex})`,
                          boxShadow: `0 0 8px ${cls.glowHex}`,
                          transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="font-bold uppercase tracking-wider"
                style={{
                  background: cls.accentHex,
                  color: "#fff",
                  boxShadow: `0 0 20px ${cls.glowHex}66`,
                }}
                onClick={() => setSelected(null)}
              >
                ← Voltar
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Class selector row ── */}
      <div className="container mx-auto px-4 pb-12 mt-auto">
        <div className="flex justify-center sm:justify-start gap-4 sm:gap-6 overflow-x-auto pb-4">
          {CLASSES.map((cls) => {
            const isActive = selected === cls.id;
            return (
              <button
                key={cls.id}
                data-testid={`class-btn-${cls.id}`}
                onClick={() => setSelected(isActive ? null : cls.id)}
                className="flex-shrink-0 flex flex-col items-center gap-2 group focus:outline-none"
              >
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all duration-300 text-3xl"
                  style={{
                    border: isActive
                      ? `2px solid ${cls.accentHex}`
                      : "2px solid rgba(255,255,255,0.1)",
                    background: isActive
                      ? `radial-gradient(circle, rgba(${cls.accentRgb},0.25) 0%, rgba(0,0,0,0.6) 100%)`
                      : "rgba(0,0,0,0.6)",
                    boxShadow: isActive
                      ? `0 0 20px ${cls.glowHex}88, 0 0 40px ${cls.glowHex}44`
                      : "none",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <span style={{ filter: isActive ? `drop-shadow(0 0 8px ${cls.glowHex})` : "none" }}>
                    {cls.glyph}
                  </span>
                </div>
                <span
                  className="text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-300"
                  style={{ color: isActive ? cls.accentHex : "rgba(255,255,255,0.4)" }}
                >
                  {cls.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
