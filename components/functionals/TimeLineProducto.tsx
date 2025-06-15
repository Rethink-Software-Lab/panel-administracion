import { getHistoricoProducto } from "@/app/(with-layout)/search/services";
import { TipoMovimiento } from "@/app/(with-layout)/search/types";

// import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, ArrowUpRight, Calendar } from "lucide-react";

export async function TimeLineProducto({ infoId }: { infoId: string }) {
  const { data: movimientos } = await getHistoricoProducto(Number(infoId));

  return (
    <div className="max-w-screen-sm p-6">
      <div className="relative ml-4">
        {/* Timeline line */}
        <div className="absolute left-0 inset-y-0 border-l-2" />

        {movimientos?.map(({ createdAt, type, cantidad }, index) => (
          <div key={index} className="relative pl-10 pb-12 last:pb-0">
            {/* Timeline Icon */}
            <div className="absolute left-px -translate-x-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-background ring-2 ring-slate-200">
              {type === TipoMovimiento.ENTRADA && <ArrowDownLeft />}
              {type === TipoMovimiento.SALIDA && <ArrowUpRight />}
            </div>

            {/* Content */}
            <div className="pt-2 sm:pt-1 space-y-3">
              <p className="text-base sm:text-lg font-semibold">{type}</p>
              <div>
                {/* <h3 className="text-lg sm:text-xl font-medium">{title}</h3> */}
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{createdAt}</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                {cantidad}
              </p>
              {/* <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="rounded-full"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
