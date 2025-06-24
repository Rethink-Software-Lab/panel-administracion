import { getHistoricoProducto } from "@/app/(with-layout)/search/services";
import { Movimiento, TipoMovimiento } from "@/app/(with-layout)/search/types";
import {
  ArrowDownLeft,
  ArrowRightLeft,
  ArrowUpRight,
  CornerUpRight,
  DollarSign,
  Wrench,
} from "lucide-react";
import DataTableMovimientos from "./data-tables/data-table-movimientos";
import { columns } from "@/app/(with-layout)/search/columns";

const MovimientoIcon = ({ tipo }: { tipo: TipoMovimiento }) => {
  switch (tipo) {
    case TipoMovimiento.ENTRADA:
      return <ArrowDownLeft className="text-green-500 w-4 h-4" />;
    case TipoMovimiento.SALIDA:
      return <ArrowUpRight className="text-red-500 w-4 h-4" />;
    case TipoMovimiento.SALIDA_REVOLTOSA:
      return <CornerUpRight className="text-pink-500 w-4 h-4" />;
    case TipoMovimiento.TRANSFERENCIA:
      return <ArrowRightLeft className="text-blue-500 w-4 h-4" />;
    case TipoMovimiento.AJUSTE:
      return <Wrench className="text-yellow-500 w-4 h-4" />;
    case TipoMovimiento.VENTA:
      return <DollarSign className="text-purple-500 w-4 h-4" />;
    default:
      return null;
  }
};

const FormatoCantidad = ({ cantidad }: { cantidad: number }) => {
  return <>{`${cantidad} ${cantidad === 1 ? "producto" : "productos"}`}</>;
};

const ContenidoEntrada = ({ movimiento }: { movimiento: Movimiento }) => {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        <b>{movimiento.user || "Usuario"}</b> agregó una{" "}
        {movimiento.type.toLowerCase()}
      </p>
      <div className="border rounded-md w-full md:w-fit py-2 px-4 flex flex-col gap-2">
        <p className="text-sm">
          <FormatoCantidad cantidad={movimiento.cantidad} /> en almacén
          principal
        </p>
        <div className="text-xs text-muted-foreground">
          <span>{movimiento.createdAt}</span>
        </div>
      </div>
    </>
  );
};

const ContenidoSalida = ({ movimiento }: { movimiento: Movimiento }) => {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        <b>{movimiento.user || "Usuario"}</b> agregó una{" "}
        {movimiento.type.toLowerCase()} en almacén principal
      </p>
      <div className="border rounded-md w-full md:w-fit py-2 px-4 flex flex-col gap-2">
        <p className="text-sm">
          <FormatoCantidad cantidad={movimiento.cantidad} /> hacia{" "}
          {movimiento.areaVenta}
        </p>
        <div className="text-xs text-muted-foreground">
          <span>{movimiento.createdAt}</span>
        </div>
      </div>
    </>
  );
};

const ContenidoSalidaRevoltosa = ({
  movimiento,
}: {
  movimiento: Movimiento;
}) => {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        <b>{movimiento.user || "Usuario"}</b> agregó una salida en almacén
        revoltosa
      </p>
      <div className="border rounded-md w-full md:w-fit py-2 px-4 flex flex-col gap-2">
        <p className="text-sm">
          <FormatoCantidad cantidad={movimiento.cantidad} /> hacia{" "}
          {movimiento.areaVenta}
        </p>
        <div className="text-xs text-muted-foreground">
          <span>{movimiento.createdAt}</span>
        </div>
      </div>
    </>
  );
};

const ContenidoTransferencia = ({ movimiento }: { movimiento: Movimiento }) => {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        <b>{movimiento.user || "Usuario"}</b> realizó una{" "}
        {movimiento.type.toLowerCase()}
      </p>
      <div className="border rounded-md w-full md:w-fit py-2 px-4 flex flex-col gap-2">
        <p className="text-sm">
          <FormatoCantidad cantidad={movimiento.cantidad} /> desde{" "}
          {movimiento.desde} hacia {movimiento.hacia}
        </p>
        <div className="text-xs text-muted-foreground">
          <span>{movimiento.createdAt}</span>
        </div>
      </div>
    </>
  );
};

const ContenidoAjuste = ({ movimiento }: { movimiento: Movimiento }) => {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        <b>{movimiento.user || "Usuario"}</b> realizó un{" "}
        {movimiento.type.toLowerCase()}
      </p>
      <div className="border rounded-md w-full md:w-fit py-2 px-4 flex flex-col gap-2">
        <p className="text-sm">
          <FormatoCantidad cantidad={movimiento.cantidad} /> de{" "}
          {movimiento.areaVenta}
        </p>
        <div className="text-xs text-muted-foreground">
          <span>{movimiento.createdAt}</span>
        </div>
      </div>
    </>
  );
};

const ContenidoVenta = ({ movimiento }: { movimiento: Movimiento }) => {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        <b>{movimiento.user || "Usuario"}</b> cerró una{" "}
        {movimiento.type.toLowerCase()}
      </p>
      <div className="border rounded-md w-full md:w-fit py-2 px-4 flex flex-col gap-2">
        <p className="text-sm">
          {FormatoCantidad({ cantidad: movimiento.cantidad })}
          {movimiento.areaVenta && ` en ${movimiento.areaVenta}`} por método de
          pago {movimiento.metodoPago?.toLowerCase()}
        </p>
        <div className="text-xs text-muted-foreground">
          <span>{movimiento.createdAt}</span>
        </div>
      </div>
    </>
  );
};

const ContenidoMovimiento = ({ movimiento }: { movimiento: Movimiento }) => {
  switch (movimiento.type) {
    case TipoMovimiento.ENTRADA:
      return <ContenidoEntrada movimiento={movimiento} />;
    case TipoMovimiento.SALIDA:
      return <ContenidoSalida movimiento={movimiento} />;
    case TipoMovimiento.SALIDA_REVOLTOSA:
      return <ContenidoSalidaRevoltosa movimiento={movimiento} />;
    case TipoMovimiento.TRANSFERENCIA:
      return <ContenidoTransferencia movimiento={movimiento} />;
    case TipoMovimiento.AJUSTE:
      return <ContenidoAjuste movimiento={movimiento} />;
    case TipoMovimiento.VENTA:
      return <ContenidoVenta movimiento={movimiento} />;
    default:
      return null;
  }
};

const TimeLineItem = ({ movimiento }: { movimiento: any }) => {
  return (
    <div className="relative pl-8 pb-6 last:pb-0">
      <div className="absolute left-px -translate-x-1/2 h-6 w-6 flex items-center justify-center rounded-full bg-background ring-1 ring-slate-200">
        <MovimientoIcon tipo={movimiento.type} />
      </div>

      <div className="space-y-3">
        <ContenidoMovimiento movimiento={movimiento} />
      </div>
    </div>
  );
};

export async function TimeLineProducto({ infoId }: { infoId: string }) {
  const { data: movimientos } = await getHistoricoProducto(Number(infoId));
  return (
    <>
      <div className="p-4">
        <DataTableMovimientos columns={columns} data={movimientos || []} />
      </div>
      {/* <div className="max-w-screen-sm p-6">
        <div className="relative ml-4">
          <div className="absolute left-0 inset-y-0 border-l-2" />

          {movimientos?.map((movimiento, index) => (
            <TimeLineItem key={index} movimiento={movimiento} />
          ))}
        </div>
      </div> */}
    </>
  );
}
