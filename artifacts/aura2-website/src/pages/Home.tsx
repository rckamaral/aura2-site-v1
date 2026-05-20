import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Download, MessagesSquare } from "lucide-react";

// Video ~48.87s split into 4 male takes (first half) + 4 female takes (second half)
const CLASSES = [
  { id: "guerreiro", name: "Guerreiro", glyph: "⚔", accentHex: "#B41E1E", glowHex: "#ff4444", accentRgb: "180,30,30", videoStart: { M: 0, F: 24.4 } },
  { id: "ninja",     name: "Ninja",     glyph: "🗡", accentHex: "#14A078", glowHex: "#00ffcc", accentRgb: "20,160,120", videoStart: { M: 6.1, F: 30.5 } },
  { id: "shura",     name: "Shura",     glyph: "✦", accentHex: "#8228C8", glowHex: "#cc44ff", accentRgb: "130,40,200", videoStart: { M: 12.2, F: 36.6 } },
  { id: "shaman",    name: "Shaman",    glyph: "☯", accentHex: "#2882DC", glowHex: "#44aaff", accentRgb: "40,130,220", videoStart: { M: 18.3, F: 42.7 } },
] as const;

type ClassId = (typeof CLASSES)[number]["id"];
type Gender  = "M" | "F";

const SEGMENT = 6.1; // seconds per take

export default function Home() {
  const [selected, setSelected] = useState<ClassId | null>(null);
  const [gender,   setGender]   = useState<Gender>("M");
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeClass = CLASSES.find((c) => c.id === selected) ?? null;

  // Seek + play on selection change
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!activeClass) { video.pause(); return; }

    const start = activeClass.videoStart[gender];
    video.currentTime = start;
    video.play().catch(() => {});
  }, [selected, gender]);

  // Loop within the take segment
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeClass) return;
    const start = activeClass.videoStart[gender];
    const onTime = () => {
      if (video.currentTime >= start + SEGMENT) video.currentTime = start;
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, [selected, gender, activeClass]);

  return (
    <div className="relative w-full flex-1 flex flex-col justify-center min-h-[calc(100vh-5rem)]">

      {/* Video background — visible only when a class is selected */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/characters.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover"
          style={{ opacity: activeClass ? 0.85 : 0, transition: "opacity 0.5s ease" }}
        />
        {/* Overlays always on */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,5,2,0.92) 30%, rgba(8,5,2,0.35) 100%)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        {/* Dark base when no class selected */}
        <div className="absolute inset-0 bg-background/70" style={{ opacity: activeClass ? 0 : 1, transition: "opacity 0.5s ease" }} />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12">

        {/* Left */}
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
              <Link href="/download"><Download className="w-5 h-5 mr-2" /> Baixar Agora</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto h-14 px-8 border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-wider backdrop-blur-sm">
              <a href="#"><MessagesSquare className="w-5 h-5 mr-2" /> Entrar no Discord</a>
            </Button>
          </div>

          <div className="pt-8">
            <div className="inline-flex bg-black/40 border border-primary/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Players Online</p>
              <p className="text-2xl font-display text-white font-bold flex items-center gap-3 ml-4">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> 4.892
              </p>
            </div>
          </div>
        </div>

        {/* Right — logo (default) */}
        <div className="hidden lg:flex flex-1 flex-col items-center justify-center gap-0">
          <div
            style={{
              opacity: selected ? 0 : 1,
              transform: selected ? "translateY(-10px)" : "translateY(0)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
              pointerEvents: selected ? "none" : "auto",
            }}
            className="flex flex-col items-center"
          >
            <div className="w-full max-w-lg overflow-hidden animate-amber-pulse" style={{ clipPath: "inset(0 0 28% 0)" }}>
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

      {/* Class selector */}
      <div className="container mx-auto px-4 pb-12 mt-auto">
        <div className="flex flex-col gap-3">

          {/* Gender toggle — only visible when a class is selected */}
          <div
            className="flex items-center gap-2"
            style={{ opacity: selected ? 1 : 0, transition: "opacity 0.3s ease", pointerEvents: selected ? "auto" : "none" }}
          >
            {(["M", "F"] as Gender[]).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all"
                style={{
                  background: gender === g ? (activeClass?.accentHex ?? "#D4A017") : "rgba(255,255,255,0.08)",
                  color: gender === g ? "#fff" : "rgba(255,255,255,0.4)",
                  border: gender === g ? "none" : "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {g === "M" ? "Masculino" : "Feminino"}
              </button>
            ))}
          </div>

          {/* Class buttons */}
          <div className="flex justify-center sm:justify-start gap-4 sm:gap-6 overflow-x-auto pb-2">
            {CLASSES.map((cls) => {
              const isActive = selected === cls.id;
              return (
                <button
                  key={cls.id}
                  data-testid={`class-btn-${cls.id}`}
                  onClick={() => { setSelected(isActive ? null : cls.id); if (isActive) setGender("M"); }}
                  className="flex-shrink-0 flex flex-col items-center gap-2 focus:outline-none"
                >
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl transition-all duration-300"
                    style={{
                      border: isActive ? `2px solid ${cls.accentHex}` : "2px solid rgba(255,255,255,0.1)",
                      background: isActive ? `radial-gradient(circle, rgba(${cls.accentRgb},0.3) 0%, rgba(0,0,0,0.6) 100%)` : "rgba(0,0,0,0.6)",
                      boxShadow: isActive ? `0 0 22px ${cls.glowHex}99, 0 0 44px ${cls.glowHex}44` : "none",
                      transform: isActive ? "scale(1.12)" : "scale(1)",
                    }}
                  >
                    <span style={{ filter: isActive ? `drop-shadow(0 0 8px ${cls.glowHex})` : "none" }}>{cls.glyph}</span>
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
    </div>
  );
}
