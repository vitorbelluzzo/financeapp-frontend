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

export default function Overview() {
  const {  data, error: dataError, loading, setFilterDate,
    filterDate,
    refetch,
  } = useFinancialData();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  if (dataError) {
    return (
      <div className="container mx-auto p-4">
        <div className="rounded-lg bg-red-50 p-4 text-red-500 dark:bg-red-900/50">
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
    <div className="container mx-auto p-4 ">
      <div className="space-y-4 p-4 md:space-y-6 md:p-6 ">
        <Card className="overflow-hidden">  
          <CardHeader className="p-4 md:p-6  ">
            <div className="flex flex-col gap-4 lg:flex-row md:items-center md:justify-between ">
              
              <CardTitle className=" text-2xl capitalize flex justify-between gap-5 ">
                <div>Olá, {data.name}</div>
                
              </CardTitle>
              
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4 ">
                <Button
                  variant={"default"}
                  onClick={() => setIsTransactionModalOpen(true)}
                  className="w-full md:w-auto dark:text-white "
                >
                  <p className="">Nova transação</p>
                </Button>
                <Button
                  /* onClick={() => setIsPercentageModalOpen(true)}*/
                  variant={"secondary"}
                  className="w-full md:w-auto"
                >
                  <p>Atualizar Porcentagens</p>
                </Button>

                <Input
                  type="month"
                  value={filterDate}
                  placeholder="Selecione o mês e ano"
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-fit  justify-center "
                />
              
              </div>
            </div>
          </CardHeader>

          
          <CardContent className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4 md:p-6 border ">
            <FinancialWidget
              title="Mês selecionado"
              value={data.selectedDate}
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
          </CardContent>
        </Card>

        <Card>
        <CardContent className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4 md:p-6 border ">
          
            <FinancialWidget
              title="Caixa total"
              value={`R$ ${data.totalBalance.toFixed(2)}`}
            />
              <Button
                  variant={"outline"}
                  onClick={() => setIsTransactionModalOpen(true)}
                  className="w-full md:w-auto dark:text-white "
                >
                  <p className="">Adicionar valor ao caixa</p>
                </Button>
          </CardContent>
        </Card>

       

        <NewTransactionModal
          isOpen={isTransactionModalOpen}
          onClose={() => {
            setIsTransactionModalOpen(false);
            refetch();
          }}
        ></NewTransactionModal>
      </div>
    </div>
  );
}
