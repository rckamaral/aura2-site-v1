import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Book, Swords, Shield, Map as MapIcon, Scroll, Calendar } from "lucide-react";

const CATEGORIES = [
  { title: "Classes", icon: Swords, desc: "Guia completo de habilidades, status e builds para cada classe." },
  { title: "Equipamentos", icon: Shield, desc: "Armas, armaduras, refinações e sistemas de evolução." },
  { title: "Mapas", icon: MapIcon, desc: "Zonas de up, locais de farm, dungeons e chefes." },
  { title: "Sistemas", icon: Book, desc: "Alquimia, Pets, Montarias, Faixas e sistemas exclusivos." },
  { title: "Missões", icon: Scroll, desc: "Missões do biólogo, quests principais e secundárias." },
  { title: "Eventos", icon: Calendar, desc: "Cronograma e guias de eventos semanais e mensais." },
];

export default function Wiki() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-24 animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="font-display text-4xl md:text-5xl font-black text-white tracking-wider">BIBLIOTECA SAGRADA</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Explore o conhecimento ancestral. Tudo o que você precisa saber para dominar o continente de Aura2.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Card key={i} className="bg-black/40 border-primary/20 hover:border-primary/60 transition-all hover:-translate-y-1 cursor-pointer group backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-white font-bold">{cat.title}</CardTitle>
                  <CardDescription className="text-gray-400 mt-2">{cat.desc}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
}
