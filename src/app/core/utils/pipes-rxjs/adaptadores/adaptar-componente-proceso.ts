import { ComponenteProceso } from '@core/models/auxiliares/componente-proceso';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarComponenteProceso = () => pipe(map(adaptar));
export const adaptarComponentesProceso = () =>
  pipe(map((componentes: any[]) => componentes.map(adaptar)));

const adaptar = (componente: any) =>
  <ComponenteProceso>{
    empresaId: Number(componente.empresaId),
    id: Number(componente.id),
    codigo: componente.codigo,
    proceso: Number(componente.proceso),
    componente: Number(componente.componente),
    tipoComponente: Number(componente.tipoComponente),
    denominacion: componente.denominacion,
    creado: componente.creado,
    modificado: componente.modificado,
  };
