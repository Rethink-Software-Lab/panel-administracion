import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

interface ImagePreviewProps {
  imagen: string;
  fileName: string;
  fileSize: number;
  onRemove: () => void;
}

export function ImagePreview({
  imagen,
  fileName,
  fileSize,
  onRemove,
}: ImagePreviewProps) {
  return (
    <div className="flex items-center mt-4">
      <div className="relative flex items-center w-full justify-between space-x-4">
        <Image
          priority
          src={imagen}
          alt="Vista previa de la imagen"
          width={48}
          height={48}
          className="aspect-square shrink-0 rounded-md object-cover border"
        />
        <div className="flex flex-1 space-x-4">
          <div className="flex w-full flex-col gap-2">
            <div className="space-y-px">
              <p className="line-clamp-1 text-sm font-medium text-foreground/80">
                {fileName}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatBytes(fileSize)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-7"
            onClick={onRemove}
          >
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">Eliminar archivo</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
