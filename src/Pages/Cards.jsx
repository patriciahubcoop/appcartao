import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CreditCard,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  Lock,
  Smartphone,
  Plane
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import TravelNoticeDialog from "../Componentes/cards/TravelNoticeDialog";

export default function CardsPage() {
  const [showCardDetails, setShowCardDetails] = useState({});
  const [generatingCVV, setGeneratingCVV] = useState(false);
  const [dynamicCVV, setDynamicCVV] = useState(null);
  const [travelDialogOpen, setTravelDialogOpen] = useState(false);
  const [selectedCardForTravel, setSelectedCardForTravel] = useState(null);
  const queryClient = useQueryClient();

  const { data: cards, isLoading: cardsLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      return [{
        id: '1',
        nickname: 'Cartão Principal',
        holder_name: 'João Silva Santos',
        card_type: 'credit',
        card_number_last4: '4521',
        total_limit: 15000.0,
        available_limit: 8450.0,
        status: 'active',
        is_blocked: false
      }];
    },
    initialData: [],
  });

  const { data: requests, isLoading: requestsLoading } = useQuery({
    queryKey: ['cardRequests'],
    queryFn: async () => {
      return [
        { id: '1', request_type: 'new_card', card_type: 'credit', status: 'pending', created_date: '2025-11-12T10:00:00' },
        { id: '2', request_type: 'second_copy', card_type: 'credit', status: 'approved', created_date: '2025-11-08T15:30:00' }
      ];
    },
    initialData: [],
  });

  const handleGenerateCVV = () => {
    setGeneratingCVV(true);
    setTimeout(() => {
      const cvv = Math.floor(100 + Math.random() * 900).toString();
      setDynamicCVV(cvv);
      setGeneratingCVV(false);
      toast.success('CVV dinâmico gerado com sucesso!');
    }, 1500);
  };

  const handleCopyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado!`);
  };

  const toggleCardDetails = (cardId) => {
    setShowCardDetails(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const statusConfig = {
    pending: { label: 'Em análise', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    approved: { label: 'Aprovado', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    rejected: { label: 'Recusado', color: 'bg-red-100 text-red-700', icon: AlertCircle },
    delivered: { label: 'Entregue', color: 'bg-blue-100 text-blue-700', icon: CheckCircle }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      
      {/* Header */}
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-1">Meus Cartões</h1>
        <p className="text-white/90 text-sm">Gerencie seus cartões físicos e virtuais</p>
      </div>

      {/* Conteúdo Principal */}
      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        <Tabs defaultValue="cards" className="space-y-6">
          <TabsList className="w-full grid grid-cols-2 h-auto p-1 bg-slate-100">
            <TabsTrigger value="cards" className="text-sm py-2.5 data-[state=active]:bg-white data-[state=active]:text-[#014726]">
              <CreditCard className="w-4 h-4 mr-2" aria-hidden="true" />
              Cartões
            </TabsTrigger>
            <TabsTrigger value="requests" className="text-sm py-2.5 data-[state=active]:bg-white data-[state=active]:text-[#014726]">
              <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
              Solicitações
            </TabsTrigger>
          </TabsList>

          {/* Cards Tab */}
          <TabsContent value="cards" className="space-y-4">
            {cardsLoading ? (
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full rounded-2xl" />
                ))}
              </div>
            ) : cards.length === 0 ? (
              <Card className="border-none shadow-md">
                <CardContent className="p-8 text-center">
                  <CreditCard className="w-12 h-12 text-[#718096] mx-auto mb-3" aria-hidden="true" />
                  <p className="text-[#2D3748] font-medium">Nenhum cartão cadastrado</p>
                  <p className="text-[#718096] text-sm mt-1">Solicite seu primeiro cartão</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {cards.map((card) => (
                  <Card key={card.id} className="border-none shadow-md overflow-hidden">
                    <CardContent className="p-0">
                      {/* Visual do Cartão */}
                      <div className="bg-gradient-to-br from-[#1F2933] to-[#014726] text-white p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" aria-hidden="true" />
                        
                        <div className="flex items-start justify-between mb-6 relative z-10">
                          <div>
                            <p className="text-white/60 text-xs mb-1">{card.nickname}</p>
                            <Badge className={card.is_blocked ? 'bg-red-500' : 'bg-green-500'}>
                              {card.is_blocked ? 'Bloqueado' : 'Ativo'}
                            </Badge>
                          </div>
                          <button
                            onClick={() => toggleCardDetails(card.id)}
                            className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                            aria-label={showCardDetails[card.id] ? 'Ocultar dados do cartão' : 'Mostrar dados do cartão'}
                          >
                            {showCardDetails[card.id] ? (
                              <EyeOff className="w-5 h-5" aria-hidden="true" />
                            ) : (
                              <Eye className="w-5 h-5" aria-hidden="true" />
                            )}
                          </button>
                        </div>

                        <div className="space-y-4 relative z-10">
                          <div>
                            <p className="text-white/60 text-xs mb-1">Número do cartão</p>
                            {showCardDetails[card.id] ? (
                              <div className="flex items-center gap-2">
                                <p className="font-mono text-lg">5123 4567 8901 {card.card_number_last4}</p>
                                <button
                                  onClick={() => handleCopyToClipboard(`5123456789014521`, 'Número do cartão')}
                                  className="text-white/60 hover:text-white"
                                  aria-label="Copiar número do cartão"
                                >
                                  <Copy className="w-4 h-4" aria-hidden="true" />
                                </button>
                              </div>
                            ) : (
                              <p className="font-mono text-lg">•••• •••• •••• {card.card_number_last4}</p>
                            )}
                          </div>

                          <div className="flex items-center gap-6">
                            <div>
                              <p className="text-white/60 text-xs mb-1">Validade</p>
                              {showCardDetails[card.id] ? (
                                <p className="font-mono">12/28</p>
                              ) : (
                                <p className="font-mono">••/••</p>
                              )}
                            </div>
                            <div>
                              <p className="text-white/60 text-xs mb-1">CVV</p>
                              {showCardDetails[card.id] ? (
                                <p className="font-mono">789</p>
                              ) : (
                                <p className="font-mono">•••</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <p className="text-white/60 text-xs mb-1">Titular</p>
                            <p className="font-medium">{card.holder_name}</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions Section */}
                      <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-4">
                        {/* Aviso de Viagem - Outline */}
                        <Button
                          onClick={() => {
                            setSelectedCardForTravel(card);
                            setTravelDialogOpen(true);
                          }}
                          variant="outline"
                          className="w-full border-[#014726]/20 text-[#014726] hover:bg-[#014726]/5"
                        >
                          <Plane className="w-4 h-4 mr-2" aria-hidden="true" />
                          Aviso de Viagem
                        </Button>

                        {/* Virtual Card & CVV Section */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Smartphone className="w-4 h-4 text-[#014726]" aria-hidden="true" />
                            <h3 className="text-[#2D3748] font-semibold text-sm">Cartão Virtual</h3>
                          </div>

                        <div className="space-y-3">
                          {dynamicCVV && (
                            <div className="bg-white p-3 rounded-lg border border-green-200">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-xs text-[#718096] mb-1">CVV Dinâmico</p>
                                  <p className="font-mono text-2xl font-bold text-[#2D3748]">{dynamicCVV}</p>
                                  <p className="text-xs text-green-600 mt-1">Válido por 5 minutos</p>
                                </div>
                                <button
                                  onClick={() => handleCopyToClipboard(dynamicCVV, 'CVV dinâmico')}
                                  className="bg-green-50 text-green-600 p-2 rounded-lg hover:bg-green-100"
                                  aria-label="Copiar CVV dinâmico"
                                >
                                  <Copy className="w-4 h-4" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Botão CVV - FORÇADO PARA VERDE (Usei !bg e !text) */}
                          <Button
                            onClick={handleGenerateCVV}
                            disabled={generatingCVV}
                            className="w-full !bg-[#014726] hover:!bg-[#026c35] text-white border-none"
                          >
                            {generatingCVV ? (
                              <>
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                                Gerando...
                              </>
                            ) : (
                              <>
                                <Lock className="w-4 h-4 mr-2" aria-hidden="true" />
                                Gerar CVV Dinâmico
                              </>
                            )}
                          </Button>

                            <p className="text-xs text-[#718096] text-center">
                              Use este CVV para compras online mais seguras
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Botão Novo Cartão - Outline */}
                <Button
                  variant="outline"
                  className="w-full border-2 border-dashed border-[#014726]/30 text-[#014726] hover:bg-[#014726]/5 h-14"
                >
                  <Plus className="w-5 h-5 mr-2" aria-hidden="true" />
                  Solicitar Novo Cartão
                </Button>
              </>
            )}
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#2D3748] font-bold text-lg">Minhas Solicitações</h2>
              
              {/* Botão Nova Solicitação - FORÇADO PARA VERDE (Usei !bg e !text) */}
              <Button className="!bg-[#014726] hover:!bg-[#026c35] text-white border-none">
                <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                Nova Solicitação
              </Button>
            </div>

            {requestsLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
              </div>
            ) : requests.length === 0 ? (
              <Card className="border-none shadow-md">
                <CardContent className="p-8 text-center">
                  <Clock className="w-12 h-12 text-[#718096] mx-auto mb-3" aria-hidden="true" />
                  <p className="text-[#2D3748] font-medium">Nenhuma solicitação encontrada</p>
                  <p className="text-[#718096] text-sm mt-1">Suas solicitações aparecerão aqui</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {requests.map((request) => {
                  const status = statusConfig[request.status];
                  const StatusIcon = status.icon;

                  return (
                    <Card key={request.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <CreditCard className="w-4 h-4 text-[#014726]" aria-hidden="true" />
                              <h3 className="text-[#2D3748] font-semibold">
                                {request.request_type === 'new_card' ? 'Novo Cartão' : 
                                 request.request_type === 'second_copy' ? 'Segunda Via' : 
                                 'Solicitação'}
                              </h3>
                            </div>
                            <p className="text-[#718096] text-sm">
                              Cartão de {request.card_type === 'credit' ? 'crédito' : 'débito'}
                            </p>
                          </div>
                          <Badge className={status.color}>
                            <StatusIcon className="w-3 h-3 mr-1" aria-hidden="true" />
                            {status.label}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between text-xs text-[#718096] pt-3 border-t border-slate-100">
                          <span>Solicitado em</span>
                          <span className="font-medium text-[#2D3748]">
                            {format(new Date(request.created_date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                          </span>
                        </div>

                        {request.status === 'pending' && (
                          <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                            <p className="text-xs text-yellow-800">
                              Sua solicitação está sendo analisada. Você receberá uma notificação assim que for processada.
                            </p>
                          </div>
                        )}

                        {request.status === 'approved' && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg">
                            <p className="text-xs text-green-800">
                              Solicitação aprovada! O cartão será enviado em até 7 dias úteis.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <TravelNoticeDialog
          open={travelDialogOpen}
          onOpenChange={setTravelDialogOpen}
          cardNickname={selectedCardForTravel?.nickname || ""}
        />
      </div>
    </div>
  );
}