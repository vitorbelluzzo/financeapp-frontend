import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FinancialWidgetProps {
  title: string;
  value: string | number;
  className?: string;
}

export function FinancialWidget({ title, value }: FinancialWidgetProps) {
  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof value === "number" ? value.toLocaleString('pt-BR',
            { minimumFractionDigits: 2 })
            : value}</div>
      </CardContent>
    </Card>
  )
}

