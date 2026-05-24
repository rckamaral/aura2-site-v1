import { useState, useEffect } from "react";

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
  { id: "bonus", label: "Lista de Bônus" },
  { id: "transmutacao", label: "Transmutação" },
  { id: "gameplay", label: "Gameplay" },
  { id: "conclusao", label: "Conclusão" },
];

const metinTabs = ["Lv 5–40", "Lv 45–70", "Lv 75–90"] as const;
type MetinTab = (typeof metinTabs)[number];

const metinGroups: Record<
  MetinTab,
  { label: string; color: string; drops: string[] }[]
> = {
  "Lv 5–40": [
    {
      label: "Metin Lv 5",
      color: "#6B8E23",
      drops: [
        "Gold — 500k",
        "Moeda da Conquista x1",
        "Aprimoramento Leve x1",
        "Novo Aprim. Leve x1",
        "Itens entre +0 e +3",
      ],
    },
    {
      label: "Metin Lv 10",
      color: "#6B8E23",
      drops: [
        "Gold — 500k",
        "Moeda da Conquista x1",
        "Aprimoramento Leve x1",
        "Novo Aprim. Leve x1",
        "Itens entre +0 e +3",
      ],
    },
    {
      label: "Metin Lv 15",
      color: "#6B8E23",
      drops: [
        "Gold — 500k",
        "Moeda da Conquista x1",
        "Aprimoramento Leve x1",
        "Novo Aprim. Leve x1",
        "Itens entre +0 e +3",
      ],
    },
    {
      label: "Metin Lv 20",
      color: "#7A9E23",
      drops: [
        "Gold — 1kk",
        "Moeda da Conquista x1",
        "Aprimoramento Leve x1",
        "Novo Aprim. Leve x1",
        "Itens entre +0 e +3",
      ],
    },
    {
      label: "Metin Lv 25",
      color: "#8DAE23",
      drops: [
        "Gold — 2.5kk",
        "Moeda da Conquista x1",
        "Aprimoramento Leve x1",
        "Novo Aprim. Leve x1",
        "Itens entre +0 e +3",
      ],
    },
    {
      label: "Metin Lv 30",
      color: "#A0961F",
      drops: [
        "Gold — 3kk",
        "Moeda da Conquista x1",
        "Aprimoramento Leve x1",
        "Novo Aprim. Leve x1",
        "Itens entre +0 e +3",
      ],
    },
    {
      label: "Metin Lv 35",
      color: "#B07E1A",
      drops: [
        "Gold — 3.5kk",
        "Moeda da Conquista x1",
        "Aprimoramento Leve x1",
        "Novo Aprim. Leve x1",
        "Itens entre +0 e +3",
      ],
    },
    {
      label: "Metin Lv 40",
      color: "#C06615",
      drops: [
        "Gold — 4kk",
        "Moeda da Conquista x1",
        "Aprimoramento Leve x1",
        "Novo Aprim. Leve x1",
        "Itens entre +0 e +3",
      ],
    },
  ],
  "Lv 45–70": [
    {
      label: "Metin Lv 45",
      color: "#CD853F",
      drops: [
        "Gold — 4.5kk",
        "Moeda da Conquista 2x",
        "Perg. do Novo Aprimoramento x1",
        "Perg. do Aprimoramento x1",
        "Itens entre +0 e +3",
      ],
    },
    {
      label: "Metin Lv 50",
      color: "#C87830",
      drops: [
        "Gold — 5kk",
        "Moeda da Conquista 2x",
        "Perg. do Novo Aprimoramento x1",
        "Perg. do Aprimoramento x1",
        "Itens entre +0 e +3",
      ],
    },
    {
      label: "Metin Lv 55",
      color: "#C36B25",
      drops: [
        "Gold — 5.5kk",
        "Moeda da Conquista 2x",
        "Perg. do Novo Aprimoramento x1",
        "Perg. do Aprimoramento x1",
        "Itens entre +0 e +3",
      ],
    },
    {
      label: "Metin Lv 60",
      color: "#BE5E1A",
      drops: [
        "Gold — 6kk",
        "Moeda da Conquista 2x",
        "Perg. do Novo Aprimoramento x1",
        "Perg. do Aprimoramento x1",
        "Itens entre +0 e +3",
      ],
    },
    {
      label: "Metin Lv 65",
      color: "#B95115",
      drops: [
        "Gold — 6.5kk",
        "Moeda da Conquista 2x",
        "Perg. do Novo Aprimoramento x1",
        "Perg. do Aprimoramento x1",
        "Itens entre +0 e +3",
      ],
    },
    {
      label: "Metin Lv 70",
      color: "#B44410",
      drops: [
        "Gold — 7kk",
        "Moeda da Conquista 2x",
        "Perg. do Novo Aprimoramento x1",
        "Perg. do Aprimoramento x1",
        "Itens entre +0 e +3",
      ],
    },
  ],
  "Lv 75–90": [
    {
      label: "Metin Lv 75",
      color: "#9B3A3A",
      drops: [
        "Gold — 7.6kk",
        "Moeda da Conquista 3x",
        "Perg. do Novo Aprimoramento x1",
        "Perg. do Aprimoramento x1",
        "Pergaminho da Paz x1",
        "Anel da Experiência x1",
        "Luva do Ladrão x1",
        "Cofre de Treino x1",
        "Itens entre +0 e +3",
      ],
    },
    {
      label: "Metin Lv 80",
      color: "#8B3A3A",
      drops: [
        "Gold — 8kk",
        "Moeda da Conquista 3x",
        "Perg. do Novo Aprimoramento x1",
        "Perg. do Aprimoramento x1",
        "Pergaminho da Paz x1",
        "Anel da Experiência x1",
        "Luva do Ladrão x1",
        "Cofre de Treino x1",
        "Itens entre +0 e +3",
      ],
    },
    {
      label: "Metin Lv 85",
      color: "#7B2A2A",
      drops: [
        "Gold — 8.5kk",
        "Moeda da Conquista 3x",
        "Perg. do Novo Aprimoramento 3~5x",
        "Perg. do Aprimoramento 3~5x",
        "Pergaminho da Paz x1",
        "Anel da Experiência x1",
        "Luva do Ladrão x1",
        "Cofre de Treino x1",
        "Armaduras do Nível 61",
        "Itens entre +0 e +3",
      ],
    },
    {
      label: "Metin Lv 90",
      color: "#6A0DAD",
      drops: [
        "Gold — 10kk",
        "Moeda da Conquista 3x",
        "Perg. do Novo Aprimoramento 3~5x",
        "Perg. do Aprimoramento 3~5x",
        "Pergaminho da Paz x1",
        "Anel da Experiência x1",
        "Luva do Ladrão x1",
        "Esfera da Benção x1",
        "Caixa de Treino x1",
        "Armaduras do Nível 66",
        "Itens entre +0 e +3",
      ],
    },
  ],
};

const joiasList = [
  "Jóia da Penetração",
  "Jóia do Golpe Mortal",
  "Jóia do Resfriamento",
  "Jóia do Guerreiro",
  "Jóia da Assassina",
  "Jóia do Shura",
  "Jóia da Magia",
  "Jóia Monstruosa",
  "Jóia da Evasão",
  "Jóia da Esquiva",
  "Jóia da Mágica",
  "Jóia da Vitalidade",
  "Jóia da Defesa",
  "Jóia da Aceleração",
];

const miniBosses = [
  {
    name: "Chefe Orc",
    icon: "👹",
    color: "#8B4513",
    drops: [
      "Baú do Tier II",
      "Pedra da Fundação x1",
      "Esfera da Benção x1",
      "Soro da Persuasão x1",
      "Moedas da Conquista 3x",
    ],
  },
  {
    name: "Tartaruga de Pedra",
    icon: "🐢",
    color: "#4A7C59",
    drops: [
      "Baú do Tier II",
      "Compesado x1",
      "Esfera da Benção x1",
      "Soro da Persuasão x1",
      "Moedas da Conquista 3x",
    ],
  },
  {
    name: "Líder Fanático Zen",
    icon: "🧙",
    color: "#6A5ACD",
    drops: [
      "Baú do Tier II",
      "Compesado x1",
      "Esfera da Benção x1",
      "Soro da Persuasão x1",
      "Moedas da Conquista 3x",
    ],
  },
  {
    name: "Comandante Tigre",
    icon: "🐯",
    color: "#D4700A",
    drops: [
      "Baú do Tier II",
      "Pedra da Fundação x1",
      "Esfera da Benção x1",
      "Soro da Persuasão x1",
      "Moedas da Conquista 3x",
    ],
  },
  {
    name: "Nove Caudas",
    icon: "🦊",
    color: "#C0392B",
    drops: [
      "Baú do Tier II",
      "Pedra da Fundação x1",
      "Esfera da Benção x1",
      "Soro da Persuasão x1",
      "Moedas da Conquista 3x",
    ],
  },
  {
    name: "Rei Flamejante",
    icon: "🔥",
    color: "#E74C3C",
    drops: [
      "Baú do Tier II",
      "Compesado x1",
      "Esfera da Benção x1",
      "Soro da Persuasão x1",
      "Moedas da Conquista 3x",
    ],
  },
  {
    name: "Aranha Rainha",
    icon: "🕷️",
    color: "#2C3E50",
    drops: [
      "Baú do Tier II",
      "Tronco x1",
      "Esfera da Benção x1",
      "Soro da Persuasão x1",
      "Moedas da Conquista 3x",
    ],
  },
];

const bosses6h = [
  {
    name: "Dragão D'Agua",
    icon: "🐲",
    color: "#1E90FF",
    drops: [
      "Tesouro do Dragão",
      "Máscara Da Fortuna x1",
      "Moedas da Conquista 15x",
      "Esfera Da Benção 2x",
    ],
  },
  {
    name: "Dragão De Fogo",
    icon: "🔥",
    color: "#FF4500",
    drops: [
      "Tesouro do Dragão De Fogo",
      "Máscara Da Fortuna x1",
      "Moedas da Conquista 15x",
      "Esfera Da Benção 2x",
    ],
  },
];
const bosses12h = [
  {
    name: "Minotauro",
    icon: "🪓",
    color: "#8B0000",
    drops: [
      "Tesouro Do Minotauro",
      "Máscara Da Fortuna 2x",
      "Moedas da Conquista 30x",
      "Esfera Da Benção 3x",
    ],
  },
];
const wordBosses = [
  {
    name: "Grande Ogro (Paz)",
    icon: "🏰",
    color: "#2E8B57",
    mode: "Paz",
    drops: [
      "Baú Do Word Boss",
      "Máscara Da Fortuna 5x",
      "Moedas da Conquista 100x",
      "Metal Mágico+ 3x",
    ],
  },
  {
    name: "Jothum (PvP)",
    icon: "⚔️",
    color: "#8B0000",
    mode: "PvP",
    drops: [
      "Baú Do Word Boss",
      "Máscara Da Fortuna 5x",
      "Moedas da Conquista 100x",
      "Metal Mágico+ 3x",
    ],
  },
];

const baus = [
  {
    name: "Baú Do Word Boss",
    icon: "🏆",
    color: "#FFD700",
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
    name: "Tesouro Dragão D'Agua",
    icon: "💎",
    color: "#1E90FF",
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
    name: "Tesouro Dragão De Fogo",
    icon: "📦",
    color: "#FF4500",
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
    name: "Torre Sakita",
    icon: "🗼",
    color: "#8B0000",
    boss: {
      name: "Ceifadora da Morte",
      icon: "💀",
      drops: [
        "Tesouro Do Ceifador x1",
        "Esfera Da Benção 2x",
        "Pergaminho Da Paz x1",
        "Soro Da Persuação x1",
        "Livro Do Sábio x1",
        "Moedas Da Conquista 4x",
        "Insígnia Demoníaca x1",
      ],
    },
    tesouro: {
      name: "Tesouro Do Ceifador",
      icon: "🎁",
      drops: [
        "Máscara Da Fortuna 2x",
        "Armas Do Nível 75",
        "Metal Mágico+ x1",
        "Pérola Branca 2x",
        "Pérola Azul 2x",
        "Pérola Vermelha 2x",
        "Fragmento De Cristal x1",
      ],
    },
  },
  {
    name: "Caverna Demoníaca",
    icon: "💀",
    color: "#4B0082",
    boss: {
      name: "Lord Gahnasel",
      icon: "😈",
      drops: [
        "Tesouro do Lord Gahnasel x1",
        "Moedas Da Conquista 15x",
        "Esfera Da Benção 2x",
        "Soro Da Persuação 2x",
        "Livro Do Sábio 2x",
        "Máscara Da Fortuna x1",
        "Pergaminho Da Paz 5x",
      ],
    },
    tesouro: {
      name: "Tesouro do Lord Gahnasel",
      icon: "🎁",
      drops: [
        "Máscara Da Fortuna 2x",
        "Benção De Helong (G) x1",
        "Benção De Yoora (G) x1",
        "Chifres De Ghanasel (F)(7d) x1",
        "Chifres De Ghanasel (M)(7d) x1",
        "Traje Ghanasel (F)(7d) x1",
        "Traje Ghanasel (M)(7d) x1",
        "Pedra Arco-Íris x1",
        "Pet Lord Ghanasel (7d) x1",
        "Coração Do Ghanasel x1",
      ],
    },
  },
];

const sistemas = [
  {
    icon: "⚔️",
    name: "Detalhes do Personagem",
    desc: "Consulte todos os bônus e resistências do seu personagem em tempo real.",
  },
  {
    icon: "🎒",
    name: "Filtro de Drop",
    desc: "Selecione quais itens serão coletados automaticamente para o inventário.",
  },
  {
    icon: "🏪",
    name: "Loja Offline",
    desc: "Venda itens e acumule Yang mesmo com o jogo fechado.",
  },
  {
    icon: "🗺️",
    name: "Localização de Chefes",
    desc: "Veja a localização dos bosses diretamente no mapa do jogo.",
  },
  {
    icon: "⚡",
    name: "Venda Rápida",
    desc: "Venda itens para NPCs com apenas um clique, sem menus demorados.",
  },
  {
    icon: "📦",
    name: "Mover Itens em Massa",
    desc: "Transfira itens para o armazém de forma rápida e prática.",
  },
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-black text-primary tracking-tight uppercase">
        {children}
      </h2>
      <div className="h-px bg-primary/20 mt-3" />
    </div>
  );
}

function DropRow({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span style={{ color }} className="text-xs">
        ◆
      </span>
      {label}
    </div>
  );
}
import { useState, useEffect } from "react";

// ─── TYPES ───────────────────────────────────────────────
interface TransmutacaoItem {
  from: { img: string; name: string };
  to: { img: string; name: string };
  materiais: string[];
  custoEspecial?: string;
  materiaisExtras?: string[];
}

// ─── DADOS ───────────────────────────────────────────────
const transmutacoes: TransmutacaoItem[] = [
  {
    from: {
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAYAAAB7jnWuAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAANPUlEQVR4nLWZeXBd1X3HP2e5976nJ1nygrEsZC02m9cAZrHNEmLj2CwuLmWSlmFpE0LLpEuatGU6bScLa4YZkk4CDQnGNIRhYuIS3DCExW2oN8DYwgbbSNaCsRGWbdmSLL337r3nnP5xr54WG8Mg+M0cnXfuu+/8fud7fsv3HAnAMQYRae9GP0COfE+C1po4jHDOoSQIIUa99TmI0BoApRRRGCJlolIIgTHu8zTAAhYXhwgJ1trkado7m0D1uSOAAyllolgInHPJ2FmUVAjG6AMfJ1oqYmuGxloTx3Fp/LkgIIY15xwCyPhBojD1gSBIxnrs6gbXYEvKR6zKWSZWVVJTU0t/Ps/aztbSVNjVZRlXQGD5QVXTcBwGZZ0N5bHi0tBIuMQBAsHVtb1hO5lYlT0ckZRkzL0j6TA4wYxiGZ5iKtDJ3ib0tGq2B4uyxnaBwJjZkfpJJzfsCcmBOhGWiF3ELOq2c5n5Gy0oiGS6M0E2KW5H6c6wkS8b6aS6kGQqmckR2p3R2d6JhqAU1HacNlRJAXqj/v8sI=",
      name: "Espada de Batalha+9",
    },
    to: {
      img: "data:image/png;base64,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",
      name: "Espada Suprema+0",
    },
    materiais: [
      "Tomo Divino x2",
      "Pérola Branca x5",
      "Pérola Azul x5",
      "Pérola Escarlate x5",
    ],
  },
  {
    from: {
      img: "data:image/png;base64,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",
      name: "Espada Suprema+9",
    },
    to: {
      img: "data:image/png;base64,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",
      name: "Espada Sagrada+0",
    },
    materiais: [
      "Tomo Divino x2",
      "Pérola Branca x5",
      "Pérola Azul x5",
      "Pérola Escarlate x5",
    ],
    materiaisExtras: ["Símbolo do Dragão x2", "Cristal Azul x2"],
    custoEspecial: "2.000.000.000 Gold",
  },
  {
    from: {
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAIj0lEQVR4nJWXa4xdVRTGv7XXPmdm2plpB6a0FFooAlJbaUFooUpBsIIIXookJokPJiY+EB+MiSYxavRBjcZI4gMQNSEtNqYlMSigJhgkVKGaYRQbpNjOlJlCOzPn7LX3Wj4czpk5paTEWXtycs7e+/z/t9f6178kAMc2iIh2fxv2YXy9BUEAURRB1z0RAR8XE+NaKiCOA3AOQACWR+/2OfdHICrAuVVNTi2gCBQpFAqXAcASI7CuHj0CABhsA5ECDQAYAE4AkAEJIAKMAyAEpAEsAMCqAHYCAKwDUAIAUAKgCtMgDgAYQwBBGAAIgBkJ4BSAAABKCQB4AEgAOADEAMgAWAAIAQABAAIA+ACIAFAAOgDBAOAAPABsAgEAIAA8AAQAWAB4AEkAUQBqAG8AIwBEAGIAJACeAHIAYgBxADAAoADwApAC6AEQAqAFUAUAAsABWAZQBaAJMAJQBaAGUAdQBFAFYAlwBWAFAAEAFAAZAGQAKABaAH4AkwCKAJMA3gBqAJoAJQBiABQACgAEABkAJQAFAAYAKABCADAAeABaAFAAQgBFAFAAdABfAFIATQBuAHoAgABQAGMAeQBrAFMAVwBXAHMAVQBIADcAKQAkABcAFAAQ",
      name: "Faca do Dragão+9",
    },
    to: {
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAG9UlEQVR4nK2XW4xdVRTGv7XXPmdm2plpB6a0FFooAlJbaUFooUpBsIIIXookJokPJiY+EB+MiSYxavRBjcZI4gMQNSEtNqYlMSigJhgkVKGaYRQbpNjOlJlCOzPn7LX3Wj4czpk5paTEWXtycs7e+/z/t9f6178kAMc2iIh2fxv2YXy9BUEAURRB1z0RAR8XE+NaKiCOA3AOQACWR+/2OfdHICrAuVVNTi2gCBQpFAqXAcASI7CuHj0CABhsA5ECDQAYAE4AkAEJIAKMAyAEpAEsAMCqAHYCAKwDUAIAUAKgCtMgDgAYQwBBGAAIgBkJ4BSAAABKCQB4AEgAOADEAMgAWAAIAQABAAIA+ACIAFAAOgDBAOAAPABsAgEAIAA8AAQAWAB4AEkAUQBqAG8AIwBEAGIAJACeAHIAYgBxADAAoADwApAC6AEQAqAFUAUAAsABWAZQBaAJMAJQBaAGUAdQBFAFYAlwBWAFAAEAFAAZAGQAKABaAH4AkwCKAJMA3gBqAJoAJQBiABQACgAEABkAJQAFAAYAKABCADAAeABaAFAAQgBFAFAAdABfAFIATQBuAHoAgABQAGMAeQBrAFMAVwBXAHMAVQBIADcAKQAkABcAFAAQ",
      name: "Faca Eclipse+0",
    },
    materiais: [
      "Tomo Divino x2",
      "Pérola Branca x5",
      "Pérola Azul x5",
      "Pérola Escarlate x5",
    ],
  },
  {
    from: {
      img: "data:image/png;base64,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",
      name: "Arco Dragão Amarelo+9",
    },
    to: {
      img: "data:image/png;base64,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",
      name: "Arco da Perfeição+0",
    },
    materiais: [
      "Tomo Divino x2",
      "Pérola Branca x5",
      "Pérola Azul x5",
      "Pérola Escarlate x5",
    ],
  },
  {
    from: {
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAIj0lEQVR4nJWXa4xdVRTGv7XXPmdm2plpB6a0FFooAlJbaUFooUpBsIIIXookJokPJiY+EB+MiSYxavRBjcZI4gMQNSEtNqYlMSigJhgkVKGaYRQbpNjOlJlCOzPn7LX3Wj4czpk5paTEWXtycs7e+/z/t9f6178kAMc2iIh2fxv2YXy9BUEAURRB1z0RAR8XE+NaKiCOA3AOQACWR+/2OfdHICrAuVVNTi2gCBQpFAqXAcASI7CuHj0CABhsA5ECDQAYAE4AkAEJIAKMAyAEpAEsAMCqAHYCAKwDUAIAUAKgCtMgDgAYQwBBGAAIgBkJ4BSAAABKCQB4AEgAOADEAMgAWAAIAQABAAIA+ACIAFAAOgDBAOAAPABsAgEAIAA8AAQAWAB4AEkAUQBqAG8AIwBEAGIAJACeAHIAYgBxADAAoADwApAC6AEQAqAFUAUAAsABWAZQBaAJMAJQBaAGUAdQBFAFYAlwBWAFAAEAFAAZAGQAKABaAH4AkwCKAJMA3gBqAJoAJQBiABQACgAEABkAJQAFAAYAKABCADAAeABaAFAAQgBFAFAAdABfAFIATQBuAHoAgABQAGMAeQBrAFMAVwBXAHMAVQBIADcAKQAkABcAFAAQ",
      name: "Leque da Salvação+9",
    },
    to: {
      img: "data:image/png;base64,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",
      name: "Leque Elemental+0",
    },
    materiais: [
      "Tomo Divino x2",
      "Pérola Branca x5",
      "Pérola Azul x5",
      "Pérola Escarlate x5",
    ],
  },
  {
    from: {
      img: "data:image/png;base64,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",
      name: "Espada Exorcista+9",
    },
    to: {
      img: "data:image/png;base64,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",
      name: "Espada Milenar+0",
    },
    materiais: [
      "Tomo Divino x2",
      "Pérola Branca x5",
      "Pérola Azul x5",
      "Pérola Escarlate x5",
    ],
  },
  {
    from: {
      img: "data:image/png;base64,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",
      name: "Partizan+9",
    },
    to: {
      img: "data:image/png;base64,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",
      name: "Espada Usurpadora+0",
    },
    materiais: [
      "Tomo Divino x2",
      "Pérola Branca x5",
      "Pérola Azul x5",
      "Pérola Escarlate x5",
    ],
  },
  {
    from: {
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAB4CAYAAAC0CXGGAAAQEElEQVR4nO2a2W9c53nGf99yzpkZUqTEiItI7bZl2Va0R3KUtGkdJGh2NM1F06QogqTI39PmpijaBkWBtuhNkaJArDZIZaNF4i1JtVISqY37PiRnO+d8Sy++M0NKsmRbqK8yDy/IoThz3uddn+/9BF100UUXXXTRRRdddNFFF1100UUXXXTRRRdddNFFF1108dsFodC+/cLhAA94PIDY/pfFdw8yEggJLvd4V/yba/+BRAqNx+O9Ld7rQAgQMTiH8BDpBOsN1uZIBBKPwCOFw/nw/EiDc2DclglCCIRUWO9xzqO3LPR8KAiC0Xi8CK+FEKgowgPOuIK+QOkIqSROOJy1eOehMM46g8dte3r4kt4HfwC5BS0FpVhgrcA4h/ceKUThzw4B//4E2r8Sj/zaBs8LLfDeIxDEicZaT2Zs4XmJVBqtFVZInPdgDAIBQmJdXsRLIPAIER7k/fbHCoTwWOtpFcGMpAQh8N7hcWi2pc1T4R/+WQiBQuJwOOcxucFZVxgffGgyi8nT8ECC95WKEVKR5xkCj0IGT0qFlJAZh/UeLQXlkiLPLU3jC7KQxAlpnmFtYCQUosPZPcHeRyMAgYCUIQLeB295H95VKpUwxpDnOVIRvOpBCQlCIoUiVhHWWozJAxEpQID1FiEkzlmMh/5KwsHDzzEyOkptvcrExB0WV1YRUpJEMfJD5/7D1oc8tg4EKC0LIh6lJKVShI5CdkZaopUMHpTgncHZjEhJtBR4DODxzmKswTkf6sUHRxw8eJBPnTnOqROvMDQ0hJChRrRUaK0R4gkMfMf1j7hfbAuJd0SRREpJnhm890SRIIo1JnfkmQ2dBHAGlNwiKqUC74oagkhJPJ7MBkoVrTl5+jiHDx2g2Whwc+I2s7NLZGmKMRbnPc7zNAJt4x/upUKGQsN7hHBIBcKHopLSIyU4K/DOIwVoLfFeYIvcbn+iARIpiZSmlWfkQAkYHd2DLid4k7FroA+lIxbmV7gzNQuAAspJTG4NqXHb2+hjefI4ASEQovAcHikFzjm8c6iQ3ngP1npk8RGtLEyXRMDI7j7SLKe60SyMVwigFMcoIehLEkaGhyiVExaXF5mYmGRtMw8RkjI4z/liTggkoBGdfAl9fSt/HiET2qVE4ETRPn3hfYLB3oZ8L/dYrIVGa6vTl5OET7/6KaanF3jrf6/Rn8RkeU7TWMaGhxgcHEQKwcbGOvfuV9mo10mzYLwSEEUCrRTWOrLcYr0LtfDkCLzPEPCEHN5GSgmPKoZZZh25dZw4cZTl5TUW5qqcP3sCmWh8lnJg/z4WF9aKvPeMDO3GC0WkFPVajTQ3rFXX2Kg3MEW6aCkRIkxd410n4iE3REHgfdukpD1YHieyJTeK7odHUqnEHNq3h9de+z3+8+IllmbX+PrXvkD/jjK/uXyVUhKRRIpypLE2p1QuUUoqLCwusrC8QloYrYQgJjjLuRBDZz3tRi8L44EghNqNRRBkghCCOI6w1mOMLbpH+EDZmZYO7zwiUuTGoSPJ5z/3Gb777W/S21fmZxffJDeWSqVCHCnSZpP+HTvZt3eYQ9OfYGlphampWYRQGBOmsiqM24ryVi6Ibd/ttgzRAEoLlBLkxhfDyGOtpSC/7QM9rmidgogsz4i1JjU5WZZzcO8evvrVL/H2O29x9MXD7BkepNGoYzLBjp5eahubLCwssdloBXmQGVJyNEHzxFLgrMf6959N75Mo6LbsFEIihO1kiDFtSSCKXuvx3mG9RRMRKYV3imYrBQ9je0Y4dvwUlUoP9VqDkydeoqdSol5vkLYMOlLcunWb31wZZ3Z1nV4lKcURPjchGUXhIPzjPeQp0ADGOKwt5n2HUOArikkrnMO4oJuyPAUrKZU06w3LjlKJv/urv+DVz/0BjXqVJE7o7enBuuCE1bUqN8dvcuXaDVZXN9CAK6Jsfehg1oWO1Tbhw5LQURw0ibNFgQiJVCHnXSFfnbNY5xB4kihCSUEjzZDGcuH8Ob733T/mi1//I0AxfWuSSCniKGF9fZ00TZmYuMdbvx5nZXkDKSVlLcmNLRwSZInzgUCnkxc/iA9gorXS4CkIhEkr2nI1CH+McQgRWlqkNZGW1LOcZmb57Pmz/OCH3ydNayxP3WV+boZmvYE3lo3qOnfu3+Py1dvMLK6jhGBHovCA8aGnSCmxhSYQ0KnBDwttjCuKNWga79sFvKVNBRBFEi0lmclxLggpvOf+/Tv87PXX2TUwwPLiHHPT09TrdaqrK4zfusUv3/kVD+Y3wtQUHuMMxoLxHiElSIVzDqUUSinyLN06yX0IKtoY25HB7eJve14pETxkLHiwDtLckGI6H3Dp0htYk3LspaM4Y3gwNcX0zBKbjQarqys8mK1igUpZYnJHy/jgMCGAwvsIvAt1Edwl6VTCNqXwfhAQe4QvmkA4iHgsUkIUB/GQpUH9AZRjRW9PhSSpEElBljcoRYKhgSHiOGJhaZl7U4u0gAQQUqAT8MKTNkPqCClRUuFcOPNKpfCuOEOLtt+3BtfTQqGl1AgpkBJwrsh3gdYKcKGdCgnekiRw7NgLfP611zh75ixaKt5887/4j59e5ObNO+QIhHdEhKEEICOPBbIMrAcpBFIpQAVJIQQ6inHWYXK35fXtRj86ALaR0eEwERSeCOoMKEa4B2M9SlgGd/dx+vQxvvLlL/H533+NsdE9LM7PMTtzj+t79zE3s0itZYiBciTRHnIXNExqwFqIoqAdjXPgw0QXIsgEh2ifeJ6eM49GwLm88wYpAz3vPd5aXNHLens0zx8a5bMXLvC53/ld9o6Osry4yPVrN1hbrbJ79y727R9GzS7TaFhauUWI4HHjwCHQKqhJY02nZYPEe1ecmyXIJwyBp/DRYJBSIpTEmVD9WisiCVkWamFk92527thBbb3K3clJNlZXWF1dYWZmjrVqFescg4PDeBSLi6tUN5pYH9YkjuD5SCvSLMNahxBbHc8VwxFvt/YLuK0B8AHBEFGsfRhYoQ+3T/sAlVhz+OAe9gztptlMyWwg44Ukz1LK5ZiNjXXmF1dJc0sliciylDv35siARCm8bG9wwLkta3yx2Qi6a3vaFG3niWeTRyKglAIBeRpaY/+OMv19PdQaltGhXRzcN8zK8hq3Ju6xUmttkQOGhnbQbKYsbGYAPLd3hJGRT1DdrLOwuklmLUkUY40jN4YoihBCYIwper8MZ2O2pv7W6erphncIpK2MUinCKnAWXn75Fb78pS8wNzvPyuIsy8tLXL8xyXqad960K1GMjg7gnKdWS7c+TAr6+3t58ehzuBt3WFxdxxiL1hFCSowxnUM90EmnOI4xJifPzWMGfhAE4ONYUynHPP/cEb75h9/g0IG9/NtPfsKvr1ynUV1jbHSMTwwNYrOMNEtJGxs4n+GcpNHMWVxZY2mtRk+lxPP7Rzn8/EEy47k6PsHde1MAJElCmgayYR0SItF+3VYA/glS+okR0FqTZYZd/X184+tf4fChg1y6dImLF3/Gaq3FSwf28rWvfpGhod2sLK+gFFz+zWWuXr1GXK4wPDRAbyVBs8RcdYPr43dJyhWOnzzGroEBvIO5hcWHjI+iqFPA1lryPA9LWyE+MgHZrhVrYdfAAG+9/S7/9C//SrXe4vzJY3zrW99geHiY6loVa3KGh4bYv38//f19SDzWGHYPDnLu/CmOHBwjxfOraze5fvUme8fG+N73/ozz585tPVBKnHNkWYb3PmgqHj4+fqQIWOfYt3eUw4cP8fOf/5zLV66zvrEBwMnjx/jun36b+mad6akpKpUSQ0NDlMu9zM/Pc/XaNaamHjAyMsorxz5Jb08FLxX37k9zdXyCXbsH+f4PfoD1gvGbN1lZWel0OeccURQRRVHhwI+ePgDSOcfOnf309fVy8eLrTEzeJdKaUhKjoojq+jpLi4s8d/gwFz5zAWsNrVaD0bExxsb2YvKc6Qf3qdVq7Bndw9HD++kvJVQ3N/mf//kFv/jl22itOHr0KOVy+TGlCyGtZJiiHz0CUsLE5B0ePJgiz4J3KpHm+PGXybI6f/mjHzF7f5of/vDP6evv5e9//GNu3Rrn1OmzfPYzF0jTJpcvXyHNWtQ2a1TXN9ioNwBo1Db567/5W86cOcPI8AjlcplardZJo3Y7bRf1s0BKAc1myvpGDaWCJ5Ik5uTxY1z49AV6K728995V3nvvXW7dmuCNN3/Jpf++wsL8HKNjo+zbt59yuUJPuYfl5WWq1Sonjr/Ci/v3YTysra2xvr7Ozp07Ow8VQqCU6nSednt9pgh4T1htI7Au5GYcx7xw5AinTp1GS8Xi3DzlJOHatessrzYol0r09vailGJw9xAvHjnKyMgeJu5M0tNT5sKr57l24zY3H0yjis30zOwMzWYTCM+QUnYiYa195ghoV1wXbV86R7FmeHiIW7dvMzk5yXf+5DuUEsW///R1VqtrnDt7klcvXECgGBoc5vy583gl6e3tZWRkBKkkaR5EorWW69eucf369YcIbB9owDNHQLbPQFpJIh0Y5CZncvIub7/1DuPjN8nyDCEEjVqTzDkOHz7E8PAIb7zxBm+/8w5ehPcopcmtZfzWTWbnposNGtQbDer1+kPF+6wGPwrdvnxAhtMTQL3R5N1336NSillZXeMf/vGfOfHJl+np6SWSgmazwdLiEpOTkyyurOJE2CoY62ilGQ/u32NhcTWsS6DTYZ6lz38ggThJyHNDbvLOoThNDbNzcxx5/iBCSC698QvSLOeVl55neHAHc/Mz3J+a4cTp08zMzDA9PcPc/AJje/fT27eDZiNls5HTVpbeuWe5B/pwBIxpq0CJsUEhGmO4c3+agV07GRwa5NChA/T39zMwMMCrr57De2i2Wuzff4DNzRorK1fIMsNmrUat0aBWb+EBrUW40fy4rCesdL2UYZll85wo0jhrMc5z7MgLnD9/Cuk9WdoijiP6+vqI46RzuXHjxjgPpmbo6+9nfXOTew+m2NxsIYuNXmoc7mMkoEGBkJ0FrvOu041qjTpLS6skseL61atUq1XOnjnD/gMHqFar3L9/j3q9yc6BAXoqFeaXVljbbHV297lxH6v3A4HiaIeHKIrx3uGcQQhBrV7jxvhNrHM0Nzfo69uBkJJWq0XaapFlOaVyGSkVdx9Ms7C0ihICrcNdU24+2qL2WSAQkadYbyRJhLWGPA8nrDhSYC2Zg7HdA7xw5BA9pR6cs6Rpi2aaIqViY2OD8dt3yT2UtURrhXGONLcfa/oEAkTFjVG4tBPFLYdr34QTdjyRUkRxHHS7d8U1p0crgXeOzVaOBSIpiFQgkNn//7b5OAERFwRc8V8Iwv2Vdw4twz4UZ8MdFe3bkWJfytYiIdYS58HYsBhzvr0q/HihC5fTrtww4osbQK3QUpCmhkhJypHCGkfmPEoIyokmNY40NyF6BUmz7T7446fQRRdddNFFF1100UUXXXTRRRdddNFFF1100UUXXXTRRRe/Xfg/39TxdanRTTcAAAAASUVORK5CYII=",
      name: "Sino Céu e Terra+9",
    },
    to: {
      img: "data:image/png;base64,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",
      name: "Sino Hibisco+0",
    },
    materiais: [
      "Tomo Divino x2",
      "Pérola Branca x5",
      "Pérola Azul x5",
      "Pérola Escarlate x5",
    ],
  },
];

// ─── CARD ─────────────────────────────────────────────────
function TransmutacaoCard({ item }: { item: TransmutacaoItem }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* Tooltip */}
      {show && (
        <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-60 z-50">
          <div
            className="rounded-xl p-4 shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #1a1005 0%, #0f0b05 100%)",
              border: "1px solid rgba(212,160,23,0.35)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.8), inset 0 1px 0 rgba(212,160,23,0.1)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#D4A017" }}
            >
              Materiais
            </p>
            <div className="space-y-1.5">
              {[...item.materiais, ...(item.materiaisExtras ?? [])].map((m) => (
                <div
                  key={m}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <span style={{ color: "#D4A01760" }}>◆</span>
                  {m}
                </div>
              ))}
            </div>
            <div
              className="mt-3 pt-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Custo</span>
                <span
                  className="font-mono font-bold"
                  style={{ color: "#D4A017" }}
                >
                  {item.custoEspecial ?? "50.000.000 Gold"}
                </span>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-muted-foreground">Sucesso</span>
                <span className="font-bold text-green-400">100%</span>
              </div>
            </div>
            {/* seta */}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid rgba(212,160,23,0.35)",
              }}
            />
          </div>
        </div>
      )}

      {/* Card */}
      <div
        className="flex items-center justify-between gap-3 px-5 py-5 rounded-xl cursor-default transition-all duration-200"
        style={{
          background: show
            ? "linear-gradient(135deg, #221608 0%, #1a1005 100%)"
            : "linear-gradient(135deg, #1a1208 0%, #130e05 100%)",
          border: show
            ? "1px solid rgba(212,160,23,0.45)"
            : "1px solid rgba(212,160,23,0.12)",
          boxShadow: show ? "0 0 20px rgba(212,160,23,0.08)" : "none",
        }}
      >
        {/* Origem */}
        <div className="flex flex-col items-center gap-2 w-16">
          <div
            className="w-14 h-14 flex items-center justify-center rounded-lg"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <img src={item.from.img} className="h-12 w-auto object-contain" />
          </div>
          <span className="text-[10px] text-muted-foreground text-center leading-tight">
            {item.from.name}
          </span>
        </div>

        {/* Setas */}
        <div className="flex items-center shrink-0" style={{ gap: "1px" }}>
          <span
            style={{
              color: "#D4A017",
              opacity: 0.3,
              fontSize: "20px",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            ›
          </span>
          <span
            style={{
              color: "#D4A017",
              opacity: 0.6,
              fontSize: "20px",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            ›
          </span>
          <span
            style={{
              color: "#D4A017",
              opacity: 1,
              fontSize: "20px",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            ›
          </span>
        </div>

        {/* Destino */}
        <div className="flex flex-col items-center gap-2 w-16">
          <div
            className="w-14 h-14 flex items-center justify-center rounded-lg"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(212,160,23,0.25)",
              boxShadow: show ? "0 0 12px rgba(212,160,23,0.15)" : "none",
            }}
          >
            <img src={item.to.img} className="h-12 w-auto object-contain" />
          </div>
          <span
            className="text-[10px] text-center leading-tight font-semibold"
            style={{ color: "#D4A017" }}
          >
            {item.to.name}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION TITLE (copie do seu Wiki.tsx se não tiver) ───
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-black text-primary tracking-tight uppercase">
        {children}
      </h2>
      <div className="h-px bg-primary/20 mt-3" />
    </div>
  );
}

// ─── SEÇÃO COMPLETA (substitua a <section id="transmutacao"> por isso) ───
export function TransmutacaoSection() {
  return (
    <section id="transmutacao">
      <SectionTitle>TRANSMUTAÇÃO</SectionTitle>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        Evolua sua arma para um tier superior. A arma atual é consumida no
        processo — refine bem antes de transmutar! Passe o mouse sobre um card
        para ver os materiais necessários.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {transmutacoes.map((item) => (
          <TransmutacaoCard key={item.from.name} item={item} />
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-6">
        * A arma atual é consumida no processo de transmutação.
      </p>
    </section>
  );
}

export default function Wiki() {
  const [activeSection, setActiveSection] = useState("conceito");
  const [activeBau, setActiveBau] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [joiasOpen, setJoiasOpen] = useState(false);
  const [metinTab, setMetinTab] = useState<MetinTab>("Lv 5–40");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-primary/20 py-20 px-4 text-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, #D4A01760 0%, transparent 70%)",
          }}
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
        <aside
          className={`${menuOpen ? "block" : "hidden"} md:block w-full md:w-56 shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-primary/10 py-8 px-4`}
        >
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4 px-2">
            Índice
          </p>
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
              Aura 2 é um servidor privado de Metin2 que resgata a essência
              clássica do jogo, com melhorias cuidadosas que tornam a
              experiência mais dinâmica, justa e divertida.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Nossa proposta é um servidor equilibrado, sem pay-to-win, onde
              cada conquista é fruto do seu esforço. Preservamos o que fez o
              Metin2 ser amado, removendo apenas o que prejudicou o jogo ao
              longo dos anos.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Nível Máximo", value: "99" },
                { label: "Dificuldade", value: "Médio" },
                { label: "Classes", value: "4" },
                { label: "Dungeons", value: "2+" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="border border-primary/20 rounded-lg p-4 text-center bg-primary/5"
                >
                  <p className="text-2xl font-bold text-primary">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* O COMEÇO */}
          <section id="inicio">
            <SectionTitle>O COMEÇO</SectionTitle>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Todo personagem criado recebe um conjunto inicial +6 e a Caixa do
              Aventureiro, aberta a cada 10 níveis com recompensas progressivas.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "Set Iniciante +6",
                  desc: "Armadura, arma, acessórios e elmo +6 para começar com vantagem.",
                  icon: "🛡️",
                },
                {
                  title: "Caixa do Aventureiro",
                  desc: "Aberta a cada 10 níveis (10, 20... até 90) com itens exclusivos.",
                  icon: "📦",
                },
                {
                  title: "Buff Dragão (M1)",
                  desc: "Todos os personagens iniciam com Buff Dragão e Buff Relâmpago ativos.",
                  icon: "🐉",
                },
                {
                  title: "Velocidade Aumentada",
                  desc: "Velocidade de movimento e ataque aumentadas nos status base.",
                  icon: "⚡",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 border border-primary/15 rounded-lg p-4 bg-primary/5 hover:border-primary/30 transition-colors"
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">
                      {item.title}
                    </p>
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
                {
                  name: "Guerreiro",
                  role: "Tank / DPS",
                  desc: "Mestre do combate corpo a corpo. Alta resistência e poder de ataque devastador com espadas.",
                  color: "#D4A017",
                },
                {
                  name: "Ninja",
                  role: "DPS / Suporte",
                  desc: "Velocidade e precisão letal. Especialista em ataques rápidos com adagas e flechas.",
                  color: "#C0C0C0",
                },
                {
                  name: "Shura",
                  role: "DPS / Mago",
                  desc: "Feiticeiro das chamas. Destrói grupos de inimigos com magia elemental poderosa.",
                  color: "#B22222",
                },
                {
                  name: "Shaman",
                  role: "Suporte / Buff",
                  desc: "Guardiã espiritual. Cura aliados e amplifica o poder do grupo com buffs essenciais.",
                  color: "#4682B4",
                },
              ].map((cls) => (
                <div
                  key={cls.name}
                  className="border border-primary/15 rounded-lg p-5 hover:border-primary/40 transition-all hover:bg-primary/5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: cls.color + "30",
                        color: cls.color,
                        border: `1px solid ${cls.color}40`,
                      }}
                    >
                      {cls.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{cls.name}</p>
                      <p className="text-xs" style={{ color: cls.color }}>
                        {cls.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {cls.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* DROPS METINS */}
          <section id="drops">
            <SectionTitle>DROPS — METINS</SectionTitle>

            {/* Joias accordion */}
            <div className="mb-6 border border-primary/20 rounded-xl overflow-hidden">
              <button
                onClick={() => setJoiasOpen(!joiasOpen)}
                className="w-full flex items-center justify-between px-5 py-3 bg-primary/5 hover:bg-primary/10 transition-colors text-left"
              >
                <span className="text-sm font-semibold text-primary">
                  💎 Lista completa de Joias (+0 → +4)
                </span>
                <span className="text-primary text-xs">
                  {joiasOpen ? "▲" : "▼"}
                </span>
              </button>
              {joiasOpen && (
                <div className="px-5 py-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {joiasList.map((j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary/50 text-xs">◆</span>
                      {j}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tab selector */}
            <div className="flex gap-2 flex-wrap mb-6">
              {metinTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMetinTab(tab)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${metinTab === tab ? "bg-primary text-black" : "border border-primary/30 text-muted-foreground hover:border-primary/60"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Metin cards grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {metinGroups[metinTab].map((group) => (
                <div
                  key={group.label}
                  className="border border-primary/15 rounded-xl overflow-hidden"
                >
                  <div
                    className="px-4 py-2.5 border-b border-primary/10 flex items-center gap-2"
                    style={{ backgroundColor: group.color + "18" }}
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: group.color }}
                    />
                    <p
                      className="font-bold text-sm"
                      style={{ color: group.color }}
                    >
                      {group.label}
                    </p>
                  </div>
                  <div className="px-4 py-3 space-y-1.5">
                    {group.drops.map((d) => (
                      <DropRow key={d} label={d} color={group.color} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Tochas */}
            <div className="border border-orange-500/20 rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-3 border-b border-orange-500/15 bg-orange-500/10">
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                <p className="font-bold text-sm text-orange-400">
                  Tochas — Lv 99
                </p>
              </div>
              <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {[
                  "Armas Do 75",
                  "Armaduras Do 66",
                  "Pérola Branca x1",
                  "Pérola Azul x1",
                  "Pérola Vermelha x1",
                  "Esfera Da Benção x1",
                  "Pedra Arco-Íris x1",
                ].map((d) => (
                  <DropRow key={d} label={d} color="#f97316" />
                ))}
              </div>
            </div>
          </section>

          {/* MINI BOSS */}
          <section id="miniboss">
            <SectionTitle>MINI BOSS</SectionTitle>
            <div className="flex items-center gap-2 mb-6 text-xs text-muted-foreground border border-primary/15 rounded-lg px-4 py-2 w-fit bg-primary/5">
              <span className="text-primary">⏱</span> Respawn:{" "}
              <span className="text-primary font-bold ml-1">1 hora</span>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {miniBosses.map((boss) => (
                <div
                  key={boss.name}
                  className="border rounded-xl overflow-hidden"
                  style={{ borderColor: boss.color + "40" }}
                >
                  <div
                    className="flex items-center gap-3 px-4 py-3"
                    style={{
                      backgroundColor: boss.color + "20",
                      borderBottom: `1px solid ${boss.color}30`,
                    }}
                  >
                    <span className="text-2xl">{boss.icon}</span>
                    <div>
                      <p className="font-bold text-foreground text-sm">
                        {boss.name}
                      </p>
                      <p className="text-xs" style={{ color: boss.color }}>
                        Mini Boss • Respawn 1h
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-3 space-y-1.5">
                    {boss.drops.map((d) => (
                      <DropRow key={d} label={d} color={boss.color} />
                    ))}
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
                <div
                  key={boss.name}
                  className="border rounded-xl overflow-hidden"
                  style={{ borderColor: boss.color + "40" }}
                >
                  <div
                    className="flex items-center gap-3 px-4 py-3"
                    style={{
                      backgroundColor: boss.color + "20",
                      borderBottom: `1px solid ${boss.color}30`,
                    }}
                  >
                    <span className="text-2xl">{boss.icon}</span>
                    <div>
                      <p className="font-bold text-foreground text-sm">
                        {boss.name}
                      </p>
                      <p className="text-xs" style={{ color: boss.color }}>
                        Boss • Respawn 6h
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-3 space-y-1.5">
                    {boss.drops.map((d) => (
                      <DropRow key={d} label={d} color={boss.color} />
                    ))}
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
                <div
                  key={boss.name}
                  className="border rounded-xl overflow-hidden"
                  style={{ borderColor: boss.color + "40" }}
                >
                  <div
                    className="flex items-center gap-3 px-4 py-3"
                    style={{
                      backgroundColor: boss.color + "20",
                      borderBottom: `1px solid ${boss.color}30`,
                    }}
                  >
                    <span className="text-2xl">{boss.icon}</span>
                    <div>
                      <p className="font-bold text-foreground text-sm">
                        {boss.name}
                      </p>
                      <p className="text-xs" style={{ color: boss.color }}>
                        Boss • Respawn 12h
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-3 space-y-1.5">
                    {boss.drops.map((d) => (
                      <DropRow key={d} label={d} color={boss.color} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WORD BOSS */}
          <section id="wordboss">
            <SectionTitle>WORD BOSS</SectionTitle>
            <div className="flex items-center gap-2 mb-6 text-xs text-muted-foreground border border-primary/15 rounded-lg px-4 py-2 w-fit bg-primary/5">
              <span className="text-primary">📅</span> Toda Quinta-feira às{" "}
              <span className="text-primary font-bold ml-1">21:00h</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {wordBosses.map((boss) => (
                <div
                  key={boss.name}
                  className="border rounded-xl overflow-hidden"
                  style={{ borderColor: boss.color + "40" }}
                >
                  <div
                    className="flex items-center gap-3 px-4 py-3"
                    style={{
                      backgroundColor: boss.color + "20",
                      borderBottom: `1px solid ${boss.color}30`,
                    }}
                  >
                    <span className="text-2xl">{boss.icon}</span>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-foreground text-sm">
                        {boss.name}
                      </p>
                      <span
                        className="text-xs px-2 py-0.5 rounded font-semibold"
                        style={{
                          backgroundColor: boss.color + "30",
                          color: boss.color,
                        }}
                      >
                        {boss.mode}
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-3 space-y-1.5">
                    {boss.drops.map((d) => (
                      <DropRow key={d} label={d} color={boss.color} />
                    ))}
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
                <button
                  key={b.name}
                  onClick={() => setActiveBau(i)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${activeBau === i ? "bg-primary text-black" : "border border-primary/30 text-muted-foreground hover:border-primary/60"}`}
                >
                  {b.icon} {b.name}
                </button>
              ))}
            </div>
            {(() => {
              const b = baus[activeBau];
              return (
                <div className="border border-primary/20 rounded-xl overflow-hidden">
                  <div
                    className="px-5 py-4 border-b border-primary/15"
                    style={{ backgroundColor: b.color + "15" }}
                  >
                    <p
                      className="text-lg font-bold flex items-center gap-2"
                      style={{ color: b.color }}
                    >
                      <span>{b.icon}</span>
                      {b.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {b.desc}
                    </p>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-primary/10 bg-primary/5">
                        <th className="text-left px-4 py-2.5 text-primary font-semibold text-xs uppercase tracking-wider">
                          Tipo
                        </th>
                        <th className="text-left px-4 py-2.5 text-primary font-semibold text-xs uppercase tracking-wider">
                          Item
                        </th>
                        <th className="text-right px-4 py-2.5 text-primary font-semibold text-xs uppercase tracking-wider">
                          Qtd.
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {b.items.map((item, i) => (
                        <tr
                          key={item.item}
                          className={`border-b border-primary/10 ${i % 2 === 0 ? "" : "bg-primary/[0.03]"}`}
                        >
                          <td className="px-4 py-2.5 text-muted-foreground text-xs">
                            {item.tipo}
                          </td>
                          <td className="px-4 py-2.5 text-foreground">
                            {item.item}
                          </td>
                          <td className="px-4 py-2.5 text-right font-mono text-primary font-semibold">
                            {item.qty}
                          </td>
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
                    <h3
                      className="text-lg font-bold"
                      style={{ color: d.color }}
                    >
                      {d.name}
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[d.boss, d.tesouro].map((entry) => (
                      <div
                        key={entry.name}
                        className="border rounded-xl overflow-hidden"
                        style={{ borderColor: d.color + "30" }}
                      >
                        <div
                          className="flex items-center gap-2 px-4 py-3"
                          style={{
                            backgroundColor: d.color + "15",
                            borderBottom: `1px solid ${d.color}25`,
                          }}
                        >
                          <span className="text-xl">{entry.icon}</span>
                          <p className="font-bold text-foreground text-sm">
                            {entry.name}
                          </p>
                        </div>
                        <div className="px-4 py-3 space-y-1.5">
                          {entry.drops.map((drop) => (
                            <DropRow key={drop} label={drop} color={d.color} />
                          ))}
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
              Complete as Missões do Biólogo para ganhar bônus permanentes
              poderosos no seu personagem.
            </p>
            <div className="space-y-3">
              {[
                {
                  lv: "Lv 30",
                  time: "30min",
                  reward: "Velocidade de Movimento +10%",
                },
                {
                  lv: "Lv 40",
                  time: "30min",
                  reward: "Velocidade de Ataque +5%",
                },
                { lv: "Lv 50", time: "30min", reward: "Defesa +60" },
                { lv: "Lv 60", time: "1h", reward: "Ataque +50" },
                {
                  lv: "Lv 70",
                  time: "1h",
                  reward: "Refletir Ataque Físico +10% / Defesa +10%",
                },
                {
                  lv: "Lv 80",
                  time: "2h",
                  reward: "Bônus contra Monstros +10% / Ataque +10%",
                },
                {
                  lv: "Lv 85",
                  time: "2h",
                  reward: "Resistência contra Classes +10%",
                },
                { lv: "Lv 90", time: "4h", reward: "Bônus contra Classes +8%" },
              ].map((m) => (
                <div
                  key={m.lv}
                  className="flex flex-wrap items-center gap-3 border border-primary/15 rounded-lg px-4 py-3 hover:bg-primary/5 transition-colors"
                >
                  <span className="text-primary font-bold text-sm w-12 shrink-0">
                    {m.lv}
                  </span>
                  <span className="text-xs text-muted-foreground border border-white/10 px-2 py-0.5 rounded">
                    ⏱ {m.time}
                  </span>
                  <span className="text-sm text-foreground flex-1">
                    {m.reward}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* SISTEMAS */}
          <section id="sistemas">
            <SectionTitle>SISTEMAS</SectionTitle>
            <div className="grid md:grid-cols-2 gap-4">
              {sistemas.map((s) => (
                <div
                  key={s.name}
                  className="border border-primary/15 rounded-lg p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{s.icon}</span>
                    <p className="font-semibold text-foreground text-sm">
                      {s.name}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* BÔNUS */}
          <section id="bonus">
            <SectionTitle>LISTA DE BÔNUS</SectionTitle>
            <div className="border border-primary/20 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-primary/20 bg-primary/10">
                    <th className="text-left px-4 py-3 text-primary font-semibold uppercase tracking-wider text-xs">
                      Bônus
                    </th>
                    <th className="text-center px-4 py-3 text-primary font-semibold uppercase tracking-wider text-xs">
                      Mín.
                    </th>
                    <th className="text-center px-4 py-3 text-primary font-semibold uppercase tracking-wider text-xs">
                      Máx.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bonusData.map((b, i) => (
                    <tr
                      key={b.name}
                      className={`border-b border-primary/10 ${i % 2 === 0 ? "" : "bg-primary/5"}`}
                    >
                      <td className="px-4 py-2.5 text-foreground">{b.name}</td>
                      <td className="px-4 py-2.5 text-center text-muted-foreground font-mono">
                        {b.min}
                      </td>
                      <td className="px-4 py-2.5 text-center text-primary font-mono font-semibold">
                        {b.max}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* TRANSMUTAÇÃO */}
          <section id="transmutacao">
            <SectionTitle>TRANSMUTAÇÃO</SectionTitle>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              A transmutação permite evoluir sua arma para um tier superior. A
              arma atual é consumida no processo — refine bem antes de
              transmutar!
            </p>

            {/* Materiais padrão */}
            <div className="border border-primary/15 rounded-xl overflow-hidden mb-8">
              <div className="px-5 py-3 border-b border-primary/10 bg-primary/5">
                <p className="font-bold text-sm text-foreground">
                  Materiais necessários — todas as transmutações
                </p>
                <p className="text-xs text-muted-foreground">
                  Custo: 50.000.000 Gold • Sucesso: 100%
                </p>
              </div>
              <div className="px-5 py-4 flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-2">
                  <img
                    src="data:image/png;base64,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"
                    className="h-10 w-auto object-contain"
                  />
                  <span className="text-sm text-foreground font-semibold">
                    Tomo Divino x2
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="data:image/png;base64,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"
                    className="h-10 w-auto object-contain"
                  />
                  <span className="text-sm text-foreground font-semibold">
                    Pérola Branca x5
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="data:image/png;base64,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"
                    className="h-10 w-auto object-contain"
                  />
                  <span className="text-sm text-foreground font-semibold">
                    Pérola Azul x5
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAzCAYAAADCQcvdAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAMR0lEQVR4nNWayW9kSV7HPxHxttycmU6Xy0u5XOXuquphepo5zAwSrUFiQCMGkBoEfUCCA/8SJyQkrnBAggs3ECcutBAzold6qa7NVeU17dzeEguH917m81K2u9PV0vyktPNFxIuIb/x+Eb/f7xspAMe3FolAAuJMN7Mne/IVcep5jtGvIt68HbjirwDOgJmKBeQF9a9Pzi79NxZZ+X4+APGKt+z8g18q8wM8PXt3frU8p8zx+kHOZ6KC89VTFcd0l5ZSgv0uDHbuPXhGquoppNyBZbU92+S1yfWb6Gn5LlBcINdwyFR6uQzsq+Q1LsLcAE9gErMnJ0AIgbOAFMVIxVCyMFhrwVqUVAAYY4pqWVTPv0vnAigAVYFocIA82aGnyFGeP4wUAqvNyTIpcc7h3PUZ17d+WRbHh0AgRbHyBWYnwNisaCwQvocQAmtMDto6pFQIl4MSQmCtRWs9D6Yzc5xTgwp3pouZaUnlYazmtDIcuaW+ygqFEFPA88jcezD0A6zWWGenHUrAExKExVTmV9aVflEDzlNoxAmtKXVyT84j13KKCvLzRQHCVcrIywJyUJoZQFc8j4v/QRDgnENrfS17r5TrcfQShAStc0AqL6LuwVtvbrG1scnWxga1MEDHCfu7L/n000/58IvHpOQA0zQFctMsJQiCafm3FSGQDsCVaUypU3fSBbiyrlpQqkmC0LmmasDmUoPfeHCfrdubdFoLrK2sstjtIJ3FF+B7MDo64vHOPh/v9vmPD/6HT774Cgv4vkeq7dTkq7o8Mfw5EdO5AAM8ZwAjLEg768WAKkBKqUht8eAJ0GYGMKpDlhHojDUffvGTt3nn7h3Wez1ura3TbC9SX2jjlCLJJphsTDo5JJSWhd5Nnhwavt4b8u8ffMA//su/EjsQKAwOIT0Sq0HY/KQltw4DmDL2cxeDFCG+07gcoKoA1OC53M9ZIEMUDtvmDtuBkgIjfDApb6/0+JN3f8zPvn+PtjSMDvt0u4us330L1WgiowiDIR7tcfD8EUc7z0hSy83Nd4hurLHvHP/5y4/4m7/9O3b7QwyKBIcW5GPaHJxX4ElL67kEoDy3tlKkRMUNCDGNRiTgG0ekU26Fgr/645/z/h/+Hpu3lvB9iYw8GjcWaawsIRp1XK2G32gQhC2CqIknAiZHQx59/L+8+PwTNhfb/Oy3fshf/8WfFyAMDpuDK06m8kAWVc1dYqLFIWOZvl55wZFHJw6QSuX7ojBN4fIVXQnhz37/p/zRb/+IptI8fvgQnU64uX6b9Qf3CBZ7xJMMVIhSktBYur01IuuoqxrPnrzg4Osv+dyXfP/dd3n/vV8wnAz5+3/4J7AwrsS4s6nJ3FQdXJZ0eecuQKXQOJN3qBQ2y/2S7wlE6giA3/3Bff70pz+hqzK2H39FPB7QXV5i43sPCFbXoNbGbymisJGfkF6IdOCnFi8VRFbw9MVz7OiQg2dfc2N9g798/z0ePn3MP//bf+UqELOPcxKJPJGKugtAyhNPFWCi8t1Shl95R6qwmrWWz9t3N7hR8zl6uY3JElbX11je2KS1sgbNFvSWiZZvInrL0OpCq4uMFpD1No1uj3q9zs0bPVphwBcff4ibjOnUAn7zwZssNpmZ4fQIlUXEK05N/hUAK8Z5RnIHnnczjfQFaO2oAT+4f5+766vEoyHWWpZWVumtb1LvrUB9Adq9/H+rhwkjnB9Bs4NoL+KaHfzODWqLS9x+8x6pzti4tYaZTOhGNX744C3e+4Ofo8o43c0WO6c63JXojvMXoXrISD9/LAAqmdt/IOHunU1u39kiQ1Bb6NJdXiNqLxK2lyDqQHOJzPlkBGgZ4mp1WFzCa3dJwojYD2is3mI/SSGq0Wy1sYlhtHfI7/zox6w22/hV4sZJHBYLmCnES/dgpcE5y6GNni2FA6stAbC5vsrdzTusb71BMtjHOoGLFghbPWS9i1M1BCFW+Ohp94JIKkSngzfqMczGaJPQvfMmk70dglqbSPp4KsIOUjYWl4kAbfNoR0yjc4f0JcboS4mdyilaETeLF+3URczKPeD2yhpbm3cIGg1qkU9mDEZ4WBHQaC1CrQMmT6HKvhxFIuz7BAstorRH1Kxh4jFyPMIpH+UUkfRwQrHaXqTrC9LMYQBcoQ5hZ/HqJdG0d8aOz2ssil4cBAqkgVsrK2ysrhF4PlLmfksIn1rQgKAOfgRIfJcfWE7ki+8wCE8QNuoIuwjDgERnRM12HlikFpFq9g/2GR4c0Kk36Q8GJBaMc0gc1rlcJ1dIFWbB9gWxnRBi6uxl0WsA6PEYYsXh/i5JZuks3cz9zmAAKFjogBfiCT8H6FIkFpydpk5WShCKKIrw4hhfAMay+/w5z588Rgo3zSWFlPnp7vSrlXEWYMXBFyCrLkJIOc3Qy0oB9PcP+OqTj+jEq+w9f4yxUNMGghqkSf7BQLMNRiJwSGfyY9gY7HBAcnSMHY9Ih0N8m2LGIwQKLBwf7LL78gWTZEzi8vhTKAnaTukdIQs25GKAVxBr8yAboPCBO9vP+OyXv6K5+wg76qOCiNAYAgGdW7ch9GDkg8mwUqKFQzrwpABjMUfHJIeHuDjG1xmRsgShh8g0k4M+Oy+3ebmzzXBii30HDol1Lte8A1kAvxDgq7Q8TSpsEYDLvCSzUAd2XrzkIZqlHY8FkaIaTfRoiElisixhQWeIdEjihxgvwAqQTuIjUQjMOEaNYzyX4WHwdIZvM7LDPb747DOePP2S4fiIjAKEBIQrA0c8HM66S7fhSQ1WHOrplwRiWm2AnTjh6cEBd4xHRko4mBDHKSbNSOIxi8eHNJaX8Zd62CDESR9tBVYoaiJAGkstTXCTPnpyzNFhH5EkPH/0iP/+1Yd8tf2SUWby1GiaOZT2KBHYc7igiwCeCrJnpl0knmkeaGvgGBgC8XHMG80OWqe0nKEhJtjkKfHRIfHeC9qryyzf24JmE7/RRkgf5XxwPqTg4hH9nc+JD/boP9lj59kOO7t9tvtDnh0NeJqkjKgmtwYkGEvh7i8/Z165B1/lOgwzux8Bh0LR8iLqfoizEjuYkE0mDOMJWX+P+HgPr92h3utRr3fwRA1SR9qPSUfHjI6eMO4fsP90n73dAYcTx5HWHGSGXXNqj11gYd8Y4FXEAC/HI9qNGm0/wmYaPUhyItHmZMggyUiD58h6k7DRoiYiSBxibDE6Zb//nJ2DffqHA8Z4DGTItknY1YYRFUs6FZNekbGYD6AGHh3HdMOQ5bBOyweZOVQaIzOBGxmcGTNOJ4zsNlKFeNLDNx6BVXiez9HwmIOjEQMLttuij+DJaMiOq1hLiWLKE12dK50b4EsDj5KEhSzDqzVY7i6i0oQ0HhH3h3iRIksGGKPRaoJBERuHNAIhA1IVIYM2NpDsScGXkxFfZ5p9ct7F2tIv53mBLMBdFeLcJjoEvjyMmSSP2W93+F63y+1Wi3Y9RMUB8WSEkCHKqfzwkgIjwCiBQWJEgKs3GYqMz/d3+WgwZF8XnEtJelXG/KY89zVQ9zNytytgsxPxRqfDVrvFWhjhDvsEziKMJrWGVDoSD2IpyKwim4QMrOT/Jkd8fHTIUwO6zOJ1yezJynW3nVImXGHy1/QjBIuQeaYfAh3gXjfk/mKPnhN0/YCa8rEYxsIwFIZDkzKKDYFt8fDFLp8mQw6Asc/UT3nSA22RQFZOVMxCy6tMfk6ABd0lOMENKJNHOw3gnV6bRS9gIazjBT4jm7EzOmL7uM/RJN/HGhgAMWBUMXkL/jS0h7QcrgR4xV8vXANANdsowkxBYiByOdNdfjwkGscEd8IFZEDCSbY6mF7M5e1SKC4/Zv1/RwArv6EQ1Rgoj3zKPTpj+WXRWqKxpBTXBuWh4uR0T5fgMopwrarBKwK8pl9Z5CPl9LrEYnGF6Rrfy29+bc7cCutQCDxkzqtIU6UPpgtSgjvDulyB7K3KnABnQ1c1VQbkxpGnH7JoK2ZksmJWVv1a+jlNxdFX2uBO82SXkE7fBtZUynsDl+dnVZ81zZFLuqOsETn5ZJzFCZFDKLSisNMFyij2ZIXQKS9gSlhXUeR8e7BKLzPrqcoIKCWwzmFd5Z1q+2IGnpuZpqY4Tas3SDrXhioK9XQrvE4NnpaSm6qcOca4WZWotCvlVIZwOdNZytVaze/oxannq9rNqXcuvGyttPluTfTXQK5yf/FrLf8PVBLCBbhKZ0kAAAAASUVORK5CYII="
                    className="h-10 w-auto object-contain"
                  />
                  <span className="text-sm text-foreground font-semibold">
                    Pérola Escarlate x5
                  </span>
                </div>
              </div>
            </div>

            {/* Cadeias */}
            <div className="space-y-4">
              <div className="border border-primary/15 rounded-xl overflow-hidden">
                <div className="flex items-center gap-4 px-5 py-4 flex-wrap">
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <img
                      src="data:image/png;base64,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"
                      className="h-14 w-auto object-contain"
                    />
                    <span className="text-xs text-muted-foreground text-center leading-tight">
                      Espada de Batalha+9
                    </span>
                  </div>
                  <span className="text-primary text-3xl font-bold shrink-0">
                    ›
                  </span>
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <img
                      src="data:image/png;base64,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"
                      className="h-14 w-auto object-contain"
                    />
                    <span className="text-xs text-primary text-center leading-tight">
                      Espada Suprema+0
                    </span>
                  </div>
                </div>
              </div>
              <div className="border border-primary/15 rounded-xl overflow-hidden">
                <div className="flex items-center gap-4 px-5 py-4 flex-wrap">
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <img
                      src="data:image/png;base64,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"
                      className="h-14 w-auto object-contain"
                    />
                    <span className="text-xs text-muted-foreground text-center leading-tight">
                      Espada Suprema+9
                    </span>
                  </div>
                  <span className="text-primary text-3xl font-bold shrink-0">
                    ›
                  </span>
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <img
                      src="data:image/png;base64,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"
                      className="h-14 w-auto object-contain"
                    />
                    <span className="text-xs text-primary text-center leading-tight">
                      Espada Sagrada+9
                    </span>
                  </div>
                  <div className="ml-4 pl-4 border-l border-primary/20">
                    <p className="text-xs text-muted-foreground mb-1">
                      Materiais especiais
                    </p>
                    <p className="text-xs text-foreground">
                      Símbolo do Dragão x2
                    </p>
                    <p className="text-xs text-foreground">Cristal Azul x2</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Custo: 2.000.000.000 Gold
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-primary/15 rounded-xl overflow-hidden">
                <div className="flex items-center gap-4 px-5 py-4 flex-wrap">
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAFh0lEQVR4nK2X32sd1xHHP3PO2bO79969ErhNRVRXqHGVQnGFwXHcJoE0wYkj66FubD+ZgCh+cRIwtPRf8F+Ryq99aCEk74ZUYKdWQl9tXIfYpKmL4kZy78/9MX3Yu6srRZXkKAPDcnfP2e93Zud8Z64AygEscDFplu7wpADAWkue5wSBJU1TjDGoKqqKiGAOAg6QZgMABMEaixGDyOjlxpDnOUmSkKabJJ1zeO9RLWPXg7lREavWBipiFcyYoyJSr22321v2RlGk3wEB1BgzAqcGrtxaW5OwtlyTJMn4moMTGHcRUedcDWZMSch7v+UKaKvV+m4JGFP69vtJkmiSJLq4uFgTqvd8o6qe0IwBpHQxUBSbz7wvi+3o0aPcu3ePKIowxhAEAWBGfsCorRVFUAS1DhWpom7q7OyMXrp0SW/evKl37tzRMAzrfXHcVDDq9hOl957hcAhAFEX0+30AgiBARMnzDBFwNiAtUsLQc/z4CdrtNrOzs8zPzzM9Pc1gMKjf1+t1sNayLwLD4RBrLUANDpCmKSJSplHhyJEjnDhxkjzPWVlZodlssry8zPnz51lfX69JF0WBc44syxD2UMLx6CurhKTb7QIG7z2Tk5O89dZFVlc/5f79+wRBwLVr13jw4HMuXLgAUAeR5znGmJLIXtFnWQaAiNTRZlk2um8w4hgOM5z1/PWjG3jvOXz4MCdPnmRmZoYzZ87QbDbpdDoEQVBnsMrCngSKosAYg7WbWl4Reu65Ezz81xqnTy8QhiFffvkFQRDgfcDbl9/l3LlzPHr0qE59BR5Fnn5/SJZl++sFIlJreZWFOI6ZnZ1laem3RGGDz+59jjGOPFdeeeVVPv74b3z6yd9pxC2grJcoigAYDIZ4X8a+ryLM87zuatW12+3yj7ufIRqxtvaIQ4cOEYWeU6dO8c67l3HO0B+UETcaDbrd/9Y1oFrVAZhNQaiSYUphGVkYhkBZQAKkwyGNKObHP5ph7ifPUGjG009PcffuHS5evMgHH77P1+tfs/bVWt0he70ezjk6nQ6NRjQKSlEFATd2CooRgWLsbJTSJsChyQmSZos3XnudVrPJxuPHDCUAEZIk4erVq7TbbbI8G33n/pZ37GSm1tHt0QsgBWEYYsUwmbR45/LbXHjzHM/OzZEO+vzgqadIBx2++OcDGs2I5WvvkRcpUJBlQ8Iw2BV8BOO26cDYhlEmojCAvGBx4QyLC6dZfu+P/HTuWbr9AYVz/OnPf6HVarGxsTEmMlu1Y5cM7AAuRQ0eR550kOKM5YUXf8Hrp17j2LFjTE9P8/P5ea5fv06WZWxsbKCqNBqNWjsmJib2JiAUVE7lo5YhQL9fRuICw+rqKrdu3WJh4Q02Hq/zmzd/zcN/P6zlVVXp9Tr1SFbJ727mxiOXHRY0o5Asy5ibm+PGjRs0o4hBr8+VK1c4e/YsYixFURAEAWma1nNeJV5VNv6vCaiA2l38heeP68/mnlEH6kFbTvR7rVjdaC9j01Acx1vmwD19LwK/eumX+sOp76sDdaBNb2oiFYGJiYlvvNg5tz8ibgTkxkDbjVi9oKdffVnbsddGYNQLNQkHGozWyl4Ae41xCsRRiALOlodiaWmJlZWPuH37NmmakucFhW7uKgRyKStn116+D3MF0OmXk0ohMNFOmJqa4ne//wNrX/2HNNMaZLukfDvwbSc/CgOt6iBpNdSCNnygrSisP4lsT7WhngN54rSbLS6AxnFIvzfYws9Zh7WW3nDzr1fFBN0W+75SsXPnr0cyAaIwQvMcVSXLy/NbjMAxIwJFsVUwqti+JQFT9aJWktAb9FERhnkGUuZ5vF1rMfZbDMhO0vVkJggajtTNe086NoBaY8mLsghFhLocx0YHsuJAGfgfgEAWGPDMdVwAAAAASUVORK5CYII="
                      className="h-14 w-auto object-contain"
                    />
                    <span className="text-xs text-muted-foreground text-center leading-tight">
                      Faca do Dragão+9
                    </span>
                  </div>
                  <span className="text-primary text-3xl font-bold shrink-0">
                    ›
                  </span>
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <img
                      src="data:image/png;base64,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"
                      className="h-14 w-auto object-contain"
                    />
                    <span className="text-xs text-primary text-center leading-tight">
                      Faca Eclipse+0
                    </span>
                  </div>
                </div>
              </div>
              <div className="border border-primary/15 rounded-xl overflow-hidden">
                <div className="flex items-center gap-4 px-5 py-4 flex-wrap">
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <img
                      src="data:image/png;base64,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"
                      className="h-14 w-auto object-contain"
                    />
                    <span className="text-xs text-muted-foreground text-center leading-tight">
                      Arco Dragão Amarelo+9
                    </span>
                  </div>
                  <span className="text-primary text-3xl font-bold shrink-0">
                    ›
                  </span>
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <img
                      src="data:image/png;base64,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"
                      className="h-14 w-auto object-contain"
                    />
                    <span className="text-xs text-primary text-center leading-tight">
                      Arco da Perfeição+0
                    </span>
                  </div>
                </div>
              </div>
              <div className="border border-primary/15 rounded-xl overflow-hidden">
                <div className="flex items-center gap-4 px-5 py-4 flex-wrap">
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAIj0lEQVR4nJWXa4xdVRXHf/txzrnvO3PvdPqcTttpGR6lAYlQaGgRREHRD4IShCAQH1gVAgFNMFFjQCM0aiQkhET94OOb0UQwGrVNNQShpdIH08e0wzCdTqedmTudmfs6r739cO68aCmybvbJyTn7nPU//7XWf60rpMYaA9hkuU6WIIwAhRAWaw1SgREG4hAA6TiYOAYDoFCeR9z0QVjSKY9msw7WIgQIC9Da2nKTmFxwtFAsZgEIQp9CvkAm7WFtBMRYE+E5CoBU2sOEIRhDNpcBLLHfBCzlcolGo4G1lmw2jbWJY8PFTGCzOW0RCQdKuFagrUDbbDpnXe1YAVaAdRysksm5bl1zXdfO85dcy6Q9K8B6rrZiwb0LL4FFYKVMLqS9jBVI6yltVcuRp7COwOZc7PM7fmhLWWUzAuuCdQXWAata+zKumgN5ccfJkqIVAs9JIYDQb+BIy47nfoSnIOPCk49/BWXBBDDYf5hmLebR7Q/xxc/djrbw/aceQwM2hihMciOd9hbEeuGaJT5Z0lqJ53k0/WYrHSzGWEaGB7nu2k0EAYyPnOTmLZeggaOH9lFwYODoIYYHjuMAU2On0YAr4bvfeQwtodn0Lxr5BUC0BUPK9YjjEBNHiNbLbtp2FWu6ljFdGWPgxHFuvGELu3ftZuuWrQy9O4IxhjU9a9i77032HRzh3ns/y9hUlT//ZSeBASvBJEQvcGnmGJCAVFIBEj/wEdYiAC3giccfRgk4fqyPrlXLKRWybNuymWUdJW68YTN+fYYN67p5p/8IKS348v23U5kY5ZWXd2IMPPqtr81HWrTqQMw7nzUZG4OjnYR+a3EdiRDw7I4X+cJdd9K1ciU9PWvRjuC/b+3FdQSDA8fAhGy8vBdFzK0f/xhjZ0aYODPCE4/cz313387+N9/AEYkzrSRgcB13kXMk6LlzIZESgjBCAoUMjI9X8P2A/v5+Vq5cyczMDFEU0Wg0yGRTnBo5STabptSep1Gr8pk7PsVre/YxMDjMkYFRtj/8ANl8Oz/+yc+SBA8CUimXKIqIIoMQAuE6GRuETQSQdh2CwMfTEEeQS8HXv3o3w0MnWFpuozo9zczUNKtXdTN6+iydHSV8v0G1Uafc0cmyFSv52z93saq7h/ZSJ33HjlOtB/z7tf0YQGuBHyVamM3lqFaryNj4c4kRxjEWCGNQEupNOD4whFQuXraAl82xunst0tHkiwUq0zMEcUStVsMYw/79+7lp61bWdC1n966/EzXr7P3Pfp769jd59pnvEUWWlJMkZLVax3GT0rdKCTACYw2ylSSFlEsUBbgavrH9S3iupTI+TtrROI5DOpVicnISG4VMn5vCcRwymQxeOsOBAwe45dbbODk8Qt+R46Rzbfzpr68mLLgKPwaLxBiLRiS1b21Cjed6hEFAtRkggCCC6Zk6jcYU9eo5XK0xxtBWLGKjmHKpDaUUk5OThGHI6dMnuPmmbYwOD7H39TdQTorX97xNMQ3nGuAHMcp1CQIDUiAQWCHAmtnaTH4Qk005mDjg2o9u4rJL1+G5Eq2hMj5OHEZIKXCEpHv1KmrTUwwPnWRJR4lKpYIQghu2bGPw3WHOVqaQXp50scwLL/2aemhRXoY4CBFCtj7eghBJ23GEIrbhnFi4Gh568C4atWmsCVqh0SghqYxPsKRconNJGRsEHDn8Nt1dqyiXy7w7OETfsRNEaN46MkEEBEAECJ3GxgZpZ2cBwNqkJYY2xgAxgIJmBJXJGep+wPRMDd/3qdWqWGEptLXjpXOcGR0DJL3rN+AozdHDfXStWskD993LbbfcggAe2f4grkyYVkKAlUkSzqnCIktiouy8bN7x6etpVqcxsY+wEZ2dSym1lZmcqFAuFugoFRkeOE7K0xQKBSqVCmfOTnDqzDjLunpQmTY2Xn09zzz7cxqhBRYBWCBPCzQ74yqkMAS+ZfN1vZigie/XuGRDD/V6nY72DrQSeEpSai9A0KT/aB/5bI4lS5ZwxZWbePOtg7z0m50YCU0D2tPUfIOQ+uIAZr/8ueeeZnT4JIf7DjJ17izZdIrQb1Io5iiVShRzeWamKxQyKZaWSzQbVTwlGR0dRSiHoVOnaetcQabYSff6y3nyqWfwMinqjea8FC+invmGkfI0Gzb00tuznrEzozhKMz4xSrmtHe1oYiOp+QHNKGZpvsDY5DkG3+knl3YplUp0Ll3OoWP9mHOTHDo6yIu/+iOOBr/ZBHt+4M+zph9x152fZ3BoGMfLUKv7vLHnGP/YuQc/AKFcsvk2Uuk8E1MzNMKYFavXsnRFF9JJ4WXzrL/0CjZu3MTBQ6fI5yCKwBjQDhcKAS0Gkg6mhcRYg6PgvnvuIZV2+f1vf0etEeE4EIQgJXzyE5u57pqrqVdnmJocI5t2mZiYwHEcdv/rVdb19LJ2fS/Lu9bxg6d3ELWG6g8AACrRSQTgaEEUWSygWsGafdhVEMew9foryOfSdHaUWLask7Vreziw/xAv/vIPeCmoNZPy1loQRjZRQjgfhlg0t58/WM8in72jZaKmCijmJFdt2shll/Vy+O0+svkC2k3x8iu70C40AigWC5ybmv5/ASwGsQiOUFhrkcyueYCuhms+ciVYSXu5gw2XXMpPf/HCoj8n5wFYNLFc0OQirAKNbc1eShg8R2HiEBNf+OlUKkOt2QQkrpf6cABsC8BCMFIozJyez2qHQYokOYUQGGMBQWwsAgVSopSDH4YfXIaLnUMi0QvCYQ1SSJLhdj4vIgtBDH5kCQ1EBrK5PDGWyMRIpYALJOH7MTAHYG5DC/t7Rm4pQcqkhI0xOE4y8IZhjLGGbCZPrVZL2FPq/QEs7ggXApCYUi7WJM5mG9h7TbRAWSkwQYzQGhtbEOJDAlj48oV9VMhWrA1WWKRsxd2C42riOG7lQetBIeZe/D9ENPD50uffkQAAAABJRU5ErkJggg=="
                      className="h-14 w-auto object-contain"
                    />
                    <span className="text-xs text-muted-foreground text-center leading-tight">
                      Leque da Salvação+9
                    </span>
                  </div>
                  <span className="text-primary text-3xl font-bold shrink-0">
                    ›
                  </span>
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <img
                      src="data:image/png;base64,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"
                      className="h-14 w-auto object-contain"
                    />
                    <span className="text-xs text-primary text-center leading-tight">
                      Leque Elemental+0
                    </span>
                  </div>
                </div>
              </div>
              <div className="border border-primary/15 rounded-xl overflow-hidden">
                <div className="flex items-center gap-4 px-5 py-4 flex-wrap">
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <img
                      src="data:image/png;base64,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"
                      className="h-14 w-auto object-contain"
                    />
                    <span className="text-xs text-muted-foreground text-center leading-tight">
                      Espada Exorcista+9
                    </span>
                  </div>
                  <span className="text-primary text-3xl font-bold shrink-0">
                    ›
                  </span>
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <img
                      src="data:image/png;base64,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"
                      className="h-14 w-auto object-contain"
                    />
                    <span className="text-xs text-primary text-center leading-tight">
                      Espada Milenar+0
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Partizan +9 → Espada Usurpadora +0 */}
            <div className="border border-primary/15 rounded-xl overflow-hidden">
              <div className="flex items-center gap-4 px-5 py-4 flex-wrap">
                <div className="flex flex-col items-center gap-1 min-w-[60px]">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABgCAIAAADzQOfPAAAQnklEQVR4nJ1ZeYxdV3n/fWe529vGs3gmjj2249gmjmM7RLgidmToQlMqUApJKYgCJSEsLUSoRLQCBSpWKbROWZISqBJFUKByKWVRSNykBBSCB3BCYjtjj+3xMsksnvG8edvdztI/zpvxTOIZMv509e59957z7ds5B7gkCIIAAMC48AAmpA8wzw/dm9mvIKJlo56b4/s+wABGTLgHgPlBBDAAURRdGuvgnANgjHHOiUhKCeKFYtnzQ8YlgK6uroVSLhOklC9jkAEMxD/3+S86ERljjLG5b8uDPM8ZY61Wy/d996ZQCD1PvP/2267dsU0IYa11v5fC/nxwGigUCgD27t07NTX1sY99bO3ate6NAyJatgRCCGfnJEkIaDWbBNx2699MjI/mWbJp44ZWszlHGJegIqWUM4OzNud0551/L6V8+OGHnVhSciFEs9l0Zlg2AWdP90QEre2HP/TBidEX01Zz85UbisWiUlprTUTGQHrBJRBAlqZSSiGEtXjwwW/6vr9///6xsbHu7u5tV28FYK0Nw9APgixNl01Aeh6IjDFpmn7603f95Vtv/q99+37z64EoDOqN2nXXXev7HhG1Wq00SRjny3fTLAuCQGstBHvvu99z7ty5JIl37twZRdHxY0O7du36xje+DmvDMARgtBbLJeD5fhLHnufdddcnT58+/dhj+5uNOicb+lLKiud5GzduZMSyLAMQRtGyJcjS1A+CLMtOnjjxmc/80/T5qVV9K2u1WqFQaDVqX/+3+3SWG2ucBHGrtWwJ5mBkZETlOed8ZmbG87zVq1c/88wzA785+KsDA74vG40GF96FjPHKgXNKkxYntmLFiiSOm82m7/tENDY29tunn1ZKjYyMpGkOwBqTZ9miBFwcOXDJq53FjBYAgyGtNm68clVvX22mwZk8+Myzq1atLpcrAwMDAKTkxigiuygBrTUAIYQQwhhjjLHWWmOMBQBrobWuTp3PsqxarQohlFLd3d1xkgAgAmaT3aI28Dwvz3OlVHucEERkjZKMe5LfcccdExMTgZSVSiVN03K5LKWcnp7O8zzNtAWUMk70RQlkWebqibVWKeUoEWC1+uIXPrd79+7nn39+dGQkSZKOjo4kSeI4dkxwBmMuqGFRFTHGrLVOCKd9zjnn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"
                    className="h-14 w-auto object-contain"
                  />
                  <span className="text-xs text-muted-foreground text-center leading-tight">
                    Partizan+9
                  </span>
                </div>
                <span className="text-primary text-3xl font-bold shrink-0">
                  ›
                </span>
                <div className="flex flex-col items-center gap-1 min-w-[60px]">
                  <img
                    src="data:image/png;base64,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"
                    className="h-14 w-auto object-contain"
                  />
                  <span className="text-xs text-primary text-center leading-tight">
                    Espada Usurpadora+0
                  </span>
                </div>
              </div>
            </div>
            {/* Sino Céu e Terra +9 → Sino Hibisco +0 */}
            <div className="border border-primary/15 rounded-xl overflow-hidden">
              <div className="flex items-center gap-4 px-5 py-4 flex-wrap">
                <div className="flex flex-col items-center gap-1 min-w-[60px]">
                  <img
                    src="data:image/png;base64,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"
                    className="h-14 w-auto object-contain"
                  />
                  <span className="text-xs text-muted-foreground text-center leading-tight">
                    Sino Céu e Terra+9
                  </span>
                </div>
                <span className="text-primary text-3xl font-bold shrink-0">
                  ›
                </span>
                <div className="flex flex-col items-center gap-1 min-w-[60px]">
                  <img
                    src="data:image/png;base64,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"
                    className="h-14 w-auto object-contain"
                  />
                  <span className="text-xs text-primary text-center leading-tight">
                    Sino Hibisco+0
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              * A arma atual é consumida no processo de transmutação.
            </p>
          </section>

          {/* GAMEPLAY */}
          <section id="gameplay">
            <SectionTitle>GAMEPLAY</SectionTitle>
            <ul className="space-y-2">
              {gameplayList.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-muted-foreground text-sm"
                >
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
              Obrigado por ler a apresentação do Aura 2. Cada detalhe deste
              servidor foi pensado para oferecer a experiência clássica que você
              merece — sem pay-to-win, sem sistemas desnecessários, apenas o
              jogo como deve ser.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Junte-se à nossa comunidade e faça parte desta aventura!
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/download"
                className="px-6 py-3 bg-primary text-black font-bold rounded uppercase tracking-wider text-sm hover:bg-primary/90 transition-colors"
              >
                Baixar Agora
              </a>
              <a
                href="#"
                className="px-6 py-3 border border-primary/40 text-primary font-bold rounded uppercase tracking-wider text-sm hover:border-primary hover:bg-primary/10 transition-colors"
              >
                Discord
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
