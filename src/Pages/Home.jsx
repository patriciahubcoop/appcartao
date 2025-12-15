import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import {
  Eye,
  EyeOff,
  ChevronRight,
  Smartphone,
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
  Percent,
  Receipt,
  QrCode,
  Send,
  Landmark,
  PiggyBank
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
        current_invoice_amount: 6550.0,
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
      // Mock local de notificações
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
    { icon: QrCode, label: "Pix com cartão", path: "/pix-card", color: "#4A9B9E" },
    { icon: CreditCard, label: "Consultar Limites", path: "/limits", color: "#4A9B9E" },
    { icon: Receipt, label: "Pagar", path: "/invoices", color: "#4A9B9E" },
    { icon: Smartphone, label: "Recarga", path: null, color: "#4A9B9E" },
  ];

  const menuItems = [
    { icon: CreditCard, label: "Meus cartões", path: "/cards" },

    { icon: DollarSign, label: "Empréstimo", page: null },
    { icon: TrendingUp, label: "Investimentos", page: null },
    { icon: Users, label: "Indicar amigos", page: null },
    { icon: Percent, label: "Cobrar", page: null },
    { icon: Landmark, label: "Depositar", path: null },
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
      </div>
    );
  }

  const currentBalance = selectedCard?.available_limit || 8450.0;
  const totalLimit = selectedCard?.total_limit || 15000.0;

  return (
    <div className="min-h-screen bg-[#4A9B9E]">
      {/* Header with Balance */}
      <div className="px-6 pt-16 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-white/40" />
            </div>
            <span className="text-white font-medium">Conta</span>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="text-white p-2"
            aria-label={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
          >
            {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>

        <div className="mb-2">
          <p className="text-white/80 text-sm mb-1">Saldo disponível</p>
          <p className="text-white text-3xl font-medium">
            {showBalance ? `R$ ${currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'R$ ••••••'}
          </p>
        </div>

        <div className="flex gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
          {quickActions.map((action, idx) => (
            action.path ? (
              <Link key={idx} to={action.path} className="flex-shrink-0">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <action.icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-white text-xs font-medium">{action.label}</span>
                </div>
              </Link>
            ) : (
              <button key={idx} className="flex-shrink-0">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <action.icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-white text-xs font-medium">{action.label}</span>
                </div>
              </button>
            )
          ))}
        </div>
      </div>

      {/* Card Section */}
      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen">
        <Link to="/cards">
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#4A9B9E]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[#2D3748] font-semibold">Cartão de crédito</p>
                    <p className="text-[#718096] text-sm">Fatura atual</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#718096]" aria-hidden="true" />
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-[#718096] text-xs mb-1">Fatura atual</p>
                <p className="text-[#2D3748] text-xl font-bold">
                  {showBalance ? `R$ ${selectedCard?.current_invoice_amount?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'R$ ••••••'}
                </p>
                <p className="text-[#718096] text-sm mt-1">
                  Limite disponível: {showBalance ? `R$ ${currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'R$ ••••••'}
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
                    <item.icon className="w-5 h-5 text-[#2D3748]" aria-hidden="true" />
                    <span className="text-[#2D3748] font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#718096]" aria-hidden="true" />
                </button>
              </Link>
            ) : (
              <button key={idx} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-[#2D3748]" aria-hidden="true" />
                  <span className="text-[#2D3748] font-medium">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#718096]" aria-hidden="true" />
              </button>
            )
          ))}
        </div>

        {/* Discover More */}
        <div className="mt-8">
          <h3 className="text-[#2D3748] font-bold mb-4">Descubra mais</h3>

          <Card className="border-none shadow-sm mb-3 bg-gradient-to-br from-purple-500 to-purple-600">
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

          <Link to="/dollar-quote">
            <Card className="border-none shadow-sm bg-gradient-to-br from-green-500 to-emerald-600">
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