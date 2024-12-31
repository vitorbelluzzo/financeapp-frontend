import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FinancialWidgetProps {
  title: string;
  value: number;
  currency?: string;
}

export function FinancialWidget({ title, value, currency = 'R$' }: FinancialWidgetProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{currency}{value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
      </CardContent>
    </Card>
  )
}

