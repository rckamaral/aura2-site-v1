import { useState, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Download, MessagesSquare, ExternalLink } from "lucide-react";

const CLASSES = [
  {
    id: "guerreiro",
    name: "Guerreiro",
    portrait: { M: "/classes/guerreiro_m.png", F: "/classes/guerreiro_f.png" },
    accentHex: "#B41E1E",
    glowHex: "#ff4444",
    accentRgb: "180,30,30",
    videoSrc: { M: "/guerreiro.mp4", F: "/guerreiro_f.mp4" },
  },
  {
    id: "ninja",
    name: "Ninja",
    portrait: { M: "/classes/ninja_m.png", F: "/classes/ninja_f.png" },
    accentHex: "#14A078",
    glowHex: "#00ffcc",
    accentRgb: "20,160,120",
    videoSrc: { M: "/ninja.mp4", F: "/ninja_f.mp4" },
  },
  {
    id: "shura",
    name: "Shura",
    portrait: { M: "/classes/shura_m.png", F: "/classes/shura_f.png" },
    accentHex: "#8228C8",
    glowHex: "#cc44ff",
    accentRgb: "130,40,200",
    videoSrc: { M: "/shura.mp4", F: "/shura_f.mp4" },
  },
  {
    id: "shaman",
    name: "Shaman",
    portrait: { M: "/classes/shaman_m.png", F: "/classes/shaman_f.png" },
    accentHex: "#2882DC",
    glowHex: "#44aaff",
    accentRgb: "40,130,220",
    videoSrc: { M: "/shaman.mp4", F: "/shaman_f.mp4" },
  },
] as const;

type ClassId = (typeof CLASSES)[number]["id"];
type Gender = "M" | "F";
type VideoKey = `${ClassId}-${"M" | "F"}`;

const ALL_VIDEOS: { key: VideoKey; src: string }[] = CLASSES.flatMap((cls) =>
  (["M", "F"] as Gender[]).map((g) => ({
    key: `${cls.id}-${g}` as VideoKey,
    src: cls.videoSrc[g],
  })),
);

const TABS = ["Fase Beta", "Eventos", "Notícias", "Atualizações"] as const;
type Tab = (typeof TABS)[number];

const POSTS: Record<Tab, { id: number; category: string; categoryColor: string; title: string; ago: string; gradient: string; desc?: string; badge?: string; featured?: boolean }[]> = {
  "Fase Beta": [
    {
      id: 1,
      category: "Fase Beta",
      categoryColor: "#b8860b",
      title: "Servidor Beta Aberto — 15 Dias de Testes",
      ago: "hoje",
      gradient: "linear-gradient(135deg, #1a1000 0%, #5a3800 60%, #3a2000 100%)",
      desc: "O servidor ficará aberto por 15 dias exclusivamente para jogadores selecionados. Explore, teste e reporte — cada detalhe importa para o lançamento oficial!",
      badge: "🟢 AO VIVO",
      featured: true,
    },
    {
      id: 2,
      category: "Recompensa",
      categoryColor: "#c0860a",
      title: "Cash de Recompensa no Lançamento Oficial",
      ago: "hoje",
      gradient: "linear-gradient(135deg, #1a0800 0%, #4a2000 60%, #2a1200 100%)",
      desc: "Todo jogador que participar da Fase Beta receberá Cash Coins de presente quando o servidor for lançado oficialmente. Sua presença tem valor!",
      badge: "🎁 RECOMPENSA",
    },
    {
      id: 3,
      category: "Fase Beta",
      categoryColor: "#b8860b",
      title: "Reporte de Bugs — Como Participar",
      ago: "hoje",
      gradient: "linear-gradient(135deg, #0a1208 0%, #1a3010 100%)",
      desc: "Encontrou algo errado? Reporte pelo Discord com prints e descrição detalhada. Bugs confirmados garantem recompensas extras no lançamento.",
    },
    {
      id: 4,
      category: "Fase Beta",
      categoryColor: "#b8860b",
      title: "Regras e Conduta na Fase Beta",
      ago: "hoje",
      gradient: "linear-gradient(135deg, #0a0818 0%, #1a1240 100%)",
      desc: "Respeite os outros testadores, não explore bugs intencionalmente e colabore com a equipe. Violações podem resultar em exclusão e perda da recompensa.",
    },
  ],
  "Eventos": [
    {
      id: 5,
      category: "Eventos",
      categoryColor: "#c0392b",
      title: "Cronograma de Eventos",
      ago: "há 1 mês",
      gradient: "linear-gradient(135deg, #3a0a0a 0%, #7a1515 100%)",
      desc: "Veja todos os eventos programados para a Fase Beta da Temporada 1.",
    },
    {
      id: 6,
      category: "Eventos",
      categoryColor: "#c0392b",
      title: "Evento de Boas-Vindas Beta",
      ago: "há 2 dias",
      gradient: "linear-gradient(135deg, #2a0505 0%, #600a0a 100%)",
      desc: "Durante a Fase Beta todos os jogadores recebem 500 Cash Coins de bônus ao criar conta.",
    },
    {
      id: 7,
      category: "Eventos",
      categoryColor: "#c0392b",
      title: "Guerra de Reinos — Fim de Semana",
      ago: "há 5 dias",
      gradient: "linear-gradient(135deg, #1a0808 0%, #4a1010 100%)",
      desc: "Guerra entre os três reinos acontece todo sábado às 20h. Os vencedores ganham buffs especiais.",
    },
    {
      id: 8,
      category: "Eventos",
      categoryColor: "#c0392b",
      title: "Drop Dobrado — Dungeons",
      ago: "há 1 semana",
      gradient: "linear-gradient(135deg, #1a0a00 0%, #3a1500 100%)",
      desc: "Todos os finais de semana o drop de itens em dungeons é dobrado.",
    },
  ],
  "Notícias": [
    {
      id: 9,
      category: "Notícias",
      categoryColor: "#2471a3",
      title: "Patch Notes 13.05",
      ago: "há 6 dias",
      gradient: "linear-gradient(135deg, #0a1a3a 0%, #153060 100%)",
      desc: "Correções de balanceamento, novos itens na loja e melhorias de performance.",
    },
    {
      id: 10,
      category: "Notícias",
      categoryColor: "#2471a3",
      title: "Sistema de Doação PIX Ativo",
      ago: "há 3 dias",
      gradient: "linear-gradient(135deg, #051520 0%, #0a2540 100%)",
      desc: "Agora é possível comprar Cash Coins via PIX diretamente pelo site com confirmação automática.",
    },
    {
      id: 11,
      category: "Notícias",
      categoryColor: "#2471a3",
      title: "Discord Oficial Aberto",
      ago: "há 4 dias",
      gradient: "linear-gradient(135deg, #080d1a 0%, #10183a 100%)",
      desc: "O Discord oficial do Aura2 está aberto. Junte-se à comunidade e fique por dentro de tudo.",
    },
    {
      id: 12,
      category: "Notícias",
      categoryColor: "#2471a3",
      title: "Suporte via Tickets no Site",
      ago: "hoje",
      gradient: "linear-gradient(135deg, #050a15 0%, #0a1530 100%)",
      desc: "Agora você pode abrir tickets de suporte diretamente pela sua conta no site.",
    },
  ],
  "Atualizações": [
    {
      id: 13,
      category: "Update",
      categoryColor: "#1a7a4a",
      title: "Servidor Atualizado para v3.4",
      ago: "há 3 dias",
      gradient: "linear-gradient(135deg, #051a0f 0%, #0a3020 100%)",
      desc: "Atualização de estabilidade, correção de crashes e melhorias no sistema de PvP.",
    },
    {
      id: 14,
      category: "Update",
      categoryColor: "#1a7a4a",
      title: "Novo Mapa: Fortaleza do Caos",
      ago: "há 1 semana",
      gradient: "linear-gradient(135deg, #0a0f05 0%, #1a2a0a 100%)",
      desc: "Um novo mapa foi adicionado com bosses exclusivos e drops raros para grupos.",
    },
    {
      id: 15,
      category: "Update",
      categoryColor: "#1a7a4a",
      title: "Classe Shaman Rebalanceada",
      ago: "há 1 semana",
      gradient: "linear-gradient(135deg, #051015 0%, #0a2030 100%)",
      desc: "Habilidades de cura e suporte da Shaman foram ajustadas para melhor equilíbrio no PvP.",
    },
    {
      id: 16,
      category: "Update",
      categoryColor: "#1a7a4a",
      title: "Anti-Cheat Atualizado",
      ago: "há 2 semanas",
      gradient: "linear-gradient(135deg, #0f1505 0%, #202d0a 100%)",
      desc: "Sistema anti-cheat foi reforçado para garantir uma experiência justa para todos.",
    },
  ],
};

function VideoControls({ hidden }: { hidden: boolean }) {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);

  function getVideo() {
    return document.getElementById("hero-video") as HTMLVideoElement | null;
  }

  function toggleMute() {
    const v = getVideo();
    if (!v) return;
    const next = !isMuted;
    v.muted = next;
    if (!next) v.volume = volume;
    setIsMuted(next);
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseFloat(e.target.value);
    const v = getVideo();
    if (v) {
      v.volume = val;
      v.muted = val === 0;
    }
    setVolume(val);
    setIsMuted(val === 0);
  }

  return (
    <div
      className="absolute bottom-4 right-4 z-20 flex items-center gap-3 bg-black/60 border border-primary/30 px-4 py-2 rounded-xl backdrop-blur-sm transition-opacity duration-300"
      style={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <button
        onClick={toggleMute}
        className="text-white text-xl hover:scale-110 transition-transform"
        title={isMuted ? "Ativar som" : "Silenciar"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={isMuted ? 0 : volume}
        onChange={handleVolume}
        className="w-24 accent-yellow-500 cursor-pointer"
      />
    </div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<ClassId | null>(null);
  const [gender, setGender] = useState<Gender>("M");
  const [activeTab, setActiveTab] = useState<Tab>("Fase Beta");
  const videoRefs = useRef<Partial<Record<VideoKey, HTMLVideoElement>>>({});

  const activeClass = CLASSES.find((c) => c.id === selected) ?? null;
  const activeKey: VideoKey | null = selected ? `${selected}-${gender}` : null;

  function showVideo(key: VideoKey) {
    for (const [k, v] of Object.entries(videoRefs.current)) {
      if (!v) continue;
      if (k === key) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else v.pause();
    }
  }

  function handleClassClick(cls: (typeof CLASSES)[number]) {
    const heroVideo = document.getElementById("hero-video") as HTMLVideoElement;
    if (selected === cls.id) {
      setSelected(null);
      Object.values(videoRefs.current).forEach((v) => v?.pause());
      if (heroVideo) heroVideo.play().catch(() => {});
      return;
    }
    setSelected(cls.id);
    if (heroVideo) heroVideo.pause();
    showVideo(`${cls.id}-${gender}`);
  }

  function handleGenderChange(g: Gender) {
    setGender(g);
    if (selected) showVideo(`${selected}-${g}`);
  }

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* HERO */}
      <div className="relative flex flex-col">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {ALL_VIDEOS.map(({ key, src }) => (
            <video
              key={key}
              ref={(el) => {
                if (el) videoRefs.current[key] = el;
              }}
              src={src}
              muted
              loop
              playsInline
              preload="auto"
              className="absolute w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: activeKey === key ? 0.85 : 0 }}
            />
          ))}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(8,5,2,0.92) 30%, rgba(8,5,2,0.3) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <video
            id="hero-video"
            src="/trailer-metin2.mp4"
            autoPlay
            loop
            playsInline
            muted
            className="absolute w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: activeClass ? 0 : 0.5 }}
          />
          <div
            className="absolute inset-0 bg-background/60 transition-opacity duration-500"
            style={{ opacity: activeClass ? 0 : 1 }}
          />
        </div>

        <VideoControls hidden={!!activeClass} />

        <div className="container mx-auto px-4 pt-10 lg:pt-16 flex flex-col lg:flex-row items-start gap-8">
          <div className="flex-1 max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary backdrop-blur-sm">
              <span className="mr-2 flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              Temporada 1 — Fase Beta
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight">
              <span className="text-white">UMA NOVA LENDA</span>
              <br />
              <span className="text-primary animate-amber-pulse inline-block">
                NASCE
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
              Reviva a verdadeira experiência do Metin2 clássico com guerras
              épicas, PvP competitivo, farm balanceado e uma comunidade ativa.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(212,160,23,0.3)] hover:shadow-[0_0_40px_rgba(212,160,23,0.5)] transition-all"
              >
                <Link href="/download">
                  <Download className="w-5 h-5 mr-2" /> Baixar Agora
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto h-14 px-8 border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-wider backdrop-blur-sm"
              >
                <a href="#">
                  <MessagesSquare className="w-5 h-5 mr-2" /> Entrar no Discord
                </a>
              </Button>
            </div>
            <div>
              <div className="inline-flex items-center bg-black/40 border border-primary/20 rounded-lg p-4 backdrop-blur-sm gap-4">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                  Players Online
                </p>
                <p className="text-2xl font-display text-white font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />{" "}
                  4.892
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-10 mt-10">
          <div className="flex flex-col gap-3">
            <div
              className="flex items-center gap-2"
              style={{
                opacity: selected ? 1 : 0,
                transition: "opacity 0.3s ease",
                pointerEvents: selected ? "auto" : "none",
              }}
            >
              {(["M", "F"] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleGenderChange(g)}
                  className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all"
                  style={{
                    background:
                      gender === g
                        ? (activeClass?.accentHex ?? "#D4A017")
                        : "rgba(255,255,255,0.08)",
                    color: gender === g ? "#fff" : "rgba(255,255,255,0.4)",
                    border:
                      gender === g
                        ? "none"
                        : "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  {g === "M" ? "Masculino" : "Feminino"}
                </button>
              ))}
            </div>
            <div className="flex justify-center sm:justify-start gap-4 sm:gap-6 overflow-x-auto pb-2">
              {CLASSES.map((cls) => {
                const isActive = selected === cls.id;
                return (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => handleClassClick(cls)}
                    className="flex-shrink-0 flex flex-col items-center gap-2 focus:outline-none"
                  >
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden transition-all duration-300"
                      style={{
                        border: isActive
                          ? `2px solid ${cls.accentHex}`
                          : "2px solid rgba(255,255,255,0.15)",
                        boxShadow: isActive
                          ? `0 0 22px ${cls.glowHex}99, 0 0 44px ${cls.glowHex}44`
                          : "none",
                        transform: isActive ? "scale(1.12)" : "scale(1)",
                      }}
                    >
                      <img
                        src={cls.portrait[gender]}
                        alt={cls.name}
                        className="w-full h-full object-cover"
                        style={{
                          filter: isActive
                            ? `brightness(1.15) contrast(1.1)`
                            : "brightness(0.75) contrast(1.05)",
                        }}
                      />
                    </div>
                    <span
                      className="text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-300"
                      style={{
                        color: isActive
                          ? cls.accentHex
                          : "rgba(255,255,255,0.4)",
                      }}
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

      {/* ÚLTIMAS POSTAGENS */}
      <section className="container mx-auto px-4 py-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Temporada 1</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-wide">
              Crônicas do Servidor
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className="text-sm font-semibold px-4 py-2 rounded-lg transition-all border"
                style={{
                  background: activeTab === tab ? "rgba(212,160,23,0.15)" : "transparent",
                  color: activeTab === tab ? "#D4A017" : "rgba(255,255,255,0.45)",
                  borderColor: activeTab === tab ? "rgba(212,160,23,0.5)" : "rgba(255,255,255,0.1)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {POSTS[activeTab].map((post) => (
            <div
              key={post.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer flex flex-col transition-transform duration-300 hover:scale-[1.04]"
              style={{
                background: post.gradient,
                height: "12rem",
                boxShadow: post.featured ? "0 0 32px rgba(212,160,23,0.18), 0 2px 16px rgba(0,0,0,0.5)" : "0 2px 12px rgba(0,0,0,0.4)",
              }}
            >
              {/* Glow overlay for featured */}
              {post.featured && (
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 0%, rgba(212,160,23,0.13) 0%, transparent 70%)" }} />
              )}
              <div
                className="absolute inset-0 opacity-25"
                style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 60%)" }}
              />
              {/* Decorative ring */}
              <div className="absolute top-3 right-3 opacity-[0.07]">
                <div className="w-20 h-20 rounded-full border-2 border-white" />
              </div>

              {/* Badge top-right */}
              {post.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded-md"
                    style={{ background: "rgba(0,0,0,0.65)", color: "#D4A017", border: "1px solid rgba(212,160,23,0.4)", backdropFilter: "blur(6px)" }}>
                    {post.badge}
                  </span>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                <span
                  className="inline-block text-[10px] font-black uppercase tracking-widest text-white px-2 py-0.5 rounded mb-1.5"
                  style={{ background: post.categoryColor }}
                >
                  {post.category}
                </span>
                <h3 className={`text-white font-bold leading-tight mb-1.5 group-hover:text-primary transition-colors ${post.featured ? "text-sm" : "text-sm"}`}>
                  {post.title}
                </h3>
                {post.desc && (
                  <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2 mb-1.5">{post.desc}</p>
                )}
                <p className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">{post.ago}</p>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-300" />
              {post.featured && (
                <div className="absolute inset-0 rounded-xl border border-primary/20" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* TOP PLAYERS */}
      <section className="container mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">
              Hall da Fama
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-wide">
              Top Players
            </h2>
          </div>
          <Link href="/ranking">
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary border border-white/10 hover:border-primary/40 rounded-lg px-4 py-2 transition-all"
            >
              Ver Ranking <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
        <div className="bg-black/40 border border-primary/20 rounded-xl overflow-hidden backdrop-blur-sm">
          <table className="w-full">
            <thead className="bg-primary/5">
              <tr className="border-b border-primary/20">
                <th className="w-16 text-center text-primary font-bold py-3 px-4">
                  #
                </th>
                <th className="text-primary font-bold py-3 px-4 text-left">
                  Nome
                </th>
                <th className="text-primary font-bold py-3 px-4 text-center">
                  Classe
                </th>
                <th className="text-primary font-bold py-3 px-4 text-center">
                  Nível
                </th>
                <th className="text-primary font-bold py-3 px-4 text-left">
                  Guild
                </th>
                <th className="text-primary font-bold py-3 px-4 text-center">
                  Reino
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  rank: 1,
                  name: "DarkLord",
                  class: "Guerreiro",
                  level: 105,
                  guild: "Immortals",
                  kingdom: "jinno",
                },
                {
                  rank: 2,
                  name: "ShadowStep",
                  class: "Ninja",
                  level: 104,
                  guild: "Shadows",
                  kingdom: "shinsoo",
                },
                {
                  rank: 3,
                  name: "MagicWeaver",
                  class: "Shura",
                  level: 104,
                  guild: "Immortals",
                  kingdom: "jinno",
                },
                {
                  rank: 4,
                  name: "HealMe",
                  class: "Shaman",
                  level: 102,
                  guild: "Support",
                  kingdom: "chunjo",
                },
                {
                  rank: 5,
                  name: "BladeMaster",
                  class: "Guerreiro",
                  level: 101,
                  guild: "Warriors",
                  kingdom: "shinsoo",
                },
              ].map((player) => (
                <tr
                  key={player.rank}
                  className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                >
                  <td className="text-center py-4 px-4 font-bold text-lg">
                    {player.rank === 1 ? (
                      "🥇"
                    ) : player.rank === 2 ? (
                      "🥈"
                    ) : player.rank === 3 ? (
                      "🥉"
                    ) : (
                      <span className="text-muted-foreground">
                        {player.rank}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-semibold text-white">
                    {player.name}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <img
                      src={`/classes/${player.class.toLowerCase()}_m.png`}
                      alt={player.class}
                      className="w-9 h-9 rounded-lg object-cover mx-auto"
                      style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                    />
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-primary font-bold">
                    {player.level}
                  </td>
                  <td className="py-4 px-4 text-gray-300">{player.guild}</td>
                  <td className="py-4 px-4 text-center">
                    <img
                      src={`/kingdoms/${player.kingdom}.webp`}
                      alt={player.kingdom}
                      className="h-5 rounded-sm object-cover shadow-sm mx-auto"
                      style={{ width: "2.25rem" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA — PRONTO PARA JOGAR */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-black/60 p-12 md:p-20 text-center backdrop-blur-xl">
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,160,23,0.08),transparent_70%)]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 80%, rgba(180,30,30,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,160,23,0.08) 0%, transparent 50%)",
            }}
          />

          <div className="relative z-10 space-y-6">
            <p className="font-display text-4xl md:text-6xl font-black text-white">
              PRONTO PARA JOGAR?
            </p>
            <h2 className="text-xs text-primary uppercase tracking-[0.3em] font-semibold">
              JUNTE SE A NÓS
            </h2>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 opacity-40">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary" />
              <span className="text-primary text-lg">⚔</span>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary" />
            </div>

            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Baixe agora e entre em uma experiência única inspirada nos
              melhores tempos do Metin2.
            </p>

            <Button
              size="lg"
              asChild
              className="h-14 px-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider text-lg shadow-[0_0_40px_rgba(212,160,23,0.4)] hover:shadow-[0_0_60px_rgba(212,160,23,0.6)] transition-all"
            >
              <Link href="/download" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Download className="w-5 h-5 mr-2" /> Baixar Agora
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
