import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Home,
  Mail,
  Lock,
  Warehouse,
  Users,
  ShieldCheck,
  ShoppingCart,
  History,
  LogOut,
  Gift,
  Store,
  ChevronRight,
} from "lucide-react";

type Section =
  | "inicio"
  | "alterar-email"
  | "alterar-senha"
  | "senha-armazem"
  | "personagens"
  | "senha-personagem"
  | "comprar-cash"
  | "historico";

export default function Conta() {
  const { user, logout, token } = useAuth();
  const [, navigate] = useLocation();
  const [section, setSection] = useState<Section>("inicio");

  if (!user) {
    navigate("/");
    return null;
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <p className="text-primary text-xs font-semibold uppercase tracking-widest flex items-center gap-2 mb-1">
            <User className="w-3 h-3" /> Conta
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
            Bem-vindo(a),{" "}
            <span className="text-primary">{user.username.toUpperCase()}</span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <main className="flex-1 order-2 lg:order-1">
            <SectionContent section={section} username={user.username} token={token} onNavigate={setSection} />
          </main>

          <aside className="w-full lg:w-64 order-1 lg:order-2 shrink-0">
            <div className="bg-black/40 border border-primary/20 rounded-lg overflow-hidden">
              <div className="bg-primary/20 border-b border-primary/30 px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/30 border border-primary/50 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-primary text-sm uppercase tracking-wider">
                    {user.username}
                  </p>
                </div>
              </div>

              <nav className="p-2 space-y-1">
                <NavItem
                  icon={<Home className="w-4 h-4" />}
                  label="Início"
                  active={section === "inicio"}
                  onClick={() => setSection("inicio")}
                />

                <NavGroup label="Gerenciar Conta">
                  <NavItem
                    icon={<Mail className="w-4 h-4" />}
                    label="Alterar E-mail"
                    active={section === "alterar-email"}
                    onClick={() => setSection("alterar-email")}
                  />
                  <NavItem
                    icon={<Lock className="w-4 h-4" />}
                    label="Alterar Senha"
                    active={section === "alterar-senha"}
                    onClick={() => setSection("alterar-senha")}
                  />
                  <NavItem
                    icon={<Warehouse className="w-4 h-4" />}
                    label="Senha do Armazém"
                    active={section === "senha-armazem"}
                    onClick={() => setSection("senha-armazem")}
                  />
                </NavGroup>

                <NavGroup label="Personagens">
                  <NavItem
                    icon={<Users className="w-4 h-4" />}
                    label="Listar Personagens"
                    active={section === "personagens"}
                    onClick={() => setSection("personagens")}
                  />
                  <NavItem
                    icon={<ShieldCheck className="w-4 h-4" />}
                    label="Senha do Personagem"
                    active={section === "senha-personagem"}
                    onClick={() => setSection("senha-personagem")}
                  />
                </NavGroup>

                <NavGroup label="Loja">
                  <NavItem
                    icon={<ShoppingCart className="w-4 h-4" />}
                    label="Comprar Cash"
                    active={section === "comprar-cash"}
                    onClick={() => setSection("comprar-cash")}
                  />
                  <NavItem
                    icon={<History className="w-4 h-4" />}
                    label="Histórico de Compras"
                    active={section === "historico"}
                    onClick={() => setSection("historico")}
                  />
                </NavGroup>

                <div className="pt-2 border-t border-white/10 mt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function NavGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="pt-2">
      <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-left ${
        active
          ? "bg-primary/20 text-primary border border-primary/30"
          : "text-muted-foreground hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      {label}
      {active && <ChevronRight className="w-3 h-3 ml-auto" />}
    </button>
  );
}

function SectionContent({
  section,
  username,
  token,
  onNavigate,
}: {
  section: Section;
  username: string;
  token: string | null;
  onNavigate: (s: Section) => void;
}) {
  switch (section) {
    case "inicio":
      return <SectionInicio username={username} onNavigate={onNavigate} />;
    case "alterar-email":
      return <SectionAlterarEmail token={token} />;
    case "alterar-senha":
      return <SectionAlterarSenha token={token} />;
    case "senha-armazem":
      return <SectionSenhaArmazem />;
    case "personagens":
      return <SectionPersonagens />;
    case "senha-personagem":
      return <SectionSenhaPersonagem />;
    case "comprar-cash":
      return <SectionComprarCash />;
    case "historico":
      return <SectionHistorico />;
    default:
      return null;
  }
}

function SectionInicio({ username, onNavigate }: { username: string; onNavigate: (s: Section) => void }) {
  return (
    <div className="space-y-4">
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-4xl">🎁</span>
          <div>
            <p className="font-bold text-white text-lg uppercase tracking-wide">
              Bônus na Compra de Moedas!
            </p>
            <p className="text-sm text-muted-foreground">
              Aproveite as promoções exclusivas da loja!
            </p>
          </div>
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider whitespace-nowrap"
          onClick={() => onNavigate("comprar-cash")}
        >
          <Store className="w-4 h-4 mr-2" /> Acessar Loja
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <QuickCard
          icon={<Lock className="w-5 h-5 text-primary" />}
          title="Alterar Senha"
          desc="Mantenha a sua conta segura"
          onClick={() => onNavigate("alterar-senha")}
        />
        <QuickCard
          icon={<Users className="w-5 h-5 text-primary" />}
          title="Personagens"
          desc="Ver os seus personagens"
          onClick={() => onNavigate("personagens")}
        />
        <QuickCard
          icon={<Gift className="w-5 h-5 text-primary" />}
          title="Comprar Cash"
          desc="Adquira moedas premium"
          onClick={() => onNavigate("comprar-cash")}
        />
      </div>
    </div>
  );
}

function QuickCard({ icon, title, desc, onClick }: { icon: React.ReactNode; title: string; desc: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-black/40 border border-white/10 rounded-lg p-4 text-left hover:border-primary/40 hover:bg-primary/5 transition-all group"
    >
      <div className="mb-3">{icon}</div>
      <p className="font-bold text-white text-sm uppercase tracking-wide group-hover:text-primary transition-colors">
        {title}
      </p>
      <p className="text-xs text-muted-foreground mt-1">{desc}</p>
    </button>
  );
}

function SectionAlterarEmail({ token }: { token: string | null }) {
  const { toast } = useToast();
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newEmail !== confirmEmail) {
      toast({ title: "Erro", description: "Os e-mails não coincidem.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/change-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newEmail, currentPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({ title: "Erro", description: data.error, variant: "destructive" });
      } else {
        toast({ title: "Sucesso!", description: data.message });
        setNewEmail("");
        setConfirmEmail("");
        setCurrentPassword("");
      }
    } catch {
      toast({ title: "Erro", description: "Não foi possível conectar ao servidor.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormSection title="Alterar E-mail" icon={<Mail className="w-5 h-5" />}>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div className="space-y-2">
          <Label>Novo E-mail</Label>
          <Input
            type="email"
            placeholder="novo@email.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="bg-black/50 border-primary/30 focus-visible:ring-primary"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Confirmar Novo E-mail</Label>
          <Input
            type="email"
            placeholder="novo@email.com"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            className="bg-black/50 border-primary/30 focus-visible:ring-primary"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Senha Atual</Label>
          <Input
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="bg-black/50 border-primary/30 focus-visible:ring-primary"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider"
        >
          {loading ? "Salvando..." : "Salvar Alteração"}
        </Button>
      </form>
    </FormSection>
  );
}

function SectionAlterarSenha({ token }: { token: string | null }) {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Erro", description: "As senhas não coincidem.", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Erro", description: "A nova senha deve ter pelo menos 6 caracteres.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({ title: "Erro", description: data.error, variant: "destructive" });
      } else {
        toast({ title: "Senha alterada!", description: data.message });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      toast({ title: "Erro", description: "Não foi possível conectar ao servidor.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormSection title="Alterar Senha" icon={<Lock className="w-5 h-5" />}>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div className="space-y-2">
          <Label>Senha Atual</Label>
          <Input
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="bg-black/50 border-primary/30 focus-visible:ring-primary"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Nova Senha</Label>
          <Input
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-black/50 border-primary/30 focus-visible:ring-primary"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Confirmar Nova Senha</Label>
          <Input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-black/50 border-primary/30 focus-visible:ring-primary"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider"
        >
          {loading ? "Salvando..." : "Salvar Alteração"}
        </Button>
      </form>
    </FormSection>
  );
}

function SectionSenhaArmazem() {
  const { toast } = useToast();
  return (
    <FormSection title="Senha do Armazém" icon={<Warehouse className="w-5 h-5" />}>
      <div className="space-y-4 max-w-md">
        <p className="text-sm text-muted-foreground">
          A senha do armazém protege os seus itens guardados no cofre.
        </p>
        <div className="space-y-2">
          <Label>Nova Senha do Armazém</Label>
          <Input type="password" placeholder="••••••••" className="bg-black/50 border-primary/30 focus-visible:ring-primary" />
        </div>
        <div className="space-y-2">
          <Label>Confirmar Senha</Label>
          <Input type="password" placeholder="••••••••" className="bg-black/50 border-primary/30 focus-visible:ring-primary" />
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider"
          onClick={() => toast({ title: "Em breve", description: "Esta funcionalidade estará disponível em breve." })}
        >
          Definir Senha
        </Button>
      </div>
    </FormSection>
  );
}

function SectionPersonagens() {
  return (
    <FormSection title="Listar Personagens" icon={<Users className="w-5 h-5" />}>
      <div className="bg-black/30 border border-white/10 rounded-lg p-8 text-center">
        <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground text-sm">
          A ligação ao servidor de jogo será necessária para mostrar os personagens.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Em breve disponível.
        </p>
      </div>
    </FormSection>
  );
}

function SectionSenhaPersonagem() {
  const { toast } = useToast();
  return (
    <FormSection title="Senha do Personagem" icon={<ShieldCheck className="w-5 h-5" />}>
      <div className="space-y-4 max-w-md">
        <p className="text-sm text-muted-foreground">
          A senha do personagem impede que outros acedam ao seu personagem mesmo que conheçam a senha da conta.
        </p>
        <div className="space-y-2">
          <Label>Nova Senha do Personagem</Label>
          <Input type="password" placeholder="••••••••" className="bg-black/50 border-primary/30 focus-visible:ring-primary" />
        </div>
        <div className="space-y-2">
          <Label>Confirmar Senha</Label>
          <Input type="password" placeholder="••••••••" className="bg-black/50 border-primary/30 focus-visible:ring-primary" />
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider"
          onClick={() => toast({ title: "Em breve", description: "Esta funcionalidade estará disponível em breve." })}
        >
          Definir Senha
        </Button>
      </div>
    </FormSection>
  );
}

function SectionComprarCash() {
  return (
    <FormSection title="Comprar Cash" icon={<ShoppingCart className="w-5 h-5" />}>
      <div className="bg-black/30 border border-white/10 rounded-lg p-8 text-center">
        <ShoppingCart className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground text-sm">
          A loja de Cash estará disponível em breve.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Aguarde as próximas atualizações!
        </p>
      </div>
    </FormSection>
  );
}

function SectionHistorico() {
  return (
    <FormSection title="Histórico de Compras" icon={<History className="w-5 h-5" />}>
      <div className="bg-black/30 border border-white/10 rounded-lg p-8 text-center">
        <History className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground text-sm">
          Nenhuma compra registada ainda.
        </p>
      </div>
    </FormSection>
  );
}

function FormSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div className="text-primary">{icon}</div>
        <h2 className="font-display font-bold text-xl text-white uppercase tracking-wide">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
