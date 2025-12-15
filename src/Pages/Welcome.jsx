import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function WelcomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar automaticamente após breve delay
    const timer = setTimeout(() => {
      navigate("/");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A9B9E] to-[#3D8385] flex flex-col items-center justify-center p-6">
      <div className="text-center" role="status" aria-live="polite">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-6 max-w-sm mx-auto">
          <img 
            src="https://via.placeholder.com/400x200?text=Hubcoop"
            alt="Logo Hubcoop - Gestão de Cartões"
            className="w-full h-auto"
          />
        </div>
        <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" aria-hidden="true" />
        <h1 className="text-white text-2xl font-bold mb-2">Bem-vindo ao Hubcoop</h1>
        <p className="text-white/80 text-base">Carregando sua conta...</p>
      </div>
    </div>
  );
}