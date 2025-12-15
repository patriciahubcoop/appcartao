import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Receipt, CreditCard, Wallet, MoreHorizontal } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  
  const navigationItems = [
    { name: "Home", path: createPageUrl("Home"), icon: Home, label: "Início" },
    { name: "Transactions", path: createPageUrl("Transactions"), icon: Receipt, label: "Extrato" },
    { name: "Cards", path: createPageUrl("Cards"), icon: CreditCard, label: "Cartões" },
    { name: "More", path: createPageUrl("More"), icon: MoreHorizontal, label: "Menu" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-20">
      <style>{`
        :root {
          --primary: #4A9B9E;
          --primary-light: #5B9A9E;
          --primary-dark: #3D8385;
          --text-dark: #2D3748;
          --text-light: #718096;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
      
      <main className="min-h-screen">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white z-50 safe-area-bottom shadow-lg" role="navigation" aria-label="Menu de navegação principal">
        <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto px-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200 ${
                  isActive ? 'text-[#4A9B9E]' : 'text-slate-400'
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