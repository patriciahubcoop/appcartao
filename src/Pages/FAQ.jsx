import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "Como funciona o Programa de Pontos?",
    answer: "A cada US$ 1,00 gasto na função crédito, você ganha 2 pontos. Os pontos podem ser trocados por vouchers, milhas ou cashback."
  },
  {
    question: "O Pix com Cartão consome meu limite?",
    answer: "Sim. O valor total da transferência Pix (mais taxas) é descontado do seu limite de crédito disponível."
  },
  {
    question: "Qual o prazo para desbloqueio de um novo cartão?",
    answer: "O desbloqueio é imediato após a confirmação no aplicativo. Você já pode utilizar a versão virtual na hora."
  },
  {
    question: "Como contrato o Seguro PPR?",
    answer: "Acesse o menu 'Meus Serviços' na tela inicial. O valor de R$ 12,90 mensais será cobrado na sua fatura."
  },
  {
    question: "Como faço a portabilidade de salário?",
    answer: "Vá em 'Meus Serviços' > 'Portabilidade'. Você precisará do CNPJ da sua empresa e o banco onde recebe atualmente."
  }
];

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
      >
        <span className={`text-sm font-medium ${isOpen ? 'text-[#014726]' : 'text-[#2D3748]'}`}>
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[#014726]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-xs text-gray-600 leading-relaxed animate-fade-in">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#014726] via-[#026c35] to-[#059641]">
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-[color:var(--accent-yellow,#C6FF4A)] text-2xl font-extrabold mb-1">Perguntas Frequentes</h1>
        <p className="text-white/90 text-sm">Tire suas dúvidas</p>
      </div>

      <div className="bg-white rounded-t-3xl px-6 py-6 min-h-screen shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2">
          {faqData.map((item, index) => (
            <div key={index} className="px-3">
              <AccordionItem question={item.question} answer={item.answer} />
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-green-50 rounded-xl flex items-start gap-3">
          <HelpCircle className="w-6 h-6 text-[#014726] flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-[#014726] mb-1">Ainda precisa de ajuda?</p>
            <p className="text-xs text-[#014726]/80">
              Nossa equipe está disponível 24h na Central de Ajuda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}