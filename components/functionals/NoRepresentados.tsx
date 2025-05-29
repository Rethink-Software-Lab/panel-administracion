import { CircleOff, ThumbsUp } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getNoRepresentados } from '@/app/(with-layout)/services';
import { DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '../ui/badge';
import Link from 'next/link';

export async function NoRepresentados() {
  const { data } = await getNoRepresentados();

  console.log(data);

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
            <Badge
              className="absolute -top-1 -left-1 text-[10px] font-bold font-mono px-1 py-0.2"
              variant="destructive"
            >
              {data?.length > 10 ? '10+' : data?.length}
            </Badge>
          )}
          <CircleOff className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="w-fit min-w-56"
        style={{ paddingBottom: 0 }}
      >
        <DropdownMenuLabel>No representados</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {data && data?.length > 0 ? (
          <ScrollArea className="h-[300px]">
            <div className="flex flex-col gap-2">
              {data?.map((p) => (
                <Link key={p.id} href={`/search/?id=${p.id}`}>
                  <Button
                    variant="ghost"
                    className="justify-start font-normal w-full"
                  >
                    {p.nombre}
                  </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
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
      </PopoverContent>
    </Popover>
  );
}
