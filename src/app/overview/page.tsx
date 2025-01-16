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
import { useCreateTransaction } from "@/hooks/useCreateTransaction";

export default function Overview() {
  const { data, error, loading, setFilterDate } = useFinancialData();
  const { createTransaction, loading: creatingTransaction, error: createError } = useCreateTransaction();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const handleCreateTransaction = async (transaction: {
    amount: number,
    type: 'INCOME' | 'EXPENSE';
    description: string;
    date: string;
  }) => {
    try {
      await createTransaction(transaction);
      setIsTransactionModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto p-4">
      {error && <div className="text-red-500">Erro: {error}</div>}
      {loading ? (
        <Loader />
      ) : (
        data && (
          <div className="space-y-4 p-4 md:space-y-6 md:p-6">
            <Card className="overflow-hidden">
              <CardHeader className="p-4 md:p-6">
                <div className="flex flex-col gap-4 lg:flex-row md:items-center md:justify-between">
                  <CardTitle className=" text-2xl capitalize flex justify-between gap-5 ">
                    <div>
                      {data.currentMonth}
                    </div>
                    <Input
                      type="month"
                      onChange={(e) => setFilterDate(e.target.value)}
                      className="w-fit  justify-center "
                    />
                  </CardTitle>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
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
                      className="w-full md:w-auto" >
                      <p>Atualizar Porcentagens</p>
                    </Button>


                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4 md:p-6">
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
              </CardContent>
            </Card>

            <NewTransactionModal
              isOpen={isTransactionModalOpen}
              onClose={() => setIsTransactionModalOpen(false)}
              onCreateTransaction={handleCreateTransaction}>
            </NewTransactionModal>
          </div>
        )
      )}
    </div>
  );
}
