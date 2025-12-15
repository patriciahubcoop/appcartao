import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  Calendar,
  History,
  RefreshCw
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function DollarQuotePage() {
  const [amount, setAmount] = useState("");
  const [simulationType, setSimulationType] = useState("brl_to_usd");
  const [currentRate, setCurrentRate] = useState({ buy: 5.45, sell: 5.50 });
  
  const queryClient = useQueryClient();

  const { data: history, isLoading } = useQuery({
    queryKey: ['dollarQuotes'],
    queryFn: async () => {
      return [
        { id: '1', quote_date: '2025-11-12', buy_rate: 5.45, sell_rate: 5.50, amount_brl: 1000.0, amount_usd: 183.49, simulation_type: 'brl_to_usd', created_date: '2025-11-12T10:00:00' },
        { id: '2', quote_date: '2025-11-11', buy_rate: 5.42, sell_rate: 5.48, amount_brl: 2740.0, amount_usd: 500.0, simulation_type: 'usd_to_brl', created_date: '2025-11-11T15:30:00' },
        { id: '3', quote_date: '2025-11-10', buy_rate: 5.38, sell_rate: 5.44, amount_brl: 5000.0, amount_usd: 929.37, simulation_type: 'brl_to_usd', created_date: '2025-11-10T09:15:00' }
      ];
    },
    initialData: [],
  });

  const createQuoteMutation = useMutation({
    mutationFn: async (quoteData) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(quoteData), 300);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dollarQuotes'] });
    },
  });

  const handleSimulate = () => {
    if (!amount || parseFloat(amount) <= 0) return;

    const amountValue = parseFloat(amount);
    let convertedAmount;
    let quoteData;

    if (simulationType === "brl_to_usd") {
      convertedAmount = amountValue / currentRate.buy;
      quoteData = {
        quote_date: new Date().toISOString().split('T')[0],
        buy_rate: currentRate.buy,
        sell_rate: currentRate.sell,
        amount_brl: amountValue,
        amount_usd: convertedAmount,
        simulation_type: "brl_to_usd"
      };
    } else {
      convertedAmount = amountValue * currentRate.sell;
      quoteData = {
        quote_date: new Date().toISOString().split('T')[0],
        buy_rate: currentRate.buy,
        sell_rate: currentRate.sell,
        amount_brl: convertedAmount,
        amount_usd: amountValue,
        simulation_type: "usd_to_brl"
      };
    }

    createQuoteMutation.mutate(quoteData);
  };

  const latestSimulation = history[0];
  const yesterdayRate = 5.42;
  const rateChange = ((currentRate.buy - yesterdayRate) / yesterdayRate * 100).toFixed(2);
  const isPositive = rateChange >= 0;

  return (
    // 1. Fundo Gradiente Verde
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      
      {/* 2. Header Institucional */}
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-2">Cotação do Dólar</h1>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3" role="alert" aria-live="polite">
          <p className="text-white/90 text-xs leading-relaxed">
            ⚠️ Cotação referente ao dólar comercial do dia. Os valores podem sofrer alterações ao longo do dia de acordo com o mercado financeiro.
          </p>
        </div>
        <p className="text-white/80 text-sm">Simule conversões de moeda</p>
      </div>

      {/* 3. Container "Folha Branca" */}
      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        {/* Current Rate - Card com fundo escuro institucional (igual CardsPage) */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-[#1F2933] to-[#014726] mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-white" />
                <span className="text-white/80 text-sm">Cotação Atual</span>
              </div>
              <Badge className={`${isPositive ? 'bg-white/20' : 'bg-red-500/20'} text-white border-white/30`}>
                {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {Math.abs(rateChange)}%
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/70 text-xs mb-1">Compra</p>
                <p className="text-white text-2xl font-bold">R$ {currentRate.buy.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-white/70 text-xs mb-1">Venda</p>
                <p className="text-white text-2xl font-bold">R$ {currentRate.sell.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 text-white/80 text-xs">
              <RefreshCw className="w-3 h-3" />
              <span>Atualizado agora</span>
            </div>
          </CardContent>
        </Card>

        {/* Simulator */}
        <Card className="border-none shadow-md mb-6">
          <CardContent className="p-6">
            <h3 className="text-[#2D3748] font-bold mb-4">Simulador de Conversão</h3>
            
            <div className="space-y-4">
              {/* Toggle Simulation Type */}
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant={simulationType === "brl_to_usd" ? "default" : "outline"}
                  // Forçando o fundo verde quando ativo
                  className={simulationType === "brl_to_usd" ? "!bg-[#014726] text-white" : ""}
                  onClick={() => setSimulationType("brl_to_usd")}
                >
                  BRL → USD
                </Button>
                <ArrowRightLeft className="w-5 h-5 text-[#718096]" />
                <Button
                  variant={simulationType === "usd_to_brl" ? "default" : "outline"}
                  // Forçando o fundo verde quando ativo
                  className={simulationType === "usd_to_brl" ? "!bg-[#014726] text-white" : ""}
                  onClick={() => setSimulationType("usd_to_brl")}
                >
                  USD → BRL
                </Button>
              </div>

              {/* Amount Input */}
              <div>
                <label className="text-[#718096] text-sm mb-2 block">
                  Valor em {simulationType === "brl_to_usd" ? "Reais" : "Dólares"}
                </label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-lg bg-slate-50"
                />
              </div>

              {/* Result */}
              {latestSimulation && amount && (
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-[#718096] text-sm mb-1">Resultado</p>
                  <p className="text-[#2D3748] text-2xl font-bold">
                    {simulationType === "brl_to_usd" 
                      ? `$ ${(parseFloat(amount) / currentRate.buy).toFixed(2)}`
                      : `R$ ${(parseFloat(amount) * currentRate.sell).toFixed(2)}`
                    }
                  </p>
                  <p className="text-[#718096] text-xs mt-1">
                    Taxa: R$ {simulationType === "brl_to_usd" ? currentRate.buy.toFixed(2) : currentRate.sell.toFixed(2)}
                  </p>
                </div>
              )}

              {/* Botão de Simular Verde Escuro */}
              <Button
                onClick={handleSimulate}
                disabled={!amount || parseFloat(amount) <= 0 || createQuoteMutation.isPending}
                className="w-full !bg-[#014726] hover:!bg-[#026c35]"
              >
                {createQuoteMutation.isPending ? "Simulando..." : "Simular Conversão"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* History */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <History className="w-5 h-5 text-[#014726]" />
            <h3 className="text-[#2D3748] font-bold">Histórico de Simulações</h3>
          </div>
          
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-xl" />
              ))}
            </div>
          ) : history.length === 0 ? (
            <Card className="border-none shadow-md">
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-[#718096] mx-auto mb-3" />
                <p className="text-[#2D3748] font-medium">Nenhuma simulação ainda</p>
                <p className="text-[#718096] text-sm mt-1">Suas simulações aparecerão aqui</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {history.map((quote) => (
                <Card key={quote.id} className="border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {quote.simulation_type === "brl_to_usd" ? "BRL → USD" : "USD → BRL"}
                          </Badge>
                          <span className="text-[#718096] text-xs">
                            {format(new Date(quote.created_date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-[#2D3748] font-semibold">
                            R$ {quote.amount_brl?.toFixed(2)}
                          </span>
                          <ArrowRightLeft className="w-4 h-4 text-[#718096]" />
                          <span className="text-[#2D3748] font-semibold">
                            $ {quote.amount_usd?.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[#718096] text-xs">Taxa</p>
                        <p className="text-[#2D3748] font-semibold text-sm">
                          R$ {quote.buy_rate?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}