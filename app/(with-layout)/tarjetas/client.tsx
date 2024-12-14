'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { deleteTarjeta } from './actions';

export default function Delete({ id }: { id: number }) {
  const handledeleteTarjeta = async (id: number) => {
    toast('La tarjeta se eliminará en breve', {
      duration: 5000,
      action: {
        label: 'Cancelar',
        onClick: () => toast.dismiss(),
      },
      onAutoClose: async () => {
        const { data, error } = await deleteTarjeta(id);
        if (!error) {
          toast.success(data);
        } else {
          toast.error(error);
        }
      },
    });
  };
  return (
    <DropdownMenuItem
      onClick={() => handledeleteTarjeta(id)}
      className="bg-red-600 focus:bg-red-700 text-white focus:text-white"
    >
      Eliminar
    </DropdownMenuItem>
  );
}
