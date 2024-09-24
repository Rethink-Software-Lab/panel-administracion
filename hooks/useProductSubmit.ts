'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { UseFormReturn } from 'react-hook-form';
import {
  addProducto,
  updateProducto,
} from '@/app/(with-layout)/products/actions';

interface ProductFormData {
  id?: string;
  imagen?: FileList;
  codigo: string;
  descripcion: string;
  precio_costo: number;
  precio_venta: number;
  categoria: string;
}

interface ProductSubmitHandlerProps {
  form: UseFormReturn<ProductFormData>;
  setOpen: (isOpen: boolean) => void;
  setImage: (image: string | undefined) => void;
}

interface SubmitResult {
  data: string | null;
  error: string | null;
}

export function useProductSubmit({
  form,
  setOpen,
  setImage,
}: ProductSubmitHandlerProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (dataForm: ProductFormData): Promise<void> => {
    setIsLoading(true);
    const formData = new FormData();
    const watchImagen = form.watch('imagen');

    if (watchImagen && watchImagen.length > 0) {
      formData.append('imagen', watchImagen[0]);
    }

    formData.append(
      'data',
      JSON.stringify({
        ...dataForm,
        imagen: undefined,
      })
    );

    let result: SubmitResult;

    if (form.getValues('id')) {
      result = await updateProducto(formData, form.getValues('id'));
    } else {
      result = await addProducto(formData);
    }

    setIsLoading(false);

    if (!result.error) {
      form.reset();
      setImage(undefined);
      setOpen(false);
      setError(null);
      toast.success(result.data);
    } else {
      setError(result.error);
    }
  };

  return { handleSubmit, error, isLoading };
}
