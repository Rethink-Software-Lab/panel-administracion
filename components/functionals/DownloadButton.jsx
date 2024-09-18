'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import Layout from '@/components/functionals/DocPdf';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Download } from 'lucide-react';

export function DownloadButton({ fileName, data }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <PDFDownloadLink
      document={
        <Layout
          productos={data?.productos}
          zapatos={data?.zapatos}
          area_venta={data?.area_venta}
        />
      }
      fileName={fileName}
    >
      {({ blob, url, loading, error }) => (
        <Button
          variant="outline"
          disabled={loading}
          className="gap-2 max-md:w-9 max-md:h-9 max-md:p-0"
        >
          <Download className="w-4 h-4" />
          <span className="max-md:sr-only">Descargar PDF</span>
        </Button>
      )}
    </PDFDownloadLink>
  );
}
