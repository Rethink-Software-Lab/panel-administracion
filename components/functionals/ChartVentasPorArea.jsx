'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { DateTime } from 'luxon';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const today = DateTime.local().setLocale('es');
const inicioSemana = today.startOf('week');
const finSemana = today.endOf('week');

const formatoDia = (fecha) => fecha.toFormat('d');
const formatoMes = (fecha) => fecha.toFormat('MMMM');

const rangoSemana = `${formatoDia(inicioSemana)} - ${formatoDia(
  finSemana
)} de ${formatoMes(finSemana)}`;

function obtenerNombresAreas(ventasPorDia) {
  if (ventasPorDia.length === 0) return [];

  const primerDia = ventasPorDia[0];
  const nombresAreas = Object.keys(primerDia).filter(
    (clave) => clave !== 'dia'
  );

  return nombresAreas.map((area) => ({
    nombre: area,
    color: primerDia[area].color,
  }));
}

export default function ChartVentasPorArea({ data }) {
  const nombresAreas = obtenerNombresAreas(data);
  return (
    <Card className="col-span-3 md:col-span-2">
      <CardHeader>
        <CardTitle>Ventas por área</CardTitle>
        <CardDescription>{rangoSemana}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="max-h-80 w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dia"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="w-52" />}
            />
            {nombresAreas.map(({ nombre, color }) => (
              <Line
                key={nombre}
                name={nombre}
                dataKey={(data) => data[nombre].ventas}
                type="monotone"
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
