import { useState } from "react";
import { Heart, Coins, Zap, Star, Lock, CreditCard, ArrowLeft, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { QRCodeSVG } from "qrcode.react";
import { generatePixPayload } from "@/lib/pix";

const PACKAGES = [
  { amount: "10.000", coins: 10000, price: "R$ 10,00", value: 10 },
  { amount: "22.000", coins: 22000, price: "R$ 20,00", value: 20, bonus: "+2.000 bônus" },
  { amount: "65.000", coins: 65000, price: "R$ 50,00", value: 50, bonus: "+5.000 bônus", popular: true },
  { amount: "135.000", coins: 135000, price: "R$ 100,00", value: 100, bonus: "+10.000 bônus" },
  { amount: "275.000", coins: 275000, price: "R$ 200,00", value: 200, bonus: "+25.000 bônus" },
  { amount: "420.000", coins: 420000, price: "R$ 300,00", value: 300, bonus: "+45.000 bônus" },
];

type Package = (typeof PACKAGES)[number];
type PayMethod = "pix" | "card";
type PixSubStep = "form" | "qrcode";

const PIX_KEY = "aura2brasil@gmail.com";

const FOOTER_TEXT = (
  <div className="text-center text-xs space-y-0.5 mt-4">
    <p className="text-[#4ade80] font-semibold text-sm">As moedas são inseridas automaticamente após confirmação do pagamento.</p>
    <p className="text-zinc-500">Todas as transações são seguras e criptografadas.</p>
    <p className="text-zinc-500">Nunca armazenamos informações pessoais como Nome e CPF.</p>
    <p className="text-zinc-500 mt-1">
      Ao realizar sua compra você está de acordo com nossos{" "}
      <a href="/termos" className="text-blue-400 underline hover:text-blue-300" target="_blank">termos de uso</a>
      {" "}e nossa{" "}
      <a href="/privacidade" className="text-blue-400 underline hover:text-blue-300" target="_blank">política de privacidade</a>.
    </p>
  </div>
);

function MethodStep({
  pkg,
  onBack,
  method,
  setMethod,
  agreed,
  setAgreed,
  onConfirm,
}: {
  pkg: Package;
  onBack: () => void;
  method: PayMethod;
  setMethod: (m: PayMethod) => void;
  agreed: boolean;
  setAgreed: (v: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-white text-sm font-bold shrink-0">1</div>
        <span className="text-white font-semibold text-base">Pagamento</span>
      </div>

      {/* PIX option */}
      <label
        className={`flex items-center justify-between w-full rounded-lg border px-4 py-3 cursor-pointer transition-all ${method === "pix" ? "border-[#3b82f6] bg-[#1e2a3a]" : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"}`}
        onClick={() => setMethod("pix")}
      >
        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${method === "pix" ? "border-[#3b82f6]" : "border-zinc-500"}`}>
            {method === "pix" && <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#32BCAD] rounded flex items-center justify-center">
              <QrCode className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white font-medium">Pix</span>
            <span className="text-[10px] text-[#3b82f6] border border-[#3b82f6]/50 rounded px-1.5 py-0.5 font-semibold">Recomendado</span>
          </div>
        </div>
        <span className="text-white font-semibold">{pkg.price}</span>
      </label>

      {/* Card option */}
      <label
        className={`flex items-center justify-between w-full rounded-lg border px-4 py-3 cursor-pointer transition-all ${method === "card" ? "border-[#3b82f6] bg-[#1e2a3a]" : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"}`}
        onClick={() => setMethod("card")}
      >
        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${method === "card" ? "border-[#3b82f6]" : "border-zinc-500"}`}>
            {method === "card" && <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />}
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-zinc-400" />
            <span className="text-white font-medium">Cartão de Crédito/Débito</span>
          </div>
        </div>
        <span className="text-white font-semibold">{pkg.price}</span>
      </label>

      {/* Terms */}
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <div
          onClick={() => setAgreed(!agreed)}
          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${agreed ? "bg-[#3b82f6] border-[#3b82f6]" : "border-zinc-500"}`}
        >
          {agreed && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
        <span className="text-zinc-400 text-sm">
          Li e concordo com os{" "}
          <a href="/termos" className="text-[#3b82f6] underline hover:text-blue-300" target="_blank" onClick={e => e.stopPropagation()}>Termos de Uso</a>
        </span>
      </label>

      <Button
        onClick={onConfirm}
        disabled={!agreed}
        className="w-full bg-[#16a34a] hover:bg-[#15803d] disabled:opacity-50 text-white font-bold uppercase tracking-widest py-3"
      >
        FINALIZAR COMPRA
      </Button>

      {FOOTER_TEXT}
    </div>
  );
}

function PixStep({ pkg, onBack }: { pkg: Package; onBack: () => void }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [subStep, setSubStep] = useState<PixSubStep>("form");

  function formatCpf(value: string) {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function handleCpfChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCpf(formatCpf(e.target.value));
  }

  const canGenerate = nome.trim().length >= 3 && cpf.replace(/\D/g, "").length === 11;

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-white text-sm font-bold shrink-0">2</div>
        <span className="text-white font-semibold text-base">Pagar com PIX</span>
      </div>

      {subStep === "form" && (
        <>
          <Input
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Nome Completo"
            className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
          />
          <Input
            value={cpf}
            onChange={handleCpfChange}
            placeholder="CPF do Pagador"
            className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
          />
          <Button
            onClick={() => setSubStep("qrcode")}
            disabled={!canGenerate}
            className="w-full bg-[#16a34a] hover:bg-[#15803d] disabled:opacity-50 text-white font-bold uppercase tracking-widest py-3"
          >
            GERAR QRCODE
          </Button>
        </>
      )}

      {subStep === "qrcode" && (
        <>
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-4 rounded-xl border border-zinc-700 bg-white mx-auto">
              <QRCodeSVG
                value={generatePixPayload(PIX_KEY, "Aura2 Season 1", "SAO PAULO", pkg.value)}
                size={180}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
              />
            </div>
            <p className="text-zinc-400 text-sm">Aponte a câmera do seu banco para este QR Code</p>
            <div className="rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-zinc-300 text-sm">
              Valor: <span className="text-white font-bold">{pkg.price}</span>
            </div>
          </div>
          <button onClick={() => setSubStep("form")} className="text-zinc-500 text-xs hover:text-zinc-300 transition-colors w-full text-center">
            ← Usar outro CPF
          </button>
        </>
      )}

      {FOOTER_TEXT}
    </div>
  );
}

function CardStep({ pkg, onBack }: { pkg: Package; onBack: () => void }) {
  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-white text-sm font-bold shrink-0">2</div>
        <span className="text-white font-semibold text-base">Cartão de Crédito/Débito</span>
      </div>
      <div className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-4 text-center text-zinc-400 text-sm">
        Integração com gateway de pagamento em breve.
      </div>
      {FOOTER_TEXT}
    </div>
  );
}

export default function Loja() {
  const { user } = useAuth();
  const [selected, setSelected] = useState<Package | null>(null);
  const [method, setMethod] = useState<PayMethod>("pix");
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState<"method" | "pix" | "card">("method");

  function openModal(pkg: Package) {
    setSelected(pkg);
    setMethod("pix");
    setAgreed(false);
    setStep("method");
  }

  function closeModal() {
    setSelected(null);
  }

  function handleConfirm() {
    setStep(method);
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-9 h-9 text-primary" />
          </div>
          <h2 className="font-display text-3xl font-black text-white mb-3">ACESSO RESTRITO</h2>
          <p className="text-muted-foreground mb-6">Você precisa estar logado para acessar a área de doações.</p>
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
            Ao doar, você recebe Moedas para usar no jogo e ajuda a manter o Aura2 no ar.
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
                <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium mt-0.5">Moedas</span>
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
                  <Coins className="w-4 h-4 mr-2" /> Comprar
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl border border-primary/20 bg-primary/5 text-center">
          <p className="text-primary/70 text-sm">
            Pagamentos via <span className="font-semibold text-primary">PIX · Cartão de Crédito</span> — processados com segurança.
          </p>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="bg-[#1c1c1e] border-zinc-700 text-white max-w-md">
          {step === "method" && selected && (
            <MethodStep
              pkg={selected}
              onBack={closeModal}
              method={method}
              setMethod={setMethod}
              agreed={agreed}
              setAgreed={setAgreed}
              onConfirm={handleConfirm}
            />
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
