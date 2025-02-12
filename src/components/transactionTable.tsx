'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

export function TransactionTable() {

  const mockData = {
   
    totalCash: 25000,
    selectedMonth: {
   
      income: 1373.76,
      expenses: 962.97,
      toSpend: 1236.38,
      toSave: 137.38,
      canSpend: 273.4,
    },
    transactions: [
      { id: 1, amount: 1000, type: "Entrada", description: "Salary", date: "2025-02-01" },
      { id: 2, amount: -50, type: "Saída", description: "Groceries", date: "2025-02-05" },
      { id: 3, amount: -100, type: "Saída", description: "Utilities", date: "2025-02-10" },
    ],
  }
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
          {mockData.transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.amount.toFixed(2)}</TableCell>
              <TableCell className={`${transaction.type === 'Saída' ? 'text-red-500' : 'text-green-500'} font-bold`}>{transaction.type}</TableCell>
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
                  <Dialog>
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
                        <Button variant="outline">Cancelar</Button>
                        <Button variant="destructive">Excluir</Button>
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
