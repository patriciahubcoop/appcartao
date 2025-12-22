import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Play, Music, ShoppingBag, XCircle } from "lucide-react";
import { toast } from "sonner";

const subscriptions = [
  { id: 1, name: "Netflix", amount: 55.90, date: "Todo dia 05", icon: Play, color: "bg-red-100 text-red-600" },
  { id: 2, name: "Spotify", amount: 21.90, date: "Todo dia 12", icon: Music, color: "bg-green-100 text-green-600" },
  { id: 3, name: "Amazon Prime", amount: 19.90, date: "Todo dia 20", icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
];

export default function SubscriptionsPage() {
  const handleBlockPayment = (name) => {
    toast.success(`Pagamento futuro da ${name} bloqueado temporariamente.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-1">Assinaturas</h1>
        <p className="text-white/90 text-sm">Gerencie seus pagamentos recorrentes</p>
      </div>

      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        <div className="mb-6">
          <p className="text-[#2D3748] font-bold text-lg">
            Total Mensal: <span className="text-[#014726]">R$ 97,70</span>
          </p>
        </div>

        <div className="space-y-4">
          {subscriptions.map((sub) => {
            const Icon = sub.icon;
            return (
              <Card key={sub.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className={`p-3 rounded-xl ${sub.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-[#2D3748] font-bold text-sm">{sub.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{sub.date}</span>
                        </div>
                        <p className="text-[#014726] font-bold text-sm mt-2">R$ {sub.amount.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-2"
                      onClick={() => handleBlockPayment(sub.name)}
                    >
                      <XCircle className="w-4 h-4 mr-1" /> Bloquear
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}