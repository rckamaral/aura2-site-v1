import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative selection:bg-primary selection:text-primary-foreground">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_center_right,rgba(212,160,23,0.15),transparent_70%)]" />
      <Navbar />
      <main className="flex-1 pt-20 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
