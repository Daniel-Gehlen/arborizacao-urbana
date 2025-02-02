// app/page.tsx
"use client"; // Adicione isso se estiver usando hooks ou interatividade

import { useState } from "react";
import Head from "next/head";
import FormularioArborizacao from "../components/FormularioArborizacao";
import DashboardArborizacao from "../components/DashboardArborizacao";

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Sistema de Arborização Urbana</title>
        <meta name="description" content="Sistema de Arborização Urbana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Sistema de Arborização Urbana
        </h1>
        <button
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowDashboard(!showDashboard)}
        >
          {showDashboard ? "Mostrar Formulário" : "Mostrar Dashboard"}
        </button>
        {showDashboard ? <DashboardArborizacao /> : <FormularioArborizacao />}
      </main>
    </div>
  );
}