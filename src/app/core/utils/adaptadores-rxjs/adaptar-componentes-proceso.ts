import { ComponenteProceso } from '@core/models/auxiliares/componente-proceso';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarComponentesProceso = () =>
  pipe(
    map((componentesProceso: any[]) =>
      componentesProceso.map(
        componenteProceso =>
          <ComponenteProceso>{
            empresaId: Number(componenteProceso.empresaId),
            id: Number(componenteProceso.id),
            codigo: componenteProceso.codigo,
            proceso: Number(componenteProceso.proceso),
            componente: Number(componenteProceso.componente),
            tipoComponente: Number(componenteProceso.tipoComponente),
            denominacion: componenteProceso.denominacion,
            creado: componenteProceso.creado,
            modificado: componenteProceso.modificado,
          }
      )
    )
  );
