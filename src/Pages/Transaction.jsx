import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Calendar,
  TrendingDown,
  ShoppingBag,
  UtensilsCrossed,
  Car,
  Plane,
  Heart,
  GraduationCap,
  Zap,
  Package,
  FastForward,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

const categoryIcons = {
  alimentacao: UtensilsCrossed,
  transporte: Car,
  saude: Heart,
  educacao: GraduationCap,
  lazer: ShoppingBag,
  vestuario: Package,
  tecnologia: Zap,
  combustivel: Car,
  viagem: Plane,
  outros: ShoppingBag
};

const categoryColors = {
  alimentacao: "text-orange-600 bg-orange-50",
  transporte: "text-blue-600 bg-blue-50",
  saude: "text-red-600 bg-red-50",
  educacao: "text-purple-600 bg-purple-50",
  lazer: "text-pink-600 bg-pink-50",
  vestuario: "text-indigo-600 bg-indigo-50",
  tecnologia: "text-cyan-600 bg-cyan-50",
  combustivel: "text-yellow-600 bg-yellow-50",
  viagem: "text-green-600 bg-green-50",
  outros: "text-gray-600 bg-gray-50"
};

export default function TransactionsPage() {
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [anticipateDialogOpen, setAnticipateDialogOpen] = useState(false);
  const [anticipateType, setAnticipateType] = useState("invoice"); // 'invoice' or 'transaction'
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      // Mock local de transações
      return [
        { id: '1', merchant_name: 'Supermercado Bom Preço', category: 'alimentacao', amount: 458.9, transaction_date: '2025-11-10T14:30:00', transaction_type: 'credit', installments: 1, status: 'completed' },
        { id: '2', merchant_name: 'Posto Shell', category: 'combustivel', amount: 250.0, transaction_date: '2025-11-09T08:15:00', transaction_type: 'credit', installments: 1, status: 'completed' },
        { id: '3', merchant_name: 'Amazon Brasil', category: 'tecnologia', amount: 1299.9, transaction_date: '2025-11-08T16:45:00', transaction_type: 'installment', installments: 6, current_installment: 1, status: 'completed' },
        { id: '4', merchant_name: 'Farmácia Saúde Total', category: 'saude', amount: 156.5, transaction_date: '2025-11-07T11:20:00', transaction_type: 'credit', installments: 1, status: 'completed' },
        { id: '5', merchant_name: 'Netflix', category: 'lazer', amount: 55.9, transaction_date: '2025-11-05T00:01:00', transaction_type: 'credit', installments: 1, status: 'completed' }
      ];
    },
    initialData: [],
  });

  const filteredTransactions = transactions.filter(t => {
    const matchesType = filterType === "all" || t.transaction_type === filterType;
    const matchesSearch = t.merchant_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalSpent = filteredTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const thisMonthTransactions = filteredTransactions.filter(t => {
    const transactionDate = new Date(t.transaction_date);
    const now = new Date();
    return transactionDate.getMonth() === now.getMonth() && 
           transactionDate.getFullYear() === now.getFullYear();
  });

  const groupedByDate = filteredTransactions.reduce((acc, transaction) => {
    const date = format(new Date(transaction.transaction_date), 'yyyy-MM-dd');
    if (!acc[date]) acc[date] = [];
    acc[date].push(transaction);
    return acc;
  }, {});

  const handleAnticipateInvoice = () => {
    toast.success('Solicitação de antecipação da fatura enviada!');
    setAnticipateDialogOpen(false);
  };

  const handleAnticipateTransaction = (transaction) => {
    toast.success(`Antecipação da compra "${transaction.merchant_name}" solicitada!`);
    setAnticipateDialogOpen(false);
    setSelectedTransaction(null);
  };

  return (
    // 1. Fundo Gradiente Verde (Tema Home)
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      
      {/* 2. Header no padrão da Home */}
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-4">Transações</h1>
        
        {/* Summary Cards - Mantidos com transparência sobre o verde */}
        <div className="grid grid-cols-2 gap-3 mb-2">
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-white/80 text-xs mb-1">
                <TrendingDown className="w-4 h-4" />
                <span>Total gasto</span>
              </div>
              <p className="text-white text-xl font-bold">
                R$ {totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-white/80 text-xs mb-1">
                <Calendar className="w-4 h-4" />
                <span>Este mês</span>
              </div>
              <p className="text-white text-xl font-bold">
                {thisMonthTransactions.length} transações
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. Conteúdo em "Folha Branca" (Tema Home) */}
      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        {/* Search Input - Movido para dentro da área branca para contraste */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Buscar transação..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-50 border-slate-200"
          />
        </div>

        {/* Anticipate Invoice Button - Verde Escuro Institucional */}
        <Button
          onClick={() => {
            setAnticipateType("invoice");
            setAnticipateDialogOpen(true);
          }}
          className="w-full !bg-[#014726] hover:!bg-[#026c35] shadow-md mb-6"
        >
          <FastForward className="w-4 h-4 mr-2" aria-hidden="true" />
          Antecipar Pagamento da Fatura
        </Button>

        {/* Filter Tabs - Ajustadas para usar a cor verde na seleção */}
        <Tabs value={filterType} onValueChange={setFilterType} className="mb-6">
          <TabsList className="w-full bg-slate-100 grid grid-cols-4 h-auto p-1">
            <TabsTrigger value="all" className="text-xs data-[state=active]:text-[#014726]">Todas</TabsTrigger>
            <TabsTrigger value="credit" className="text-xs data-[state=active]:text-[#014726]">Crédito</TabsTrigger>
            <TabsTrigger value="debit" className="text-xs data-[state=active]:text-[#014726]">Débito</TabsTrigger>
            <TabsTrigger value="installment" className="text-xs data-[state=active]:text-[#014726]">Parcelas</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        ) : filteredTransactions.length === 0 ? (
          <Card className="border-none shadow-md">
            <CardContent className="p-8 text-center">
              <Filter className="w-12 h-12 text-[#718096] mx-auto mb-3" />
              <p className="text-[#2D3748] font-medium">Nenhuma transação encontrada</p>
              <p className="text-[#718096] text-sm mt-1">Tente ajustar os filtros</p>
            </CardContent>
          </Card>
        ) : (
          Object.entries(groupedByDate).map(([date, dayTransactions]) => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-3 px-1 mt-4">
                <Calendar className="w-4 h-4 text-[#014726]" /> {/* Ícone Verde */}
                <h3 className="text-[#2D3748] font-bold text-sm">
                  {format(new Date(date), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                </h3>
                <span className="text-[#718096] text-xs ml-auto">
                  {dayTransactions.length} {dayTransactions.length === 1 ? 'transação' : 'transações'}
                </span>
              </div>
              <div className="space-y-2 mb-6">
                {dayTransactions.map((transaction) => {
                  const CategoryIcon = categoryIcons[transaction.category] || ShoppingBag;
                  const colorClass = categoryColors[transaction.category] || categoryColors.outros;
                  
                  return (
                    <Card key={transaction.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-xl ${colorClass}`}>
                            <CategoryIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[#2D3748] font-semibold truncate">
                              {transaction.merchant_name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {transaction.category}
                              </Badge>
                              {transaction.installments > 1 && (
                                <Badge variant="secondary" className="text-xs">
                                  {transaction.current_installment}/{transaction.installments}x
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[#2D3748] font-bold">
                              -R$ {transaction.amount?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-[#718096] text-xs mt-1">
                              {format(new Date(transaction.transaction_date), 'HH:mm')}
                            </p>
                          </div>
                        </div>

                        {transaction.installments > 1 && (
                          // Botão Antecipar Parcelas - Ajustado para Verde
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedTransaction(transaction);
                              setAnticipateType("transaction");
                              setAnticipateDialogOpen(true);
                            }}
                            className="w-full mt-3 text-[#014726] border-[#014726]/20 hover:bg-[#014726]/5"
                          >
                            <FastForward className="w-3 h-3 mr-2" aria-hidden="true" />
                            Antecipar Parcelas
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))
        )}

        {/* Anticipate Payment Dialog */}
        <Dialog open={anticipateDialogOpen} onOpenChange={setAnticipateDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {anticipateType === "invoice" ? "Antecipar Fatura" : "Antecipar Parcelas"}
              </DialogTitle>
              <DialogDescription>
                {anticipateType === "invoice" 
                  ? "Antecipe o pagamento da sua fatura e reduza os juros."
                  : `Antecipe as parcelas restantes de "${selectedTransaction?.merchant_name}".`}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {anticipateType === "invoice" ? (
                <>
                  <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#718096]">Valor da fatura</span>
                      <span className="font-bold text-[#2D3748]">R$ 6.550,00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#718096]">Desconto (antecipação)</span>
                      <span className="font-bold text-[#014726]">-R$ 131,00</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#2D3748]">Total a pagar</span>
                        <span className="text-xl font-bold text-[#2D3748]">R$ 6.419,00</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#718096] text-center">
                    Economia de 2% ao antecipar o pagamento
                  </p>
                </>
              ) : (
                <>
                  <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#718096]">Parcelas restantes</span>
                      <span className="font-bold text-[#2D3748]">
                        {selectedTransaction?.installments - selectedTransaction?.current_installment + 1}x
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#718096]">Valor original</span>
                      <span className="font-bold text-[#2D3748]">
                        R$ {selectedTransaction?.amount?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#718096]">Desconto (antecipação)</span>
                      <span className="font-bold text-[#014726]">-R$ {(selectedTransaction?.amount * 0.02)?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#2D3748]">Total a pagar</span>
                        <span className="text-xl font-bold text-[#2D3748]">
                          R$ {(selectedTransaction?.amount * 0.98)?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#718096] text-center">
                    Economia de 2% ao antecipar as parcelas
                  </p>
                </>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setAnticipateDialogOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                {/* Botão Confirmar - Verde Institucional */}
                <Button
                  onClick={anticipateType === "invoice" ? handleAnticipateInvoice : () => handleAnticipateTransaction(selectedTransaction)}
                  className="flex-1 !bg-[#014726] hover:!bg-[#026c35]"
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}