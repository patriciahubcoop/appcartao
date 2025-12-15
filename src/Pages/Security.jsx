import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronRight, 
  Bell, 
  Phone, 
  HelpCircle, 
  FileCheck,
  Shield,
  Info
} from "lucide-react";

const securityOptions = [
  {
    icon: Bell,
    title: "Alertas e Notificações",
    description: "Configure suas preferências",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: Phone,
    title: "Central de Atendimento",
    description: "0800 123 4567 • 24h",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: HelpCircle,
    title: "Perguntas Frequentes",
    description: "Tire suas dúvidas",
    color: "bg-purple-50 text-purple-600"
  },
  {
    icon: FileCheck,
    title: "Termos e Condições",
    description: "Leia nossos termos de uso",
    color: "bg-indigo-50 text-indigo-600"
  }
];

export default function SecurityPage() {
  return (
    // 1. Fundo Gradiente Verde (Padrão Home)
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      
      {/* 2. Header Institucional */}
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-1">Segurança</h1>
        <p className="text-white/90 text-sm">Configurações e suporte</p>
      </div>

      {/* 3. Container "Folha Branca" */}
      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        {/* Security Status - Ajustado para Verde Institucional */}
        <Card className="border-none shadow-md bg-green-50 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#014726]/10">
                <Shield className="w-6 h-6 text-[#014726]" />
              </div>
              <div className="flex-1">
                <p className="text-[#2D3748] font-bold">Conta Protegida</p>
                <p className="text-[#014726]/80 text-sm">Todas as medidas de segurança ativas</p>
              </div>
              <Badge className="bg-[#014726] hover:bg-[#026c35]">Ativo</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {securityOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <button className="w-full flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${option.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[#2D3748] font-semibold">{option.title}</p>
                      <p className="text-[#718096] text-sm mt-0.5">{option.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#718096] flex-shrink-0" />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* App Version */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-100">
                <Info className="w-5 h-5 text-[#014726]" />
              </div>
              <div className="flex-1">
                <p className="text-[#2D3748] font-semibold text-sm">Versão do Aplicativo</p>
                <p className="text-[#718096] text-xs mt-0.5">1.0.0 (Build 100)</p>
              </div>
              <Badge variant="outline" className="text-[#014726] border-[#014726]/20">Atualizado</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}