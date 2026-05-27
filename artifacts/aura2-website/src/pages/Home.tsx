import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Download, MessagesSquare, ExternalLink, X } from "lucide-react";

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

type Post = {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  ago: string;
  gradient: string;
  desc?: string;
  badge?: string;
  featured?: boolean;
  fullContent: string;
};

const POSTS: Record<Tab, Post[]> = {
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
      fullContent: `O Aura2 entra oficialmente na sua Fase Beta! Durante 15 dias, jogadores selecionados terão acesso exclusivo ao servidor para testar todos os sistemas antes do lançamento oficial.\n\nO que testar:\n• Sistema de combate PvP e PvE\n• Balanceamento das 4 classes (Guerreiro, Ninja, Shura e Shaman)\n• Sistema de itens, drops e dungeons\n• Economia do servidor e loja de Cash\n• Estabilidade e performance geral\n\nComo participar:\nAcesse o servidor normalmente pelo cliente disponível na página de Download. Crie sua conta, escolha sua classe e comece a explorar. Todos os jogadores com conta ativa durante a Fase Beta estão automaticamente participando.\n\nLembre-se: qualquer bug ou problema encontrado deve ser reportado no Discord oficial. A sua participação é fundamental para termos um lançamento oficial sólido e sem falhas!`,
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
      fullContent: `Para agradecer a todos que ajudaram a construir o Aura2 durante a Fase Beta, preparamos uma recompensa especial no lançamento oficial!\n\nComo funciona:\nTodo jogador que estiver ativo durante os 15 dias de Fase Beta receberá uma quantidade de Cash Coins creditada automaticamente na sua conta assim que o servidor oficial abrir.\n\nQuantidade de Cash por participação:\n• Jogou pelo menos 1 vez durante a beta: 500 Cash Coins\n• Reportou pelo menos 1 bug confirmado: +300 Cash Coins bônus\n• Jogou mais de 5 horas durante a beta: +200 Cash Coins bônus\n\nQuando recebo?\nAs recompensas serão creditadas automaticamente nas primeiras 24 horas após a abertura oficial do servidor. Não é necessário fazer nenhuma ação — basta ter uma conta ativa.\n\nAproveite a Fase Beta, explore tudo e ajude a tornar o Aura2 o melhor servidor possível!`,
    },
    {
      id: 3,
      category: "Fase Beta",
      categoryColor: "#b8860b",
      title: "Reporte de Bugs — Como Participar",
      ago: "hoje",
      gradient: "linear-gradient(135deg, #0a1208 0%, #1a3010 100%)",
      desc: "Encontrou algo errado? Reporte pelo Discord com prints e descrição detalhada. Bugs confirmados garantem recompensas extras no lançamento.",
      fullContent: `Encontrou algo errado no servidor? Sua ajuda é essencial! Reportar bugs é uma das formas mais importantes de contribuir com a qualidade do Aura2.\n\nComo reportar um bug:\n1. Acesse o canal #reporte-bugs no Discord oficial do Aura2\n2. Use o template disponível no canal (Nome, Classe, Descrição do bug, Print/vídeo)\n3. Aguarde a confirmação da equipe\n\nO que reportar:\n• Crashes e desconexões inesperadas\n• Itens com stats incorretos ou duplicados\n• Habilidades que não funcionam corretamente\n• Exploits ou brechas que permitem vantagem injusta\n• Problemas visuais no mapa ou personagens\n\nO que NÃO é um bug:\n• Mecânicas intencionais do servidor (verifique no Wiki primeiro)\n• Lag causado pela sua conexão\n\nRecompensa por bug confirmado:\nCada bug reportado e confirmado pela equipe garante +300 Cash Coins extras no lançamento oficial. Bugs críticos podem garantir recompensas ainda maiores!\n\nObrigado por ajudar a tornar o Aura2 melhor para todos.`,
    },
    {
      id: 4,
      category: "Fase Beta",
      categoryColor: "#b8860b",
      title: "Regras e Conduta na Fase Beta",
      ago: "hoje",
      gradient: "linear-gradient(135deg, #0a0818 0%, #1a1240 100%)",
      desc: "Respeite os outros testadores, não explore bugs intencionalmente e colabore com a equipe. Violações podem resultar em exclusão e perda da recompensa.",
      fullContent: `Para garantir que a Fase Beta seja produtiva e justa para todos, pedimos que todos os participantes sigam as regras abaixo.\n\nRegras obrigatórias:\n• Não explore bugs intencionalmente para obter vantagem sobre outros jogadores\n• Reporte qualquer exploit encontrado imediatamente no Discord\n• Respeite todos os outros jogadores — sem ofensas, racismo ou toxicidade\n• Não utilize programas externos (bots, hacks, speed hacks)\n• Não faça spam no chat do servidor ou no Discord\n\nConsequências de violações:\n• Aviso: infrações leves (primeira vez)\n• Exclusão da beta: exploits intencionais ou comportamento tóxico grave\n• Banimento permanente: uso de hacks ou exploits que prejudiquem outros\n• Perda da recompensa de Cash: qualquer violação das regras\n\nNossa missão na Fase Beta é simples: testar, reportar e colaborar. Juntos vamos construir o melhor servidor possível!\n\nEm caso de dúvidas sobre as regras, fale com um membro da equipe no Discord.`,
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
      fullContent: `Confira abaixo todos os eventos programados para a Temporada 1 do Aura2:\n\nEventos Semanais:\n• Segunda a Sexta — Invasão de Metins: Metins especiais aparecem em todos os mapas com drop dobrado\n• Sábado 20h — Guerra de Reinos: Os três reinos se enfrentam pela supremacia. Recompensas para o reino vencedor\n• Domingo — Drop Dobrado em Dungeons: Todo o drop de dungeons é multiplicado por 2\n\nEventos Mensais:\n• Torneio PvP 1v1: Os melhores lutadores do servidor se enfrentam em batalhas individuais. Prêmio: itens exclusivos\n• Boss Mundial: Um boss gigante aparece no mapa e só pode ser derrotado com cooperação de vários jogadores\n\nEventos Especiais (em breve):\n• Festival de Sangue: Evento temático com missões especiais e drops raros\n• Caça ao Tesouro: Pistas espalhadas pelo mapa levam a um baú com itens únicos\n\nFique atento ao Discord para anúncios de datas e horários exatos. Todos os horários são em horário de Brasília (GMT-3).`,
    },
    {
      id: 6,
      category: "Eventos",
      categoryColor: "#c0392b",
      title: "Evento de Boas-Vindas Beta",
      ago: "há 2 dias",
      gradient: "linear-gradient(135deg, #2a0505 0%, #600a0a 100%)",
      desc: "Durante a Fase Beta todos os jogadores recebem 500 Cash Coins de bônus ao criar conta.",
      fullContent: `Para celebrar o início da Fase Beta, todo jogador que criar conta durante este período receberá um bônus especial de boas-vindas!\n\nO que você recebe ao criar conta:\n• 500 Cash Coins de bônus imediato\n• Kit iniciante com equipamentos de nível básico\n• 3 poções de experiência (dobra o XP por 1 hora cada)\n• Acesso ao canal exclusivo de testadores beta no Discord\n\nComo resgatar:\nO bônus é creditado automaticamente ao criar sua conta e entrar no servidor pela primeira vez. Não é necessário nenhum código ou ação adicional.\n\nValid até:\nEste bônus é exclusivo para contas criadas durante os 15 dias da Fase Beta. Após o encerramento, o evento de boas-vindas será encerrado.\n\nConvide seus amigos! Quanto mais testadores, melhor será o servidor no lançamento oficial. Compartilhe o link de download e venham juntos explorar o Aura2!`,
    },
    {
      id: 7,
      category: "Eventos",
      categoryColor: "#c0392b",
      title: "Guerra de Reinos — Fim de Semana",
      ago: "há 5 dias",
      gradient: "linear-gradient(135deg, #1a0808 0%, #4a1010 100%)",
      desc: "Guerra entre os três reinos acontece todo sábado às 20h. Os vencedores ganham buffs especiais.",
      fullContent: `Todo sábado às 20h (horário de Brasília), os três reinos do Aura2 entram em guerra pela supremacia do servidor!\n\nComo funciona:\nAo entrar no servidor, você pertence automaticamente a um dos três reinos: Vermelho, Amarelo ou Azul. Durante a Guerra de Reinos, o objetivo é conquistar e defender o Castelo Central no meio do mapa.\n\nRegras:\n• A guerra dura 2 horas (20h às 22h aos sábados)\n• O reino que controlar o Castelo Central por mais tempo vence\n• Mortes durante a guerra dão pontos para o seu reino\n• É possível fazer alianças temporárias com outros reinos\n\nRecompensas para o reino vencedor:\n• Buff de +20% de EXP por 24 horas para todos os membros\n• Buff de +15% de drop por 24 horas\n• Título exclusivo "Conquistador" para o jogador com mais kills\n\nComo participar:\nBasta estar online no servidor no horário da guerra. A participação é automática — você lutará com seu reino.\n\nPrepare sua build, reúna seus aliados e conquiste o reino!`,
    },
    {
      id: 8,
      category: "Eventos",
      categoryColor: "#c0392b",
      title: "Drop Dobrado — Dungeons",
      ago: "há 1 semana",
      gradient: "linear-gradient(135deg, #1a0a00 0%, #3a1500 100%)",
      desc: "Todos os finais de semana o drop de itens em dungeons é dobrado.",
      fullContent: `Todo final de semana (sábado e domingo), o drop de itens em todas as dungeons do servidor é dobrado!\n\nDungeons participantes:\n• Caverna dos Dragões (recomendado nv 40+)\n• Templo Sombrio (recomendado nv 60+)\n• Fortaleza do Caos (recomendado nv 80+)\n• Torre dos Demônios (recomendado nv 95+)\n\nO que dobra:\n• Drop de itens normais e mágicos\n• Drop de materiais de craft\n• Drop de Yang (moeda do jogo)\n• Chance de drop de itens raros e únicos\n\nHorário:\nO evento começa automaticamente à 00h01 do sábado e termina às 23h59 do domingo (horário de Brasília).\n\nDicas para aproveitar:\n• Forme grupos de 3 a 5 jogadores para maior eficiência\n• Use poções de sorte para aumentar ainda mais suas chances\n• As dungeons de nível mais alto têm drops proporcionalmente melhores\n\nBom farming para todos!`,
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
      fullContent: `Atualização 13.05 — lançada em 13 de Maio\n\nBalanceamento de Classes:\n• Guerreiro: dano da habilidade "Espada Furiosa" reduzido em 8% no PvP\n• Ninja: velocidade de ataque aumentada em 5%\n• Shura: custo de mana da habilidade "Explosão Arcana" reduzido em 15%\n• Shaman: eficiência de cura aumentada em 10% no PvP\n\nNovos Itens na Loja:\n• Asa de Movimento (velocidade +20% por 7 dias)\n• Pergaminho de Renome (dobra o EXP de guild por 24h)\n• Pacote Iniciante Premium (equipamentos +7 para nível 40)\n\nCorreções de Bugs:\n• Corrigido crash ao entrar na Fortaleza do Caos com mais de 8 jogadores\n• Corrigido problema onde poções de EXP não funcionavam em dungeons\n• Corrigida animação quebrada do Shura feminino ao usar teleporte\n• Corrigido drop incorreto de Yang em mobs do Mapa 3\n\nMelhorias de Performance:\n• Redução de 20% no uso de memória do servidor\n• Melhoria no tempo de resposta durante eventos de massa (Guerra de Reinos)\n• Otimização do sistema de carregamento de mapas\n\nPróxima atualização prevista para 20 de Maio.`,
    },
    {
      id: 10,
      category: "Notícias",
      categoryColor: "#2471a3",
      title: "Sistema de Doação PIX Ativo",
      ago: "há 3 dias",
      gradient: "linear-gradient(135deg, #051520 0%, #0a2540 100%)",
      desc: "Agora é possível comprar Cash Coins via PIX diretamente pelo site com confirmação automática.",
      fullContent: `O sistema de doação via PIX está oficialmente ativo no Aura2!\n\nComo funciona:\n1. Acesse a página de Doação no menu do site\n2. Faça login na sua conta\n3. Escolha o pacote de Cash Coins desejado\n4. Escaneie o QR Code PIX ou copie a chave\n5. Realize o pagamento no seu banco\n6. O Cash é creditado automaticamente em até 5 minutos!\n\nPacotes disponíveis:\n• 100 Cash Coins — R$ 5,00\n• 300 Cash Coins — R$ 12,00 (melhor custo-benefício)\n• 700 Cash Coins — R$ 25,00\n• 1500 Cash Coins — R$ 49,00\n• 3500 Cash Coins — R$ 99,00\n\nConfirmação automática:\nO sistema usa a API do Mercado Pago com webhook de confirmação instantânea. Assim que o PIX é processado pelo banco, o servidor recebe a confirmação e credita o Cash automaticamente — sem precisar enviar comprovante!\n\nProblemas com o pagamento?\nSe o Cash não for creditado em 15 minutos, entre em contato pelo Discord com o ID da transação.`,
    },
    {
      id: 11,
      category: "Notícias",
      categoryColor: "#2471a3",
      title: "Discord Oficial Aberto",
      ago: "há 4 dias",
      gradient: "linear-gradient(135deg, #080d1a 0%, #10183a 100%)",
      desc: "O Discord oficial do Aura2 está aberto. Junte-se à comunidade e fique por dentro de tudo.",
      fullContent: `O Discord oficial do Aura2 está aberto para todos os jogadores!\n\nO que você encontra no Discord:\n• #anúncios — Atualizações, eventos e novidades oficiais\n• #reporte-bugs — Canal para reportar problemas durante a Fase Beta\n• #suporte — Atendimento da equipe para dúvidas e problemas\n• #builds-e-dicas — Compartilhe estratégias e builds com a comunidade\n• #offtopic — Bate-papo geral\n• #procuro-grupo — Encontre parceiros para dungeons e guerras\n\nCanais de voz:\n• Salas separadas por reino (Vermelho, Amarelo, Azul)\n• Sala de coordenação para Guerra de Reinos\n• Sala geral de voz\n\nBenefícios de entrar no Discord:\n• Ser o primeiro a saber sobre eventos e atualizações\n• Acesso a sorteios e giveaways exclusivos para membros\n• Contato direto com a equipe do servidor\n\nAcesse o link de convite fixado no site e entre agora! A comunidade do Aura2 te aguarda.`,
    },
    {
      id: 12,
      category: "Notícias",
      categoryColor: "#2471a3",
      title: "Suporte via Tickets no Site",
      ago: "hoje",
      gradient: "linear-gradient(135deg, #050a15 0%, #0a1530 100%)",
      desc: "Agora você pode abrir tickets de suporte diretamente pela sua conta no site.",
      fullContent: `O sistema de suporte via tickets está disponível diretamente no site do Aura2!\n\nComo abrir um ticket:\n1. Faça login na sua conta no site\n2. Acesse "Minha Conta" no menu\n3. Clique em "Abrir Ticket de Suporte"\n4. Selecione a categoria do problema\n5. Descreva o problema com detalhes\n6. Aguarde a resposta da equipe\n\nCategorias disponíveis:\n• Problema técnico (não consigo entrar, crash, bug)\n• Conta (senha, e-mail, dados)\n• Pagamento (Cash não creditado, cobrança indevida)\n• Denúncia (hack, exploit, comportamento abusivo)\n• Outros\n\nTempo de resposta:\n• Problemas de pagamento: até 2 horas\n• Problemas técnicos: até 24 horas\n• Outros: até 48 horas\n\nAtenção: Para emergências urgentes (conta hackeada, perda de itens), use o canal #suporte-urgente no Discord para atendimento imediato.\n\nO sistema de tickets substitui o antigo método de suporte por e-mail e é muito mais rápido e eficiente.`,
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
      fullContent: `Versão 3.4 — lançada em 24 de Maio\n\nPrincipais mudanças:\n\nEstabilidade:\n• Corrigido crash crítico que ocorria durante a Guerra de Reinos com mais de 100 jogadores simultâneos\n• Melhorado sistema de gerenciamento de memória — menos desconexões inesperadas\n• Atualizado motor de física do servidor para reduzir lag em combates em massa\n\nSistema de PvP:\n• Novo sistema de pontuação de honra para Arena\n• Adicionado ranking semanal de PvP com recompensas para o top 3\n• Balanceados os buffs de reino após a Guerra de Reinos\n• Corrigido bug onde ataques à distância atravessavam paredes\n\nInterface:\n• Novo minimapa com indicadores de posição de aliados\n• Adicionado indicador de buffs ativos na interface\n• Melhorada a leitura de dano nos números flutuantes\n\nOutras correções:\n• Corrigido drop incorreto no Mapa 2 — Floresta Sombria\n• Corrigida sincronização de animações em grupos grandes\n• Normalizado o spawn de mobs após eventos especiais\n\nA equipe continua trabalhando para entregar um servidor cada vez mais estável. Obrigado pelo feedback de todos!`,
    },
    {
      id: 14,
      category: "Update",
      categoryColor: "#1a7a4a",
      title: "Novo Mapa: Fortaleza do Caos",
      ago: "há 1 semana",
      gradient: "linear-gradient(135deg, #0a0f05 0%, #1a2a0a 100%)",
      desc: "Um novo mapa foi adicionado com bosses exclusivos e drops raros para grupos.",
      fullContent: `Apresentamos a Fortaleza do Caos — o novo mapa de alto nível do Aura2!\n\nRequisitos:\n• Nível mínimo: 80\n• Recomendado: grupo de 3 a 5 jogadores\n• Entrada: Portal localizado no Mapa 3 — Planície do Norte\n\nO que esperar:\n• 5 zonas de dificuldade crescente\n• 3 bosses únicos com mecânicas especiais\n• Drops exclusivos que não aparecem em nenhum outro lugar\n• Sistema de pontos de conquista para acesso às zonas mais profundas\n\nBosses e drops exclusivos:\n• Guardião de Ferro (Zona 2): Dropa armadura +9 de guerreiro\n• Arquimago Maldito (Zona 4): Dropa pergaminho de habilidade lendário\n• Senhor do Caos (Zona 5): Dropa arma única do servidor com atributos especiais\n\nDicas para explorar:\n• Leve poções de cura e mana em abundância\n• O Senhor do Caos reseta a luta se todos os jogadores estiverem fora do alcance\n• Alguns itens da Fortaleza são necessários para as melhores receitas de craft\n\nBoa sorte, aventureiros — a Fortaleza do Caos aguarda!`,
    },
    {
      id: 15,
      category: "Update",
      categoryColor: "#1a7a4a",
      title: "Classe Shaman Rebalanceada",
      ago: "há 1 semana",
      gradient: "linear-gradient(135deg, #051015 0%, #0a2030 100%)",
      desc: "Habilidades de cura e suporte da Shaman foram ajustadas para melhor equilíbrio no PvP.",
      fullContent: `Com base no feedback da comunidade e nos dados de balanceamento coletados, realizamos ajustes significativos na classe Shaman.\n\nMudanças no PvP:\n• Cura Sagrada: reduzida em 12% (era muito forte em duelos prolongados)\n• Escudo Espiritual: duração reduzida de 8s para 6s\n• Raio Divino: dano aumentado em 10% (compensando a redução defensiva)\n• Nova habilidade passiva: "Aura de Proteção" — reduz 5% do dano recebido permanentemente\n\nMudanças no PvE:\n• Cura em Área: eficiência aumentada em 20% em dungeons\n• Ressurreição: cooldown reduzido de 5 minutos para 3 minutos\n• Buff de Grupo: duração aumentada de 15 para 20 minutos\n\nMudanças gerais:\n• Mana base aumentada em 8%\n• Velocidade de cast levemente aumentada (+5%)\n• Animações de algumas habilidades suavizadas\n\nObjetivo do rebalanceamento:\nO Shaman é a única classe de suporte do servidor. O objetivo é mantê-la útil e relevante tanto no PvE quanto no PvP, sem que seja imbatível em duelos individuais. Continuaremos monitorando as estatísticas.\n\nFeedback? Participe da discussão no canal #balanceamento do Discord.`,
    },
    {
      id: 16,
      category: "Update",
      categoryColor: "#1a7a4a",
      title: "Anti-Cheat Atualizado",
      ago: "há 2 semanas",
      gradient: "linear-gradient(135deg, #0f1505 0%, #202d0a 100%)",
      desc: "Sistema anti-cheat foi reforçado para garantir uma experiência justa para todos.",
      fullContent: `O sistema anti-cheat do Aura2 foi completamente renovado para garantir um ambiente de jogo justo para todos os jogadores!\n\nO que mudou:\n• Novo sistema de detecção de speed hacks com precisão melhorada em 40%\n• Detecção de bots e macros de automação aprimorada\n• Sistema de análise de padrões de movimento suspeitos\n• Integração com banco de dados de hacks conhecidos para Metin2\n\nO que o sistema detecta:\n• Speed hacks (movimentação além da velocidade normal)\n• Damage hacks (dano além do máximo permitido)\n• Bots de farm automático\n• Duplicação de itens\n• Modificações no cliente do jogo\n\nConsequências para cheaters:\n• 1ª detecção: banimento temporário de 7 dias + perda de todos os itens obtidos durante o uso\n• 2ª detecção: banimento permanente\n• Banimentos são revisáveis via ticket de suporte com comprovação\n\nNota importante:\nSe você receber um banimento indevido (falso positivo), abra um ticket imediatamente com prints e detalhes. Nossa equipe revisa em até 24 horas.\n\nO Aura2 é um servidor focado em jogo limpo e competição justa. Tolerância zero com trapaças!`,
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
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const videoRefs = useRef<Partial<Record<VideoKey, HTMLVideoElement>>>({});

  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedPost]);

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
      <section className="relative z-30 container mx-auto px-4 py-14">
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
              onClick={() => setSelectedPost(post)}
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

      {/* POST MODAL */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10"
            style={{ background: "linear-gradient(160deg, #0f0c06 0%, #1a1408 100%)", boxShadow: "0 0 60px rgba(212,160,23,0.15), 0 4px 40px rgba(0,0,0,0.8)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header banner */}
            <div className="h-24 rounded-t-2xl" style={{ background: selectedPost.gradient }} />

            {/* Close button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 pt-5">
              {/* Category badge */}
              <span
                className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mb-3"
                style={{ background: selectedPost.categoryColor + "33", color: selectedPost.categoryColor, border: `1px solid ${selectedPost.categoryColor}55` }}
              >
                {selectedPost.badge ?? selectedPost.category}
              </span>

              <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                {selectedPost.title}
              </h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-5">
                {selectedPost.ago}
              </p>

              <div className="border-t border-white/8 pt-5">
                {selectedPost.fullContent.split("\n").map((line, i) => (
                  line === "" ? (
                    <div key={i} className="h-3" />
                  ) : (
                    <p
                      key={i}
                      className={`text-sm leading-relaxed ${line.startsWith("•") ? "text-gray-300 pl-3" : line.match(/^[A-ZÁÉÍÓÚÀÃÕÂÊÔ].*:$/) ? "text-white font-semibold mt-1" : "text-gray-400"}`}
                    >
                      {line}
                    </p>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
