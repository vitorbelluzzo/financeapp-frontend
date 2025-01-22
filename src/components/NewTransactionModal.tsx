import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useCreateTransaction } from "@/hooks/useCreateTransaction";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";

interface Transaction {
  amount: number;
  type: "INCOME" | "EXPENSE";
  description: string;
  date: string;
}

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewTransactionModal({
  isOpen,
  onClose,
}: NewTransactionModalProps) {
  const [newTransaction, setNewTransaction] = useState({
    amount: 0,
    type: "INCOME" as "INCOME" | "EXPENSE",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createTransaction } = useCreateTransaction();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await createTransaction({
        amount: newTransaction.amount,
        type: newTransaction.type,
        description: newTransaction.description,
        date: newTransaction.date,
      });

      toast({
        variant: "default",
        title: "Transação criada com sucesso",
      });

      onClose();

      setNewTransaction({
        amount: 0,
        type: "INCOME",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao criar transação",
        description:
          error instanceof Error ? error.message : "Tente novamente mais tarde",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>Nova transação</DialogTitle>
          <p id="dialog-description" className="text-sm ">
            Preencha os campos abaixo para criar uma nova transação.
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4  ">
          <div className="gap-2 flex flex-col">
            <Label htmlFor="amount">Valor</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={newTransaction.amount}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  amount: Number(e.target.value),
                })
              }
              required
            />
          </div>
          <div className="gap-2 flex flex-col">
            <Label htmlFor="type">Tipo</Label>
            <Select
              value={newTransaction.type}
              onValueChange={(value: "INCOME" | "EXPENSE") =>
                setNewTransaction({ ...newTransaction, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de transação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INCOME">Entrada</SelectItem>
                <SelectItem value="EXPENSE">Saída</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="gap-2 flex flex-col">
            <Label htmlFor="amount">Descrição</Label>
            <Input
              id="description"
              type="string"
              value={newTransaction.description}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  description: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="gap-2 flex flex-col">
            <Label htmlFor="amount">Data</Label>
            <Input
              id="date"
              type="date"
              value={newTransaction.date}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, date: e.target.value })
              }
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant={"outline"}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" variant={"default"} disabled={isSubmitting}>
              {isSubmitting ? "Criando..." : "Criar Transação"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
