import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bell,
  CreditCard,
  AlertTriangle,
  Info,
  CheckCircle,
  Gift,
  Clock
} from "lucide-react";
import { format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

const typeIcons = {
  transaction: CreditCard,
  invoice: AlertTriangle,
  security: AlertTriangle,
  general: Info,
  loyalty: Gift
};

const typeColors = {
  transaction: "bg-blue-50 text-blue-600",
  invoice: "bg-orange-50 text-orange-600",
  security: "bg-red-50 text-red-600",
  general: "bg-gray-100 text-gray-600",
  loyalty: "bg-purple-50 text-purple-600"
};

// Função segura para formatar data
const formatDateSafe = (dateString) => {
  if (!dateString) return "Data desconhecida";
  const date = new Date(dateString);
  return isValid(date) 
    ? format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR }) 
    : "Data inválida";
};

export default function NotificationsPage() {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      return [
        { id: '1', title: 'Nova transação aprovada', message: 'Compra no valor de R$ 458,90 aprovada no Supermercado Bom Preço', type: 'transaction', is_read: false, priority: 'medium', created_date: '2025-11-10T14:30:00' },
        { id: '2', title: 'Fatura fechada', message: 'Sua fatura de novembro foi fechada no valor de R$ 6.550,00. Vencimento: 15/12', type: 'invoice', is_read: false, priority: 'high', created_date: '2025-11-10T09:00:00' },
        { id: '3', title: 'Lembrete de pagamento', message: 'Sua fatura vence em 5 dias. Não esqueça de realizar o pagamento!', type: 'invoice', is_read: false, priority: 'high', created_date: '2025-11-09T09:00:00' },
        { id: '4', title: 'Pontos acumulados', message: 'Você acumulou 450 pontos este mês! Confira as opções de resgate.', type: 'loyalty', is_read: true, priority: 'low', created_date: '2025-11-08T12:00:00' }
      ];
    },
    initialData: [],
  });

  const unreadNotifications = notifications.filter(n => !n.is_read);
  const readNotifications = notifications.filter(n => n.is_read);

  return (
    // 1. Fundo Gradiente Verde
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      
      {/* 2. Header Institucional */}
      <div className="px-6 pt-16 pb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-1">Notificações</h1>
            <p className="text-white/90 text-sm">
              {unreadNotifications.length} não lida{unreadNotifications.length !== 1 ? 's' : ''}
            </p>
          </div>
          {/* Botão de sino visual apenas */}
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full">
            <Bell className="w-6 h-6 text-[color:var(--accent-yellow,#C6FF4A)]" />
          </div>
        </div>
      </div>

      {/* 3. Container "Folha Branca" */}
      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <Card className="border-none shadow-md">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-[#014726] mx-auto mb-3" />
              <p className="text-[#2D3748] font-medium">Tudo em dia!</p>
              <p className="text-[#718096] text-sm mt-1">Você não tem notificações</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Seção Não Lidas */}
            {unreadNotifications.length > 0 && (
              <div className="mb-6">
                <h3 className="text-[#2D3748] font-bold mb-3 px-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Não Lidas
                </h3>
                <div className="space-y-3">
                  {unreadNotifications.map((notification) => {
                    const Icon = typeIcons[notification.type] || Info;
                    const colorClass = typeColors[notification.type] || typeColors.general;
                    
                    return (
                      <Card key={notification.id} className="border-none shadow-md bg-white border-l-4 border-l-[#014726]">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <p className="text-[#2D3748] font-semibold text-sm">
                                  {notification.title}
                                </p>
                                {notification.priority === 'high' && (
                                  <Badge variant="destructive" className="text-[10px] h-5 px-1.5 bg-red-100 text-red-700 border-none">
                                    Importante
                                  </Badge>
                                )}
                              </div>
                              <p className="text-[#718096] text-xs leading-relaxed">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-400 font-medium">
                                <Clock className="w-3 h-3" />
                                {formatDateSafe(notification.created_date)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Seção Anteriores */}
            {readNotifications.length > 0 && (
              <div>
                <h3 className="text-[#2D3748] font-bold mb-3 px-1 text-sm uppercase tracking-wider text-gray-500">Anteriores</h3>
                <div className="space-y-3">
                  {readNotifications.map((notification) => {
                    const Icon = typeIcons[notification.type] || Info;
                    const colorClass = typeColors[notification.type] || typeColors.general;
                    
                    return (
                      <Card key={notification.id} className="border-none shadow-sm bg-slate-50 opacity-90 hover:opacity-100 transition-opacity">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0 grayscale opacity-70`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[#2D3748] font-semibold text-sm mb-1">
                                {notification.title}
                              </p>
                              <p className="text-[#718096] text-xs leading-relaxed">
                                {notification.message}
                              </p>
                              <p className="text-[#718096] text-[10px] mt-2">
                                {formatDateSafe(notification.created_date)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}