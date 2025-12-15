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
  CheckCircle
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const typeIcons = {
  transaction: CreditCard,
  invoice: AlertTriangle,
  security: AlertTriangle,
  general: Info
};

const typeColors = {
  transaction: "bg-blue-50 text-blue-600",
  invoice: "bg-orange-50 text-orange-600",
  security: "bg-red-50 text-red-600",
  general: "bg-green-50 text-green-600"
};

export default function NotificationsPage() {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      // Mock local de notificações
      return [
        { id: '1', title: 'Nova transação aprovada', message: 'Compra no valor de R$ 458,90 aprovada no Supermercado Bom Preço', type: 'transaction', is_read: false, priority: 'medium', created_date: '2025-11-10T14:30:00' },
        { id: '2', title: 'Fatura fechada', message: 'Sua fatura de novembro foi fechada no valor de R$ 6.550,00. Vencimento: 15/12', type: 'invoice', is_read: false, priority: 'high', created_date: '2025-11-10T00:00:00' },
        { id: '3', title: 'Lembrete de pagamento', message: 'Sua fatura vence em 5 dias. Não esqueça de realizar o pagamento!', type: 'invoice', is_read: false, priority: 'high', created_date: '2025-11-09T09:00:00' },
        { id: '4', title: 'Pontos acumulados', message: 'Você acumulou 450 pontos este mês! Confira as opções de resgate.', type: 'general', is_read: true, priority: 'low', created_date: '2025-11-08T12:00:00' }
      ];
    },
    initialData: [],
  });

  const unreadNotifications = notifications.filter(n => !n.is_read);
  const readNotifications = notifications.filter(n => n.is_read);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4A9B9E] to-[#3D8385] px-4 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-2xl font-bold mb-1">Notificações</h1>
            <p className="text-white/80 text-sm">
              {unreadNotifications.length} não lida{unreadNotifications.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="bg-white/20 p-3 rounded-full">
            <Bell className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <Card className="border-none shadow-md">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-[#4A9B9E] mx-auto mb-3" />
              <p className="text-[#2D3748] font-medium">Tudo em dia!</p>
              <p className="text-[#718096] text-sm mt-1">Você não tem notificações</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {unreadNotifications.length > 0 && (
              <div>
                <h3 className="text-[#2D3748] font-bold mb-3 px-1">Não Lidas</h3>
                <div className="space-y-3">
                  {unreadNotifications.map((notification) => {
                    const Icon = typeIcons[notification.type];
                    const colorClass = typeColors[notification.type];
                    
                    return (
                      <Card key={notification.id} className="border-none shadow-md">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <p className="text-[#2D3748] font-semibold">
                                  {notification.title}
                                </p>
                                {notification.priority === 'high' && (
                                  <Badge variant="destructive" className="text-xs">
                                    Importante
                                  </Badge>
                                )}
                              </div>
                              <p className="text-[#718096] text-sm">
                                {notification.message}
                              </p>
                              <p className="text-[#718096] text-xs mt-2">
                                {format(new Date(notification.created_date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
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

            {readNotifications.length > 0 && (
              <div>
                <h3 className="text-[#2D3748] font-bold mb-3 px-1">Anteriores</h3>
                <div className="space-y-3">
                  {readNotifications.map((notification) => {
                    const Icon = typeIcons[notification.type];
                    const colorClass = typeColors[notification.type];
                    
                    return (
                      <Card key={notification.id} className="border-none shadow-sm opacity-70">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[#2D3748] font-semibold mb-1">
                                {notification.title}
                              </p>
                              <p className="text-[#718096] text-sm">
                                {notification.message}
                              </p>
                              <p className="text-[#718096] text-xs mt-2">
                                {format(new Date(notification.created_date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
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