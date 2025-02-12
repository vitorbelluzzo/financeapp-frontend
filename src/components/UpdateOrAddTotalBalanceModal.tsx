import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAlterTotalBalance } from "@/hooks/useUpdateTotalBalance";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface AlterTotalBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance?: number;
}

interface TotalBalance {
  amount: string;
  description: string;
  date: string;
}

export default function AlterTotalBalanceModal({
  isOpen,
  onClose,
  currentBalance,
}: AlterTotalBalanceModalProps) {

  const [newTotalBalance, setNewTotalBalance] = useState<TotalBalance>({
    amount: currentBalance ? currentBalance.toString() : "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { alterTotalBalance } = useAlterTotalBalance();

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await alterTotalBalance({
        amount: Number(newTotalBalance.amount),
        date: new Date(newTotalBalance.date),
        description: newTotalBalance.description,
      });

      toast({
        variant: "default",
        title: "Caixa total atualizado com sucesso",
      });

      onClose();

    
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent aria-describedby="dialog-description">
      <DialogHeader>
        <DialogTitle>Atualizar saldo Total do mês</DialogTitle>
        <p id="dialog-description" className="text-sm ">
        Insira o valor que tem guardado nesse mês, caso o saldo altere durante o mês, atualize por aqui também.
        </p>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4  ">
        <div className="gap-2 flex flex-col ">
          <Label htmlFor="amount">Valor</Label>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              R$
            </span>
            <Input
              min={0.01}
              id="amount"
              type="number"
              value={newTotalBalance.amount}
              onChange={(e) =>
                setNewTotalBalance({
                  ...newTotalBalance,
                  amount: e.target.value,
                })
              }
              onFocus={(e) => e.target.select()}
              step={0.01}
              required
              className="pl-10"
            />
          </div>
        </div>
        <div className="gap-2 flex flex-col">
          <Label htmlFor="amount">Descrição</Label>
          <Input
            id="description"
            type="string"
            value={newTotalBalance.description}
            onChange={(e) =>
              setNewTotalBalance({
                ...newTotalBalance,
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

            onChange={(e) =>
              setNewTotalBalance({ ...newTotalBalance, date: e.target.value })
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
