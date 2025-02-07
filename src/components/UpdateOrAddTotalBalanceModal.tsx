import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useAlterTotalBalance } from "@/hooks/useUpdateTotalBalance";
import { toast } from "@/hooks/use-toast";

interface AlterTotalBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TotalBalance {
  savingsTotalBalance: number;
}

export default function AlterTotalBalanceModal({
  isOpen,
  onClose,
}: AlterTotalBalanceModalProps) {
  const [newTotalBalance, setNewTotalBalance] = useState<TotalBalance>({
    savingsTotalBalance: 0.1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { alterTotalBalance } = useAlterTotalBalance();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await alterTotalBalance({
        savingsTotalBalance: newTotalBalance.savingsTotalBalance,
      });

      toast({
        variant: "default",
        title: "Porcentagem atualizada com sucesso",
      });

      onClose();

      setNewTotalBalance(newTotalBalance);
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar Caixa</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>
              Porcentagem para Gastar: {newTotalBalance.savingsTotalBalance}%
            </Label>
            <Slider
              min={0.1}
              max={0.99}
              step={0.01}
              value={[newTotalBalance.savingsTotalBalance]}
              onValueChange={(values) =>
                setNewTotalBalance({ savingsTotalBalance: values[0] })
              }
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>Atualizar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
