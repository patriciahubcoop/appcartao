import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Phone,
  Mail,
  MessageCircle, // Usado para WhatsApp
  Headphones,
  ChevronRight,
  Clock
} from "lucide-react";
import { toast } from "sonner";

export default function HelpCenterPage() {
  const handleContact = (channel) => {
    toast.success(`Iniciando atendimento via ${channel}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-1">Central de Ajuda</h1>
        <p className="text-white/90 text-sm">Como podemos ajudar você hoje?</p>
      </div>

      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        {/* Status do Atendimento */}
        <div className="flex items-center gap-2 mb-6 bg-green-50 p-3 rounded-xl border border-green-100">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <p className="text-xs text-[#014726] font-medium">
            Atendimento online • Tempo de espera: &lt; 2 min
          </p>
        </div>

        <div className="space-y-4">
          <Card 
            className="border-none shadow-sm hover:shadow-md cursor-pointer transition-all"
            onClick={() => handleContact("WhatsApp")}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-700 rounded-xl">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-[#2D3748] font-bold text-sm">WhatsApp</h3>
                <p className="text-[#718096] text-xs mt-1">(11) 99999-8888</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </CardContent>
          </Card>

          <Card 
            className="border-none shadow-sm hover:shadow-md cursor-pointer transition-all"
            onClick={() => handleContact("Telefone")}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-[#2D3748] font-bold text-sm">Capitais e Regiões</h3>
                <p className="text-[#718096] text-xs mt-1">4004-0001</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </CardContent>
          </Card>

          <Card 
            className="border-none shadow-sm hover:shadow-md cursor-pointer transition-all"
            onClick={() => handleContact("0800")}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Headphones className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-[#2D3748] font-bold text-sm">Demais Localidades</h3>
                <p className="text-[#718096] text-xs mt-1">0800 123 4567</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </CardContent>
          </Card>

          <Card 
            className="border-none shadow-sm hover:shadow-md cursor-pointer transition-all"
            onClick={() => handleContact("Email")}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-orange-100 text-orange-700 rounded-xl">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-[#2D3748] font-bold text-sm">E-mail</h3>
                <p className="text-[#718096] text-xs mt-1">ajuda@credisis.com.br</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-4 bg-slate-50 rounded-xl text-center">
          <Clock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <p className="text-[#2D3748] font-medium text-sm">Horário de Atendimento</p>
          <p className="text-gray-500 text-xs mt-1">Segunda a Sexta das 08h às 20h</p>
          <p className="text-gray-500 text-xs">Sábado das 09h às 15h</p>
        </div>

      </div>
    </div>
  );
}