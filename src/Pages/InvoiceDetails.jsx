import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, AlertTriangle, Calendar, DollarSign, ChevronDown, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock de transações da fatura
const transactions = [
  { id: 1, title: "Supermercado Extra", date: "10/11", amount: 450.00, category: "Alimentação" },
  { id: 2, title: "Uber *Trip", date: "11/11", amount: 24.90, category: "Transporte" },
  { id: 3, title: "Netflix.com", date: "12/11", amount: 55.90, category: "Lazer" },
  { id: 4, title: "Magazine Luiza", date: "14/11", amount: 1200.00, category: "Casa" },
];

export default function InvoiceDetailsPage() {
  const [selectedTx, setSelectedTx] = useState(null); // Variável de estado correta

  // Ação de Contestar
  const handleContest = () => {
    toast.success("Contestação enviada para análise. Prazo de 5 dias.");
    setSelectedTx(null);
  };

  // Ação de Parcelar/Antecipar
  const handleParcel = () => {
    toast.success("Simulação de parcelamento de compra iniciada.");
    setSelectedTx(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-1">Detalhes da Fatura</h1>
        <p className="text-white/90 text-sm">Novembro 2025</p>
      </div>

      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        <div className="mb-6">
          <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-2">Transações</p>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div 
                key={tx.id} 
                className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-slate-50 rounded-lg transition-colors"
                onClick={() => setSelectedTx(tx)}
              >
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-gray-500">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[#2D3748] font-bold text-sm">{tx.title}</p>
                    <p className="text-gray-400 text-xs">{tx.date} • {tx.category}</p>
                  </div>
                </div>
                <span className="font-semibold text-[#2D3748]">R$ {tx.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de Detalhes da Compra */}
        <Dialog open={!!selectedTx} onOpenChange={(open) => !open && setSelectedTx(null)}>
          <DialogContent className="max-w-xs rounded-2xl pt-8 z-[60]">
            
            {/* Botão de Fechar X no topo */}
            <button 
              onClick={() => setSelectedTx(null)}
              className="absolute right-4 top-4 p-1 rounded-full text-gray-400 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <DialogHeader>
              <DialogTitle className="text-center text-[#2D3748]">{selectedTx?.title}</DialogTitle>
              <DialogDescription className="text-center text-xl font-bold text-[#014726]">
                R$ {selectedTx?.amount.toFixed(2)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-4">
              <p className="text-center text-xs text-gray-500 mb-4">
                Realizada em {selectedTx?.date} - Categoria: {selectedTx?.category}
              </p>

              {/* Botão Contestar */}
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 text-red-600 border-red-100 hover:bg-red-50"
                onClick={() => {
                  if (window.confirm("Deseja realmente contestar esta compra?")) handleContest();
                }}
              >
                <AlertTriangle className="w-5 h-5 mr-3" />
                Contestar Compra
              </Button>

              {/* Botão Parcelar */}
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 text-[#014726] border-green-100 hover:bg-green-50"
                onClick={handleParcel}
              >
                <DollarSign className="w-5 h-5 mr-3" />
                Antecipar Parcelas
              </Button>

              {/* Botão Fechar Inferior - CORRIGIDO e PADRONIZADO (Verde) */}
              <Button 
                className="w-full !bg-[#014726] hover:!bg-[#026c35] mt-2"
                onClick={() => setSelectedTx(null)}
              >
                Fechar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}