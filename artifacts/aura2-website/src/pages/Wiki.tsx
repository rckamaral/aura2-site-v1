import React, { useState, useEffect } from "react";

const sections = [
  { id: "conceito", label: "Conceito" },
  { id: "inicio", label: "O Começo" },
  { id: "classes", label: "Classes" },
  { id: "drops", label: "Drops — Metins" },
  { id: "miniboss", label: "Mini Boss" },
  { id: "bosses", label: "Bosses" },
  { id: "wordboss", label: "Word Boss" },
  { id: "baus", label: "Baús" },
  { id: "dungeons", label: "Dungeons" },
  { id: "missoes", label: "Missões" },
  { id: "sistemas", label: "Sistemas" },
  { id: "transmutacoes", label: "Transmutações" },
  { id: "bonus", label: "Lista de Bônus" },
  { id: "gameplay", label: "Gameplay" },
  { id: "conclusao", label: "Conclusão" },
];

const metinTabs = ["Lv 5–40", "Lv 45–70", "Lv 75–90"] as const;
type MetinTab = (typeof metinTabs)[number];

const metinGroups: Record<MetinTab, { label: string; color: string; drops: string[] }[]> = {
  "Lv 5–40": [
    { label: "Metin Lv 5", color: "#6B8E23", drops: ["Gold — 500k", "Moeda da Conquista x1", "Aprimoramento Leve x1", "Novo Aprim. Leve x1", "Itens entre +0 e +3"] },
    { label: "Metin Lv 10", color: "#6B8E23", drops: ["Gold — 500k", "Moeda da Conquista x1", "Aprimoramento Leve x1", "Novo Aprim. Leve x1", "Itens entre +0 e +3"] },
    { label: "Metin Lv 15", color: "#6B8E23", drops: ["Gold — 500k", "Moeda da Conquista x1", "Aprimoramento Leve x1", "Novo Aprim. Leve x1", "Itens entre +0 e +3"] },
    { label: "Metin Lv 20", color: "#7A9E23", drops: ["Gold — 1kk", "Moeda da Conquista x1", "Aprimoramento Leve x1", "Novo Aprim. Leve x1", "Itens entre +0 e +3"] },
    { label: "Metin Lv 25", color: "#8DAE23", drops: ["Gold — 2.5kk", "Moeda da Conquista x1", "Aprimoramento Leve x1", "Novo Aprim. Leve x1", "Itens entre +0 e +3"] },
    { label: "Metin Lv 30", color: "#A0961F", drops: ["Gold — 3kk", "Moeda da Conquista x1", "Aprimoramento Leve x1", "Novo Aprim. Leve x1", "Itens entre +0 e +3"] },
    { label: "Metin Lv 35", color: "#B07E1A", drops: ["Gold — 3.5kk", "Moeda da Conquista x1", "Aprimoramento Leve x1", "Novo Aprim. Leve x1", "Itens entre +0 e +3"] },
    { label: "Metin Lv 40", color: "#C06615", drops: ["Gold — 4kk", "Moeda da Conquista x1", "Aprimoramento Leve x1", "Novo Aprim. Leve x1", "Itens entre +0 e +3"] },
  ],
  "Lv 45–70": [
    { label: "Metin Lv 45", color: "#CD853F", drops: ["Gold — 4.5kk", "Moeda da Conquista 2x", "Perg. do Novo Aprimoramento x1", "Perg. do Aprimoramento x1", "Itens entre +0 e +3"] },
    { label: "Metin Lv 50", color: "#C87830", drops: ["Gold — 5kk", "Moeda da Conquista 2x", "Perg. do Novo Aprimoramento x1", "Perg. do Aprimoramento x1", "Itens entre +0 e +3"] },
    { label: "Metin Lv 55", color: "#C36B25", drops: ["Gold — 5.5kk", "Moeda da Conquista 2x", "Perg. do Novo Aprimoramento x1", "Perg. do Aprimoramento x1", "Itens entre +0 e +3"] },
    { label: "Metin Lv 60", color: "#BE5E1A", drops: ["Gold — 6kk", "Moeda da Conquista 2x", "Perg. do Novo Aprimoramento x1", "Perg. do Aprimoramento x1", "Itens entre +0 e +3"] },
    { label: "Metin Lv 65", color: "#B95115", drops: ["Gold — 6.5kk", "Moeda da Conquista 2x", "Perg. do Novo Aprimoramento x1", "Perg. do Aprimoramento x1", "Itens entre +0 e +3"] },
    { label: "Metin Lv 70", color: "#B44410", drops: ["Gold — 7kk", "Moeda da Conquista 2x", "Perg. do Novo Aprimoramento x1", "Perg. do Aprimoramento x1", "Itens entre +0 e +3"] },
  ],
  "Lv 75–90": [
    { label: "Metin Lv 75", color: "#9B3A3A", drops: ["Gold — 7.6kk", "Moeda da Conquista 3x", "Perg. do Novo Aprimoramento x1", "Perg. do Aprimoramento x1", "Pergaminho da Paz x1", "Anel da Experiência x1", "Luva do Ladrão x1", "Cofre de Treino x1", "Itens entre +0 e +3"] },
    { label: "Metin Lv 80", color: "#8B3A3A", drops: ["Gold — 8kk", "Moeda da Conquista 3x", "Perg. do Novo Aprimoramento x1", "Perg. do Aprimoramento x1", "Pergaminho da Paz x1", "Anel da Experiência x1", "Luva do Ladrão x1", "Cofre de Treino x1", "Itens entre +0 e +3"] },
    { label: "Metin Lv 85", color: "#7B2A2A", drops: ["Gold — 8.5kk", "Moeda da Conquista 3x", "Perg. do Novo Aprimoramento 3~5x", "Perg. do Aprimoramento 3~5x", "Pergaminho da Paz x1", "Anel da Experiência x1", "Luva do Ladrão x1", "Cofre de Treino x1", "Armaduras do Nível 61", "Itens entre +0 e +3"] },
    { label: "Metin Lv 90", color: "#6A0DAD", drops: ["Gold — 10kk", "Moeda da Conquista 3x", "Perg. do Novo Aprimoramento 3~5x", "Perg. do Aprimoramento 3~5x", "Pergaminho da Paz x1", "Anel da Experiência x1", "Luva do Ladrão x1", "Esfera da Benção x1", "Caixa de Treino x1", "Armaduras do Nível 66", "Itens entre +0 e +3"] },
  ],
};

const joiasList = [
  "Jóia da Penetração", "Jóia do Golpe Mortal", "Jóia do Resfriamento",
  "Jóia do Guerreiro", "Jóia da Assassina", "Jóia do Shura",
  "Jóia da Magia", "Jóia Monstruosa", "Jóia da Evasão",
  "Jóia da Esquiva", "Jóia da Mágica", "Jóia da Vitalidade",
  "Jóia da Defesa", "Jóia da Aceleração",
];

const miniBosses = [
  { name: "Chefe Orc", icon: "👹", color: "#8B4513", drops: ["Baú do Tier II", "Pedra da Fundação x1", "Esfera da Benção x1", "Soro da Persuasão x1", "Moedas da Conquista 3x"] },
  { name: "Tartaruga de Pedra", icon: "🐢", color: "#4A7C59", drops: ["Baú do Tier II", "Compesado x1", "Esfera da Benção x1", "Soro da Persuasão x1", "Moedas da Conquista 3x"] },
  { name: "Líder Fanático Zen", icon: "🧙", color: "#6A5ACD", drops: ["Baú do Tier II", "Compesado x1", "Esfera da Benção x1", "Soro da Persuasão x1", "Moedas da Conquista 3x"] },
  { name: "Comandante Tigre", icon: "🐯", color: "#D4700A", drops: ["Baú do Tier II", "Pedra da Fundação x1", "Esfera da Benção x1", "Soro da Persuasão x1", "Moedas da Conquista 3x"] },
  { name: "Nove Caudas", icon: "🦊", color: "#C0392B", drops: ["Baú do Tier II", "Pedra da Fundação x1", "Esfera da Benção x1", "Soro da Persuasão x1", "Moedas da Conquista 3x"] },
  { name: "Rei Flamejante", icon: "🔥", color: "#E74C3C", drops: ["Baú do Tier II", "Compesado x1", "Esfera da Benção x1", "Soro da Persuasão x1", "Moedas da Conquista 3x"] },
  { name: "Aranha Rainha", icon: "🕷️", color: "#2C3E50", drops: ["Baú do Tier II", "Tronco x1", "Esfera da Benção x1", "Soro da Persuasão x1", "Moedas da Conquista 3x"] },
];

const bosses6h = [
  { name: "Dragão D'Agua", icon: "🐲", color: "#1E90FF", drops: ["Tesouro do Dragão", "Máscara Da Fortuna x1", "Moedas da Conquista 15x", "Esfera Da Benção 2x"] },
  { name: "Dragão De Fogo", icon: "🔥", color: "#FF4500", drops: ["Tesouro do Dragão De Fogo", "Máscara Da Fortuna x1", "Moedas da Conquista 15x", "Esfera Da Benção 2x"] },
];
const bosses12h = [
  { name: "Minotauro", icon: "🪓", color: "#8B0000", drops: ["Tesouro Do Minotauro", "Máscara Da Fortuna 2x", "Moedas da Conquista 30x", "Esfera Da Benção 3x"] },
];
const wordBosses = [
  { name: "Grande Ogro (Paz)", icon: "🏰", color: "#2E8B57", mode: "Paz", drops: ["Baú Do Word Boss", "Máscara Da Fortuna 5x", "Moedas da Conquista 100x", "Metal Mágico+ 3x"] },
  { name: "Jothum (PvP)", icon: "⚔️", color: "#8B0000", mode: "PvP", drops: ["Baú Do Word Boss", "Máscara Da Fortuna 5x", "Moedas da Conquista 100x", "Metal Mágico+ 3x"] },
];

const baus = [
  {
    name: "Baú Do Word Boss", icon: "🏆", color: "#FFD700",
    desc: "Recompensas Premium com os Melhores Prêmios — (Aleatórios)",
    items: [
      { tipo: "Consumível", item: "Pacote Do Sábio", qty: "x1" },
      { tipo: "Consumível", item: "Brinco Do Tigre (30d)", qty: "x1" },
      { tipo: "Consumível", item: "Pets Cash (30d)", qty: "x1" },
      { tipo: "Consumível", item: "Cupons de Cash (5 á 50k)", qty: "x1" },
      { tipo: "Item", item: "Escudo Sangrento", qty: "x1" },
      { tipo: "Item", item: "Escudo Imperadores", qty: "x1" },
      { tipo: "Item", item: "Montaria PvM (30d)", qty: "x1" },
    ],
  },
  {
    name: "Tesouro Dragão D'Agua", icon: "💎", color: "#1E90FF",
    desc: "Versão intermediária com ótimos consumíveis e Refines — (Aleatórios)",
    items: [
      { tipo: "Refine", item: "Símbolo Do Dragão", qty: "x1" },
      { tipo: "Consumível", item: "Metal Mágico+", qty: "x1" },
      { tipo: "Consumível", item: "Brinco do Tigre (7d)", qty: "x1" },
      { tipo: "Consumível", item: "Brinco Do Dragão (7d)", qty: "x1" },
      { tipo: "Consumível", item: "Livro Do Sábio", qty: "5x" },
      { tipo: "Consumível", item: "Pedra Arco-Íris", qty: "x1" },
      { tipo: "Item", item: "Montaria PvM (7d)", qty: "x1" },
      { tipo: "Item", item: "Cabelo PvM (7d)", qty: "x1" },
      { tipo: "Consumível", item: "Máscara da Fortuna", qty: "5x" },
      { tipo: "Consumível", item: "Pot Helong e Yoora (S)", qty: "x1" },
    ],
  },
  {
    name: "Tesouro Dragão De Fogo", icon: "📦", color: "#FF4500",
    desc: "Versão intermediária com ótimos consumíveis e Refines — (Aleatórios)",
    items: [
      { tipo: "Refine", item: "Amuleto Do Dragão", qty: "x1" },
      { tipo: "Consumível", item: "Metal Mágico+", qty: "x1" },
      { tipo: "Consumível", item: "Brinco do Tigre (7d)", qty: "x1" },
      { tipo: "Consumível", item: "Brinco Do Dragão (7d)", qty: "x1" },
      { tipo: "Consumível", item: "Livro Do Sábio", qty: "5x" },
      { tipo: "Consumível", item: "Pedra Arco-Íris", qty: "x1" },
      { tipo: "Item", item: "Montaria PvM (7d)", qty: "x1" },
      { tipo: "Item", item: "Cabelo PvM (7d)", qty: "x1" },
      { tipo: "Consumível", item: "Máscara da Fortuna", qty: "5x" },
      { tipo: "Consumível", item: "Pot Helong e Yoora (S)", qty: "x1" },
    ],
  },
];

const dungeons = [
  {
    name: "Torre Sakita", icon: "🗼", color: "#8B0000",
    boss: {
      name: "Ceifadora da Morte", icon: "💀",
      drops: ["Tesouro Do Ceifador x1", "Esfera Da Benção 2x", "Pergaminho Da Paz x1", "Soro Da Persuação x1", "Livro Do Sábio x1", "Moedas Da Conquista 4x", "Insígnia Demoníaca x1"],
    },
    tesouro: {
      name: "Tesouro Do Ceifador", icon: "🎁",
      drops: ["Máscara Da Fortuna 2x", "Armas Do Nível 75", "Metal Mágico+ x1", "Pérola Branca 2x", "Pérola Azul 2x", "Pérola Vermelha 2x", "Fragmento De Cristal x1"],
    },
  },
  {
    name: "Caverna Demoníaca", icon: "💀", color: "#4B0082",
    boss: {
      name: "Lord Gahnasel", icon: "😈",
      drops: ["Tesouro do Lord Gahnasel x1", "Moedas Da Conquista 15x", "Esfera Da Benção 2x", "Soro Da Persuação 2x", "Livro Do Sábio 2x", "Máscara Da Fortuna x1", "Pergaminho Da Paz 5x"],
    },
    tesouro: {
      name: "Tesouro do Lord Gahnasel", icon: "🎁",
      drops: ["Máscara Da Fortuna 2x", "Benção De Helong (G) x1", "Benção De Yoora (G) x1", "Chifres De Ghanasel (F)(7d) x1", "Chifres De Ghanasel (M)(7d) x1", "Traje Ghanasel (F)(7d) x1", "Traje Ghanasel (M)(7d) x1", "Pedra Arco-Íris x1", "Pet Lord Ghanasel (7d) x1", "Coração Do Ghanasel x1"],
    },
  },
];

const sistemas = [
  { icon: "⚔️", name: "Detalhes do Personagem", desc: "Consulte todos os bônus e resistências do seu personagem em tempo real." },
  { icon: "🎒", name: "Filtro de Drop", desc: "Selecione quais itens serão coletados automaticamente para o inventário." },
  { icon: "🏪", name: "Loja Offline", desc: "Venda itens e acumule Yang mesmo com o jogo fechado." },
  { icon: "🗺️", name: "Localização de Chefes", desc: "Veja a localização dos bosses diretamente no mapa do jogo." },
];

const bonusData = [
  { name: "HP Máximo", min: "+500", max: "+2.000" },
  { name: "MP Máximo", min: "+10", max: "+80" },
  { name: "Velocidade de Ataque", min: "+1%", max: "+8%" },
  { name: "Velocidade de Movimento", min: "+2%", max: "+20%" },
  { name: "Chance de Ataque Crítico", min: "+1%", max: "+10%" },
  { name: "Bônus contra Monstros", min: "+2%", max: "+20%" },
  { name: "Refletir Ataque Físico", min: "+1%", max: "+10%" },
  { name: "Resistência Magia", min: "+2%", max: "+15%" },
  { name: "Resistência contra Classes", min: "+2%", max: "+10%" },
  { name: "Bônus de Experiência", min: "+2%", max: "+20%" },
  { name: "Taxa de Drop", min: "+2%", max: "+20%" },
  { name: "Ataque", min: "+5", max: "+50" },
];

const gameplayList = [
  "Nível máximo: 99",
  "Dificuldade: Médio — desafiador mas acessível",
  "Sem Pay-to-Win — tudo pode ser conquistado jogando",
  "Inventário organizado automaticamente",
  "Teletransporte entre mapas muito mais rápido",
  "Quantidade de Metins nos mapas aumentada",
  "Pontos de status atribuídos de 10 em 10",
  "Sem restrição de tempo para sair de guilda",
  "Chefes não sofrem knockback ao serem atacados",
  "Clicar no nome no chat abre janela de PM",
];

const transmutPairs = [
  { weapons: [
    { name: "Batalha",  img: "/items/batalha.png",   scale: 1.3 },
    { name: "Suprema",  img: "/items/suprema.png",   scale: 1.3 },
    { name: "Sagrada",  img: "/items/sagrada.png",   scale: 1.3 },
  ]},
  { weapons: [
    { name: "Partizan",    img: "/items/partizan.png",    scale: 1.25 },
    { name: "Usurpadora",  img: "/items/usurpadora.png",  scale: 1.25 },
    { name: "Deus Dragão", img: "/items/deus_dragao.png", scale: 1.1 },
  ]},
  { weapons: [
    { name: "Faca Dragão",  img: "/items/faca_dragao.png",  scale: 1.2 },
    { name: "Faca Eclipse", img: "/items/faca_eclipse.png", scale: 1.2 },
    { name: "Luas Gêmeas",  img: "/items/luas_gemeas.png",  scale: 1.2 },
  ]},
  { weapons: [
    { name: "Arco Dragão Amarelo",  img: "/items/arco_dragao_amarelo.png", scale: 1.3 },
    { name: "Arco da Perfeição",    img: "/items/arco_da_perfeicao.png",   scale: 1.3 },
    { name: "Balestra",             img: "/items/balestra.png",            scale: 1.3 },
  ]},
  { weapons: [
    { name: "Leque da Salvação", img: "/items/leque_da_salvacao.png", scale: 0.72 },
    { name: "Leque Elemental",   img: "/items/leque_elemental.png",   scale: 0.72 },
    { name: "Dragão Deitado",    img: "/items/dragao_deitado.png",    scale: 0.72 },
  ]},
  { weapons: [
    { name: "Exorcista", img: "/items/exorcista.png", scale: 1.2 },
    { name: "Milenar",   img: "/items/milenar.png",   scale: 1.2 },
    { name: "Baronesa",  img: "/items/baronesa.png",  scale: 1.2 },
  ]},
  { weapons: [
    { name: "Sino Céu e Terra",   img: "/items/sino_ceu_terra.png",   scale: 0.68 },
    { name: "Sino de Hibisco",    img: "/items/sino_hibisco.png",     scale: 0.68 },
    { name: "Ceifadora da Morte", img: "/items/ceifadora_morte.png",  scale: 0.75 },
  ]},
];


function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-black text-primary tracking-tight uppercase">{children}</h2>
      <div className="h-px bg-primary/20 mt-3" />
    </div>
  );
}

function DropRow({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span style={{ color }} className="text-xs">◆</span>
      {label}
    </div>
  );
}

export default function Wiki() {
  const [activeSection, setActiveSection] = useState("conceito");
  const [activeBau, setActiveBau] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [joiasOpen, setJoiasOpen] = useState(false);
  const [metinTab, setMetinTab] = useState<MetinTab>("Lv 5–40");
  const [selectedPair, setSelectedPair] = useState<typeof transmutPairs[0] | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedPair(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const mid = window.innerHeight / 2;
      let current = sections[0].id;
      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-primary/20 py-20 px-4 text-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(ellipse at 50% 0%, #D4A01760 0%, transparent 70%)" }}
        />
        <p className="text-xs text-primary uppercase tracking-[0.4em] font-semibold mb-3">
          Aura 2 — Biblioteca Sagrada
        </p>
        <h1 className="text-5xl md:text-6xl font-black text-primary mb-4 tracking-tight">
          APRESENTAÇÃO
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Tudo o que você precisa saber para dominar o continente de Aura 2.
        </p>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mt-6 md:hidden text-xs text-primary border border-primary/30 px-4 py-2 rounded uppercase tracking-widest"
        >
          {menuOpen ? "Fechar Menu" : "Navegar Seções"}
        </button>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className={`${menuOpen ? "block" : "hidden"} md:block w-full md:w-56 shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-primary/10 py-8 px-4`}>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4 px-2">Índice</p>
          <nav className="space-y-1">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-all ${activeSection === id ? "text-primary bg-primary/10 font-semibold border-l-2 border-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 px-6 md:px-12 py-12 space-y-24 max-w-4xl">
          {/* CONCEITO */}
          <section id="conceito">
            <SectionTitle>CONCEITO</SectionTitle>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Aura 2 é um servidor privado de Metin2 que resgata a essência clássica do jogo, com melhorias cuidadosas que tornam a experiência mais dinâmica, justa e divertida.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Nossa proposta é um servidor equilibrado, sem pay-to-win, onde cada conquista é fruto do seu esforço. Preservamos o que fez o Metin2 ser amado, removendo apenas o que prejudicou o jogo ao longo dos anos.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Nível Máximo", value: "99" },
                { label: "Dificuldade", value: "Médio" },
                { label: "Classes", value: "4" },
                { label: "Dungeons", value: "2+" },
              ].map((s) => (
                <div key={s.label} className="border border-primary/20 rounded-lg p-4 text-center bg-primary/5">
                  <p className="text-2xl font-bold text-primary">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* O COMEÇO */}
          <section id="inicio">
            <SectionTitle>O COMEÇO</SectionTitle>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Todo personagem criado recebe um conjunto inicial +6 e a Caixa do Aventureiro, aberta a cada 10 níveis com recompensas progressivas.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Set Inicial +9", desc: "Todo o set inicial para começar com vantagem.", icon: "🛡️" },
                { title: "Caixa do Aventureiro", desc: "Aberta a cada 10 níveis (10, 20... até 90) com itens exclusivos.", icon: "📦" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 border border-primary/15 rounded-lg p-4 bg-primary/5 hover:border-primary/30 transition-colors">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">{item.title}</p>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CLASSES */}
          <section id="classes">
            <SectionTitle>CLASSES</SectionTitle>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Guerreiro", role: "Tank / DPS", desc: "Mestre do combate corpo a corpo. Alta resistência e poder de ataque devastador com espadas.", color: "#D4A017" },
                { name: "Ninja", role: "DPS / Suporte", desc: "Velocidade e precisão letal. Especialista em ataques rápidos com adagas e flechas.", color: "#C0C0C0" },
                { name: "Shura", role: "DPS / Mago", desc: "Feiticeiro das chamas. Destrói grupos de inimigos com magia elemental poderosa.", color: "#B22222" },
                { name: "Shaman", role: "Suporte / Buff", desc: "Guardiã espiritual. Cura aliados e amplifica o poder do grupo com buffs essenciais.", color: "#4682B4" },
              ].map((cls) => (
                <div key={cls.name} className="border border-primary/15 rounded-lg p-5 hover:border-primary/40 transition-all hover:bg-primary/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: cls.color + "30", color: cls.color, border: `1px solid ${cls.color}40` }}>
                      {cls.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{cls.name}</p>
                      <p className="text-xs" style={{ color: cls.color }}>{cls.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{cls.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* DROPS METINS */}
          <section id="drops">
            <SectionTitle>DROPS — METINS</SectionTitle>
            <div className="mb-6 border border-primary/20 rounded-xl overflow-hidden">
              <button onClick={() => setJoiasOpen(!joiasOpen)} className="w-full flex items-center justify-between px-5 py-3 bg-primary/5 hover:bg-primary/10 transition-colors text-left">
                <span className="text-sm font-semibold text-primary">💎 Lista completa de Joias (+0 → +4)</span>
                <span className="text-primary text-xs">{joiasOpen ? "▲" : "▼"}</span>
              </button>
              {joiasOpen && (
                <div className="px-5 py-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {joiasList.map((j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-primary/50 text-xs">◆</span>
                      {j}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 flex-wrap mb-6">
              {metinTabs.map((tab) => (
                <button key={tab} onClick={() => setMetinTab(tab)} className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${metinTab === tab ? "bg-primary text-black" : "border border-primary/30 text-muted-foreground hover:border-primary/60"}`}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {metinGroups[metinTab].map((group) => (
                <div key={group.label} className="border border-primary/15 rounded-xl overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-primary/10 flex items-center gap-2" style={{ backgroundColor: group.color + "18" }}>
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: group.color }} />
                    <p className="font-bold text-sm" style={{ color: group.color }}>{group.label}</p>
                  </div>
                  <div className="px-4 py-3 space-y-1.5">
                    {group.drops.map((d) => <DropRow key={d} label={d} color={group.color} />)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-orange-500/20 rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-3 border-b border-orange-500/15 bg-orange-500/10">
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                <p className="font-bold text-sm text-orange-400">Tochas — Lv 99</p>
              </div>
              <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {["Armas do nível 75", "Armaduras do nível 66", "Pérola Branca x1", "Pérola Azul x1", "Pérola Vermelha x1", "Esfera Da Benção x1", "Pedra Arco-Íris x1"].map((d) => (
                  <DropRow key={d} label={d} color="#f97316" />
                ))}
              </div>
            </div>
          </section>

          {/* MINI BOSS */}
          <section id="miniboss">
            <SectionTitle>MINI BOSS</SectionTitle>
            <div className="flex items-center gap-2 mb-6 text-xs text-muted-foreground border border-primary/15 rounded-lg px-4 py-2 w-fit bg-primary/5">
              <span className="text-primary">⏱</span> Respawn: <span className="text-primary font-bold ml-1">1 hora</span>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {miniBosses.map((boss) => (
                <div key={boss.name} className="border rounded-xl overflow-hidden" style={{ borderColor: boss.color + "40" }}>
                  <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: boss.color + "20", borderBottom: `1px solid ${boss.color}30` }}>
                    <span className="text-2xl">{boss.icon}</span>
                    <div>
                      <p className="font-bold text-foreground text-sm">{boss.name}</p>
                      <p className="text-xs" style={{ color: boss.color }}>Mini Boss • Respawn 1h</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 space-y-1.5">
                    {boss.drops.map((d) => <DropRow key={d} label={d} color={boss.color} />)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BOSSES */}
          <section id="bosses">
            <SectionTitle>BOSSES</SectionTitle>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-lg">🔥</span>
              <div>
                <p className="font-bold text-foreground">Bosses — Respawn 6h</p>
                <p className="text-xs text-muted-foreground">Horário Fixo</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {bosses6h.map((boss) => (
                <div key={boss.name} className="border rounded-xl overflow-hidden" style={{ borderColor: boss.color + "40" }}>
                  <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: boss.color + "20", borderBottom: `1px solid ${boss.color}30` }}>
                    <span className="text-2xl">{boss.icon}</span>
                    <div>
                      <p className="font-bold text-foreground text-sm">{boss.name}</p>
                      <p className="text-xs" style={{ color: boss.color }}>Boss • Respawn 6h</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 space-y-1.5">
                    {boss.drops.map((d) => <DropRow key={d} label={d} color={boss.color} />)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-lg">👑</span>
              <div>
                <p className="font-bold text-foreground">Boss — Respawn 12h</p>
                <p className="text-xs text-muted-foreground">Horário Fixo</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {bosses12h.map((boss) => (
                <div key={boss.name} className="border rounded-xl overflow-hidden" style={{ borderColor: boss.color + "40" }}>
                  <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: boss.color + "20", borderBottom: `1px solid ${boss.color}30` }}>
                    <span className="text-2xl">{boss.icon}</span>
                    <div>
                      <p className="font-bold text-foreground text-sm">{boss.name}</p>
                      <p className="text-xs" style={{ color: boss.color }}>Boss • Respawn 12h</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 space-y-1.5">
                    {boss.drops.map((d) => <DropRow key={d} label={d} color={boss.color} />)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WORD BOSS */}
          <section id="wordboss">
            <SectionTitle>WORD BOSS</SectionTitle>
            <div className="flex items-center gap-2 mb-6 text-xs text-muted-foreground border border-primary/15 rounded-lg px-4 py-2 w-fit bg-primary/5">
              <span className="text-primary">📅</span> Toda quinta-feira às <span className="text-primary font-bold ml-1">21:00h</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {wordBosses.map((boss) => (
                <div key={boss.name} className="border rounded-xl overflow-hidden" style={{ borderColor: boss.color + "40" }}>
                  <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: boss.color + "20", borderBottom: `1px solid ${boss.color}30` }}>
                    <span className="text-2xl">{boss.icon}</span>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-foreground text-sm">{boss.name}</p>
                      <span className="text-xs px-2 py-0.5 rounded font-semibold" style={{ backgroundColor: boss.color + "30", color: boss.color }}>{boss.mode}</span>
                    </div>
                  </div>
                  <div className="px-4 py-3 space-y-1.5">
                    {boss.drops.map((d) => <DropRow key={d} label={d} color={boss.color} />)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BAÚS */}
          <section id="baus">
            <SectionTitle>BAÚS</SectionTitle>
            <div className="flex gap-2 flex-wrap mb-6">
              {baus.map((b, i) => (
                <button key={b.name} onClick={() => setActiveBau(i)} className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${activeBau === i ? "bg-primary text-black" : "border border-primary/30 text-muted-foreground hover:border-primary/60"}`}>
                  {b.icon} {b.name}
                </button>
              ))}
            </div>
            {(() => {
              const b = baus[activeBau];
              return (
                <div className="border border-primary/20 rounded-xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-primary/15" style={{ backgroundColor: b.color + "15" }}>
                    <p className="text-lg font-bold flex items-center gap-2" style={{ color: b.color }}>
                      <span>{b.icon}</span>{b.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-primary/10 bg-primary/5">
                        <th className="text-left px-4 py-2.5 text-primary font-semibold text-xs uppercase tracking-wider">Tipo</th>
                        <th className="text-left px-4 py-2.5 text-primary font-semibold text-xs uppercase tracking-wider">Item</th>
                        <th className="text-right px-4 py-2.5 text-primary font-semibold text-xs uppercase tracking-wider">Qtd.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {b.items.map((item, i) => (
                        <tr key={item.item} className={`border-b border-primary/10 ${i % 2 === 0 ? "" : "bg-primary/[0.03]"}`}>
                          <td className="px-4 py-2.5 text-muted-foreground text-xs">{item.tipo}</td>
                          <td className="px-4 py-2.5 text-foreground">{item.item}</td>
                          <td className="px-4 py-2.5 text-right font-mono text-primary font-semibold">{item.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </section>

          {/* DUNGEONS */}
          <section id="dungeons">
            <SectionTitle>DUNGEONS</SectionTitle>
            <div className="space-y-10">
              {dungeons.map((d) => (
                <div key={d.name}>
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-primary/15">
                    <span className="text-2xl">{d.icon}</span>
                    <h3 className="text-lg font-bold" style={{ color: d.color }}>{d.name}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[d.boss, d.tesouro].map((entry) => (
                      <div key={entry.name} className="border rounded-xl overflow-hidden" style={{ borderColor: d.color + "30" }}>
                        <div className="flex items-center gap-2 px-4 py-3" style={{ backgroundColor: d.color + "15", borderBottom: `1px solid ${d.color}25` }}>
                          <span className="text-xl">{entry.icon}</span>
                          <p className="font-bold text-foreground text-sm">{entry.name}</p>
                        </div>
                        <div className="px-4 py-3 space-y-1.5">
                          {entry.drops.map((drop) => <DropRow key={drop} label={drop} color={d.color} />)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* MISSÕES */}
          <section id="missoes">
            <SectionTitle>MISSÕES</SectionTitle>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Complete as Missões do Biólogo para ganhar bônus permanentes poderosos no seu personagem.
            </p>
            <div className="space-y-3">
              {[
                { lv: "Lv 30", time: "30min", reward: "Velocidade de Movimento +10%" },
                { lv: "Lv 40", time: "30min", reward: "Velocidade de Ataque +5%" },
                { lv: "Lv 50", time: "30min", reward: "Defesa +60" },
                { lv: "Lv 60", time: "1h", reward: "Ataque +50" },
                { lv: "Lv 70", time: "1h", reward: "Refletir Ataque Físico +10% / Defesa +10%" },
                { lv: "Lv 80", time: "2h", reward: "Bônus contra Monstros +10% / Ataque +10%" },
                { lv: "Lv 85", time: "2h", reward: "Resistência contra Classes +10%" },
                { lv: "Lv 90", time: "4h", reward: "Bônus contra Classes +8%" },
              ].map((m) => (
                <div key={m.lv} className="flex flex-wrap items-center gap-3 border border-primary/15 rounded-lg px-4 py-3 hover:bg-primary/5 transition-colors">
                  <span className="text-primary font-bold text-sm w-12 shrink-0">{m.lv}</span>
                  <span className="text-xs text-muted-foreground border border-white/10 px-2 py-0.5 rounded">⏱ {m.time}</span>
                  <span className="text-sm text-foreground flex-1">{m.reward}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SISTEMAS */}
          <section id="sistemas">
            <SectionTitle>SISTEMAS</SectionTitle>
            <div className="grid md:grid-cols-2 gap-4">
              {sistemas.map((s) => (
                <div key={s.name} className="border border-primary/15 rounded-lg p-4 hover:border-primary/30 hover:bg-primary/5 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{s.icon}</span>
                    <p className="font-semibold text-foreground text-sm">{s.name}</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* TRANSMUTAÇÕES */}
          <section id="transmutacoes">
            <SectionTitle>TRANSMUTAÇÕES</SectionTitle>

            {/* Game-style dark panel */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #2a1408 0%, #1a0c06 100%)",
                border: "1px solid #4a2010",
                boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
              }}
            >
              {/* Panel header */}
              <div className="text-center pt-8 pb-5 px-4">
                <h3
                  className="text-xl font-black tracking-[0.35em] uppercase"
                  style={{ color: "#D4A017", textShadow: "0 0 20px #D4A01740" }}
                >
                  TRANSMUTAÇÕES
                </h3>
                <div className="flex justify-center mt-2">
                  <span style={{ color: "#C8860A", fontSize: "0.75rem" }}>◆</span>
                </div>
              </div>

              {/* Grid of transformation cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 px-5 pb-5">
                {transmutPairs.map((pair) => {
                  const [w0, w1, w2] = pair.weapons;
                  const borders = ["1px solid #2a1208", "1px solid #3a1a08", "1px solid #C8860A55"];
                  const nameColors = ["#7a5030", "#a07040", "#D4A017"];
                  return (
                  <div
                    key={w0.name}
                    onClick={() => setSelectedPair(pair)}
                    className="rounded-xl p-3 flex flex-col items-center gap-2 group hover:brightness-125 transition-all cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, #1e0e07 0%, #160a04 100%)",
                      border: "1px solid #3a1a08",
                    }}
                  >
                    {/* Item images + arrows row */}
                    <div className="flex items-center justify-center gap-1 w-full">
                      {pair.weapons.map((w, i) => (
                        <React.Fragment key={w.name}>
                          <div className="flex flex-col items-center gap-1 flex-1">
                            <div
                              className="w-11 h-11 rounded-lg flex items-center justify-center overflow-hidden"
                              style={{ background: "#0e0604", border: borders[i] }}
                            >
                              <img
                                src={w.img}
                                alt={w.name}
                                className="object-contain drop-shadow-lg"
                                style={{
                                  width: `${w.scale * 100}%`,
                                  height: `${w.scale * 100}%`,
                                  maxWidth: "none",
                                }}
                              />
                            </div>
                          </div>
                          {i < pair.weapons.length - 1 && (
                            <span className="font-black leading-none shrink-0" style={{ color: "#C8860A", fontSize: "1.1rem", textShadow: "0 0 8px #C8860A80" }}>»</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Item names */}
                    <div className="flex items-center justify-between w-full gap-0.5 text-center">
                      {pair.weapons.map((w, i) => (
                        <React.Fragment key={w.name}>
                          <p className="text-xs flex-1 leading-tight" style={{ color: nameColors[i], fontWeight: i === 2 ? 600 : 400 }}>{w.name}</p>
                          {i < pair.weapons.length - 1 && (
                            <span className="text-xs shrink-0" style={{ color: "#4a2810" }}>›</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  );
                })}

                {/* Cost info card — two tiers */}
                <div
                  className="rounded-xl p-4 flex flex-col gap-4"
                  style={{
                    background: "linear-gradient(135deg, #1e0e07 0%, #160a04 100%)",
                    border: "1px solid #3a1a08",
                  }}
                >
                  {/* Tier 1 → 2 */}
                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#7a5030" }}>
                      Tier 1 → 2
                    </p>
                    <div className="space-y-1.5">
                      {[
                        { img: "/items/tomo_divino.png", name: "Tomo Divino", qty: "x1" },
                        { img: "/items/perola_vermelha.png", name: "Pérola Vermelha", qty: "x2" },
                        { img: "/items/perola_azul.png", name: "Pérola Azul", qty: "x2" },
                        { img: "/items/perola_branca.png", name: "Pérola Branca", qty: "x2" },
                      ].map((cost) => (
                        <div key={cost.name} className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1.5 text-xs" style={{ color: "#c0a060" }}>
                            <img src={cost.img} alt={cost.name} className="w-5 h-5 object-contain drop-shadow-md" />
                            {cost.name}
                          </span>
                          <span className="text-xs font-bold font-mono" style={{ color: "#D4A017" }}>{cost.qty}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 flex items-center justify-between" style={{ borderTop: "1px solid #3a1a08" }}>
                      <span className="text-xs" style={{ color: "#7a5030" }}>Gold:</span>
                      <span className="flex items-center gap-1.5 text-sm font-black" style={{ color: "#D4A017" }}>
                        50.000.000
                        <img src="/items/gold.png" alt="Gold" className="w-5 h-5 object-contain drop-shadow-md" />
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px" style={{ background: "#2a1208" }} />

                  {/* Tier 2 → 3 */}
                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#C8860A" }}>
                      Tier 2 → 3
                    </p>
                    <div className="space-y-1.5">
                      {[
                        { img: "/items/cristal.png", name: "Cristal (M)", qty: "x2" },
                        { img: "/items/simbolo_dragao.png", name: "Símbolo do Dragão", qty: "x2" },
                      ].map((cost) => (
                        <div key={cost.name} className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1.5 text-xs" style={{ color: "#c0a060" }}>
                            <img src={cost.img} alt={cost.name} className="w-5 h-5 object-contain drop-shadow-md" />
                            {cost.name}
                          </span>
                          <span className="text-xs font-bold font-mono" style={{ color: "#D4A017" }}>{cost.qty}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 flex items-center justify-between" style={{ borderTop: "1px solid #3a1a08" }}>
                      <span className="text-xs" style={{ color: "#7a5030" }}>Gold:</span>
                      <span className="flex items-center gap-1.5 text-sm font-black" style={{ color: "#D4A017" }}>
                        200.000.000
                        <img src="/items/gold.png" alt="Gold" className="w-5 h-5 object-contain drop-shadow-md" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BÔNUS */}
          <section id="bonus">
            <SectionTitle>LISTA DE BÔNUS</SectionTitle>
            <div className="border border-primary/20 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-primary/20 bg-primary/10">
                    <th className="text-left px-4 py-3 text-primary font-semibold uppercase tracking-wider text-xs">Bônus</th>
                    <th className="text-center px-4 py-3 text-primary font-semibold uppercase tracking-wider text-xs">Mín.</th>
                    <th className="text-center px-4 py-3 text-primary font-semibold uppercase tracking-wider text-xs">Máx.</th>
                  </tr>
                </thead>
                <tbody>
                  {bonusData.map((b, i) => (
                    <tr key={b.name} className={`border-b border-primary/10 ${i % 2 === 0 ? "" : "bg-primary/5"}`}>
                      <td className="px-4 py-2.5 text-foreground">{b.name}</td>
                      <td className="px-4 py-2.5 text-center text-muted-foreground font-mono">{b.min}</td>
                      <td className="px-4 py-2.5 text-center text-primary font-mono font-semibold">{b.max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* GAMEPLAY */}
          <section id="gameplay">
            <SectionTitle>GAMEPLAY</SectionTitle>
            <ul className="space-y-2">
              {gameplayList.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground text-sm">
                  <span className="text-primary mt-0.5 shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* CONCLUSÃO */}
          <section id="conclusao" className="pb-16">
            <SectionTitle>CONCLUSÃO</SectionTitle>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Obrigado por ler a apresentação do Aura 2. Cada detalhe deste servidor foi pensado para oferecer a experiência clássica que você merece — sem pay-to-win, sem sistemas desnecessários, apenas o jogo como deve ser.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Junte-se à nossa comunidade e faça parte desta aventura!
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/download" className="px-6 py-3 bg-primary text-black font-bold rounded uppercase tracking-wider text-sm hover:bg-primary/90 transition-colors">
                Baixar Agora
              </a>
              <a href="#" className="px-6 py-3 border border-primary/40 text-primary font-bold rounded uppercase tracking-wider text-sm hover:border-primary hover:bg-primary/10 transition-colors">
                Discord
              </a>
            </div>
          </section>
        </main>
      </div>

      {/* Transmutation detail modal */}
      {selectedPair && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.80)" }}
          onClick={() => setSelectedPair(null)}
        >
          <div
            className="relative rounded-2xl p-8 max-w-lg w-full flex flex-col items-center gap-6"
            style={{
              background: "linear-gradient(135deg, #1e0e07 0%, #100603 100%)",
              border: "1px solid #C8860A55",
              boxShadow: "0 0 40px #C8860A30",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedPair(null)}
              className="absolute top-3 right-4 text-xl leading-none transition-colors"
              style={{ color: "#7a5030" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#D4A017")}
              onMouseLeave={e => (e.currentTarget.style.color = "#7a5030")}
            >
              ✕
            </button>

            <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#C8860A" }}>
              Cadeia de Transmutação
            </p>

            {/* Weapons row — large */}
            <div className="flex items-center justify-center gap-4 w-full">
              {selectedPair.weapons.map((w, i) => {
                const isLast = i === selectedPair.weapons.length - 1;
                return (
                  <React.Fragment key={w.name}>
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className="w-24 h-24 rounded-xl flex items-center justify-center overflow-hidden"
                        style={{
                          background: "#0a0402",
                          border: isLast ? "2px solid #C8860A" : "1px solid #3a1a08",
                          boxShadow: isLast ? "0 0 16px #C8860A40" : "none",
                        }}
                      >
                        <img
                          src={w.img}
                          alt={w.name}
                          className="object-contain drop-shadow-xl"
                          style={{
                            width: `${w.scale * 100}%`,
                            height: `${w.scale * 100}%`,
                            maxWidth: "none",
                          }}
                        />
                      </div>
                      <p
                        className="text-sm font-semibold text-center leading-tight max-w-[80px]"
                        style={{ color: isLast ? "#D4A017" : i === 1 ? "#a07040" : "#7a5030" }}
                      >
                        {w.name}
                      </p>
                      {i === 0 && (
                        <span className="text-xs px-2 py-0.5 rounded" style={{ background: "#1a0a04", color: "#5a3020", border: "1px solid #2a1208" }}>
                          Tier 1
                        </span>
                      )}
                      {i === 1 && (
                        <span className="text-xs px-2 py-0.5 rounded" style={{ background: "#1a0a04", color: "#7a5030", border: "1px solid #3a1a08" }}>
                          Tier 2
                        </span>
                      )}
                      {i === 2 && (
                        <span className="text-xs px-2 py-0.5 rounded font-bold" style={{ background: "#2a1204", color: "#C8860A", border: "1px solid #C8860A55" }}>
                          Tier 3
                        </span>
                      )}
                    </div>
                    {!isLast && (
                      <span className="font-black text-3xl leading-none shrink-0 mb-8" style={{ color: "#C8860A", textShadow: "0 0 12px #C8860A80" }}>
                        »
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Divider */}
            <div className="w-full h-px" style={{ background: "#2a1208" }} />

            {/* Cost summary — two tiers */}
            <div className="flex flex-col gap-3 w-full">
              {/* Tier 1 → 2 */}
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold mb-2 text-center" style={{ color: "#7a5030" }}>Tier 1 → 2</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { img: "/items/tomo_divino.png", label: "Tomo Divino ×1" },
                    { img: "/items/perola_vermelha.png", label: "Pérola Vermelha ×2" },
                    { img: "/items/perola_azul.png", label: "Pérola Azul ×2" },
                    { img: "/items/perola_branca.png", label: "Pérola Branca ×2" },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "#140804", border: "1px solid #2a1208" }}>
                      <img src={item.img} alt={item.label} className="w-5 h-5 object-contain" />
                      <span className="text-xs" style={{ color: "#c0a060" }}>{item.label}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "#140804", border: "1px solid #2a1208" }}>
                    <span className="text-xs font-black" style={{ color: "#D4A017" }}>50.000.000</span>
                    <img src="/items/gold.png" alt="Gold" className="w-5 h-5 object-contain" />
                  </div>
                </div>
              </div>
              {/* Divider */}
              <div className="w-full h-px" style={{ background: "#2a1208" }} />
              {/* Tier 2 → 3 */}
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold mb-2 text-center" style={{ color: "#C8860A" }}>Tier 2 → 3</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { img: "/items/cristal.png", label: "Cristal (M) ×2" },
                    { img: "/items/simbolo_dragao.png", label: "Símbolo do Dragão ×2" },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "#140804", border: "1px solid #2a1208" }}>
                      <img src={item.img} alt={item.label} className="w-5 h-5 object-contain" />
                      <span className="text-xs" style={{ color: "#c0a060" }}>{item.label}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "#140804", border: "1px solid #2a1208" }}>
                    <span className="text-xs font-black" style={{ color: "#D4A017" }}>200.000.000</span>
                    <img src="/items/gold.png" alt="Gold" className="w-5 h-5 object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
