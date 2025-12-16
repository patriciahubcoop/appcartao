import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Briefcase,
  Building2,
  Landmark,
  CheckCircle2,
  ArrowRight,
  Clock
} from "lucide-react";
import { toast } from "sonner";

export default function SalaryPortabilityPage() {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    cnpj: '',
    companyName: '',
    bank: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.cnpj || !formData.companyName) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    
    // Simula envio
    setTimeout(() => {
      setStep('success');
      toast.success("Solicitação enviada com sucesso!");
    }, 1000);
  };

  return (
    // 1. Fundo Gradiente Verde
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      
      {/* 2. Header Institucional */}
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-1">Portabilidade de Salário</h1>
        <p className="text-white/90 text-sm">Traga seu salário e ganhe mais benefícios</p>
      </div>

      {/* 3. Container "Folha Branca" */}
      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        {step === 'form' ? (
          <div className="animate-fade-in">
            {/* Benefícios */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <Card className="border-none bg-green-50 shadow-none">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-[#014726]/10 flex items-center justify-center mb-2">
                    <Briefcase className="w-5 h-5 text-[#014726]" />
                  </div>
                  <p className="text-xs font-bold text-[#014726]">Isenção de Tarifas</p>
                </CardContent>
              </Card>
              <Card className="border-none bg-green-50 shadow-none">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-[#014726]/10 flex items-center justify-center mb-2">
                    <Landmark className="w-5 h-5 text-[#014726]" />
                  </div>
                  <p className="text-xs font-bold text-[#014726]">Melhores Taxas</p>
                </CardContent>
              </Card>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="text-[#2D3748] font-semibold">CNPJ da Empresa</Label>
                <div className="relative mt-2">
                  <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input 
                    placeholder="00.000.000/0000-00"
                    className="pl-10 h-12 bg-slate-50 border-slate-200"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label className="text-[#2D3748] font-semibold">Nome da Empresa (Razão Social)</Label>
                <div className="relative mt-2">
                  <Input 
                    placeholder="Ex: Minha Empresa LTDA"
                    className="pl-4 h-12 bg-slate-50 border-slate-200"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label className="text-[#2D3748] font-semibold">Banco de Origem (Onde recebe hoje)</Label>
                <div className="relative mt-2">
                  <Landmark className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select 
                    className="w-full h-12 pl-10 pr-4 rounded-md border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-[#014726]"
                    value={formData.bank}
                    onChange={(e) => setFormData({...formData, bank: e.target.value})}
                  >
                    <option value="">Selecione o banco...</option>
                    <option value="001">Banco do Brasil</option>
                    <option value="237">Bradesco</option>
                    <option value="341">Itaú</option>
                    <option value="104">Caixa Econômica</option>
                    <option value="033">Santander</option>
                    <option value="260">Nu Pagamentos</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full h-14 text-lg !bg-[#014726] hover:!bg-[#026c35] shadow-lg">
                  Solicitar Portabilidade
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-xs text-center text-gray-400 mt-4">
                  O processo é 100% digital e gratuito. O prazo para conclusão é de até 5 dias úteis.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* TELA DE SUCESSO */
          <div className="flex flex-col items-center justify-center py-10 animate-fade-in text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#2D3748] mb-2">Solicitação Recebida!</h2>
            <p className="text-[#718096] mb-8 max-w-xs mx-auto">
              Já enviamos seu pedido para a empresa <strong>{formData.companyName}</strong>.
            </p>

            <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100 mb-8 text-left">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">Pedido Realizado</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-800">Processamento no Banco Origem</span>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <CheckCircle2 className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-400">Conclusão (até 5 dias)</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full h-12 border-[#014726] text-[#014726]"
              onClick={() => setStep('form')}
            >
              Voltar ao Início
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}