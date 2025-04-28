'use client';
import DataTable from '@/components/functionals/data-tables/data-table-general';
import { columns } from '@/app/(with-layout)/(almacen-cafeteria)/entradas-cafeteria/columns';
import { EntradaCafeteria } from '@/app/(with-layout)/(almacen-cafeteria)/entradas-cafeteria/types';
import { useState } from 'react';
import { DocumentToPrint } from './doc-to-print';

export default function WrapperEntradasCafeteria({
  entradas,
}: {
  entradas: EntradaCafeteria[];
}) {
  const [dataToPrint, setDataToPrint] = useState<
    EntradaCafeteria | undefined
  >();

  return (
    <>
      {dataToPrint && <DocumentToPrint data={dataToPrint} />}

      <DataTable<EntradaCafeteria>
        columns={columns}
        data={entradas}
        setDataToPrint={setDataToPrint}
      />
    </>
  );
}
