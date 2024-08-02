'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BookX } from 'lucide-react';
import { cn } from '@/lib/utils';

const chartConfig = {
  ventas: {
    label: 'Ventas',
    color: 'hsl(var(--chart-5))',
  },
};

export default function ChartVentasAnuales({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas año en curso</CardTitle>
      </CardHeader>
      <CardContent className={cn(data?.length < 1 && 'h-80')}>
        {data?.length < 1 ? (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center space-y-2">
              <BookX className="w-14 h-14 text-muted-foreground" />
              <p className="font-medium text-muted-foreground">
                No hay datos que mostrar.
              </p>
            </div>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="max-h-96 w-full">
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <defs>
                <linearGradient id="fillVentas" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-ventas)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-ventas)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="mes"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="ventas"
                type="monotone"
                fill="url(#fillVentas)"
                fillOpacity={0.4}
                stroke="var(--color-ventas)"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
