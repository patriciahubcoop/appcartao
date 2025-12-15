import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  Download,
  Share2,
  Mail,
  Copy,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronRight,
  PieChart
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function InvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const { data: invoices, isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      return [
        { id: '1', card_id: '1', reference_month: '2025-11', total_amount: 6550.0, due_date: '2025-12-15', closing_date: '2025-12-10', status: 'open', paid_amount: 0 },
        { id: '2', card_id: '1', reference_month: '2025-10', total_amount: 4850.75, due_date: '2025-11-15', closing_date: '2025-11-10', status: 'closed', paid_amount: 0 },
        { id: '3', card_id: '1', reference_month: '2025-09', total_amount: 3920.5, due_date: '2025-10-15', status: 'paid', paid_amount: 3920.5, payment_date: '2025-10-14' },
        { id: '4', card_id: '1', reference_month: '2025-08', total_amount: 5125.3, due_date: '2025-09-15', status: 'paid', paid_amount: 5125.3, payment_date: '2025-09-13' }
      ];
    },
    initialData: [],
  });

  const { data: cards } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      return [{ id: '1', nickname: 'Cartão Principal' }];
    },
    initialData: [],
  });

  const statusConfig = {
    open: { label: 'Em aberto', color: 'bg-orange-100 text-orange-700', icon: Clock },
    closed: { label: 'Fechada', color: 'bg-blue-100 text-blue-700', icon: Clock },
    paid: { label: 'Paga', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    overdue: { label: 'Vencida', color: 'bg-red-100 text-red-700', icon: AlertCircle },
    installment: { label: 'Parcelada', color: 'bg-purple-100 text-purple-700', icon: PieChart }
  };

  const currentInvoice = invoices.find(inv => inv.status === 'open' || inv.status === 'closed');
  const totalPaid = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + (inv.paid_amount || 0), 0);

  return (
    // 1. Fundo Gradiente Verde
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      
      {/* 2. Header Institucional */}
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-4">Faturas</h1>
        
        {/* Current Invoice Summary - Mantido no Header */}
        {currentInvoice && (
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/80 text-sm">Fatura Atual</span>
                <Badge className={statusConfig[currentInvoice.status]?.color}>
                  {statusConfig[currentInvoice.status]?.label}
                </Badge>
              </div>
              <p className="text-white text-3xl font-bold mb-2">
                R$ {currentInvoice.total_amount?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center justify-between text-white/80 text-sm">
                <span>Vencimento:</span>
                <span className="font-semibold">
                  {format(new Date(currentInvoice.due_date), "dd 'de' MMMM", { locale: ptBR })}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="p-3">
              <p className="text-white/80 text-xs mb-1">Total pago</p>
              <p className="text-white text-lg font-bold">
                R$ {totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="p-3">
              <p className="text-white/80 text-xs mb-1">Histórico</p>
              <p className="text-white text-lg font-bold">{invoices.length} faturas</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. Container "Folha Branca" */}
      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        {/* Quick Actions */}
        {currentInvoice && (
          <Card className="border-none shadow-md mb-6">
            <CardContent className="p-4">
              <h3 className="text-[#2D3748] font-bold mb-3">Ações Rápidas</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start" size="sm">
                  <Copy className="w-4 h-4 mr-2 text-[#014726]" />
                  Copiar código
                </Button>
                <Button variant="outline" className="justify-start" size="sm">
                  <Mail className="w-4 h-4 mr-2 text-[#014726]" />
                  Enviar e-mail
                </Button>
                <Button variant="outline" className="justify-start" size="sm">
                  <Download className="w-4 h-4 mr-2 text-[#014726]" />
                  Baixar PDF
                </Button>
                <Button variant="outline" className="justify-start" size="sm">
                  <Share2 className="w-4 h-4 mr-2 text-[#014726]" />
                  Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Invoices List */}
        <div>
          <h3 className="text-[#2D3748] font-bold mb-3 px-1">Histórico de Faturas</h3>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          ) : invoices.length === 0 ? (
            <Card className="border-none shadow-md">
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-[#718096] mx-auto mb-3" />
                <p className="text-[#2D3748] font-medium">Nenhuma fatura encontrada</p>
                <p className="text-[#718096] text-sm mt-1">Suas faturas aparecerão aqui</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {invoices.map((invoice) => {
                const status = statusConfig[invoice.status];
                const StatusIcon = status.icon;
                const card = cards.find(c => c.id === invoice.card_id);
                
                return (
                  <Card key={invoice.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-[#014726]" />
                            <span className="text-[#2D3748] font-semibold">
                              {invoice.reference_month}
                            </span>
                          </div>
                          {card && (
                            <p className="text-[#718096] text-xs">{card.nickname}</p>
                          )}
                        </div>
                        <Badge className={status.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[#718096] text-sm">Valor total</span>
                          <span className="text-[#2D3748] font-bold text-lg">
                            R$ {invoice.total_amount?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        
                        {invoice.status === 'paid' && invoice.paid_amount && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-[#718096]">Valor pago</span>
                            <span className="text-green-600 font-semibold">
                              R$ {invoice.paid_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm pt-2 border-t">
                          <span className="text-[#718096]">
                            {invoice.status === 'paid' ? 'Pago em' : 'Vence em'}
                          </span>
                          <span className="text-[#2D3748] font-semibold">
                            {format(
                              new Date(invoice.status === 'paid' ? invoice.payment_date : invoice.due_date),
                              "dd/MM/yyyy",
                              { locale: ptBR }
                            )}
                          </span>
                        </div>
                      </div>

                      {invoice.installment_plan && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#718096]">Parcelamento</span>
                            <span className="text-[#2D3748] font-medium">
                              {invoice.installment_plan.total_installments}x de R$ {invoice.installment_plan.installment_amount?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        </div>
                      )}

                      <Button variant="ghost" className="w-full mt-3 text-[#014726] hover:text-[#026c35]" size="sm">
                        Ver detalhes
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}