import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, CreditCard, Lock, Users, Wallet, Image, Gift, Plus } from "lucide-react";

const managementOptions = [
  {
    icon: CreditCard,
    title: "Segunda Via do Cartão",
    description: "Solicite um novo cartão",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: Lock,
    title: "Alterar Senha",
    description: "Troque sua senha de segurança",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: Users,
    title: "Cartões Adicionais",
    description: "Gerencie cartões extras",
    color: "bg-purple-50 text-purple-600"
  },
  {
    icon: Plus,
    title: "Categorias de Gastos",
    description: "Bloqueie ou limite por categoria",
    color: "bg-orange-50 text-orange-600"
  },
  {
    icon: Wallet,
    title: "Carteira Digital",
    description: "Gerencie dispositivos cadastrados",
    color: "bg-indigo-50 text-indigo-600"
  },
  {
    icon: Image,
    title: "Personalização",
    description: "Customize a imagem do seu cartão",
    color: "bg-pink-50 text-pink-600"
  },
  {
    icon: Gift,
    title: "Programa de Pontos",
    description: "Visualize e troque seus pontos",
    color: "bg-yellow-50 text-yellow-600"
  }
];

export default function CardManagementPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4A9B9E] to-[#3D8385] px-4 pt-12 pb-6 rounded-b-3xl">
        <h1 className="text-white text-2xl font-bold mb-1">Gestão do Cartão</h1>
        <p className="text-white/80 text-sm">Gerencie todos os aspectos do seu cartão</p>
      </div>

      <div className="px-4 py-6 space-y-3">
        {managementOptions.map((option, index) => {
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
    </div>
  );
}