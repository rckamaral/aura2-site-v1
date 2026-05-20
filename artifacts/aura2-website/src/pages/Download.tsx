import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Monitor, HardDrive, Cpu, Layers } from "lucide-react";

export default function DownloadPage() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-24 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="font-display text-4xl md:text-5xl font-black text-white tracking-wider">DOWNLOAD DO JOGO</h1>
          <p className="text-muted-foreground text-lg">Baixe o cliente oficial e comece sua jornada em Aura2. 100% Free to Play.</p>
        </div>

        <Card className="bg-primary/5 border-primary/30 shadow-[0_0_30px_rgba(212,160,23,0.1)]">
          <CardContent className="p-8 md:p-12 flex flex-col items-center text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">AURA2 Client v1.0 — Season 1</h2>
              <p className="text-muted-foreground">Tamanho: 2.1 GB • Atualizado hoje</p>
            </div>
            
            <Button size="lg" className="w-full max-w-md h-16 text-lg bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(212,160,23,0.4)]">
              <Download className="w-6 h-6 mr-3" /> Baixar via Mega
            </Button>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm mt-4">
              <a href="#" className="text-primary hover:underline hover:text-white transition-colors">Mirror 1 (Google Drive)</a>
              <span className="text-muted-foreground">•</span>
              <a href="#" className="text-primary hover:underline hover:text-white transition-colors">Mirror 2 (MediaFire)</a>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-white border-b border-primary/20 pb-2">Requisitos do Sistema</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Monitor className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Sistema Operacional</h4>
                  <p className="text-sm text-muted-foreground">Windows 7 / 8 / 10 / 11</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Layers className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Memória RAM</h4>
                  <p className="text-sm text-muted-foreground">Mínimo 2GB (4GB Recomendado)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Cpu className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Processador</h4>
                  <p className="text-sm text-muted-foreground">Intel Dual Core / AMD equivalente</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <HardDrive className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Armazenamento</h4>
                  <p className="text-sm text-muted-foreground">5GB de espaço livre em disco</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-white border-b border-primary/20 pb-2">Como Instalar</h3>
            <ol className="space-y-4 list-decimal list-inside text-muted-foreground ml-4">
              <li className="pl-2"><span className="text-white font-medium">Baixe o instalador</span> pelo link principal ou um dos mirrors.</li>
              <li className="pl-2"><span className="text-white font-medium">Desative temporariamente seu anti-vírus</span> caso haja falsos positivos (comum em clientes de Metin2).</li>
              <li className="pl-2"><span className="text-white font-medium">Extraia o arquivo</span> usando WinRAR ou 7Zip em uma pasta de sua escolha.</li>
              <li className="pl-2"><span className="text-white font-medium">Execute o "Aura2Patcher.exe"</span> como administrador para atualizar o jogo.</li>
              <li className="pl-2"><span className="text-white font-medium">Clique em Jogar</span> e divirta-se!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
