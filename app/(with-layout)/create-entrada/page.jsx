import FormEntradas from '@/components/functionals/FormEntradas';

import { getProductos } from '@/lib/services';

export default async function CreateEntrada() {
  const { data, errors } = await getProductos();

  return (
    <main className="grid flex-1 items-start gap-4 my-6 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid flex-1 auto-rows-max gap-4">
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Nueva Entrada
        </h1>
        <div className="flex flex-col gap-6">
          <FormEntradas productosInfo={data} />
        </div>
      </div>
    </main>
  );
}
