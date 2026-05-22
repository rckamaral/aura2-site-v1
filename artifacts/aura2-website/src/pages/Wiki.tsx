import { useState, useEffect, useRef } from "react";

// ─── ITEM ICON IDs (m2icondb.com) ───────────────────────────────────────────
// Joias
const JOIAS = [
  { id: 50200, name: "Jóia da Penetração" },
  { id: 50201, name: "Jóia do Golpe Mortal" },
  { id: 50202, name: "Jóia do Resfriamento" },
  { id: 50203, name: "Jóia do Guerreiro" },
  { id: 50204, name: "Jóia do Ninja" },
  { id: 50205, name: "Jóia do Shura" },
  { id: 50206, name: "Jóia do Shaman" },
  { id: 50207, name: "Jóia Monstruosa" },
  { id: 50208, name: "Jóia da Evasão" },
  { id: 50209, name: "Jóia da Esquiva" },
  { id: 50210, name: "Jóia da Mágica" },
  { id: 50211, name: "Jóia da Vitalidade" },
  { id: 50212, name: "Jóia da Defesa" },
  { id: 50213, name: "Jóia da Aceleração" },
];

// Drop items com ícones do m2icondb
const ITEMS: Record<string, { id: number; name: string; img?: string }> = {
  moeda: { id: 27003, name: "Moeda da Conquista" },
  aprim: { id: 27006, name: "Aprimoramento Leve" },
  novoAprim: { id: 27007, name: "Novo Aprim. Leve" },
  pergAprim: { id: 27100, name: "Pergam. do Aprimoramento" },
  pergNovo: { id: 27101, name: "Pergam. Novo Aprim." },
  pergPaz: { id: 27010, name: "Pergaminho da Paz" },
  anelExp: { id: 27020, name: "Anel da Experiência" },
  luvaLadrao: { id: 27021, name: "Luva do Ladrão" },
  caixaRiq: { id: 27050, name: "Caixa da Riqueza" },
  pedraEsp: { id: 27060, name: "Pedra Espiritual" },
  esferaBen: { id: 27070, name: "Esfera da Benção" },
  leitArumaka: { id: 27080, name: "Leitura de Arumaka" },
  leitJolla: { id: 27081, name: "Leitura de Jolla" },
};

function itemUrl(id: number) {
  return `https://img.m2icondb.com/${id}.png`;
}

// ─── DROP DATA ───────────────────────────────────────────────────────────────
type DropItem = { img: string; name: string; qty: string; special?: boolean };

function joiasGroup(qty = "1x"): DropItem {
  return {
    img: itemUrl(50203),
    name: "Todas as Joias (+0 → +4)",
    qty,
    special: true,
  };
}

const metinGroups: {
  label: string;
  color: string;
  metinImg: string;
  drops: DropItem[];
}[] = [
  {
    label: "Lv 5 – 20",
    color: "#6B8E23",
    metinImg: "https://img.m2icondb.com/metin_5.png",
    drops: [
      { img: itemUrl(ITEMS.aprim.id), name: ITEMS.aprim.name, qty: "1x" },
      {
        img: itemUrl(ITEMS.novoAprim.id),
        name: ITEMS.novoAprim.name,
        qty: "1x",
      },
      { img: itemUrl(ITEMS.moeda.id), name: ITEMS.moeda.name, qty: "1x" },
    ],
  },
  {
    label: "Lv 25 – 45",
    color: "#CD853F",
    metinImg: "https://img.m2icondb.com/metin_25.png",
    drops: [
      joiasGroup("1x"),
      { img: itemUrl(ITEMS.aprim.id), name: ITEMS.aprim.name, qty: "1x" },
      {
        img: itemUrl(ITEMS.novoAprim.id),
        name: ITEMS.novoAprim.name,
        qty: "1x",
      },
      { img: itemUrl(ITEMS.moeda.id), name: ITEMS.moeda.name, qty: "1x" },
    ],
  },
  {
    label: "Lv 50 – 75",
    color: "#B8860B",
    metinImg: "https://img.m2icondb.com/metin_50.png",
    drops: [
      joiasGroup("1x"),
      { img: itemUrl(ITEMS.pergNovo.id), name: ITEMS.pergNovo.name, qty: "1x" },
      {
        img: itemUrl(ITEMS.pergAprim.id),
        name: ITEMS.pergAprim.name,
        qty: "1x",
      },
      { img: itemUrl(ITEMS.moeda.id), name: ITEMS.moeda.name, qty: "2x" },
    ],
  },
  {
    label: "Lv 80 – 85",
    color: "#8B3A3A",
    metinImg: "https://img.m2icondb.com/metin_80.png",
    drops: [
      joiasGroup("1x"),
      { img: itemUrl(ITEMS.pergPaz.id), name: ITEMS.pergPaz.name, qty: "1x" },
      { img: itemUrl(ITEMS.pergNovo.id), name: ITEMS.pergNovo.name, qty: "1x" },
      {
        img: itemUrl(ITEMS.pergAprim.id),
        name: ITEMS.pergAprim.name,
        qty: "3x",
      },
      { img: itemUrl(ITEMS.caixaRiq.id), name: ITEMS.caixaRiq.name, qty: "1x" },
      { img: itemUrl(ITEMS.pedraEsp.id), name: ITEMS.pedraEsp.name, qty: "1x" },
      { img: itemUrl(ITEMS.anelExp.id), name: ITEMS.anelExp.name, qty: "1x" },
      {
        img: itemUrl(ITEMS.luvaLadrao.id),
        name: ITEMS.luvaLadrao.name,
        qty: "1x",
      },
      { img: itemUrl(ITEMS.moeda.id), name: ITEMS.moeda.name, qty: "3x" },
    ],
  },
  {
    label: "Lv 90",
    color: "#6A0DAD",
    metinImg: "https://img.m2icondb.com/metin_90.png",
    drops: [
      joiasGroup("1x"),
      {
        img: itemUrl(ITEMS.esferaBen.id),
        name: ITEMS.esferaBen.name,
        qty: "1x",
      },
      {
        img: itemUrl(ITEMS.leitArumaka.id),
        name: ITEMS.leitArumaka.name,
        qty: "1x",
      },
      {
        img: itemUrl(ITEMS.leitJolla.id),
        name: ITEMS.leitJolla.name,
        qty: "1x",
      },
      { img: itemUrl(ITEMS.pergPaz.id), name: ITEMS.pergPaz.name, qty: "1x" },
      { img: itemUrl(ITEMS.pergNovo.id), name: ITEMS.pergNovo.name, qty: "1x" },
      {
        img: itemUrl(ITEMS.pergAprim.id),
        name: ITEMS.pergAprim.name,
        qty: "3x",
      },
      { img: itemUrl(ITEMS.caixaRiq.id), name: ITEMS.caixaRiq.name, qty: "1x" },
      { img: itemUrl(ITEMS.anelExp.id), name: ITEMS.anelExp.name, qty: "1x" },
      {
        img: itemUrl(ITEMS.luvaLadrao.id),
        name: ITEMS.luvaLadrao.name,
        qty: "1x",
      },
      { img: itemUrl(ITEMS.moeda.id), name: ITEMS.moeda.name, qty: "3x" },
    ],
  },
];

// ─── SIDEBAR SECTIONS ────────────────────────────────────────────────────────
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
  { id: "gameplay", label: "Gameplay" },
  { id: "conclusao", label: "Conclusão" },
];

const classes = [
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
];

const tochasLv99 = [
  "Armas Do 75",
  "Armaduras Do 66",
  "Pérola Branca 1x",
  "Pérola Azul 1x",
  "Pérola Vermelha 1x",
  "Esfera Da Benção 1x",
  "Pedra Arco-Íris 1x",
];

const miniBosses = [
  {
    name: "Chefe Orc",
    icon: "👹",
    color: "#8B4513",
    drops: [
      "Baú do Tier II",
      "Pedra da Fundação 1x",
      "Esfera da Benção 1x",
      "Soro da Persuasão 1x",
      "Moedas da Conquista 3x",
    ],
  },
  {
    name: "Tartaruga de Pedra",
    icon: "🐢",
    color: "#4A7C59",
    drops: [
      "Baú do Tier II",
      "Compesado 1x",
      "Esfera da Benção 1x",
      "Soro da Persuasão 1x",
      "Moedas da Conquista 3x",
    ],
  },
  {
    name: "Líder Fanático Zen",
    icon: "🧙",
    color: "#6A5ACD",
    drops: [
      "Baú do Tier II",
      "Compesado 1x",
      "Esfera da Benção 1x",
      "Soro da Persuasão 1x",
      "Moedas da Conquista 3x",
    ],
  },
  {
    name: "Comandante Tigre",
    icon: "🐯",
    color: "#D4700A",
    drops: [
      "Baú do Tier II",
      "Pedra da Fundação 1x",
      "Esfera da Benção 1x",
      "Soro da Persuasão 1x",
      "Moedas da Conquista 3x",
    ],
  },
  {
    name: "Nove Caudas",
    icon: "🦊",
    color: "#C0392B",
    drops: [
      "Baú do Tier II",
      "Pedra da Fundação 1x",
      "Esfera da Benção 1x",
      "Soro da Persuasão 1x",
      "Moedas da Conquista 3x",
    ],
  },
  {
    name: "Rei Flamejante",
    icon: "🔥",
    color: "#E74C3C",
    drops: [
      "Baú do Tier II",
      "Compesado 1x",
      "Esfera da Benção 1x",
      "Soro da Persuasão 1x",
      "Moedas da Conquista 3x",
    ],
  },
  {
    name: "Aranha Rainha",
    icon: "🕷️",
    color: "#2C3E50",
    drops: [
      "Baú do Tier II",
      "Tronco 1x",
      "Esfera da Benção 1x",
      "Soro da Persuasão 1x",
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
      "Máscara Da Fortuna 1x",
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
      "Máscara Da Fortuna 1x",
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
      { tipo: "Consumível", item: "Pacote Do Sábio", qty: "1x" },
      { tipo: "Consumível", item: "Brinco Do Tigre (30d)", qty: "1x" },
      { tipo: "Consumível", item: "Pets Cash (30d)", qty: "1x" },
      { tipo: "Consumível", item: "Cupons de Cash (5 á 50k)", qty: "1x" },
      { tipo: "Item", item: "Escudo Sangrento", qty: "1x" },
      { tipo: "Item", item: "Escudo Imperadores", qty: "1x" },
      { tipo: "Item", item: "Montaria PvM (30d)", qty: "1x" },
    ],
  },
  {
    name: "Tesouro Dragão D'Agua",
    icon: "💎",
    color: "#1E90FF",
    desc: "Versão intermediária com ótimos consumíveis e Refines — (Aleatórios)",
    items: [
      { tipo: "Refine", item: "Símbolo Do Dragão", qty: "1x" },
      { tipo: "Consumível", item: "Metal Mágico+", qty: "1x" },
      { tipo: "Consumível", item: "Brinco do Tigre (7d)", qty: "1x" },
      { tipo: "Consumível", item: "Brinco Do Dragão (7d)", qty: "1x" },
      { tipo: "Consumível", item: "Livro Do Sábio", qty: "5x" },
      { tipo: "Consumível", item: "Pedra Arco-Íris", qty: "1x" },
      { tipo: "Item", item: "Montaria PvM (7d)", qty: "1x" },
      { tipo: "Item", item: "Cabelo PvM (7d)", qty: "1x" },
      { tipo: "Consumível", item: "Máscara da Fortuna", qty: "5x" },
      { tipo: "Consumível", item: "Pot Helong e Yoora (S)", qty: "1x" },
    ],
  },
  {
    name: "Tesouro Dragão De Fogo",
    icon: "📦",
    color: "#FF4500",
    desc: "Versão intermediária com ótimos consumíveis e Refines — (Aleatórios)",
    items: [
      { tipo: "Refine", item: "Amuleto Do Dragão", qty: "1x" },
      { tipo: "Consumível", item: "Metal Mágico+", qty: "1x" },
      { tipo: "Consumível", item: "Brinco do Tigre (7d)", qty: "1x" },
      { tipo: "Consumível", item: "Brinco Do Dragão (7d)", qty: "1x" },
      { tipo: "Consumível", item: "Livro Do Sábio", qty: "5x" },
      { tipo: "Consumível", item: "Pedra Arco-Íris", qty: "1x" },
      { tipo: "Item", item: "Montaria PvM (7d)", qty: "1x" },
      { tipo: "Item", item: "Cabelo PvM (7d)", qty: "1x" },
      { tipo: "Consumível", item: "Máscara da Fortuna", qty: "5x" },
      { tipo: "Consumível", item: "Pot Helong e Yoora (S)", qty: "1x" },
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
        "Tesouro Do Ceifador 1x",
        "Esfera Da Benção 2x",
        "Pergaminho Da Paz 1x",
        "Soro Da Persuação 1x",
        "Livro Do Sábio 1x",
        "Moedas Da Conquista 4x",
        "Insígnia Demoníaca 1x",
      ],
    },
    tesouro: {
      name: "Tesouro Do Ceifador",
      icon: "🎁",
      drops: [
        "Máscara Da Fortuna 2x",
        "Armas Do Nível 75",
        "Metal Mágico+ 1x",
        "Pérola Branca 2x",
        "Pérola Azul 2x",
        "Pérola Vermelha 2x",
        "Fragmento De Cristal 1x",
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
        "Tesouro do Lord Gahnasel 1x",
        "Moedas Da Conquista 15x",
        "Esfera Da Benção 2x",
        "Soro Da Persuação 2x",
        "Livro Do Sábio 2x",
        "Máscara Da Fortuna 1x",
        "Pergaminho Da Paz 5x",
      ],
    },
    tesouro: {
      name: "Tesouro do Lord Gahnasel",
      icon: "🎁",
      drops: [
        "Máscara Da Fortuna 2x",
        "Benção De Helong (G) 1x",
        "Benção De Yoora (G) 1x",
        "Chifres De Ghanasel (F)(7d) 1x",
        "Chifres De Ghanasel (M)(7d) 1x",
        "Traje Ghanasel (F)(7d) 1x",
        "Traje Ghanasel (M)(7d) 1x",
        "Pedra Arco-Íris 1x",
        "Pet Lord Ghanasel (7d) 1x",
        "Coração Do Ghanasel 1x",
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

// ─── TOOLTIP ITEM COMPONENT ──────────────────────────────────────────────────
function DropIcon({ item }: { item: DropItem }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  if (item.special) {
    // joias grid popup
    return (
      <div
        className="relative"
        ref={ref}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <div className="flex flex-col items-center cursor-pointer group">
          <div className="grid grid-cols-4 gap-0.5 w-14 h-14 p-1 rounded-lg bg-white/5 border border-primary/20 group-hover:border-primary/60 transition-all">
            {JOIAS.slice(0, 14).map((j) => (
              <img
                key={j.id}
                src={itemUrl(j.id)}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://img.m2icondb.com/50203.png";
                }}
              />
            ))}
          </div>
          <span className="text-[10px] text-primary font-bold mt-1">
            {item.qty}
          </span>
        </div>
        {show && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 bg-black/95 border border-primary/40 rounded-xl p-3 w-52 shadow-xl">
            <p className="text-primary font-bold text-xs mb-2 text-center">
              Todas as Joias
            </p>
            <div className="grid grid-cols-2 gap-1">
              {JOIAS.map((j) => (
                <div key={j.id} className="flex items-center gap-1.5">
                  <img
                    src={itemUrl(j.id)}
                    className="w-5 h-5 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://img.m2icondb.com/50203.png";
                    }}
                  />
                  <span className="text-[10px] text-muted-foreground leading-tight">
                    {j.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-primary/60 mt-2">
              +0 até +4
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="flex flex-col items-center cursor-pointer group">
        <div className="w-12 h-12 rounded-lg bg-white/5 border border-primary/20 group-hover:border-primary/60 transition-all flex items-center justify-center p-1">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              (e.target as HTMLImageElement).parentElement!.innerHTML =
                `<span class="text-xs text-muted-foreground text-center leading-tight">${item.name.slice(0, 8)}</span>`;
            }}
          />
        </div>
        <span className="text-[10px] text-primary font-bold mt-1">
          {item.qty}
        </span>
      </div>
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 bg-black/95 border border-primary/40 rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
          <p className="text-xs text-foreground font-semibold">{item.name}</p>
          <p className="text-xs text-primary">{item.qty}</p>
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function Wiki() {
  const [activeSection, setActiveSection] = useState("conceito");
  const [activeBau, setActiveBau] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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
              cada conquista é fruto do seu esforço.
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
              Para tornar o início mais acessível, todo personagem criado recebe
              um conjunto inicial +6 e a Caixa do Aventureiro, aberta a cada 10
              níveis.
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
              {classes.map((cls) => (
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
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Passe o mouse sobre cada item para ver o nome. As joias dropam
              aleatoriamente entre todas as 14 disponíveis.
            </p>
            <div className="space-y-8">
              {metinGroups.map((group) => (
                <div
                  key={group.label}
                  className="border border-primary/15 rounded-xl overflow-hidden"
                >
                  {/* Header */}
                  <div
                    className="flex items-center gap-3 px-5 py-3 border-b border-primary/10"
                    style={{ backgroundColor: group.color + "18" }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: group.color }}
                    />
                    <p
                      className="font-bold text-sm"
                      style={{ color: group.color }}
                    >
                      Pedra Metin — {group.label}
                    </p>
                  </div>
                  {/* Icons */}
                  <div className="px-5 py-5 flex flex-wrap gap-4 items-end bg-primary/[0.02]">
                    {group.drops.map((item, i) => (
                      <DropIcon key={i} item={item} />
                    ))}
                  </div>
                </div>
              ))}

              {/* Tochas */}
              <div className="border border-primary/15 rounded-xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-primary/10 bg-orange-500/10">
                  <div className="w-2 h-2 rounded-full bg-orange-400" />
                  <p className="font-bold text-sm text-orange-400">
                    Tochas — Lv 99
                  </p>
                </div>
                <div className="px-5 py-4">
                  {tochasLv99.map((d) => (
                    <div
                      key={d}
                      className="flex items-center gap-2 text-sm text-muted-foreground mb-1.5"
                    >
                      <span className="text-orange-400 text-xs">◆</span>
                      {d}
                    </div>
                  ))}
                </div>
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
                  className="border rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-200"
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
                    {boss.drops.map((drop) => (
                      <div
                        key={drop}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span style={{ color: boss.color }} className="text-xs">
                          ◆
                        </span>
                        {drop}
                      </div>
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
                      <div
                        key={d}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span style={{ color: boss.color }} className="text-xs">
                          ◆
                        </span>
                        {d}
                      </div>
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
                      <div
                        key={d}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span style={{ color: boss.color }} className="text-xs">
                          ◆
                        </span>
                        {d}
                      </div>
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
                      <div
                        key={d}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span style={{ color: boss.color }} className="text-xs">
                          ◆
                        </span>
                        {d}
                      </div>
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
                            <div
                              key={drop}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span
                                style={{ color: d.color }}
                                className="text-xs mt-0.5 shrink-0"
                              >
                                ◆
                              </span>
                              {drop}
                            </div>
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
