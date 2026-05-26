import { useState } from "react";
import { Heart, Coins, Zap, Star, Lock, CreditCard, Copy, Check, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { generatePixPayload } from "@/lib/pix";

const PACKAGES = [
  { amount: "10.000", price: "R$10,00", value: 10 },
  { amount: "22.000", price: "R$20,00", value: 20, bonus: "+2.000 bônus" },
  { amount: "65.000", price: "R$50,00", value: 50, bonus: "+5.000 bônus", popular: true },
  { amount: "135.000", price: "R$100,00", value: 100, bonus: "+10.000 bônus" },
  { amount: "275.000", price: "R$200,00", value: 200, bonus: "+25.000 bônus" },
  { amount: "420.000", price: "R$300,00", value: 300, bonus: "+45.000 bônus" },
];

const PIX_KEY = "aura2brasil@gmail.com";

type Step = "method" | "pix" | "card";
type Package = (typeof PACKAGES)[number];

function PixStep({ pkg, onBack }: { pkg: Package; onBack: () => void }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  function handleCopy() {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    toast({ title: "Chave PIX copiada!", description: "Cole no seu app de pagamento." });
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Pacote selecionado</p>
          <p className="font-display font-black text-xl text-primary">{pkg.amount} Moedas Cash</p>
        </div>
        <p className="text-2xl font-bold text-white">{pkg.price}</p>
      </div>

      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-xl border border-primary/30 bg-black/40 mx-auto">
          <QrCode className="w-20 h-20 text-primary/60" strokeWidth={1} />
        </div>
        <p className="text-xs text-muted-foreground">QR Code disponível em breve</p>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground text-xs uppercase tracking-wider">Chave PIX (e-mail)</Label>
        <div className="flex gap-2">
          <Input
            value={PIX_KEY}
            readOnly
            className="bg-black/40 border-primary/20 text-white font-mono text-sm"
          />
          <Button
            onClick={handleCopy}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10 shrink-0"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-yellow-500/20 bg-yellow-950/20 p-4 text-sm text-yellow-400/80 space-y-1">
        <p className="font-semibold text-yellow-400">Instruções:</p>
        <p>1. Copie a chave PIX acima</p>
        <p>2. Abra o app do seu banco e escolha PIX</p>
        <p>3. Cole a chave e insira o valor <strong className="text-white">{pkg.price}</strong></p>
        <p>4. No campo de mensagem coloca o teu <strong className="text-white">nome de utilizador</strong></p>
        <p>5. As moedas serão creditadas em até <strong className="text-white">24h</strong></p>
      </div>
    </div>
  );
}

function CardStep({ pkg, onBack }: { pkg: Package; onBack: () => void }) {
  const [form, setForm] = useState({ number: "", name: "", expiry: "", cvv: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = e.target;
    if (name === "number") value = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    if (name === "expiry") value = value.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");
    if (name === "cvv") value = value.replace(/\D/g, "").slice(0, 4);
    setForm(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Pacote selecionado</p>
          <p className="font-display font-black text-xl text-primary">{pkg.amount} Moedas Cash</p>
        </div>
        <p className="text-2xl font-bold text-white">{pkg.price}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Número do Cartão</Label>
          <Input
            name="number"
            value={form.number}
            onChange={handleChange}
            placeholder="0000 0000 0000 0000"
            className="bg-black/40 border-primary/20 text-white font-mono tracking-wider"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Nome no Cartão</Label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="NOME COMPLETO"
            className="bg-black/40 border-primary/20 text-white uppercase"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Validade</Label>
            <Input
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="MM/AA"
              className="bg-black/40 border-primary/20 text-white font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">CVV</Label>
            <Input
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              placeholder="123"
              className="bg-black/40 border-primary/20 text-white font-mono"
              type="password"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-yellow-500/20 bg-yellow-950/20 p-3 text-sm text-yellow-400/80 text-center">
        Integração com gateway de pagamento em breve.
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(212,160,23,0.25)]"
        disabled
      >
        <CreditCard className="w-4 h-4 mr-2" /> Pagar {pkg.price}
      </Button>
    </div>
  );
}

export default function Loja() {
  const { user } = useAuth();
  const [selected, setSelected] = useState<Package | null>(null);
  const [step, setStep] = useState<Step>("method");

  function openModal(pkg: Package) {
    setSelected(pkg);
    setStep("method");
  }

  function closeModal() {
    setSelected(null);
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-9 h-9 text-primary" />
          </div>
          <h2 className="font-display text-3xl font-black text-white mb-3">ACESSO RESTRITO</h2>
          <p className="text-muted-foreground mb-6">Precisas de estar logado para aceder à área de doações.</p>
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
                <span className="font-display font-black text-3xl leading-none tracking-tight text-primary">{pkg.amount}</span>
                <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium mt-0.5">Moedas Cash</span>
                {pkg.bonus && (
                  <span className="text-[11px] text-primary/70 font-semibold mt-1 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {pkg.bonus}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xl font-bold text-white tabular-nums">{pkg.price}</span>
                <Button
                  onClick={() => openModal(pkg)}
                  className="bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-wider px-5 shadow-[0_0_12px_rgba(212,160,23,0.25)] hover:shadow-[0_0_20px_rgba(212,160,23,0.4)] transition-all"
                >
                  <Heart className="w-4 h-4 mr-2" /> Doar
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

      <Dialog open={!!selected} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="bg-zinc-950 border-primary/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary">
              {step === "method" ? "Escolhe o método de pagamento" : step === "pix" ? "Pagamento via PIX" : "Pagamento via Cartão"}
            </DialogTitle>
          </DialogHeader>

          {step === "method" && selected && (
            <div className="space-y-4">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Pacote selecionado</p>
                  <p className="font-display font-black text-xl text-primary">{selected.amount} Moedas Cash</p>
                </div>
                <p className="text-2xl font-bold text-white">{selected.price}</p>
              </div>

              <button
                onClick={() => setStep("pix")}
                className="w-full flex items-center gap-4 rounded-xl border border-primary/20 bg-black/40 hover:border-primary/50 hover:bg-primary/5 p-4 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:border-primary/40">
                  <QrCode className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-white">PIX</p>
                  <p className="text-sm text-muted-foreground">Transferência instantânea · Crédito em até 24h</p>
                </div>
              </button>

              <button
                onClick={() => setStep("card")}
                className="w-full flex items-center gap-4 rounded-xl border border-primary/20 bg-black/40 hover:border-primary/50 hover:bg-primary/5 p-4 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:border-primary/40">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-white">Cartão de Crédito</p>
                  <p className="text-sm text-muted-foreground">Visa, Mastercard, Elo · Em breve</p>
                </div>
              </button>
            </div>
          )}

          {step === "pix" && selected && (
            <PixStep pkg={selected} onBack={() => setStep("method")} />
          )}

          {step === "card" && selected && (
            <CardStep pkg={selected} onBack={() => setStep("method")} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
