import { CircleOff, ThumbsUp } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getNoRepresentados } from '@/app/(with-layout)/services';
import { DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';
export async function NoRepresentados() {
  const { data } = await getNoRepresentados();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          title="No representados"
          className="relative"
        >
          {data && data?.length > 0 && (
            <span className="size-4 bg-red-500 absolute rounded-md -top-1 -left-1 flex justify-center items-center">
              <p className="text-white text-center text-[10px] font-black">
                {data?.length}
              </p>
            </span>
          )}
          <CircleOff className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-fit min-w-56">
        <DropdownMenuLabel>No representados</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col gap-2">
          {data && data?.length > 0 ? (
            data?.map((p) => (
              <span key={p.nombre} className="">
                <p className="font-light px-2">{p.nombre}</p>
              </span>
            ))
          ) : (
            <div className="px-2 py-4 gap-2 flex flex-col justify-center items-center">
              <span className="bg-green-500/60 rounded-full p-3 flex justify-center items-center text-white">
                <ThumbsUp size={20} />
              </span>
              <p className="text-xs text-muted-foreground text-center">
                No hay productos sin representar
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
