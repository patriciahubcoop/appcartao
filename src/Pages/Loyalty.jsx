import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Gift,
  TrendingUp,
  Plane,
  ShoppingBag,
  History,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const rewardsCatalog = [
  {
    id: 1,
    name: "Voucher iFood R$ 50",
    cost: 3000,
    category: "voucher",
    icon: ShoppingBag,
    color: "bg-red-100 text-red-600",
    description: "Crédito para usar no app iFood"
  },
  {
    id: 2,
    name: "Voucher Uber R$ 50",
    cost: 3000,
    category: "voucher",
    icon: ShoppingBag,
    color: "bg-gray-100 text-gray-800",
    description: "Crédito para corridas ou mercado"
  },
  {
    id: 3,
    name: "Aporte Capital Social",
    cost: 5000,
    category: "investimento",
    icon: TrendingUp,
    color: "bg-green-100 text-green-700",
    description: "R$ 50,00 convertidos em cotas"
  },
  {
    id: 4,
    name: "Previdência Privada",
    cost: 10000,
    category: "investimento",
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-700",
    description: "Aporte extra no seu plano"
  },
  {
    id: 5,
    name: "Transferência Milhas",
    cost: 10000,
    category: "milhas",
    icon: Plane,
    color: "bg-orange-100 text-orange-700",
    description: "10.000 milhas aéreas"
  }
];

export default function LoyaltyPage() {
  const [selectedReward, setSelectedReward] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  // Mock de saldo de pontos (pode vir da API de cartões)
  const { data: pointsBalance, isLoading } = useQuery({
    queryKey: ['loyaltyPoints'],
    queryFn: async () => {
      return 12450; // Saldo simulado
    },
  });

  const handleRedeemClick = (reward) => {
    setSelectedReward(reward);
    setConfirmDialogOpen(true);
  };

  const handleConfirmRedeem = () => {
    if (pointsBalance < selectedReward.cost) {
      toast.error("Saldo insuficiente para este resgate.");
      setConfirmDialogOpen(false);
      return;
    }

    // Aqui chamaria a mutation para o backend
    setTimeout(() => {
      toast.success(`Resgate de "${selectedReward.name}" realizado com sucesso!`);
      setConfirmDialogOpen(false);
    }, 1000);
  };

  return (
    // 1. Fundo Gradiente Verde (Padrão do App)
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      
      {/* 2. Header Institucional */}
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-1">Programa de Pontos</h1>
        <p className="text-white/90 text-sm">Troque seus pontos por benefícios exclusivos</p>
      </div>

      {/* 3. Container "Folha Branca" */}
      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        {/* Card de Saldo */}
        {isLoading ? (
          <Skeleton className="h-32 w-full rounded-2xl mb-6" />
        ) : (
          <Card className="border-none shadow-lg bg-gradient-to-br from-[#1F2933] to-[#014726] text-white mb-6 relative overflow-hidden">
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/70 text-sm font-medium mb-1">Saldo disponível</p>
                  <h2 className="text-4xl font-extrabold text-[color:var(--accent-yellow,#C6FF4A)]">
                    {pointsBalance?.toLocaleString()} <span className="text-lg text-white">pts</span>
                  </h2>
                </div>
                <div className="p-2 bg-white/10 rounded-full">
                  <Gift className="w-6 h-6 text-[color:var(--accent-yellow,#C6FF4A)]" />
                </div>
              </div>

              {/* REGRA EXPLÍCITA DE CONVERSÃO */}
              <div className="mt-4 inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Info className="w-4 h-4 text-[color:var(--accent-yellow,#C6FF4A)]" />
                <span className="text-xs font-semibold tracking-wide">
                  US$ 1,00 gasto = 2 Pontos
                </span>
              </div>
            </CardContent>
            
            {/* Elemento decorativo de fundo */}
            <div className="absolute -right-6 -bottom-10 w-32 h-32 bg-[color:var(--accent-yellow,#C6FF4A)]/10 rounded-full blur-2xl" />
          </Card>
        )}

        {/* Abas de Categorias */}
        <Tabs defaultValue="todos" className="space-y-6">
          <TabsList className="w-full bg-slate-100 p-1 h-auto grid grid-cols-4">
            <TabsTrigger value="todos" className="text-xs py-2 data-[state=active]:text-[#014726]">Todos</TabsTrigger>
            <TabsTrigger value="voucher" className="text-xs py-2 data-[state=active]:text-[#014726]">Voucher</TabsTrigger>
            <TabsTrigger value="investimento" className="text-xs py-2 data-[state=active]:text-[#014726]">Invest.</TabsTrigger>
            <TabsTrigger value="milhas" className="text-xs py-2 data-[state=active]:text-[#014726]">Milhas</TabsTrigger>
          </TabsList>

          {/* Conteúdo das Abas (Renderização Condicional da Lista) */}
          {["todos", "voucher", "investimento", "milhas"].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="space-y-4">
              <div className="grid gap-4">
                {rewardsCatalog
                  .filter(item => tabValue === "todos" || item.category === tabValue)
                  .map((item) => {
                    const Icon = item.icon;
                    const canAfford = pointsBalance >= item.cost;

                    return (
                      <Card key={item.id} className="border-none shadow-sm hover:shadow-md transition-all">
                        <CardContent className="p-4 flex items-center gap-4">
                          {/* Ícone do Item */}
                          <div className={`p-3 rounded-xl ${item.color} flex-shrink-0`}>
                            <Icon className="w-6 h-6" />
                          </div>

                          {/* Detalhes */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[#2D3748] font-bold text-sm truncate">{item.name}</h3>
                            <p className="text-[#718096] text-xs mt-0.5 line-clamp-1">{item.description}</p>
                            <div className="mt-2 flex items-center gap-1">
                              <span className={`text-sm font-extrabold ${canAfford ? 'text-[#014726]' : 'text-gray-400'}`}>
                                {item.cost.toLocaleString()} pts
                              </span>
                            </div>
                          </div>

                          {/* Botão Resgatar */}
                          <Button 
                            size="sm" 
                            variant="outline"
                            disabled={!canAfford}
                            onClick={() => handleRedeemClick(item)}
                            className={`h-9 px-3 text-xs ${canAfford 
                              ? 'border-[#014726] text-[#014726] hover:bg-[#014726] hover:text-white' 
                              : 'opacity-50 cursor-not-allowed'}`}
                          >
                            Resgatar
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Histórico Recente (Mock) */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4 px-1">
            <History className="w-5 h-5 text-[#014726]" />
            <h3 className="text-[#2D3748] font-bold">Últimos Resgates</h3>
          </div>
          <Card className="border-none shadow-sm bg-slate-50">
            <CardContent className="p-0 divide-y divide-slate-100">
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-[#2D3748]">Voucher Uber R$ 20</p>
                  <p className="text-xs text-[#718096]">10/11/2025</p>
                </div>
                <span className="text-red-600 text-sm font-bold">- 1.200 pts</span>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-[#2D3748]">Pontos da Fatura</p>
                  <p className="text-xs text-[#718096]">05/11/2025</p>
                </div>
                <span className="text-green-600 text-sm font-bold">+ 450 pts</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modal de Confirmação */}
        <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
          <DialogContent className="max-w-xs rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-center text-[#2D3748]">Confirmar Resgate</DialogTitle>
              <DialogDescription className="text-center">
                Você deseja trocar <strong>{selectedReward?.cost.toLocaleString()} pontos</strong> por:
              </DialogDescription>
            </DialogHeader>
            
            {selectedReward && (
              <div className="flex flex-col items-center py-4">
                <div className={`p-4 rounded-full mb-3 ${selectedReward.color}`}>
                  <selectedReward.icon className="w-8 h-8" />
                </div>
                <p className="font-bold text-lg text-[#2D3748]">{selectedReward.name}</p>
                <p className="text-xs text-center text-gray-500 mt-1 max-w-[80%]">{selectedReward.description}</p>
              </div>
            )}

            <div className="flex gap-3 mt-2">
              <Button 
                variant="outline" 
                onClick={() => setConfirmDialogOpen(false)}
                className="flex-1 border-gray-200"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleConfirmRedeem}
                className="flex-1 !bg-[#014726] hover:!bg-[#026c35]"
              >
                Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}