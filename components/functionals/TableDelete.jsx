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

import { toast } from 'sonner';

export default function TableActions({ id, action, ...otherProps }) {
  const deleteAction = (id) => {
    const promise = new Promise((resolve, reject) => {
      action(id).then((res) => {
        if (res.errors) {
          reject();
        }
        if (!res.errors) {
          resolve(res.data);
        }
      });
    });
    toast.promise(promise, {
      loading: 'Cargando...',
      success: (message) => message,
      error: 'Error al eliminar usuario',
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseas eliminar?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no podrá ser revertida, los datos serán eliminados de
            forma permanente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteAction({ id, ...otherProps })}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
