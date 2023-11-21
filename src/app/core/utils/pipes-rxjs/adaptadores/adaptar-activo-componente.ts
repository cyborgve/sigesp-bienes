import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';

export const adaptarActivoComponente = () => pipe(map(adaptar));
export const adaptarActivosComponente = () =>
  pipe(map((componentes: any[]) => componentes.map(adaptar)));

const adaptar = (componente: any) =>
  <ActivoComponente>{
    empresaId: componente.empresaId,
    id: Number(componente.id),
    tipoComponenteId: Number(componente.tipoComponenteId),
    activoId: Number(componente.activoId),
    codigo: componente.codigo,
    denominacion: componente.denominacion,
    modeloId: Number(componente.modeloId),
    costo: Number(componente.costo),
    moneda: componente.moneda,
    especificaciones: componente.especificaciones,
    creado: componente.creado,
    modificado: componente.modificado,
  };
