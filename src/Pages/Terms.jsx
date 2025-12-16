import React from "react";
import { FileText, ShieldCheck } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-1">Termos de Uso</h1>
        <p className="text-white/90 text-sm">Regras e condições</p>
      </div>

      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        
        <div className="h-[70vh] overflow-y-auto pr-2 text-justify scrollbar-thin scrollbar-thumb-gray-200">
          <div className="mb-6">
            <h3 className="text-[#014726] font-bold text-lg mb-2 flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2" /> 1. Serviços Gerais
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Ao utilizar o aplicativo CrediSIS, você concorda com a coleta e processamento de seus dados financeiros para fins de prestação de serviços bancários, conforme a Lei Geral de Proteção de Dados (LGPD).
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-[#014726] font-bold text-lg mb-2">2. Pontos e Fidelidade</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              2.1. A conversão de pontos segue a regra de 2 pontos por US$ 1,00 gasto no crédito.<br/>
              2.2. Pontos expirados não podem ser reavidos.<br/>
              2.3. O resgate de vouchers é definitivo e não permite estorno.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-[#014726] font-bold text-lg mb-2">3. Pix com Cartão</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              3.1. Operação sujeita à análise de crédito e disponibilidade de limite.<br/>
              3.2. Incidem juros e IOF sobre a transação, calculados diariamente até o vencimento da fatura.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-[#014726] font-bold text-lg mb-2">4. Segurança</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              O usuário é responsável pela guarda de sua senha e token. A CrediSIS nunca solicita senhas por telefone ou e-mail.
            </p>
          </div>
          
          <div className="pt-8 text-center text-xs text-gray-400">
            Versão 2.1 - Atualizado em Dezembro de 2025
          </div>
        </div>

      </div>
    </div>
  );
}