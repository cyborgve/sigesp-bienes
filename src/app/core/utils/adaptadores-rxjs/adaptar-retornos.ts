import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Retorno } from '@core/models/procesos/retorno';
export const adaptarRetornos = () =>
  pipe(
    map((retornos: any[]) =>
      retornos.map(
        (retorno: any) =>
          <Retorno>{
            empresaId: Number(retorno.empresaId),
            id: Number(retorno.id),
            comprobante: retorno.comprobante,
            beneficiario: retorno.beneficiario,
            observaciones: retorno.observaciones,
            activos: retorno.activos ? retorno.activos : [],
            creado: retorno.creado,
            modificado: retorno.modificado,
          }
      )
    )
  );
