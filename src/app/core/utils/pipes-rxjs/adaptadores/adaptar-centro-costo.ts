import { map } from 'rxjs/operators';
import { CentroCostos } from '@core/models/otros-modulos/centro-costos';
import { pipe } from 'rxjs';

export const adaptarCentroCostos = () => pipe(map(adaptar));
export const adaptarCentrosCostos = () =>
  pipe(map((centrosCostos: any[]) => centrosCostos.map(adaptar)));

const adaptar = (centroCostos: any) =>
  <CentroCostos>{
    empresaId: Number(centroCostos.empresaId),
    id: centroCostos.id,
    codigo: centroCostos.codigo,
    denominacion: centroCostos.denominacion,
    enterprise_id: centroCostos.enterprise_id,
    creado: centroCostos.creado,
    modificado: centroCostos.modificado,
  };
