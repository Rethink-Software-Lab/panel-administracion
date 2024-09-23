'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { EspecialWarningSchema } from '@/lib/schemas';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';

export default function EspecialWarning({
  id,
  action,
  text = 'Esta acción no podrá ser revertida, los datos serán eliminados deforma permanente.',
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: valibotResolver(EspecialWarningSchema),
    defaultValues: {
      test: '',
    },
  });

  const [open, setOpen] = useState(false);

  const onSubmit = () => {
    const promise = new Promise((resolve, reject) => {
      action(id).then((res) => {
        if (res.error) {
          reject(res.error?.message || res.error);
        }
        if (!res.error) {
          resolve(res.data);
          setOpen(false);
        }
      });
    });
    toast.promise(promise, {
      loading: 'Cargando...',
      success: (message) => message,
      error: (message) => message,
    });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseas eliminar?</AlertDialogTitle>

          <AlertDialogDescription>{text}</AlertDialogDescription>
          <div className="mt-4 space-y-2">
            <Label>
              Escriba <span className="font-bold">BORRAR</span> para confirmar
            </Label>
            <Input {...register('test')} />
            <span className="text-[0.8rem] font-medium text-destructive">
              {errors?.test?.message}
            </span>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit(onSubmit)}>
            Borrar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
