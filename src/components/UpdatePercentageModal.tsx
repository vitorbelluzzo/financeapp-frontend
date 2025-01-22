import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

interface UpdatePercentageModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UpdatePercentageModal({
  isOpen,
  onClose,
}: UpdatePercentageModalProps) {
  const [percentage, setPercentage] = useState(0.1)




  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar Porcentagem para Gastar</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Porcentagem para Gastar: {percentage.toFixed(0)}%</Label>
            <Slider
              min={10}
              max={90}
              step={1}
              value={[percentage]}
              onValueChange={(values) => setPercentage(values[0])}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button >Atualizar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
