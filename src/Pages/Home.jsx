import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import logoCredisis from "../assets/credisis-logo.png";
import userAvatar from "../assets/avatar.jpg";

import {
  Eye,
  EyeOff,
  ChevronRight,
  Smartphone,
  CreditCard,
  Receipt,
  QrCode,
  Users, 
  Shield
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);

  const { data: cards, isLoading: cardsLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      // Mock local de cartão principal
      return [{
        id: '1',
        nickname: 'Cartão Principal',
        holder_name: 'João Silva Santos',
        cpf_cnpj: '123.456.789-00',
        card_number_last4: '4521',
        total_limit: 15000.0,
        available_limit: 8450.0,
        due_date: '2025-12-15',
        best_purchase_date: 'Dia 10',
        billing_period_start: '2025-11-16',
        billing_period_end: '2025-12-15',
        is_blocked: false,
        contactless_enabled: true,
        points_balance: 12450,
        status: 'active'
      }];
    },
    initialData: [],
  });

  const { data: notifications, isLoading: notificationsLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      return [
        {
          id: '1',
          title: 'Nova transação aprovada',
          message: 'Compra no valor de R$ 458,90 aprovada',
          is_read: false
        },
        {
          id: '2',
          title: 'Fatura fechada',
          message: 'Sua fatura de novembro foi fechada',
          is_read: false
        },
        {
          id: '3',
          title: 'Lembrete de pagamento',
          message: 'Sua fatura vence em 5 dias',
          is_read: false
        }
      ];
    },
    initialData: [],
  });

  React.useEffect(() => {
    if (cards && cards.length > 0 && !selectedCard) {
      setSelectedCard(cards[0]);
    }
  }, [cards, selectedCard]);

  const quickActions = [
    { icon: QrCode, label: "Pix com cartão", path: "/pix-card" },
    { icon: CreditCard, label: "Consultar Limites", path: "/limits" },
    { icon: Receipt, label: "Pagar", path: "/invoices" },
    { icon: Smartphone, label: "Recarga de celular", path: "/mobilerecharge" },
    
  ];

  const menuItems = [
    { icon: CreditCard, label: "Meus cartões", path: "/cards" },
    { icon: CreditCard, label: "Meus limites", path: "/limits" },
    { icon: CreditCard, label: "Meus pontos", path: "/loyalty" },
    { icon: Shield, label: "Meus serviços", path: "/services" },
    { icon: Users, label: "Indicar amigos", path: "/referral" } 
  ];

  if (cardsLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="grid grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <button className="flex-1 h-11 rounded-full bg-[color:var(--accent-yellow,#C6FF4A)] text-[#014726] font-semibold text-sm shadow-md">
            Abra sua conta
          </button>
          <button className="flex-1 h-11 rounded-full border border-white/70 text-white font-semibold text-sm bg-white/5">
            Acesse sua conta
          </button>
        </div>
      </div>
    );
  }

  // Define valores padrão para evitar erros de renderização
  const availableLimit = selectedCard?.available_limit ?? 8450.0;
  const totalLimit = selectedCard?.total_limit ?? 15000.0;
  
  // Cálculo: Limite Total - Limite Disponível = Fatura Atual
  const currentInvoice = totalLimit - availableLimit;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      {/* Header with Balance */}
      <div className="px-6 pt-16 pb-8 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[color:var(--accent-yellow,#C6FF4A)] overflow-hidden">
  <img
    src={userAvatar}
    alt="Foto de perfil de João"
    className="w-full h-full object-cover"
  />
</div>
            <span className="text-[color:var(--accent-yellow,#C6FF4A)] font-semibold tracking-wide">Olá, João!</span>
          </div>

          <button
            onClick={() => setShowBalance(!showBalance)}
            className="text-white p-2"
            aria-label={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
          >
            {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>

        {/* Logo */}
        <img
          src={logoCredisis}
          alt="CrediSIS"
          className="hidden sm:block h-28 w-auto absolute right-24 top-10"
        />

        <div className="mb-2">
          <p className="text-[color:var(--accent-yellow,#C6FF4A)] text-sm mb-1 font-medium">Limite disponível</p>
          <p className="text-white text-3xl font-semibold">
            {showBalance ? `R$ ${availableLimit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'R$ ••••••'}
          </p>
        </div>

        <div className="flex gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
          {quickActions.map((action, idx) => (
            action.path ? (
              <Link key={idx} to={action.path} className="flex-shrink-0">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-[color:var(--accent-yellow,#C6FF4A)] flex items-center justify-center shadow-md">
                    <action.icon className="w-7 h-7 text-[#014726]" aria-hidden="true" />
                  </div>
                  <span className="text-white text-xs font-semibold">{action.label}</span>
                </div>
              </Link>
            ) : (
              <button key={idx} className="flex-shrink-0">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-[color:var(--accent-yellow,#C6FF4A)] flex items-center justify-center shadow-md">
                    <action.icon className="w-7 h-7 text-[#014726]" aria-hidden="true" />
                  </div>
                  <span className="text-white text-xs font-semibold">{action.label}</span>
                </div>
              </button>
            )
          ))}
        </div>
      </div>

      {/* Card Section */}
      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        <Link to="/cards">
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#1F2933]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[#1F2933] font-semibold">Cartão de crédito</p>
                    <p className="text-[#6B7280] text-sm">Fatura atual</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#718096]" aria-hidden="true" />
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-[#6B7280] text-xs mb-1">Fatura atual</p>
                
                <p className="text-[#1F2933] text-xl font-bold">
                  {showBalance ? `R$ ${currentInvoice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'R$ ••••••'}
                </p>

                <p className="text-[#718096] text-sm mt-1">
                  Limite disponível: {showBalance ? `R$ ${availableLimit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'R$ ••••••'}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Menu Items */}
        <div className="space-y-1">
          {menuItems.map((item, idx) => (
            item.path ? (
              <Link key={idx} to={item.path}>
                <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-[#1F2933]" aria-hidden="true" />
                    <span className="text-[#1F2933] font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#718096]" aria-hidden="true" />
                </button>
              </Link>
            ) : (
              <button key={idx} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-[#1F2933]" aria-hidden="true" />
                  <span className="text-[#1F2933] font-medium">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#718096]" aria-hidden="true" />
              </button>
            )
          ))}
        </div>

        {/* Discover More */}
        <div className="mt-8">
          <h3 className="text-[#1F2933] font-bold mb-4">Descubra mais</h3>
          
          <Link to="/services">
          <Card className="border-none shadow-sm mb-3 bg-gradient-to-br from-[#6AD34B] to-[#00953A]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-white font-semibold mb-1">Seguro de vida</p>
                  <p className="text-white/90 text-sm">Cuide de quem você ama de um jeito simples</p>
                </div>
                <ChevronRight className="w-5 h-5 text-white ml-3" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
          </Link>

          <Link to="/dollar-quote">
            <Card className="border-none shadow-sm bg-gradient-to-br from-[#A6FF4E] to-[#00953A]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-white font-semibold mb-1">Câmbio</p>
                    <p className="text-white/90 text-sm">Simule a cotação do dólar</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white ml-3" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}