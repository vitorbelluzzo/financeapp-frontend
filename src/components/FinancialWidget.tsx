import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FinancialWidgetProps {
  title: string;
  value: string | number;
  className?: string;
}

export function FinancialWidget({ title, value }: FinancialWidgetProps) {
  return (
    <div className="">
      <CardHeader className="flex flex-row  items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base  text-muted-foreground font-semibold">{title}</CardTitle>

      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold capitalize  ">
          {typeof value === "number" ? value.toLocaleString('pt-BR',
            { minimumFractionDigits: 2 })
            : value}</div>
      </CardContent>
    </div>
  )
}

