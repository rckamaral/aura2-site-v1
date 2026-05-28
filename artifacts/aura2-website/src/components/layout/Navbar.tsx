import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Play, Download, LogOut, User, Menu, X } from "lucide-react";

type ModalMode = "login" | "register" | "forgot";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>("login");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, login, logout } = useAuth();
  const [, navigate] = useLocation();

  function openAs(m: ModalMode) {
    setMode(m);
    setOpen(true);
  }

  function handleLogout() {
    logout();
  }

  function closeMobile() {
    setMobileOpen(false);
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
            src="/a2-logo.png"
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
              AURA 2 <span className="text-sm font-normal text-muted-foreground normal-case tracking-normal">- Fase Beta</span>
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
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 inline-block"
          >
            Início
          </Link>
          <Link
            href="/ranking"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 inline-block"
          >
            Ranking
          </Link>
          <Link
            href="/download"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 inline-block"
          >
            Download
          </Link>
          <Link
            href="/wiki"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 inline-block"
          >
            Wiki
          </Link>
          <Link
            href="/loja"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-semibold uppercase tracking-wider text-primary hover:text-primary/80 transition-all duration-200 hover:scale-110 inline-block"
          >
            Doação
          </Link>
          <Link
            href="/parceiros"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 inline-block"
          >
            Parceiros
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-muted-foreground hover:text-primary transition-colors p-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {user ? (
            <>
              <Link
                href="/conta"
                className="hidden sm:flex items-center gap-2 text-sm text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                <User className="w-4 h-4" />
                {user.username}
              </Link>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 hidden sm:flex"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" /> Sair
              </Button>
            </>
          ) : (
            <>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(212,160,23,0.4)] transition-all duration-200 hover:scale-110"
                onClick={() => openAs("register")}
                data-testid="button-jogar-agora"
              >
                <Play className="w-4 h-4 mr-2 fill-current" /> Jogar Agora
              </Button>
              <Button
                id="navbar-login-btn"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 hidden sm:flex transition-all duration-200 hover:scale-110"
                onClick={() => openAs("login")}
                data-testid="button-login"
              >
                Login
              </Button>
            </>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-primary/20 bg-background/95 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => { closeMobile(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="px-3 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
            >
              Início
            </Link>
            <Link
              href="/ranking"
              onClick={() => { closeMobile(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="px-3 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
            >
              Ranking
            </Link>
            <Link
              href="/download"
              onClick={() => { closeMobile(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="px-3 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
            >
              Download
            </Link>
            <Link
              href="/wiki"
              onClick={() => { closeMobile(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="px-3 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
            >
              Wiki
            </Link>
            <Link
              href="/loja"
              onClick={() => { closeMobile(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="px-3 py-3 text-sm font-semibold uppercase tracking-wider text-primary hover:bg-primary/5 rounded-md transition-colors"
            >
              Doação
            </Link>
            <Link
              href="/parceiros"
              onClick={() => { closeMobile(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="px-3 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
            >
              Parceiros
            </Link>
            {user ? (
              <>
                <Link
                  href="/conta"
                  onClick={closeMobile}
                  className="px-3 py-3 text-sm font-semibold uppercase tracking-wider text-primary hover:bg-primary/5 rounded-md transition-colors flex items-center gap-2"
                >
                  <User className="w-4 h-4" /> {user.username}
                </Link>
                <button
                  onClick={() => { logout(); closeMobile(); navigate("/"); }}
                  className="px-3 py-3 text-sm font-semibold uppercase tracking-wider text-red-400 hover:bg-red-500/10 rounded-md transition-colors flex items-center gap-2 text-left"
                >
                  <LogOut className="w-4 h-4" /> Sair
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t border-white/10 mt-2">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 w-full"
                  onClick={() => { openAs("login"); closeMobile(); }}
                >
                  Login
                </Button>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider w-full"
                  onClick={() => { openAs("register"); closeMobile(); }}
                >
                  <Play className="w-4 h-4 mr-2 fill-current" /> Jogar Agora
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}

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
              onLoginSuccess={(username, token) => {
                login(username, token);
                setOpen(false);
                navigate("/conta");
              }}
            />
          )}
          {mode === "register" && (
            <RegisterForm
              onClose={() => setOpen(false)}
              onSwitchToLogin={() => setMode("login")}
              onRegisterSuccess={(username, token) => {
                login(username, token);
                setOpen(false);
                navigate("/conta");
              }}
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
  onLoginSuccess,
}: {
  onClose: () => void;
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
  onLoginSuccess: (username: string, token: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({ title: "Erro", description: data.error, variant: "destructive" });
      } else {
        toast({ title: "Bem-vindo!", description: `Olá, ${data.username}!` });
        onLoginSuccess(data.username, data.token);
      }
    } catch {
      toast({ title: "Erro", description: "Não foi possível conectar ao servidor.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="login-username">Usuário</Label>
        <Input
          id="login-username"
          placeholder="Seu ID de login"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-black/50 border-primary/30 focus-visible:ring-primary"
          data-testid="input-login-username"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">Senha</Label>
        <Input
          id="login-password"
          type="password"
          placeholder="Sua senha secreta"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-black/50 border-primary/30 focus-visible:ring-primary"
          data-testid="input-login-password"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider"
        data-testid="button-entrar"
      >
        {loading ? "Entrando..." : "Entrar"}
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
    </form>
  );
}

function ForgotPasswordForm({
  onClose,
  onBackToLogin,
}: {
  onClose: () => void;
  onBackToLogin: () => void;
}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({ title: "Erro", description: data.error, variant: "destructive" });
      } else {
        setSent(true);
      }
    } catch {
      toast({ title: "Erro", description: "Não foi possível conectar ao servidor.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 py-4">
      {!sent ? (
        <form onSubmit={handleSubmit} className="space-y-4">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 border-primary/30 focus-visible:ring-primary"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider"
          >
            {loading ? "A enviar..." : "Enviar Link de Recuperação"}
          </Button>
          <div className="text-center">
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-primary hover:underline"
              onClick={onBackToLogin}
            >
              ← Voltar para o login
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center space-y-4 py-4">
          <div className="text-4xl">📧</div>
          <p className="text-white font-bold text-lg">E-mail enviado!</p>
          <p className="text-sm text-muted-foreground">
            Verifique a tua caixa de entrada e segue as instruções para redefinir a senha.
          </p>
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider"
            onClick={onClose}
          >
            Fechar
          </Button>
        </div>
      )}
    </div>
  );
}

function RegisterForm({
  onSwitchToLogin,
}: {
  onClose: () => void;
  onSwitchToLogin: () => void;
  onRegisterSuccess: (username: string, token: string) => void;
}) {
  return (
    <div className="py-6 space-y-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-primary uppercase tracking-wider">Em Breve</h3>
      </div>
      <div className="bg-primary/5 border border-primary/20 rounded-lg px-5 py-4 space-y-2">
        <p className="text-sm text-foreground/90 leading-relaxed">
          O cadastro está <span className="text-primary font-semibold">temporariamente desativado</span>.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          O servidor Aura2 encontra-se em <span className="font-semibold text-foreground/80">fase beta exclusiva para testadores</span>. O cadastro público será liberado em breve!
        </p>
      </div>
      <a
        href="https://discord.gg/BN6XbbqsM"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-[#5865F2] hover:bg-[#4752c4] text-white transition-colors rounded-md py-2.5 text-sm font-semibold uppercase tracking-wider"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.031.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
        Entrar no Discord
      </a>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <button
            type="button"
            className="text-primary hover:underline font-semibold"
            onClick={onSwitchToLogin}
          >
            Fazer Login
          </button>
        </p>
      </div>
    </div>
  );
}
