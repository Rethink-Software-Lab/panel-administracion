'use client';
import {
  ResponsiveContainer,
  Legend,
  Tooltip,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CloudOff, LineChart } from 'lucide-react';

const dataArea = [
  {
    name: 'Enero',
    Ventas: 800,
  },
  {
    name: 'Febrero',
    Ventas: 3000,
  },
  {
    name: 'Marzo',
    Ventas: 1800,
  },
  {
    name: 'Abril',
    Ventas: 3260,
  },
  {
    name: 'Mayo',
    Ventas: 6100,
  },
  {
    name: 'Junio',
    Ventas: 6500,
  },
];

export default function Grafico({ data, errors }) {
  return (
    <Card className="col-span-3  md:col-span-2 relative">
      <CardHeader>
        <CardTitle>Ventas año en curso</CardTitle>
      </CardHeader>
      {errors &&
        errors?.map(
          (e) =>
            e.message.startsWith('fetch failed') && (
              <h1
                key={e.message}
                className="absolute top-0 bottom-0 left-0 right-0 gap-2 text-muted-foreground text-lg font-medium flex justify-center items-center"
              >
                <CloudOff />
                Error al conectar con el servidor.
              </h1>
            )
        )}
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={data}
            margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="mes" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="ventas"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
