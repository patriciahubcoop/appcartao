import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Shield,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Smartphone,
  FileText,
  ChevronRight
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const servicesData = [
  {
    id: "ppr",
    title: "Seguro PPR",
    description: "Proteção contra Perda e Roubo do seu cartão. Cobertura para transações indevidas.",
    price: "R$ 12,90",
    period: "/mês",
    icon: Shield,
    color: "text-blue-600 bg-blue-50",
    active: false,
    details: [
      "Cobertura de até R$ 5.000,00",
      "Saques sob coação",
      "Compras não reconhecidas (até 48h)",
      "Bolsa protegida"
    ]
  },
  {
    id: "sms",
    title: "Notificações SMS",
    description: "Receba avisos em tempo real de todas as compras aprovadas ou negadas.",
    price: "R$ 0,10",
    period: "/por SMS",
    icon: MessageSquare,
    color: "text-orange-600 bg-orange-50",
    active: true,
    details: [
      "Aviso de compras em tempo real",
      "Alertas de segurança",
      "Aviso de fechamento de fatura",
      "Controle total de gastos"
    ]
  }
];

export default function ServicesPage() {
  const [services, setServices] = useState(servicesData);
  const [selectedService, setSelectedService] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  const handleToggleService = () => {
    // Simula a contratação/cancelamento
    const newStatus = !selectedService.active;
    
    setServices(prev => prev.map(s => 
      s.id === selectedService.id ? { ...s, active: newStatus } : s
    ));

    toast.success(
      newStatus 
        ? `Serviço "${selectedService.title}" contratado com sucesso!` 
        : `Serviço "${selectedService.title}" cancelado.`
    );
    setDialogOpen(false);
  };

  return (
    // 1. Fundo Gradiente Verde
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      
      {/* 2. Header Institucional */}
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-1">Loja de Serviços</h1>
        <p className="text-white/90 text-sm">Personalize sua experiência e segurança</p>
      </div>

      {/* 3. Container "Folha Branca" */}
      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        <div className="space-y-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.id} 
                onClick={() => handleServiceClick(service)}
                className={`border-none shadow-sm hover:shadow-md transition-all cursor-pointer ${service.active ? 'ring-2 ring-[#014726]/10' : ''}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className={`p-3 rounded-xl ${service.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-[#2D3748] font-bold text-lg">{service.title}</h3>
                        <p className="text-[#718096] text-sm mt-1 leading-relaxed max-w-[200px]">
                          {service.description}
                        </p>
                        <div className="mt-3 flex items-baseline gap-1">
                          <span className="text-[#014726] font-extrabold text-lg">{service.price}</span>
                          <span className="text-[#718096] text-xs">{service.period}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Indicador de Status */}
                    {service.active ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">
                        Ativo
                      </Badge>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-[#014726]" />
            <div>
              <p className="text-sm font-semibold text-[#2D3748] mb-1">Cobrança na Fatura</p>
              <p className="text-xs text-[#718096]">
                Os valores dos serviços contratados serão lançados diretamente na sua próxima fatura do cartão de crédito.
              </p>
            </div>
          </div>
        </div>

        {/* Modal de Contratação/Detalhes */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-xs rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-[#2D3748] text-xl font-bold">
                {selectedService?.title}
              </DialogTitle>
              <DialogDescription>
                Confira os benefícios antes de contratar
              </DialogDescription>
            </DialogHeader>

            {selectedService && (
              <div className="py-4">
                <div className="bg-slate-50 p-4 rounded-xl mb-6">
                  <p className="text-center text-2xl font-bold text-[#014726]">
                    {selectedService.price}
                    <span className="text-sm font-normal text-gray-500 ml-1">{selectedService.period}</span>
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {selectedService.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#4A5568]">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={handleToggleService}
                  className={`w-full h-12 font-semibold text-white shadow-md ${
                    selectedService.active 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : '!bg-[#014726] hover:!bg-[#026c35]'
                  }`}
                >
                  {selectedService.active ? "Cancelar Serviço" : "Contratar Agora"}
                </Button>
                
                <p className="text-[10px] text-center text-gray-400 mt-3">
                  Ao contratar, você concorda com os Termos de Uso.
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}