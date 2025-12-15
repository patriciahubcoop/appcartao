import React, { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CreditCard,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Settings,
  Info,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

export default function LimitsPage() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adjustmentType, setAdjustmentType] = useState("increase"); // "increase" or "decrease"
  const [newLimit, setNewLimit] = useState("");
  
  const queryClient = useQueryClient();

  const { data: cards, isLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      // Mock local de cartões
      return [{
        id: '1',
        nickname: 'Cartão Principal',
        card_number_last4: '4521',
        total_limit: 15000.0,
        available_limit: 8450.0,
        status: 'active'
      }];
    },
    initialData: [],
  });

  const updateLimitMutation = useMutation({
    mutationFn: async ({ cardId, newLimit }) => {
      // Simula atualização de limite sem chamada real de API
      return new Promise((resolve) => {
        setTimeout(
          () =>
            resolve({
              id: cardId,
              total_limit: parseFloat(newLimit),
            }),
          300
        );
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      toast.success('Solicitação de ajuste de limite enviada!');
      setDialogOpen(false);
      setNewLimit("");
    },
  });

  React.useEffect(() => {
    if (cards && cards.length > 0 && !selectedCard) {
      setSelectedCard(cards[0]);
    }
  }, [cards, selectedCard]);

  const handleSubmitLimit = (e) => {
    e.preventDefault();
    
    if (!newLimit || parseFloat(newLimit) <= 0) {
      toast.error('Informe um valor válido');
      return;
    }

    if (adjustmentType === "increase" && parseFloat(newLimit) <= selectedCard.total_limit) {
      toast.error('O novo limite deve ser maior que o atual');
      return;
    }

    if (adjustmentType === "decrease" && parseFloat(newLimit) >= selectedCard.total_limit) {
      toast.error('O novo limite deve ser menor que o atual');
      return;
    }

    updateLimitMutation.mutate({
      cardId: selectedCard.id,
      newLimit: newLimit
    });
  };

  const usedPercentage = selectedCard 
    ? ((selectedCard.total_limit - selectedCard.available_limit) / selectedCard.total_limit * 100).toFixed(1)
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-gradient-to-br from-[#4A9B9E] to-[#3D8385] px-6 pt-12 pb-8">
          <Skeleton className="h-8 w-48 bg-white/20 mb-2" />
          <Skeleton className="h-4 w-64 bg-white/20" />
        </div>
        <div className="px-6 py-6 space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4A9B9E] to-[#3D8385] px-6 pt-12 pb-8">
        <h1 className="text-white text-2xl font-bold mb-2">Limites do Cartão</h1>
        <p className="text-white/80 text-sm">Consulte e gerencie seus limites</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Card Selector */}
        {cards.length > 1 && (
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-[#2D3748]">Selecione o cartão</Label>
            <Select 
              value={selectedCard?.id} 
              onValueChange={(id) => setSelectedCard(cards.find(c => c.id === id))}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Escolha um cartão" />
              </SelectTrigger>
              <SelectContent>
                {cards.map((card) => (
                  <SelectItem key={card.id} value={card.id}>
                    {card.nickname} - **** {card.card_number_last4}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {selectedCard && (
          <>
            {/* Current Limit Card */}
            <Card className="border-none shadow-lg bg-gradient-to-br from-[#4A9B9E] to-[#3D8385]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                  <CreditCard className="w-5 h-5" aria-hidden="true" />
                  <span>{selectedCard.nickname}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-white/80 text-sm mb-1">Limite total</p>
                    <p className="text-white text-3xl font-bold">
                      R$ {selectedCard.total_limit?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/70 text-xs mb-1">Disponível</p>
                      <p className="text-white text-lg font-semibold">
                        R$ {selectedCard.available_limit?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/70 text-xs mb-1">Utilizado</p>
                      <p className="text-white text-lg font-semibold">
                        R$ {(selectedCard.total_limit - selectedCard.available_limit)?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-white rounded-full h-2 transition-all"
                        style={{ width: `${usedPercentage}%` }}
                      />
                    </div>
                    <p className="text-white/80 text-xs mt-2">{usedPercentage}% utilizado</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-none shadow-sm bg-blue-50">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-blue-900 font-semibold text-sm mb-1">Como funciona?</p>
                    <p className="text-blue-800 text-xs leading-relaxed">
                      Você pode solicitar aumento ou redução do limite. As solicitações são analisadas em até 2 dias úteis.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => {
                  setAdjustmentType("increase");
                  setDialogOpen(true);
                }}
                className="h-auto py-4 bg-green-600 hover:bg-green-700 flex-col gap-2"
              >
                <ArrowUp className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm font-semibold">Aumentar Limite</span>
              </Button>

              <Button
                onClick={() => {
                  setAdjustmentType("decrease");
                  setDialogOpen(true);
                }}
                variant="outline"
                className="h-auto py-4 flex-col gap-2 border-2"
              >
                <ArrowDown className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm font-semibold">Reduzir Limite</span>
              </Button>
            </div>

            {/* Limit History */}
            <div>
              <h3 className="text-[#2D3748] font-bold mb-3 px-1">Histórico de Ajustes</h3>
              <Card className="border-none shadow-sm">
                <CardContent className="p-8 text-center">
                  <TrendingUp className="w-12 h-12 text-[#718096] mx-auto mb-3" />
                  <p className="text-[#2D3748] font-medium">Nenhum ajuste ainda</p>
                  <p className="text-[#718096] text-sm mt-1">Seu histórico de ajustes aparecerá aqui</p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>

      {/* Adjustment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {adjustmentType === "increase" ? "Aumentar Limite" : "Reduzir Limite"}
            </DialogTitle>
            <DialogDescription>
              {adjustmentType === "increase" 
                ? "Solicite um aumento no limite do seu cartão de crédito."
                : "Reduza o limite do seu cartão de crédito de forma permanente ou temporária."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitLimit} className="space-y-5 py-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#718096]">Limite atual</span>
                <span className="font-bold text-[#2D3748]">
                  R$ {selectedCard?.total_limit?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-limit" className="text-sm font-semibold text-[#2D3748]">
                Novo limite (R$)
              </Label>
              <Input
                id="new-limit"
                type="number"
                value={newLimit}
                onChange={(e) => setNewLimit(e.target.value)}
                placeholder="0,00"
                min="0.01"
                step="0.01"
                className="h-11 text-lg"
                required
              />
              <p className="text-xs text-[#718096]">
                {adjustmentType === "increase" 
                  ? "Informe o valor desejado para o novo limite"
                  : "Informe o valor que deseja reduzir"}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={updateLimitMutation.isPending}
                className="flex-1 bg-[#4A9B9E] hover:bg-[#3D8385]"
              >
                {updateLimitMutation.isPending ? "Enviando..." : "Confirmar"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}