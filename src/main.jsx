import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Layout from './Layout.jsx'
// Ajuste os caminhos/nomes conforme seus arquivos reais:
import Home from './Pages/Home.jsx'
import Cards from './Pages/Cards.jsx'
import More from './Pages/More.jsx'
import Transaction from './Pages/Transaction.jsx'
import Invoices from './Pages/Invoices.jsx'
import InvoiceManagement from './Pages/InvoiceManagement.jsx'
import Limits from './Pages/Limits.jsx'
import Notifications from './Pages/Notifications.jsx'
import PixCard from './Pages/PixCard.jsx'
import Profile from './Pages/Profile.jsx'
import Security from './Pages/Security.jsx'
import CardManagement from './Pages/CardManagement.jsx'
import DollarQuote from './Pages/DollarQuote'
import Welcome from './Pages/Welcome.jsx'
import Loyalty from './Pages/Loyalty.jsx'
import Services from './Pages/Services.jsx'
import SalaryPortability from './Pages/SalaryPortability.jsx'
import MobileRecharge from './Pages/MobileRecharge.jsx'
import Referral from './Pages/Referral.jsx'
import HelpCenter from './Pages/HelpCenter.jsx'
import FAQ from './Pages/FAQ.jsx'
import Terms from './Pages/Terms.jsx'
import AboutApp from './Pages/AboutApp.jsx'

import './index.css' 

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
          {/* Rota inicial */}
          <Route path="/" element={<Home />} />

          {/* Outras rotas */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/cards/manage" element={<CardManagement />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoices/manage" element={<InvoiceManagement />} />
          <Route path="/limits" element={<Limits />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/pix-card" element={<PixCard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/security" element={<Security />} />
          <Route path="/dollar-quote" element={<DollarQuote />} />
          <Route path="/more" element={<More />} />
          <Route path="/loyalty" element={<Loyalty />} />
          <Route path="/services" element={<Services/>} />
          <Route path="/salary-portability" element={<SalaryPortability />} />
          <Route path="/mobilerecharge" element={<MobileRecharge />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<AboutApp />} />

          {/* Rota coringa (404 simples) */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </QueryClientProvider>
  </React.StrictMode>,
)