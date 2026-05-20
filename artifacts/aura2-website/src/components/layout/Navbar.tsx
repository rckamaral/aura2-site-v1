import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Play } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className="font-display font-bold text-2xl text-primary leading-none tracking-wider">AURA 2</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Reviva a era que deixou saudade</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">Inicio</Link>
          <Link href="/ranking" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">Ranking</Link>
          <Link href="/download" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">Download</Link>
          <Link href="/wiki" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">Wiki</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hidden sm:flex">Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-background border-primary/20">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-center text-primary">Acessar Conta</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Usuário</Label>
                  <Input id="username" placeholder="Seu ID de login" className="bg-black/50 border-primary/30 focus-visible:ring-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" type="password" placeholder="Sua senha secreta" className="bg-black/50 border-primary/30 focus-visible:ring-primary" />
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider" onClick={() => setOpen(false)}>
                  Entrar
                </Button>
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">Não tem uma conta? <a href="#" className="text-primary hover:underline">Criar Conta</a></p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(212,160,23,0.4)]">
            <Link href="/download">
              <Play className="w-4 h-4 mr-2 fill-current" /> Jogar Agora
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
