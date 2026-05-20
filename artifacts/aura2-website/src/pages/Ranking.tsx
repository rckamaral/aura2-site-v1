import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MOCK_PLAYERS = [
  { rank: 1, name: "DarkLord", class: "Guerreiro", level: 105, guild: "Immortals", kingdom: "Jinno" },
  { rank: 2, name: "ShadowStep", class: "Ninja", level: 104, guild: "Shadows", kingdom: "Shinsoo" },
  { rank: 3, name: "MagicWeaver", class: "Shura", level: 104, guild: "Immortals", kingdom: "Jinno" },
  { rank: 4, name: "HealMe", class: "Shaman", level: 102, guild: "Support", kingdom: "Chunjo" },
  { rank: 5, name: "BladeMaster", class: "Guerreiro", level: 101, guild: "Warriors", kingdom: "Shinsoo" },
  { rank: 6, name: "Assassin", class: "Ninja", level: 100, guild: "Shadows", kingdom: "Jinno" },
  { rank: 7, name: "DarkMage", class: "Shura", level: 99, guild: "Magic", kingdom: "Chunjo" },
  { rank: 8, name: "DragonSlayer", class: "Guerreiro", level: 98, guild: "Dragons", kingdom: "Jinno" },
  { rank: 9, name: "SwiftStrike", class: "Ninja", level: 97, guild: "Shadows", kingdom: "Shinsoo" },
  { rank: 10, name: "HolyLight", class: "Shaman", level: 96, guild: "Support", kingdom: "Jinno" },
];

export default function Ranking() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-24 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="font-display text-4xl md:text-5xl font-black text-white tracking-wider">HALL DA FAMA</h1>
          <p className="text-muted-foreground text-lg">Os guerreiros mais poderosos de Aura2.</p>
        </div>

        <div className="bg-black/40 border border-primary/20 rounded-xl overflow-hidden backdrop-blur-sm">
          <Table>
            <TableHeader className="bg-primary/5">
              <TableRow className="border-primary/20 hover:bg-transparent">
                <TableHead className="w-16 text-center text-primary font-bold">#</TableHead>
                <TableHead className="text-primary font-bold">Nome</TableHead>
                <TableHead className="text-primary font-bold">Classe</TableHead>
                <TableHead className="text-primary font-bold text-center">Nível</TableHead>
                <TableHead className="text-primary font-bold">Guild</TableHead>
                <TableHead className="text-primary font-bold">Reino</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_PLAYERS.map((player) => (
                <TableRow key={player.rank} className="border-primary/10 hover:bg-primary/5 transition-colors">
                  <TableCell className="text-center font-display text-lg font-bold">
                    <span className={player.rank <= 3 ? "text-primary drop-shadow-[0_0_5px_rgba(212,160,23,0.8)]" : "text-muted-foreground"}>
                      {player.rank}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold text-white">{player.name}</TableCell>
                  <TableCell className="text-gray-300">{player.class}</TableCell>
                  <TableCell className="text-center font-mono text-primary font-bold">{player.level}</TableCell>
                  <TableCell className="text-gray-300">{player.guild}</TableCell>
                  <TableCell className="text-gray-300">{player.kingdom}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
