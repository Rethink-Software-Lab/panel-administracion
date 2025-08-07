import ButtonPrint from "@/components/functionals/ButtonPrint";
import FormReportes from "@/components/functionals/FormReportes";
import { getReporteFormData } from "./services";
import { getSession } from "@/lib/getSession";

export default async function LayoutReportes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, error } = await getReporteFormData();
  const session = await getSession();
  return (
    <main className="flex flex-1 flex-col pt-4 lg:pt-6">
      <div className="flex flex-col gap-4 border-b border-b-gray-200 pb-4 px-4 lg:px-6">
        <h1 className="text-lg font-semibold md:text-2xl sm:pb-2 lg:pb-4">
          Reportes
        </h1>
        <div className="flex items-center justify-between max-sm:block max-sm:space-y-2">
          <FormReportes
            data={data || { areas: [], categorias: [] }}
            session={session}
          />
          <ButtonPrint disabled={!!error} className="max-sm:w-full" />
        </div>
      </div>

      {children}
    </main>
  );
}
