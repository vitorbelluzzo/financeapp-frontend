"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { FinancialWidget } from "@/components/FinancialWidget";
import { FinancialOverview } from "@/types";
import { Loader } from "@/components/Loader";
import { useFinancialData } from "@/hooks/useFinancialData";

export default function Overview() {
  const { data, error, loading } = useFinancialData();

  return (
    <div className="container mx-auto p-4">
      {error && <div className="text-red-500">Erro: {error}</div>}
      {loading ? (
        <Loader />
      ) : (
        data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <FinancialWidget
              title="Mês Atual"
              value={data.currentMonth.toLowerCase()}
            />
            <FinancialWidget
              title="Entrada do mês"
              value={`R$ ${data.monthlyIncome.toFixed(2)}`}
            />
            <FinancialWidget
              title="Saida do mês"
              value={`R$ ${data.monthlyExpenses.toFixed(2)}`}
            />
            <FinancialWidget
              title="Saldo Total"
              value={`R$ ${data.totalBalance.toFixed(2)}`}
            />
            <FinancialWidget
              title={`${data.percentageToSpend}% da Entrada do mês`}
              value={`R$ ${data.valueToSpend.toFixed(2)}`}
            />
            <FinancialWidget
              title={`${data.percentageToKeep}% da Entrada do mês`}
              value={`R$ ${data.valueToKeep.toFixed(2)}`}
            />
            <FinancialWidget
              title="Posso gastar ainda"
              value={`R$ ${data.availableToSpend.toFixed(2)}`}
            />
          </div>
        )
      )}
    </div>
  );
}
