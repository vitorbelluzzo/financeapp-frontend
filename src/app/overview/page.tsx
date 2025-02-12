"use client";

import * as React from "react";
import { FinancialWidget } from "@/components/FinancialWidget";
import { Loader } from "@/components/Loader";
import { useFinancialData } from "@/hooks/useFinancialData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import NewTransactionModal from "@/components/NewTransactionModal";
import UpdatePercentageModal from "@/components/UpdatePercentageModal";
import AlterTotalBalanceModal from "@/components/UpdateOrAddTotalBalanceModal";
import { TransactionTable } from "@/components/transactionTable";

export default function Overview() {
  const {
    data,
    error: dataError,
    loading,
    setFilterDate,
    filterDate,
    refetch,
  } = useFinancialData();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isPercentageModalOpen, setIsPercentageModalOpen] = useState(false);
  const [isTotalBalanceModalOpen, setIsTotalBalanceModalOpen] = useState(false);

  if (dataError) {
    return (
      <div className="container mx-auto p-4">
        <div className="rounded-lg bg-red-50 p-4 ">
          Erro ao carregar dados: {dataError}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center">
        <Loader />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-4">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 md:space-y-6 md:p-6 rounded-lg   ">
      <h1 className="text-2xl font-bold mb-4">Olá, {data.name}</h1>
      <div className="flex flex-col sm:gap-3 sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <Input
          type="month"
          value={filterDate}
          placeholder="Selecione o mês e ano"
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-full md:w-auto justify-center md:justify-normal "
        />
        <div className="flex flex-col sm:flex-row  space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Button
            variant={"default"}
            onClick={() => setIsTransactionModalOpen(true)}
            className="w-full md:w-auto dark:text-white "
          >
            <p className="">Nova transação</p>
          </Button>
          <Button
            onClick={() => setIsPercentageModalOpen(true)}
            variant={"secondary"}
            className="w-full md:w-auto"
          >
            <p>Atualizar Porcentagens</p>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4 md:p-6  ">
          <FinancialWidget
            title="Caixa total"
            value={`R$ ${data.totalBalance.toFixed(2)}`}
          />
          <Button
            variant={"default"}
            onClick={() => setIsTotalBalanceModalOpen(true)}
            className="w-full md:w-auto  "
          >
            <p className="">Adicionar valor ao caixa</p>
          </Button>
        </CardContent>
      </Card>

      <Card className="">
        <CardContent className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4 md:p-6  ">
          <FinancialWidget title="Mês selecionado" value={data.selectedDate} />
          <FinancialWidget
            title="Entrada do mês"
            value={`R$ ${data.monthlyIncome.toFixed(2)}`}
          />
          <FinancialWidget
            title="Saida do mês"
            value={`R$ ${data.monthlyExpenses.toFixed(2)}`}
          />

          <FinancialWidget
            title={`Para gastar ${data.percentageToSpend}% `}
            value={`R$ ${data.valueToSpend.toFixed(2)}`}
          />
          <FinancialWidget
            title={`Para guardar ${data.percentageToKeep}% `}
            value={`R$ ${data.valueToKeep.toFixed(2)}`}
          />
          <FinancialWidget
            title="Ainda posso gastar "
            value={`R$ ${data.availableToSpend.toFixed(2)}`}
          />
        </CardContent>
      </Card>

      <TransactionTable/>

      <NewTransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => {
          setIsTransactionModalOpen(false);
          refetch();
        }}
      ></NewTransactionModal>

      <UpdatePercentageModal
        isOpen={isPercentageModalOpen}
        onClose={() => {
          setIsPercentageModalOpen(false);
          refetch();
        }}
        currentpercentage={data.percentageToKeep}
      ></UpdatePercentageModal>

      <AlterTotalBalanceModal
        isOpen={isTotalBalanceModalOpen}
        onClose={() => {
          setIsTotalBalanceModalOpen(false);
          refetch();
        }}
        currentBalance={data.totalBalance}
      ></AlterTotalBalanceModal>
    </div>
  );
}
