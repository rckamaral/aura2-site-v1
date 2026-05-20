import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Download, MessagesSquare } from "lucide-react";
import heroImage from "@assets/{1DD7422B-DC4E-4688-B569-1EC26B0F41E5}_1779318144976.png";

export default function Home() {
  return (
    <div className="relative w-full flex-1 flex flex-col justify-center min-h-[calc(100vh-5rem)]">
      {/* Background image setup */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img src={heroImage} alt="Aura2 Background" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary backdrop-blur-sm">
            <span className="mr-2 flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            × Season 1 Online • Evento Especial Ativo
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight">
            <span className="text-white">UMA NOVA LENDA</span><br/>
            <span className="text-primary drop-shadow-[0_0_15px_rgba(212,160,23,0.5)]">NASCE</span>
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
      </div>

      <div className="container mx-auto px-4 pb-12 mt-auto">
        <div className="flex justify-center sm:justify-start gap-4 sm:gap-6 overflow-x-auto pb-4">
          {["Guerreiro", "Ninja", "Shura", "Shaman"].map((cls) => (
            <div key={cls} className="flex-shrink-0 group cursor-pointer">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-primary/20 bg-black/60 overflow-hidden flex items-center justify-center transition-all group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(212,160,23,0.4)]">
                <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider opacity-50 group-hover:opacity-100 transition-opacity">{cls}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
