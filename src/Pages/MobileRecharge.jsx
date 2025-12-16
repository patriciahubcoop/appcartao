import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone,
  ChevronRight,
  CheckCircle2,
  Clock,
  User,
  Wifi,
  Phone
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const recentRecharges = [
  { id: 1, name: "Meu Celular", number: "(11) 99999-9999", operator: "Vivo" },
  { id: 2, name: "Filho", number: "(11) 98888-8888", operator: "Tim" },
];

const operators = [
  { id: "vivo", name: "Vivo", color: "bg-purple-100 text-purple-700" },
  { id: "claro", name: "Claro", color: "bg-red-100 text-red-700" },
  { id: "tim", name: "Tim", color: "bg-blue-100 text-blue-700" },
  { id: "oi", name: "Oi", color: "bg-yellow-100 text-yellow-700" },
];

const amounts = [15, 20, 30, 50, 100];

export default function MobileRechargePage() {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [selectedOperator, setSelectedOperator] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleRechargeClick = () => {
    if (!selectedOperator || !phoneNumber || !selectedAmount) {
      toast.error("Preencha todos os campos para continuar.");
      return;
    }
    if (phoneNumber.length < 11) {
      toast.error("Digite um número válido com DDD.");
      return;
    }
    setConfirmOpen(true);
  };

  const confirmRecharge = () => {
    setConfirmOpen(false);
    // Simula processamento
    setTimeout(() => {
      setStep('success');
      toast.success("Recarga realizada com sucesso!");
    }, 1000);
  };

  const handleRecentClick = (recent) => {
    setPhoneNumber(recent.number);
    setSelectedOperator(recent.operator.toLowerCase());
    toast.info(`Dados de ${recent.name} carregados.`);
  };

  return (
    // 1. Fundo Gradiente Verde
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      
      {/* 2. Header Institucional */}
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-1">Recarga de Celular</h1>
        <p className="text-white/90 text-sm">Coloque créditos agora mesmo</p>
      </div>

      {/* 3. Container "Folha Branca" */}
      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        {step === 'form' ? (
          <div className="space-y-8 animate-fade-in">
            
            {/* Recentes */}
            <div>
              <h3 className="text-[#2D3748] font-bold mb-3 text-sm flex items-center">
                <Clock className="w-4 h-4 mr-2 text-[#014726]" /> Recentes
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {recentRecharges.map((rec) => (
                  <button 
                    key={rec.id}
                    onClick={() => handleRecentClick(rec)}
                    className="flex-shrink-0 bg-slate-50 border border-slate-200 rounded-xl p-3 w-32 flex flex-col items-center gap-2 hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#014726]/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-[#014726]" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-[#2D3748] truncate w-full">{rec.name}</p>
                      <p className="text-[10px] text-gray-500">{rec.operator}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Formulário */}
            <div className="space-y-6">
              
              {/* Número */}
              <div>
                <Label className="text-[#2D3748] font-semibold mb-2 block">Número com DDD</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <Input 
                    type="tel" 
                    placeholder="(00) 90000-0000"
                    className="pl-10 h-12 bg-slate-50 border-slate-200 text-lg"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* Operadora */}
              <div>
                <Label className="text-[#2D3748] font-semibold mb-3 block">Operadora</Label>
                <div className="grid grid-cols-4 gap-3">
                  {operators.map((op) => (
                    <button
                      key={op.id}
                      onClick={() => setSelectedOperator(op.id)}
                      className={`h-14 rounded-xl border-2 flex items-center justify-center transition-all ${
                        selectedOperator === op.id 
                          ? 'border-[#014726] bg-green-50 text-[#014726] font-bold' 
                          : 'border-slate-100 bg-white text-gray-600 hover:border-slate-300'
                      }`}
                    >
                      {op.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Valor */}
              <div>
                <Label className="text-[#2D3748] font-semibold mb-3 block">Valor da Recarga</Label>
                <div className="grid grid-cols-3 gap-3">
                  {amounts.map((val) => (
                    <button
                      key={val}
                      onClick={() => setSelectedAmount(val)}
                      className={`py-3 rounded-xl border-2 transition-all ${
                        selectedAmount === val 
                          ? 'border-[#014726] bg-[#014726] text-white font-bold shadow-md' 
                          : 'border-slate-100 bg-white text-[#2D3748] font-medium hover:bg-slate-50'
                      }`}
                    >
                      R$ {val},00
                    </button>
                  ))}
                </div>
              </div>

              {/* Botão de Ação */}
              <Button 
                onClick={handleRechargeClick}
                className="w-full h-14 text-lg !bg-[#014726] hover:!bg-[#026c35] shadow-lg mt-4"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Recarregar Agora
              </Button>

            </div>
          </div>
        ) : (
          /* TELA DE SUCESSO */
          <div className="flex flex-col items-center justify-center py-10 animate-fade-in text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
              <CheckCircle2 className="w-12 h-12 text-[#014726]" />
            </div>
            <h2 className="text-2xl font-bold text-[#2D3748] mb-2">Recarga Realizada!</h2>
            <p className="text-[#718096] mb-8">
              Você recarregou <strong>R$ {selectedAmount},00</strong><br/>
              para o número <strong>{phoneNumber}</strong>.
            </p>

            <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100 mb-8 text-left space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Operadora</span>
                <span className="font-bold text-[#2D3748] capitalize">{selectedOperator}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Data</span>
                <span className="font-bold text-[#2D3748]">{new Date().toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Pagamento</span>
                <span className="font-bold text-[#2D3748]">Crédito Final 4521</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full h-12 border-[#014726] text-[#014726] font-semibold"
              onClick={() => {
                setStep('form');
                setPhoneNumber('');
                setSelectedAmount(null);
                setSelectedOperator('');
              }}
            >
              Nova Recarga
            </Button>
          </div>
        )}

        {/* Modal de Confirmação */}
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent className="max-w-xs rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-center text-[#2D3748]">Confirmar Recarga</DialogTitle>
            </DialogHeader>
            <div className="py-4 text-center space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Valor</p>
                <p className="text-3xl font-extrabold text-[#014726]">R$ {selectedAmount},00</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Para o número</p>
                <p className="text-lg font-bold text-[#2D3748]">{phoneNumber}</p>
                <Badge className="mt-2 bg-slate-200 text-slate-700 hover:bg-slate-200 capitalize">
                  {selectedOperator}
                </Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setConfirmOpen(false)}>
                Cancelar
              </Button>
              <Button className="flex-1 !bg-[#014726] hover:!bg-[#026c35]" onClick={confirmRecharge}>
                Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}