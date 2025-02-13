import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useDeleteTransaction } from "@/hooks/useDeleteTransaction";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteTransactionButtonProps {
  transactionId: number;
  isOpen: boolean;
  onClose: () => void;
  currentMonth: string;
  currentYear: string;
  onDeleteSuccess: () => void; // Nova prop
}

export default function DeleteTransactionButton({
  transactionId,
  isOpen,
  onClose,
  currentMonth,
  currentYear,
  onDeleteSuccess
}: DeleteTransactionButtonProps) {
  const { deleteTransaction, isDeleting } = useDeleteTransaction();

  const handleDelete = async () => {
    try {
      await deleteTransaction(transactionId, currentMonth, currentYear);
      onDeleteSuccess(); // Chamar função de sucesso
      onClose();
      
      toast({
        variant: "default",
        title: "Transação deletada com sucesso",
      });

      onClose();

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao deletar transação",
        description:
          error instanceof Error ? error.message : "Tente novamente mais tarde",
      });
    }
  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>

      <Button variant="outline" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>

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

          <Button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Excluindo..." : "Excluir"}
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  )
}
