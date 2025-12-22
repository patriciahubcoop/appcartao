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
  PieChart,
  FastForward, 
  ShoppingBag,
  AlertTriangle, 
  DollarSign,
  X 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

// Mock de transações por fatura
const invoiceTransactionsMock = {
  '1': [
    { id: 1, title: "Supermercado Extra", date: "10/11", amount: 450.00, category: "Alimentação" },
    { id: 2, title: "Uber *Trip", date: "11/11", amount: 24.90, category: "Transporte" },
    { id: 3, title: "Netflix.com", date: "12/11", amount: 55.90, category: "Lazer" },
    { id: 4, title: "Magazine Luiza", date: "14/11", amount: 1200.00, category: "Casa" },
  ]
};

export default function InvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState(null); 
  const [selectedTransaction, setSelectedTransaction] = useState(null); 
  const [anticipateDialogOpen, setAnticipateDialogOpen] = useState(false); 

  const { data: invoices, isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      return [
        { id: '1', card_id: '1', reference_month: '2025-11', total_amount: 6550.0, due_date: '2025-12-15', closing_date: '2025-12-10', status: 'open', paid_amount: 0 },
        { id: '2', card_id: '1', reference_month: '2025-10', total_amount: 4850.75, due_date: '2025-11-15', closing_date: '2025-11-10', status: 'closed', paid_amount: 0 },
        { id: '3', card_id: '1', reference_month: '2025-09', total_amount: 3920.5, due_date: '2025-10-15', status: 'paid', paid_amount: 3920.5, payment_date: '2025-10-14' },
      ];
    },
    initialData: [],
  });

  const statusConfig = {
    open: { label: 'Em aberto', color: 'bg-orange-100 text-orange-700', icon: Clock },
    closed: { label: 'Fechada', color: 'bg-blue-100 text-blue-700', icon: Clock },
    paid: { label: 'Paga', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    overdue: { label: 'Vencida', color: 'bg-red-100 text-red-700', icon: AlertCircle },
  };

  const handleAnticipateInvoice = () => {
    toast.success("Solicitação de antecipação da fatura enviada!");
    setAnticipateDialogOpen(false);
  };

  const handleContestTransaction = () => {
    toast.success("Contestação enviada para análise.");
    setSelectedTransaction(null);
  };

  const handleAnticipateTransaction = () => {
    toast.success("Simulação de antecipação de parcelas iniciada.");
    setSelectedTransaction(null);
  };

  const currentInvoice = invoices.find(inv => inv.status === 'open' || inv.status === 'closed');
  const totalPaid = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + (inv.paid_amount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-4">Faturas</h1>
        
        {/* Resumo da Fatura Atual */}
        {currentInvoice && (
          <Card className="bg-white/10 border-white/20 backdrop-blur mb-4">
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

        <Button 
          onClick={() => setAnticipateDialogOpen(true)}
          className="w-full bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur mb-4"
        >
          <FastForward className="w-4 h-4 mr-2" />
          Antecipar Pagamento da Fatura
        </Button>

        <div className="grid grid-cols-2 gap-3">
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

      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        {currentInvoice && (
          <Card className="border-none shadow-md mb-6">
            <CardContent className="p-4">
              <h3 className="text-[#2D3748] font-bold mb-3">Ações Rápidas</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start text-xs" size="sm">
                  <Copy className="w-4 h-4 mr-2 text-[#014726]" /> Copiar código
                </Button>
                <Button variant="outline" className="justify-start text-xs" size="sm">
                  <Mail className="w-4 h-4 mr-2 text-[#014726]" /> Enviar e-mail
                </Button>
                <Button variant="outline" className="justify-start text-xs" size="sm">
                  <Download className="w-4 h-4 mr-2 text-[#014726]" /> Baixar PDF
                </Button>
                <Button variant="outline" className="justify-start text-xs" size="sm">
                  <Share2 className="w-4 h-4 mr-2 text-[#014726]" /> Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div>
          <h3 className="text-[#2D3748] font-bold mb-3 px-1">Histórico de Faturas</h3>
          <div className="space-y-3">
            {invoices.map((invoice) => {
              const status = statusConfig[invoice.status];
              const StatusIcon = status.icon;
              return (
                <Card key={invoice.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#014726]" />
                        <span className="text-[#2D3748] font-semibold">{invoice.reference_month}</span>
                      </div>
                      <Badge className={status.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#718096] text-sm">Valor total</span>
                      <span className="text-[#2D3748] font-bold text-lg">
                        R$ {invoice.total_amount?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="w-full mt-3 text-[#014726] hover:text-[#026c35]" 
                      size="sm"
                      onClick={() => setSelectedInvoice(invoice)}
                    >
                      Ver detalhes da fatura
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* --- MODAL 1: DETALHES DA FATURA --- */}
        <Dialog open={!!selectedInvoice} onOpenChange={(open) => !open && setSelectedInvoice(null)}>
          <DialogContent className="max-w-md rounded-2xl h-[80vh] flex flex-col p-0 overflow-hidden relative">
            
            {/* BOTÃO FECHAR SUPERIOR (X) */}
            <button 
              onClick={() => setSelectedInvoice(null)}
              className="absolute right-4 top-4 p-1 rounded-full text-gray-400 hover:bg-slate-100 transition-colors z-50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 border-b border-slate-100">
              <DialogHeader>
                <DialogTitle>Fatura {selectedInvoice?.reference_month}</DialogTitle>
                <DialogDescription>
                  Vencimento: {selectedInvoice && format(new Date(selectedInvoice.due_date), "dd/MM/yyyy")}
                </DialogDescription>
              </DialogHeader>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(invoiceTransactionsMock[selectedInvoice?.id] || []).length > 0 ? (
                invoiceTransactionsMock[selectedInvoice?.id].map((tx) => (
                  <div 
                    key={tx.id} 
                    className="flex items-center justify-between p-3 border-b border-slate-50 last:border-0 cursor-pointer hover:bg-slate-50 rounded-lg transition-colors"
                    onClick={() => setSelectedTransaction(tx)}
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
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">
                  Nenhuma compra detalhada disponível.
                </div>
              )}
            </div>

            {/* BARRA INFERIOR DA FATURA (Total + Fechar) */}
            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-600">Total</span>
                <span className="font-bold text-xl text-[#014726]">
                  R$ {selectedInvoice?.total_amount?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <Button className="w-full !bg-[#014726] hover:!bg-[#026c35]" onClick={() => setSelectedInvoice(null)}>
                Fechar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* --- MODAL 2: AÇÕES NA TRANSAÇÃO --- */}
        <Dialog open={!!selectedTransaction} onOpenChange={(open) => !open && setSelectedTransaction(null)}>
          <DialogContent className="max-w-xs rounded-2xl z-[60] pt-8">
            
            <button 
              onClick={() => setSelectedTransaction(null)}
              className="absolute right-4 top-4 p-1 rounded-full text-gray-400 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <DialogHeader>
              <DialogTitle className="text-center text-[#2D3748]">{selectedTransaction?.title}</DialogTitle>
              <DialogDescription className="text-center text-xl font-bold text-[#014726]">
                R$ {selectedTransaction?.amount.toFixed(2)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-4">
              <p className="text-center text-xs text-gray-500 mb-4">
                Realizada em {selectedTransaction?.date} - {selectedTransaction?.category}
              </p>

              <Button 
                variant="outline" 
                className="w-full justify-start h-12 text-red-600 border-red-100 hover:bg-red-50"
                onClick={() => {
                  if(window.confirm("Deseja contestar esta compra?")) handleContestTransaction();
                }}
              >
                <AlertTriangle className="w-5 h-5 mr-3" />
                Contestar Compra
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start h-12 text-[#014726] border-green-100 hover:bg-green-50"
                onClick={handleAnticipateTransaction}
              >
                <DollarSign className="w-5 h-5 mr-3" />
                Antecipar Parcelas
              </Button>

              {/* BOTÃO FECHAR INFERIOR (PADRONIZADO) */}
              <Button 
                className="w-full !bg-[#014726] hover:!bg-[#026c35] mt-2" 
                onClick={() => setSelectedTransaction(null)}
              >
                Fechar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* --- MODAL 3: ANTECIPAR FATURA --- */}
        <Dialog open={anticipateDialogOpen} onOpenChange={setAnticipateDialogOpen}>
          <DialogContent className="max-w-xs rounded-2xl">
            <button 
              onClick={() => setAnticipateDialogOpen(false)}
              className="absolute right-4 top-4 p-1 rounded-full text-gray-400 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <DialogHeader>
              <DialogTitle className="text-center">Antecipar Fatura</DialogTitle>
              <DialogDescription className="text-center text-xs">
                Pague agora e libere seu limite imediatamente.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                <p className="text-sm text-gray-500">Valor Atual</p>
                <p className="text-2xl font-bold text-[#2D3748]">
                  R$ {currentInvoice?.total_amount?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <Badge className="mt-2 bg-green-100 text-green-700 border-none">
                  Desconto estimado: R$ 15,00
                </Badge>
              </div>
              <Button onClick={handleAnticipateInvoice} className="w-full !bg-[#014726] hover:!bg-[#026c35]">
                Confirmar Antecipação
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}