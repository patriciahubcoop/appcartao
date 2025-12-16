import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, CreditCard, FileText, Menu, DollarSign } from "lucide-react";

export default function Layout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  const navItems = [
    { icon: Home, label: "Início", path: "/" },
    { icon: CreditCard, label: "Cartões", path: "/cards" },
    { icon: FileText, label: "Faturas", path: "/invoices" },
    { icon: Menu, label: "Menu", path: "/more" },
  ];

  return (
    // O Layout agora ocupa 100% da altura do "celular" (definido no index.css)
    <div className="flex flex-col h-full min-h-screen bg-slate-50 relative overflow-hidden">
      
      {/* Área de Conteúdo com rolagem independente */}
      <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {children}
      </main>

      {/* Menu Inferior - Agora Absolute dentro do container relativo */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-slate-200 pb-2 pt-2 px-2 z-50 rounded-t-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-end h-16 pb-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            if (item.highlight) {
              return (
                <Link to={item.path} key={item.path} className="relative -top-5">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-[#014726] rounded-full flex items-center justify-center shadow-lg border-4 border-white transform active:scale-95 transition-transform">
                      <Icon className="w-6 h-6 text-[#C6FF4A]" />
                    </div>
                    <span className="text-[10px] font-medium text-gray-500 mt-1">
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            }

            return (
              <Link to={item.path} key={item.path} className="w-full">
                <div className="flex flex-col items-center justify-center h-full space-y-1">
                  <div className={`p-1.5 rounded-xl transition-colors ${active ? 'bg-green-50' : 'bg-transparent'}`}>
                    <Icon 
                      className={`w-6 h-6 transition-colors ${active ? 'text-[#014726]' : 'text-gray-400'}`} 
                      strokeWidth={active ? 2.5 : 2}
                    />
                  </div>
                  <span className={`text-[10px] font-medium ${active ? 'text-[#014726]' : 'text-gray-400'}`}>
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}