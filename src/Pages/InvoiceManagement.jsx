import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronRight, 
  History, 
  CreditCard, 
  Download, 
  Copy, 
  Mail, 
  Share2,
  PieChart,
  AlertCircle
} from "lucide-react";

const invoiceOptions = [
  {
    icon: History,
    title: "Histórico de Faturas",
    description: "Consulte faturas pagas",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: CreditCard,
    title: "Parcelamento de Fatura",
    description: "Simule e parcele sua fatura",
    color: "bg-purple-50 text-purple-600"
  },
  {
    icon: Download,
    title: "Visualizar Parcelamentos",
    description: "Veja parcelamentos realizados",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: Download,
    title: "Fatura Digital",
    description: "Baixe sua fatura em PDF",
    color: "bg-indigo-50 text-indigo-600"
  },
  {
    icon: Copy,
    title: "Copiar Linha Digitável",
    description: "Copie o código de barras",
    color: "bg-orange-50 text-orange-600"
  },
  {
    icon: Mail,
    title: "Enviar por E-mail",
    description: "Receba a fatura no seu e-mail",
    color: "bg-pink-50 text-pink-600"
  },
  {
    icon: Share2,
    title: "Compartilhar Fatura",
    description: "Compartilhe com outras pessoas",
    color: "bg-cyan-50 text-cyan-600"
  },
  {
    icon: PieChart,
    title: "Análise de Gastos",
    description: "Veja gráficos detalhados",
    color: "bg-yellow-50 text-yellow-600"
  },
  {
    icon: AlertCircle,
    title: "Contestar Compra",
    description: "Reporte transação não reconhecida",
    color: "bg-red-50 text-red-600"
  }
];

export default function InvoiceManagementPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4A9B9E] to-[#3D8385] px-4 pt-12 pb-6 rounded-b-3xl">
        <h1 className="text-white text-2xl font-bold mb-1">Faturas e Pagamentos</h1>
        <p className="text-white/80 text-sm">Gerencie suas faturas e pagamentos</p>
      </div>

      <div className="px-4 py-6 space-y-3">
        {invoiceOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <button className="w-full flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${option.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[#2D3748] font-semibold">{option.title}</p>
                    <p className="text-[#718096] text-sm mt-0.5">{option.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#718096] flex-shrink-0" />
                </button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}