import { SheetSalidaAlmacenPrincipal } from "@/components/functionals/sheets/SheetSalidaAlmacenPrincipal";
import { getSalidas } from "./services";
import SheetInfoSalidaAlmacenPrincipal from "@/components/functionals/sheets/SheetInfoSalidaAlmacenPrincipal";

export default async function Salidas() {
  const { data } = await getSalidas();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Salidas</h1>

        <SheetSalidaAlmacenPrincipal
          areas={data?.areasVenta || []}
          productos={data?.productos || []}
        />
      </div>
      <SheetInfoSalidaAlmacenPrincipal data={data} />
    </main>
  );
}
