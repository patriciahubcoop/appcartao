import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import {
  Lock,
  Wifi,
  Globe,
  KeyRound,
  ShieldCheck,
  Smartphone,
  Eye,
  ScanFace,
  X
} from "lucide-react";
import { toast } from "sonner";

// --- COMPONENTE SWITCH INTERNO (Para garantir que funcione) ---
const Switch = ({ checked, onCheckedChange }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`
        relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
        ${checked ? "bg-[#014726]" : "bg-slate-200"}
      `}
    >
      <span
        aria-hidden="true"
        className={`
          pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
          ${checked ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  );
};

// --- COMPONENTE DIALOG INTERNO (Para o Modal de Senha) ---
const SimpleDialog = ({ open, onOpenChange, children, title }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="absolute inset-0" onClick={() => onOpenChange(false)} />
      <div className="relative z-50 w-full max-w-xs bg-white rounded-2xl shadow-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-center w-full text-[#2D3748]">{title}</h3>
          <button onClick={() => onOpenChange(false)} className="absolute right-4 text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---
export default function CardManagementPage() {
  // Estados dos Bloqueios
  const [locks, setLocks] = useState({
    temporary: false,
    contactless: false,
    online: false
  });

  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [step, setStep] = useState('verify'); // verify | view

  const toggleLock = (type, label) => {
    setLocks(prev => {
      const newState = !prev[type];
      if (newState) {
        toast.error(`${label} BLOQUEADO`);
      } else {
        toast.success(`${label} DESBLOQUEADO`);
      }
      return { ...prev, [type]: newState };
    });
  };

  const handleIdentityVerification = () => {
    toast.info("Validando biometria facial...");
    setTimeout(() => {
      setStep('view');
      toast.success("Identidade confirmada!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      {/* Header */}
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-1">Configurar Cartão</h1>
        <p className="text-white/90 text-sm">Gerencie bloqueios e segurança</p>
      </div>

      {/* Container Branco */}
      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)] space-y-6">
        
        {/* Cartão Visual */}
        <div className="bg-gradient-to-br from-[#1F2933] to-[#014726] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10" />
          <p className="text-sm opacity-80 mb-6">Cartão Físico</p>
          <div className="flex justify-between items-end">
            <p className="font-mono text-lg tracking-widest">•••• 4521</p>
            <Wifi className="w-6 h-6 opacity-60" />
          </div>
        </div>

        {/* Lista de Bloqueios */}
        <div>
          <h3 className="text-[#2D3748] font-bold mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#014726]" /> Bloqueios e Segurança
          </h3>
          
          <div className="space-y-3">
            {/* Bloqueio Temporário */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg text-red-600 shadow-sm">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2D3748]">Bloqueio Temporário</p>
                  <p className="text-xs text-gray-500">Bloqueia o cartão físico</p>
                </div>
              </div>
              <Switch 
                checked={locks.temporary} 
                onCheckedChange={() => toggleLock('temporary', 'Bloqueio Temporário')}
              />
            </div>

            {/* Aproximação */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg text-orange-600 shadow-sm">
                  <Wifi className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2D3748]">Aproximação</p>
                  <p className="text-xs text-gray-500">Pagamento sem senha</p>
                </div>
              </div>
              <Switch 
                checked={locks.contactless} 
                onCheckedChange={() => toggleLock('contactless', 'Pagamento por Aproximação')}
              />
            </div>

            {/* Compras Online */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2D3748]">Compras Online</p>
                  <p className="text-xs text-gray-500">Sites e aplicativos</p>
                </div>
              </div>
              <Switch 
                checked={locks.online} 
                onCheckedChange={() => toggleLock('online', 'Compras Online')}
              />
            </div>
          </div>
        </div>

        {/* Gestão de Senha */}
        <div>
          <h3 className="text-[#2D3748] font-bold mb-4 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#014726]" /> Senha do Cartão
          </h3>
          <Button 
            variant="outline" 
            className="w-full justify-between h-14 border-slate-200 text-[#2D3748] hover:bg-slate-50 hover:text-[#014726]"
            onClick={() => {
              setStep('verify');
              setPasswordDialogOpen(true);
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-slate-100 rounded-md">
                <Eye className="w-5 h-5 text-gray-600" />
              </div>
              <span className="font-medium">Visualizar ou Alterar Senha</span>
            </div>
            <ShieldCheck className="w-5 h-5 text-green-600" />
          </Button>
        </div>

        {/* Atalho Carteiras */}
        <Link to="/digitalwallets">
          <Button className="w-full h-14 !bg-[#014726] hover:!bg-[#026c35] text-white shadow-lg mt-2">
            <Smartphone className="w-5 h-5 mr-2" />
            Carteiras Digitais (Apple/Google Pay)
          </Button>
        </Link>

        {/* Modal de Senha (Interno) */}
        <SimpleDialog 
          open={passwordDialogOpen} 
          onOpenChange={setPasswordDialogOpen}
          title={step === 'verify' ? "Confirmação de Identidade" : "Sua Senha"}
        >
          {step === 'verify' && (
            <div className="flex flex-col items-center py-4 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <ScanFace className="w-10 h-10 text-[#014726]" />
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Para sua segurança, confirme sua identidade com biometria.
              </p>
              <Button onClick={handleIdentityVerification} className="w-full !bg-[#014726] hover:!bg-[#026c35]">
                Confirmar com Face ID
              </Button>
            </div>
          )}

          {step === 'view' && (
            <div className="flex flex-col items-center py-4 text-center animate-fade-in">
              <p className="text-sm text-gray-500 mb-2">Senha do cartão final 4521:</p>
              <div className="text-4xl font-mono font-bold text-[#2D3748] tracking-[0.5em] mb-8 bg-slate-50 w-full py-4 rounded-lg">
                4582
              </div>
              <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50" onClick={() => toast.success("Fluxo de redefinição iniciado.")}>
                Esqueci a senha
              </Button>
            </div>
          )}
        </SimpleDialog>

      </div>
    </div>
  );
}