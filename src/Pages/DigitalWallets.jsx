import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, CheckCircle, Plus } from "lucide-react";
import { toast } from "sonner";

export default function DigitalWalletsPage() {
  const wallets = [
    { id: 'apple', name: 'Apple Pay', active: true, color: 'bg-black text-white' },
    { id: 'google', name: 'Google Pay', active: false, color: 'bg-white text-gray-800 border border-gray-200' },
    { id: 'samsung', name: 'Samsung Pay', active: false, color: 'bg-blue-900 text-white' },
  ];

  const handleAddToWallet = (name) => {
    toast.loading(`Conectando ao ${name}...`);
    setTimeout(() => {
      toast.dismiss();
      toast.success(`Cartão adicionado ao ${name} com sucesso!`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-1">Carteiras Digitais</h1>
        <p className="text-white/90 text-sm">Pague usando apenas o celular</p>
      </div>

      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        <div className="mb-6 p-4 bg-slate-50 rounded-xl flex gap-3 items-start">
          <Smartphone className="w-6 h-6 text-[#014726] flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-[#2D3748]">Facilidade e Segurança</p>
            <p className="text-xs text-gray-600 mt-1">
              Adicione seu cartão às carteiras digitais para pagar por aproximação sem precisar do cartão físico.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {wallets.map((wallet) => (
            <Card key={wallet.id} className="border-none shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-8 rounded flex items-center justify-center font-bold text-[10px] ${wallet.color}`}>
                    {wallet.id === 'apple' ? ' Pay' : wallet.id === 'google' ? 'G Pay' : 'Pay'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#2D3748]">{wallet.name}</p>
                    <p className="text-[10px] text-gray-500">
                      {wallet.active ? 'Cartão configurado' : 'Não configurado'}
                    </p>
                  </div>
                </div>

                {wallet.active ? (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 py-1">
                    <CheckCircle className="w-3 h-3 mr-1" /> Ativo
                  </Badge>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 text-xs border-[#014726] text-[#014726]"
                    onClick={() => handleAddToWallet(wallet.name)}
                  >
                    <Plus className="w-3 h-3 mr-1" /> Adicionar
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}