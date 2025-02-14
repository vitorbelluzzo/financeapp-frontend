'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Transaction {
  transactionId: number;
  amount: number;
  type: string;
  description: string;
  date: string;
}

interface TransactionTableProps {
  refetch: () => void;
  filterDate: string;
}

const BASE_URL = "http://localhost:8080/transactions";

export function TransactionTable({ refetch, filterDate }: TransactionTableProps) {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDeleting, setDeleting] = useState(false);
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
  const handleDeleteTransaction = async (transactionId: number) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Usuário não autenticado");
    }
    try {
      await axios.delete(`${BASE_URL}/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (filterDate) {
        const [year, month] = filterDate.split("-");
        fetchTransactions(month, year);
      } else {
        fetchTransactions();
      }

      refetch();

    } catch (err) {
      console.error('Erro ao deletar transação:', err);
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

                  <Dialog >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>

                        <DialogTitle>Confirmar Exclusão</DialogTitle>
                        <DialogDescription>
                          Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end space-x-2">
                        <DialogClose>
                          Cancelar
                        </DialogClose>
                        <Button onClick={() => handleDeleteTransaction(transaction.transactionId)} variant={"destructive"}>
                          Excluir
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

