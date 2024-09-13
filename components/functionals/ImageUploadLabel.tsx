import { UploadIcon } from 'lucide-react';

export function ImageUploadLabel() {
  return (
    <label
      htmlFor="imagen"
      className="w-full cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 transition hover:bg-muted/25 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-full border border-dashed p-3">
          <UploadIcon
            className="size-5 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
        <div className="">
          <p className="text-sm font-medium text-muted-foreground">
            Click para seleccionar imagen.
          </p>
        </div>
      </div>
    </label>
  );
}
