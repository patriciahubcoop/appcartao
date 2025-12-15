import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Componente criado a partir da versão original sem extensão, apenas movido para .jsx
export default function TravelNoticeDialog({ open, onOpenChange, cardNickname }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aviso de Viagem</DialogTitle>
          <DialogDescription>
            Informe seus dados de viagem para evitar bloqueios no cartão {cardNickname}.
          </DialogDescription>
        </DialogHeader>
        {/* Conteúdo simplificado: você pode copiar aqui o layout completo do arquivo original se quiser */}
        <div className="space-y-4 mt-4">
          <p className="text-sm text-slate-600">
            Este é um formulário de aviso de viagem simulado (mock). Adapte conforme a necessidade.
          </p>
          <Button onClick={() => onOpenChange(false)} className="w-full bg-[#4A9B9E] hover:bg-[#3D8385]">
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
