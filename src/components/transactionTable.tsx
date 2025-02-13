'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDeleteTransaction } from "@/hooks/useDeleteTransaction";
import DeleteTransactionButton from "@/components/DeleteTransactionButton";
import { useFinancialData } from "@/hooks/useFinancialData";

interface Transaction {
  transactionId: number;
  amount: number;
  type: string;
  description: string;
  date: string;
}

interface TransactionTableProps {
  filterDate: string;
  setFilterDate: (date: string) => void;
}

const BASE_URL = "http://localhost:8080/transactions";

export function TransactionTable({ filterDate, setFilterDate }: TransactionTableProps) {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { refetch } = useFinancialData();
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(null);
  const [currentYear, currentMonth] = filterDate.split("-");



  const handleDeleteSuccess = () => {
    // Recarregar transações do mês atual
    fetchTransactions(currentMonth, currentYear);
    // Recarregar dados globais
    refetch();
  };

  const fetchTransactions = async (month?: string, year?: string) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Usuário não autenticado");
    }

    try {
      let url = BASE_URL;


      if (month && year) {
        url += `?month=${month}&year=${year}`;
      }


      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      setTransactions(response.data);
    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    if (filterDate) {
      const [year, month] = filterDate.split("-");
      fetchTransactions(month, year);
    } else {
      fetchTransactions();
    }
  }, [filterDate]);

  return (
    <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
      <h2 className="text-xl font-semibold mb-2">Histórico de Transações</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Valor</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="">Descrição</TableHead>
            <TableHead className="hidden md:table-cell">Data</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.transactionId} >
              <TableCell  >{transaction.amount.toFixed(2)}</TableCell>
              <TableCell className={`${transaction.type === 'EXPENSE' ? 'text-red-500' : 'text-green-500'} font-semibold`}>{`${transaction.type === 'EXPENSE' ? "Saída" : 'Entrada'} `}</TableCell>
              <TableCell className="">{transaction.description}</TableCell>
              <TableCell className="hidden md:table-cell">{transaction.date}</TableCell>
              <TableCell>
                <div className="flex space-x-2">

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Editar Transação</DialogTitle>
                        <DialogDescription>Faça as alterações necessárias na transação.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="amount" className="text-right">
                            Valor
                          </Label>
                          <Input id="amount" defaultValue={transaction.amount} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="type" className="text-right">
                            Tipo
                          </Label>
                          <Input id="type" defaultValue={transaction.type} className={`col-span-3 `} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Descrição
                          </Label>
                          <Input id="description" defaultValue={transaction.description} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="date" className="text-right">
                            Data
                          </Label>
                          <Input id="date" type="date" defaultValue={transaction.date} className="col-span-3" />
                        </div>
                      </div>
                      <Button className="w-full">Salvar Alterações</Button>
                    </DialogContent>
                  </Dialog>

                  <DeleteTransactionButton
                    transactionId={transaction.transactionId}
                    isOpen={selectedTransaction === transaction.transactionId}
                    onClose={() => setSelectedTransaction(null)}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

