import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  QrCode,
  CreditCard,
  AlertCircle
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

  const activeCards = cards.filter(card => card.status === 'active');

  // --- LÓGICA DE CÁLCULO ---
  const baseAmount = parseFloat(amount) || 0;

  const calculateOption = (numberOfInstallments) => {
    let rate;
    if (numberOfInstallments === 1) {
      rate = 0.0399; 
    } else {
      rate = 0.0399 + (0.015 * (numberOfInstallments - 1));
    }

    const totalFee = baseAmount * rate;
    const finalTotal = baseAmount + totalFee;
    const installmentValue = finalTotal / numberOfInstallments;

    return {
      installmentValue,
      finalTotal,
      totalFee,
      rateDisplay: (rate * 100).toFixed(2) + "%"
    };
  };

  const currentSimulation = calculateOption(parseInt(installments));

  const handlePixPayment = (e) => {
    e.preventDefault();
    if (!pixKey || !amount || !selectedCard) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    toast.success(`Pix de R$ ${baseAmount} agendado em ${installments}x!`);
    
    setPixKey("");
    setAmount("");
    setDescription("");
    setInstallments("1");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-2">Pix com Cartão</h1>
        <p className="text-white/90 text-sm">Use seu limite para fazer transferências</p>
      </div>

      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        <Card className="border-none shadow-sm bg-green-50 mb-6">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-[#014726] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#014726] font-bold text-sm mb-1">Como funciona?</p>
                <p className="text-[#014726]/80 text-xs leading-relaxed">
                  O valor é transferido na hora via Pix, mas você paga apenas no vencimento da fatura do seu cartão.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <form onSubmit={handlePixPayment} className="space-y-5">
              
              {/* Seleção de Cartão (NATIVO) */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#2D3748]">Cartão de Crédito</Label>
                {isLoading ? (
                  <Skeleton className="h-12 w-full" />
                ) : (
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
                    <select
                      value={selectedCard}
                      onChange={(e) => setSelectedCard(e.target.value)}
                      className="w-full h-12 pl-10 pr-4 bg-white border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-[#014726] focus:border-transparent appearance-none"
                      required
                    >
                      <option value="" disabled>Selecione um cartão</option>
                      {activeCards.map((card) => (
                        <option key={card.id} value={card.id}>
                          {card.nickname} (Final {card.card_number_last4})
                        </option>
                      ))}
                    </select>
                    {/* Seta customizada para o select nativo */}
                    <div className="absolute right-3 top-4 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                )}
                {selectedCard && (
                  <p className="text-xs text-right text-gray-500">
                    Limite: <strong>R$ {activeCards.find(c => c.id === selectedCard)?.available_limit.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#2D3748]">Chave Pix</Label>
                <Input
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  placeholder="CPF, E-mail ou Aleatória"
                  className="h-12 border-slate-300"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#2D3748]">Valor da transferência</Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 font-medium">R$</span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0,00"
                    className="h-12 pl-10 text-lg font-semibold border-slate-300"
                  />
                </div>
              </div>

              {/* Parcelamento (NATIVO) */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#2D3748]">Parcelamento</Label>
                <div className="relative">
                  <select
                    value={installments}
                    onChange={(e) => setInstallments(e.target.value)}
                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-[#014726] focus:border-transparent appearance-none"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => {
                      const sim = calculateOption(n);
                      return (
                        <option key={n} value={n.toString()}>
                          {n}x de {baseAmount > 0 
                            ? `R$ ${sim.installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                            : '-'} 
                          {baseAmount > 0 ? ` (Total: R$ ${sim.finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})` : ''}
                        </option>
                      );
                    })}
                  </select>
                  <div className="absolute right-3 top-4 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              {baseAmount > 0 && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Valor a enviar</span>
                    <span className="font-bold text-[#2D3748]">R$ {baseAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Taxas e Juros ({currentSimulation.rateDisplay})</span>
                    <span className="text-red-600 font-medium">+ R$ {currentSimulation.totalFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="border-t border-slate-200 my-2 pt-2 flex justify-between items-center">
                    <span className="text-gray-900 font-bold">Você paga</span>
                    <div className="text-right">
                      <span className="block text-lg font-extrabold text-[#014726]">
                        {installments}x R$ {currentSimulation.installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-xs text-gray-500">
                        Total: R$ {currentSimulation.finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full !bg-[#014726] hover:!bg-[#026c35] h-14 text-base font-bold shadow-lg mt-4"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Confirmar Pix
              </Button>

            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}