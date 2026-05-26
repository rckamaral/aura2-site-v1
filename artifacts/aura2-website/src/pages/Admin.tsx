import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Clock, RefreshCw, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

type DonationStatus = "pending" | "approved" | "rejected";

interface Donation {
  id: number;
  username: string;
  packageLabel: string;
  coinsAmount: number;
  priceBrl: number;
  status: DonationStatus;
  notes: string | null;
  createdAt: string;
}

const ADMIN_USERNAME = "admin";

function StatusBadge({ status }: { status: DonationStatus }) {
  if (status === "approved") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-400 bg-green-950/40 border border-green-500/30 px-2 py-0.5 rounded-full">
        <CheckCircle className="w-3 h-3" /> Aprovada
      </span>
    );
  }
  if (status === "rejected") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 bg-red-950/40 border border-red-500/30 px-2 py-0.5 rounded-full">
        <XCircle className="w-3 h-3" /> Rejeitada
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-400 bg-yellow-950/40 border border-yellow-500/30 px-2 py-0.5 rounded-full">
      <Clock className="w-3 h-3" /> Pendente
    </span>
  );
}

export default function Admin() {
  const { user, token } = useAuth();
  const { toast } = useToast();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<number | null>(null);

  const isAdmin = user?.username === ADMIN_USERNAME;

  async function fetchDonations() {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/donations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setDonations(data.donations);
    } catch {
      toast({ title: "Erro ao carregar doações", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAdmin) fetchDonations();
  }, [isAdmin, token]);

  async function handleAction(id: number, action: "approve" | "reject") {
    if (!token) return;
    setActing(id);
    try {
      const res = await fetch(`/api/admin/donations/${id}/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: action === "approve" ? "Doação aprovada!" : "Doação rejeitada." });
        setDonations(prev => prev.map(d => d.id === id ? { ...d, status: action === "approve" ? "approved" : "rejected" } : d));
      } else {
        toast({ title: "Erro", description: data.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Erro de rede", variant: "destructive" });
    } finally {
      setActing(null);
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="text-center">
          <ShieldAlert className="w-16 h-16 text-primary/40 mx-auto mb-4" />
          <p className="text-muted-foreground">Precisas de estar logado.</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="text-center">
          <ShieldAlert className="w-16 h-16 text-red-500/40 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-black text-white mb-2">Acesso Negado</h2>
          <p className="text-muted-foreground">Esta área é restrita ao administrador.</p>
        </div>
      </div>
    );
  }

  const pending = donations.filter(d => d.status === "pending");
  const rest = donations.filter(d => d.status !== "pending");

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-black text-white">Painel Admin</h1>
            <p className="text-muted-foreground text-sm mt-1">Gerir doações e confirmações de pagamento</p>
          </div>
          <Button
            variant="outline"
            onClick={fetchDonations}
            disabled={loading}
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-950/10 p-4 text-center">
            <p className="text-2xl font-black text-yellow-400">{donations.filter(d => d.status === "pending").length}</p>
            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Pendentes</p>
          </div>
          <div className="rounded-xl border border-green-500/20 bg-green-950/10 p-4 text-center">
            <p className="text-2xl font-black text-green-400">{donations.filter(d => d.status === "approved").length}</p>
            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Aprovadas</p>
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
            <p className="text-2xl font-black text-primary">
              R${donations.filter(d => d.status === "approved").reduce((s, d) => s + d.priceBrl, 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Total Recebido</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground">Carregando...</div>
        ) : donations.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Nenhuma doação registrada ainda.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pending.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-3">Pendentes</h2>
                <div className="space-y-2">
                  {pending.map(d => (
                    <DonationRow key={d.id} donation={d} acting={acting} onAction={handleAction} />
                  ))}
                </div>
              </div>
            )}
            {rest.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Histórico</h2>
                <div className="space-y-2">
                  {rest.map(d => (
                    <DonationRow key={d.id} donation={d} acting={acting} onAction={handleAction} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DonationRow({
  donation: d,
  acting,
  onAction,
}: {
  donation: Donation;
  acting: number | null;
  onAction: (id: number, action: "approve" | "reject") => void;
}) {
  const date = new Date(d.createdAt).toLocaleString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="flex items-center gap-4 rounded-xl border border-primary/10 bg-zinc-950/60 px-5 py-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-white">{d.username}</span>
          <StatusBadge status={d.status} />
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">
          {d.packageLabel} · <span className="text-primary font-semibold">R${d.priceBrl}</span>
        </p>
        <p className="text-xs text-muted-foreground/60 mt-0.5">{date}</p>
        {d.notes && <p className="text-xs text-yellow-400/70 mt-1">Nota: {d.notes}</p>}
      </div>

      {d.status === "pending" && (
        <div className="flex gap-2 shrink-0">
          <Button
            size="sm"
            onClick={() => onAction(d.id, "approve")}
            disabled={acting === d.id}
            className="bg-green-600 hover:bg-green-500 text-white text-xs px-3"
          >
            <CheckCircle className="w-3.5 h-3.5 mr-1" />
            Aprovar
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAction(d.id, "reject")}
            disabled={acting === d.id}
            className="border-red-500/30 text-red-400 hover:bg-red-950/30 text-xs px-3"
          >
            <XCircle className="w-3.5 h-3.5 mr-1" />
            Rejeitar
          </Button>
        </div>
      )}
    </div>
  );
}
