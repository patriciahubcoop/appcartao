import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Receipt, CreditCard, MoreHorizontal } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  
  const navigationItems = [
    { name: "Home", path: "/", icon: Home, label: "Início" },
    { name: "Transactions", path: "/transactions", icon: Receipt, label: "Extrato" },
    { name: "Cards", path: "/cards", icon: CreditCard, label: "Cartões" },
    { name: "More", path: "/more", icon: MoreHorizontal, label: "Menu" }
  ];

  return (
    <div className="min-h-screen bg-[#f5f9f4] pb-20">
      <style>{`
        :root {
          /* Paleta aproximada CrediSIS */
          --primary: #00953A; /* verde principal */
          --primary-light: #00B54A;
          --primary-dark: #00752E;
          --accent-yellow: #C6FF4A; /* verde-limão para destaques */
          --text-dark: #1F2933;
          --text-light: #6B7280;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>

      <main className="min-h-screen">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white z-50 safe-area-bottom shadow-[0_-4px_12px_rgba(0,0,0,0.08)]" role="navigation" aria-label="Menu de navegação principal">
        <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto px-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200 ${
                  isActive ? 'text-[color:var(--primary)]' : 'text-slate-400'
                }`}
                aria-label={`${item.label}${isActive ? ' - Página atual' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-6 h-6 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} aria-hidden="true" />
                <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}