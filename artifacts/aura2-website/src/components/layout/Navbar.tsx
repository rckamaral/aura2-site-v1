import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";

type ModalMode = "login" | "register";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>("login");

  function openAs(m: ModalMode) {
    setMode(m);
    setOpen(true);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className="font-display font-bold text-2xl text-primary leading-none tracking-wider">
            AURA 2
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Reviva a era que deixou saudade
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/ranking"
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            Ranking
          </Link>
          <Link
            href="/download"
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            Download
          </Link>
          <Link
            href="/wiki"
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            Wiki
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hidden sm:flex"
            onClick={() => openAs("login")}
            data-testid="button-login"
          >
            Login
          </Button>

          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(212,160,23,0.4)]"
            onClick={() => openAs("register")}
            data-testid="button-jogar-agora"
          >
            <Play className="w-4 h-4 mr-2 fill-current" /> Jogar Agora
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-background border-primary/20">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-center text-primary">
              {mode === "login" ? "Acessar Conta" : "Criar Conta"}
            </DialogTitle>
          </DialogHeader>

          {mode === "login" ? (
            <LoginForm
              onClose={() => setOpen(false)}
              onSwitchToRegister={() => setMode("register")}
            />
          ) : (
            <RegisterForm
              onClose={() => setOpen(false)}
              onSwitchToLogin={() => setMode("login")}
            />
          )}
        </DialogContent>
      </Dialog>
    </header>
  );
}

function LoginForm({
  onClose,
  onSwitchToRegister,
}: {
  onClose: () => void;
  onSwitchToRegister: () => void;
}) {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="login-username">Usuário</Label>
        <Input
          id="login-username"
          placeholder="Seu ID de login"
          className="bg-black/50 border-primary/30 focus-visible:ring-primary"
          data-testid="input-login-username"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">Senha</Label>
        <Input
          id="login-password"
          type="password"
          placeholder="Sua senha secreta"
          className="bg-black/50 border-primary/30 focus-visible:ring-primary"
          data-testid="input-login-password"
        />
      </div>
      <Button
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider"
        onClick={onClose}
        data-testid="button-entrar"
      >
        Entrar
      </Button>
      <div className="text-center mt-2">
        <p className="text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <button
            type="button"
            className="text-primary hover:underline font-semibold"
            onClick={onSwitchToRegister}
            data-testid="button-switch-register"
          >
            Criar Conta
          </button>
        </p>
      </div>
    </div>
  );
}

function RegisterForm({
  onClose,
  onSwitchToLogin,
}: {
  onClose: () => void;
  onSwitchToLogin: () => void;
}) {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="reg-username">Usuário</Label>
        <Input
          id="reg-username"
          placeholder="Escolha um nome de usuário"
          className="bg-black/50 border-primary/30 focus-visible:ring-primary"
          data-testid="input-reg-username"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-email">E-mail</Label>
        <Input
          id="reg-email"
          type="email"
          placeholder="seu@email.com"
          className="bg-black/50 border-primary/30 focus-visible:ring-primary"
          data-testid="input-reg-email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-password">Senha</Label>
        <Input
          id="reg-password"
          type="password"
          placeholder="Crie uma senha forte"
          className="bg-black/50 border-primary/30 focus-visible:ring-primary"
          data-testid="input-reg-password"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-confirm">Confirmar Senha</Label>
        <Input
          id="reg-confirm"
          type="password"
          placeholder="Repita a senha"
          className="bg-black/50 border-primary/30 focus-visible:ring-primary"
          data-testid="input-reg-confirm"
        />
      </div>
      <Button
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider"
        onClick={onClose}
        data-testid="button-criar-conta"
      >
        Criar Conta
      </Button>
      <div className="text-center mt-2">
        <p className="text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <button
            type="button"
            className="text-primary hover:underline font-semibold"
            onClick={onSwitchToLogin}
            data-testid="button-switch-login"
          >
            Fazer Login
          </button>
        </p>
      </div>
    </div>
  );
}
