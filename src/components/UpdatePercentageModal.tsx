import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { useAlterPercentage } from '@/hooks/useUpdatePercentage'
import { toast } from '@/hooks/use-toast'

interface AlterPercentageModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Percentage {
  savingsPercentage: number;
}

export default function AlterPercentageModal({
  isOpen,
  onClose,
}: AlterPercentageModalProps) {
  const [newPercentage, setNewPercentage] = useState<Percentage>({
    savingsPercentage: 0.1,
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { alterPercentage } = useAlterPercentage();
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await alterPercentage({
        savingsPercentage: newPercentage.savingsPercentage
      });

      toast({
        variant: "default",
        title: "Porcentagem atualizada com sucesso",
      });

      onClose();

      setNewPercentage(newPercentage);

    } catch(error: any) {
      toast({
        variant: "destructive",
        title: error.message,
      });
      } finally {
        setIsSubmitting(false);
      }
    }

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualizar Porcentagem para Gastar</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Porcentagem para Gastar: {newPercentage.savingsPercentage}%</Label>
              <Slider
                min={0.1}
                max={0.99}
                step={0.01}
                value={[newPercentage.savingsPercentage]}
                onValueChange={(values) => setNewPercentage({savingsPercentage: values[0]})}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose }>Cancelar</Button>
              <Button onClick={handleSubmit} >Atualizar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );

  }

 

