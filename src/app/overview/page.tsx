'use client'

import * as React from "react";
import { useState, useEffect } from "react";

import { FinancialWidget } from "@/components/FinancialWidget";

interface FinancialOverview {
  currentMonth: string;
  totalBalance: number;
  availableToSpend: number;
  shouldSave: number;
  monthlyIncome: number;
  savingsPercentage: number;
}


export default function Overview() {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FinancialOverview | null>(null);
  const [loading, setLoading] = useState(false);


  const getFinancialData = async () => {
    const token = localStorage.getItem('authToken');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/transactions/overview', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    }

    catch (err) {
      setError((err as Error).message);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFinancialData();
  }, [])

  return (
    <div className="container mx-auto p-4">
      {error && <div className="text-red-500">Erro: {error}</div>}
      {loading ? (
        <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      ) : (
        data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <FinancialWidget title="Mês Atual" value={data.currentMonth.toLowerCase()} />
            <FinancialWidget title="Saldo Total" value={`R$ ${data.totalBalance.toFixed(2)}`} />
            <FinancialWidget title="Disponível para Gastar" value={`R$ ${data.availableToSpend.toFixed(2)}`} />
            <FinancialWidget title="" value={`R$ ${data.shouldSave.toFixed(2)}`} />
            <FinancialWidget title="Renda Mensal" value={`R$ ${data.monthlyIncome.toFixed(2)}`} />
            <FinancialWidget title="Percentual de Poupança" value={`R$ ${data.savingsPercentage.toFixed(2)}`} />
          </div>
        )
      )}
    </div>
  );
}
