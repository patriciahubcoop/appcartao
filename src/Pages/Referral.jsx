import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  Share2,
  Copy,
  Gift,
  CheckCircle2,
  Clock,
  CreditCard,
  ChevronRight,
  Info
} from "lucide-react";
import { toast } from "sonner";

export default function ReferralPage() {
  const [referralCode] = useState("JOAOSILVA2025");

  // Mock de indicações
  const referrals = [
    { 
      id: 1, 
      name: "Maria Oliveira", 
      status: "completed", 
      date: "10/11/2025",
      detail: "Comprou R$ 85,00" 
    },
    { 
      id: 2, 
      name: "Pedro Santos", 
      status: "pending_purchase", 
      date: "14/11/2025",
      detail: "Conta ativada" 
    },
    { 
      id: 3, 
      name: "Lucas Pereira", 
      status: "invited", 
      date: "16/11/2025",
      detail: "Convite enviado" 
    }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Código copiado para a área de transferência!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Venha para o HubCoop',
        text: `Use meu código ${referralCode} e venha para o melhor banco digital!`,
        url: 'https://hubcoop.com/convite'
      }).catch(console.error);
    } else {
      handleCopyCode();
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">+ 10 pts</Badge>;
      case "pending_purchase":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Aguardando Compra</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">Pendente</Badge>;
    }
  };

  return (
    // 1. Fundo Gradiente Verde
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      
      {/* 2. Header Institucional */}
      <div className="px-6 pt-16 pb-8 text-center">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
          <Gift className="w-8 h-8 text-[color:var(--accent-yellow,#C6FF4A)]" />
        </div>
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-2">Indique e Ganhe</h1>
        <p className="text-white/90 text-sm max-w-xs mx-auto">
          Traga seus amigos e acumule pontos para trocar por recompensas incríveis.
        </p>
      </div>

      {/* 3. Container "Folha Branca" */}
      <div className="bg-white rounded-t-3xl px-6 py-8 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)] relative">
        
        {/* Banner de Regra */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-5 mb-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[#014726] font-bold text-lg">Ganhe 10 Pontos</p>
            <p className="text-sm text-gray-600 mt-1">
              Para cada amigo que ativar a conta e fizer a <br/>
              <strong>primeira compra acima de R$ 50,00</strong>.
            </p>
          </div>
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-200 rounded-full opacity-20 -mr-8 -mt-8"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 bg-emerald-200 rounded-full opacity-20 -ml-6 -mb-6"></div>
        </div>

        {/* Área do Código */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-3 text-center">Seu código de convite</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-14 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center">
              <span className="text-xl font-mono font-bold text-[#2D3748] tracking-widest">{referralCode}</span>
            </div>
            <Button 
              onClick={handleCopyCode}
              className="h-14 w-14 bg-slate-100 hover:bg-slate-200 text-[#2D3748] border-none shadow-none"
            >
              <Copy className="w-5 h-5" />
            </Button>
          </div>
          
          <Button 
            onClick={handleShare}
            className="w-full h-14 mt-4 !bg-[#014726] hover:!bg-[#026c35] text-lg shadow-lg"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Convidar Amigos
          </Button>
        </div>

        {/* Como Funciona (Passo a Passo) */}
        <div className="mb-8">
          <h3 className="text-[#2D3748] font-bold mb-4">Como funciona</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-[#014726] font-bold text-sm">1</div>
                <div className="w-0.5 h-full bg-slate-100 my-1"></div>
              </div>
              <div className="pb-4">
                <p className="text-sm font-semibold text-gray-800">Envie o convite</p>
                <p className="text-xs text-gray-500">Compartilhe seu código com amigos.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-[#014726] font-bold text-sm">2</div>
                <div className="w-0.5 h-full bg-slate-100 my-1"></div>
              </div>
              <div className="pb-4">
                <p className="text-sm font-semibold text-gray-800">Amigo ativa a conta</p>
                <p className="text-xs text-gray-500">Ele cria a conta e desbloqueia o cartão.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#014726] flex items-center justify-center text-white font-bold text-sm">3</div>
              </div>
              <div>
                <p className="text-sm font-bold text-[#014726]">Primeira compra elegível</p>
                <p className="text-xs text-gray-500">
                  Ao gastar <strong>acima de R$ 50,00</strong> no crédito, você ganha seus pontos!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Indicações */}
        <div>
          <h3 className="text-[#2D3748] font-bold mb-4 flex items-center justify-between">
            Suas Indicações
            <span className="text-xs font-normal text-gray-500 bg-slate-100 px-2 py-1 rounded-full">
              {referrals.length} amigos
            </span>
          </h3>
          
          <div className="space-y-3">
            {referrals.map((item) => (
              <Card key={item.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#2D3748]">{item.name}</p>
                        <p className="text-[10px] text-gray-400">{item.date}</p>
                      </div>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="pl-12"> {/* Alinhamento com o texto acima */}
                    <div className="flex items-center gap-1 text-xs text-gray-500 bg-slate-50 p-2 rounded-lg inline-flex">
                      {item.status === 'completed' ? (
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                      ) : item.status === 'pending_purchase' ? (
                        <CreditCard className="w-3 h-3 text-orange-500" />
                      ) : (
                        <Clock className="w-3 h-3 text-gray-400" />
                      )}
                      {item.detail}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}