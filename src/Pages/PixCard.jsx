import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  QrCode,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function PixCardPage() {
  const [pixKey, setPixKey] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [description, setDescription] = useState("");
  const [installments, setInstallments] = useState("1");

  const { data: cards, isLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      return [{
        id: '1',
        nickname: 'Cartão Principal',
        card_number_last4: '4521',
        available_limit: 8450.0,
        status: 'active'
      }];
    },
    initialData: [],
  });

  const handlePixPayment = (e) => {
    e.preventDefault();
    
    if (!pixKey || !amount || !selectedCard) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    toast.success('Pagamento via Pix com cartão iniciado!');
    
    // Reset form
    setPixKey("");
    setAmount("");
    setDescription("");
  };

  const activeCards = cards.filter(card => card.status === 'active');

  // Cálculos
  const baseAmount = parseFloat(amount) || 0;
  const installmentCount = parseInt(installments) || 1;
  const baseFeeRate = 0.03; // 3%
  const installmentFeeRate = 0.015; // 1,5% por parcela
  const totalFeeRate = baseFeeRate + (installmentFeeRate * installmentCount);
  const feeAmount = baseAmount * totalFeeRate;
  const totalAmount = baseAmount + feeAmount;
  const installmentValue = totalAmount / installmentCount;
  const installmentFee = feeAmount / installmentCount;

  return (
    // 1. Fundo Gradiente Verde (Padrão Home)
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      
      {/* 2. Header Institucional */}
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-2">Pix com Cartão</h1>
        <p className="text-white/90 text-sm">Pague usando o limite do seu cartão de crédito</p>
      </div>

      {/* 3. Container "Folha Branca" */}
      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        {/* Info Card - Ajustado para cores institucionais */}
        <Card className="border-none shadow-sm bg-green-50 mb-6">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-[#014726] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-[#014726] font-bold text-sm mb-1">Como funciona?</p>
                <p className="text-[#014726]/80 text-xs leading-relaxed">
                  O valor será cobrado na sua fatura do cartão de crédito. É como fazer uma compra normal, mas via Pix.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <form onSubmit={handlePixPayment} className="space-y-5">
              {/* Select Card */}
              <div className="space-y-2">
                <Label htmlFor="card" className="text-sm font-semibold text-[#2D3748]">
                  Selecione o cartão
                </Label>
                {isLoading ? (
                  <Skeleton className="h-11 w-full" />
                ) : (
                  <Select value={selectedCard} onValueChange={setSelectedCard} required>
                    <SelectTrigger id="card" className="h-11 border-slate-300">
                      <SelectValue placeholder="Escolha um cartão" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeCards.map((card) => (
                        <SelectItem key={card.id} value={card.id}>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-[#014726]" />
                            {card.nickname} - **** {card.card_number_last4}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {selectedCard && (
                  <p className="text-xs text-[#718096] mt-2">
                    Limite disponível: R$ {activeCards.find(c => c.id === selectedCard)?.available_limit?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                )}
              </div>

              {/* Pix Key */}
              <div className="space-y-2">
                <Label htmlFor="pix-key" className="text-sm font-semibold text-[#2D3748]">
                  Chave Pix ou Código
                </Label>
                <Input
                  id="pix-key"
                  type="text"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  placeholder="CPF, CNPJ, e-mail, telefone ou chave aleatória"
                  className="h-11 border-slate-300"
                  required
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-semibold text-[#2D3748]">
                  Valor (R$)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0,00"
                  min="0.01"
                  step="0.01"
                  className="h-11 text-lg border-slate-300"
                  required
                />
              </div>

              {/* Installments */}
              <div className="space-y-2">
                <Label htmlFor="installments" className="text-sm font-semibold text-[#2D3748]">
                  Parcelamento
                </Label>
                <Select value={installments} onValueChange={setInstallments}>
                  <SelectTrigger id="installments" className="h-11 border-slate-300">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">À vista (3% taxa)</SelectItem>
                    <SelectItem value="2">2x (6% taxa total)</SelectItem>
                    <SelectItem value="3">3x (7,5% taxa total)</SelectItem>
                    <SelectItem value="4">4x (9% taxa total)</SelectItem>
                    <SelectItem value="5">5x (10,5% taxa total)</SelectItem>
                    <SelectItem value="6">6x (12% taxa total)</SelectItem>
                    <SelectItem value="10">10x (18% taxa total)</SelectItem>
                    <SelectItem value="12">12x (21% taxa total)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Summary */}
              {amount && parseFloat(amount) > 0 && (
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#718096]">Valor do Pix</span>
                      <span className="text-[#2D3748] font-medium">
                        R$ {baseAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#718096]">
                        Taxa ({(totalFeeRate * 100).toFixed(1)}%)
                      </span>
                      <span className="text-orange-600 font-medium">
                        R$ {feeAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-300">
                      <div className="flex items-center justify-between">
                        <span className="text-[#2D3748] font-semibold">Total a pagar</span>
                        <span className="text-[#014726] text-lg font-bold">
                          R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                    {installmentCount > 1 && (
                      <div className="pt-2 border-t border-slate-200">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#718096]">Valor por parcela</span>
                          <span className="text-[#2D3748] font-semibold">
                            {installmentCount}x de R$ {installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold text-[#2D3748]">
                  Descrição (opcional)
                </Label>
                <Input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Pagamento de aluguel"
                  className="h-11 border-slate-300"
                />
              </div>

              {/* Submit Button - Cor Verde Institucional */}
              <Button
                type="submit"
                className="w-full !bg-[#014726] hover:!bg-[#026c35] h-12 text-base font-semibold"
              >
                <QrCode className="w-5 h-5 mr-2" aria-hidden="true" />
                Continuar com Pix
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Pix Transactions */}
        <div className="mt-6">
          <h3 className="text-[#2D3748] font-bold mb-3 px-1">Transações Recentes via Pix</h3>
          <Card className="border-none shadow-sm">
            <CardContent className="p-8 text-center">
              <QrCode className="w-12 h-12 text-[#718096] mx-auto mb-3" />
              <p className="text-[#2D3748] font-medium">Nenhuma transação ainda</p>
              <p className="text-[#718096] text-sm mt-1">Suas transações via Pix aparecerão aqui</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}