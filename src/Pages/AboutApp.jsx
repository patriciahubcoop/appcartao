import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award } from "lucide-react";
// Tenta importar o logo, se não existir, o código usa um fallback visual
import logoCredisis from "../assets/credisis-logo.png"; 

export default function AboutAppPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      <div className="px-6 pt-16 pb-8 text-center">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-1">Sobre o App</h1>
      </div>

      <div className="bg-white rounded-t-3xl px-6 py-12 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)] flex flex-col items-center">
        
        {/* Área do Logo */}
        <div className="mb-8 p-6 bg-slate-50 rounded-3xl shadow-inner">
          <img 
            src={logoCredisis} 
            alt="CrediSIS" 
            className="h-16 w-auto mx-auto object-contain" 
            onError={(e) => {e.target.style.display='none'}} // Esconde se imagem quebrar
          />
          {/* Texto fallback caso a imagem não carregue */}
          <p className="text-[#014726] font-bold text-xl mt-2">CrediSIS</p>
        </div>

        <h2 className="text-2xl font-bold text-[#2D3748]">CrediSIS Mobile</h2>
        <p className="text-gray-500 font-medium mt-1">Versão 3.5.0</p>
        <p className="text-gray-400 text-xs mt-1">Build 2025.12.15</p>

        <div className="mt-10 space-y-4 w-full">
          <Card className="border-none shadow-sm bg-green-50">
            <CardContent className="p-4 flex items-center gap-4">
              <Shield className="w-6 h-6 text-[#014726]" />
              <div>
                <p className="text-sm font-bold text-[#014726]">Segurança Certificada</p>
                <p className="text-xs text-[#014726]/80">Seus dados protegidos com criptografia de ponta a ponta.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-slate-50">
            <CardContent className="p-4 flex items-center gap-4">
              <Award className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="text-sm font-bold text-[#2D3748]">Excelência</p>
                <p className="text-xs text-gray-500">Sistema Cooperativo de Crédito reconhecido nacionalmente.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-auto pt-12 text-center pb-8">
          <p className="text-sm text-gray-900 font-semibold">CrediSIS - Sistema de Cooperativas</p>
          <p className="text-xs text-gray-500 mt-1">CNPJ: 00.000.000/0001-00</p>
          <p className="text-xs text-gray-400 mt-4">
            © 2025 Todos os direitos reservados.
          </p>
        </div>

      </div>
    </div>
  );
}