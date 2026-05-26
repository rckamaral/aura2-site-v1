import { ShoppingCart, Coins, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";

const PACKAGES = [
  { amount: "10.000", price: "R$10,00", priceNum: 10 },
  { amount: "22.000", price: "R$20,00", priceNum: 20, bonus: "+2.000 bônus" },
  { amount: "65.000", price: "R$50,00", priceNum: 50, bonus: "+5.000 bônus", popular: true },
  { amount: "135.000", price: "R$100,00", priceNum: 100, bonus: "+10.000 bônus" },
  { amount: "275.000", price: "R$200,00", priceNum: 200, bonus: "+25.000 bônus" },
  { amount: "420.000", price: "R$300,00", priceNum: 300, bonus: "+45.000 bônus" },
];

export default function Loja() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  function handleComprar() {
    if (user) {
      navigate("/conta");
    } else {
      document.getElementById("navbar-login-btn")?.click();
    }
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 text-green-400 text-sm font-semibold mb-4">
            <Coins className="w-4 h-4" />
            Loja de Cash
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-3">
            MOEDAS <span className="text-green-400">CASH</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Adquira moedas premium e potencialize sua experiência no Aura 2.
          </p>
        </div>

        <div className="space-y-3">
          {PACKAGES.map((pkg, i) => (
            <div
              key={i}
              className={`relative flex items-center justify-between rounded-xl border px-6 py-5 transition-all duration-200 group
                ${pkg.popular
                  ? "border-green-400/60 bg-green-950/30 shadow-[0_0_24px_rgba(74,222,128,0.15)]"
                  : "border-green-900/40 bg-zinc-950/60 hover:border-green-600/40 hover:bg-green-950/20 hover:shadow-[0_0_16px_rgba(74,222,128,0.08)]"
                }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-6 flex items-center gap-1 bg-green-500 text-black text-[11px] font-bold px-3 py-0.5 rounded-full">
                  <Star className="w-3 h-3" /> MAIS POPULAR
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className={`font-display font-black text-3xl leading-none tracking-tight ${pkg.popular ? "text-green-300" : "text-green-400"}`}>
                    {pkg.amount}
                  </span>
                  <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium mt-0.5">
                    Moedas Cash
                  </span>
                  {pkg.bonus && (
                    <span className="text-[11px] text-green-500 font-semibold mt-1 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> {pkg.bonus}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-xl font-bold text-white tabular-nums">{pkg.price}</span>
                <Button
                  onClick={handleComprar}
                  className="bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-wider px-5 shadow-[0_0_12px_rgba(74,222,128,0.3)] hover:shadow-[0_0_20px_rgba(74,222,128,0.5)] transition-all"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Comprar
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl border border-yellow-500/20 bg-yellow-950/20 text-center">
          <p className="text-yellow-400/80 text-sm">
            Pagamentos via <span className="font-semibold text-yellow-400">PIX · Cartão de Crédito · Boleto</span> — processados com segurança.
          </p>
        </div>

      </div>
    </div>
  );
}
