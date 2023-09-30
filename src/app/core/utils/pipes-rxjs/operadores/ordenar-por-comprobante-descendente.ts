import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

export const ordenarPorComprobanteDescendente = () =>
  pipe(
    map((procesos: any[]) =>
      procesos.sort((a: any, b: any) =>
        a.comprobante > b.comprobante ? -1 : 1
      )
    )
  );
