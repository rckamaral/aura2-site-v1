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
import { Play, Download } from "lucide-react";

type ModalMode = "login" | "register" | "forgot";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>("login");

  function openAs(m: ModalMode) {
    setMode(m);
    setOpen(true);
  }

  const titles: Record<ModalMode, string> = {
    login: "Acessar Conta",
    register: "Criar Conta",
    forgot: "Recuperar Senha",
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/metin2_logo_nobgss.png"
            alt="M2"
            className="animate-amber-pulse"
            style={{
              width: "48px",
              height: "48px",
              objectFit: "contain",
              filter: "drop-shadow(0 0 12px rgba(212,160,23,0.8))",
            }}
          />
          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl text-primary leading-none tracking-wider">
              AURA 2
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
              Reviva a essência do Metin2
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/ranking"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            Ranking
          </Link>
          <Link
            href="/download"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            Download
          </Link>
          <Link
            href="/wiki"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            Wiki
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(212,160,23,0.4)]"
            onClick={() => openAs("register")}
            data-testid="button-jogar-agora"
          >
            <Play className="w-4 h-4 mr-2 fill-current" /> Jogar Agora
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hidden sm:flex"
            onClick={() => openAs("login")}
            data-testid="button-login"
          >
            Login
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-background border-primary/20">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-center text-primary">
              {titles[mode]}
            </DialogTitle>
          </DialogHeader>

          {mode === "login" && (
            <LoginForm
              onClose={() => setOpen(false)}
              onSwitchToRegister={() => setMode("register")}
              onForgotPassword={() => setMode("forgot")}
            />
          )}
          {mode === "register" && (
            <RegisterForm
              onClose={() => setOpen(false)}
              onSwitchToLogin={() => setMode("login")}
            />
          )}
          {mode === "forgot" && (
            <ForgotPasswordForm
              onClose={() => setOpen(false)}
              onBackToLogin={() => setMode("login")}
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
  onForgotPassword,
}: {
  onClose: () => void;
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
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
      <div className="text-right">
        <button
          type="button"
          className="text-xs text-primary hover:underline"
          onClick={onForgotPassword}
        >
          Esqueci minha senha
        </button>
      </div>
      <div className="text-center mt-2 space-y-2">
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

function ForgotPasswordForm({
  onClose,
  onBackToLogin,
}: {
  onClose: () => void;
  onBackToLogin: () => void;
}) {
  const [sent, setSent] = useState(false);

  return (
    <div className="space-y-4 py-4">
      {!sent ? (
        <>
          <p className="text-sm text-muted-foreground text-center">
            Digite o e-mail cadastrado na sua conta e enviaremos um link para
            redefinir sua senha.
          </p>
          <div className="space-y-2">
            <Label htmlFor="forgot-email">E-mail</Label>
            <Input
              id="forgot-email"
              type="email"
              placeholder="seu@email.com"
              className="bg-black/50 border-primary/30 focus-visible:ring-primary"
            />
          </div>
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider"
            onClick={() => setSent(true)}
          >
            Enviar Link de Recuperação
          </Button>
        </>
      ) : (
        <div className="text-center space-y-4 py-4">
          <div className="text-4xl">📧</div>
          <p className="text-white font-bold text-lg">E-mail enviado!</p>
          <p className="text-sm text-muted-foreground">
            Verifique sua caixa de entrada e siga as instruções para redefinir
            sua senha.
          </p>
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider"
            onClick={onClose}
          >
            Fechar
          </Button>
        </div>
      )}

      {!sent && (
        <div className="text-center">
          <button
            type="button"
            className="text-xs text-muted-foreground hover:text-primary hover:underline"
            onClick={onBackToLogin}
          >
            ← Voltar para o login
          </button>
        </div>
      )}
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
      <Link
        href="/download"
        onClick={onClose}
        className="flex items-center justify-center gap-2 w-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors rounded-md py-2 text-sm font-semibold uppercase tracking-wider"
        data-testid="link-download-client"
      >
        <Download className="w-4 h-4" /> Baixar o Cliente do Jogo
      </Link>
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
