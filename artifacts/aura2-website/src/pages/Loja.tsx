import { Heart, Coins, Zap, Star, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const PACKAGES = [
  { amount: "10.000", price: "R$10,00" },
  { amount: "22.000", price: "R$20,00", bonus: "+2.000 bônus" },
  { amount: "65.000", price: "R$50,00", bonus: "+5.000 bônus", popular: true },
  { amount: "135.000", price: "R$100,00", bonus: "+10.000 bônus" },
  { amount: "275.000", price: "R$200,00", bonus: "+25.000 bônus" },
  { amount: "420.000", price: "R$300,00", bonus: "+45.000 bônus" },
];

export default function Loja() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-9 h-9 text-primary" />
          </div>
          <h2 className="font-display text-3xl font-black text-white mb-3">
            ACESSO RESTRITO
          </h2>
          <p className="text-muted-foreground mb-6">
            Precisas de estar logado para aceder à área de doações.
          </p>
          <Button
            className="bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-wider px-8"
            onClick={() => document.getElementById("navbar-login-btn")?.click()}
          >
            Fazer Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 text-primary text-sm font-semibold mb-4">
            <Heart className="w-4 h-4" />
            Apoie o Servidor
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-3">
            ÁREA DE <span className="text-primary">DOAÇÃO</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Ao doar, recebes Moedas Cash para usar no jogo e ajudas a manter o Aura 2 no ar.
          </p>
        </div>

        <div className="space-y-3">
          {PACKAGES.map((pkg, i) => (
            <div
              key={i}
              className={`relative flex items-center justify-between rounded-xl border px-6 py-5 transition-all duration-200
                ${pkg.popular
                  ? "border-primary/60 bg-primary/5 shadow-[0_0_24px_rgba(212,160,23,0.12)]"
                  : "border-primary/20 bg-zinc-950/60 hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_16px_rgba(212,160,23,0.08)]"
                }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-6 flex items-center gap-1 bg-primary text-black text-[11px] font-bold px-3 py-0.5 rounded-full">
                  <Star className="w-3 h-3" /> MAIS POPULAR
                </div>
              )}

              <div className="flex flex-col">
                <span className="font-display font-black text-3xl leading-none tracking-tight text-primary">
                  {pkg.amount}
                </span>
                <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium mt-0.5">
                  Moedas Cash
                </span>
                {pkg.bonus && (
                  <span className="text-[11px] text-primary/70 font-semibold mt-1 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {pkg.bonus}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-6">
                <span className="text-xl font-bold text-white tabular-nums">{pkg.price}</span>
                <Button
                  className="bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-wider px-5 shadow-[0_0_12px_rgba(212,160,23,0.25)] hover:shadow-[0_0_20px_rgba(212,160,23,0.4)] transition-all"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Doar
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl border border-primary/20 bg-primary/5 text-center">
          <p className="text-primary/70 text-sm">
            Doações via <span className="font-semibold text-primary">PIX · Cartão de Crédito · Boleto</span> — processadas com segurança.
          </p>
        </div>

      </div>
    </div>
  );
}
