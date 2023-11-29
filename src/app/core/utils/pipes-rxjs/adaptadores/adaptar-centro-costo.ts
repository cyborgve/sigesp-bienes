import { map } from 'rxjs/operators';
import { CentroCostos } from '@core/models/otros-modulos/centro-costo';
import { pipe } from 'rxjs';

export const adaptarCentroCostos = () => pipe(map(adaptar));
export const adaptarCentrosCostos = () =>
  pipe(map((centrosCostos: any[]) => centrosCostos.map(adaptar)));

const adaptar = (centroCosto: any) =>
  <CentroCostos>{
    empresaId: centroCosto.idEmpresa,
    id: centroCosto.centro,
    codigo: centroCosto.centro,
    denominacion: centroCosto.denominacion,
    creado: new Date(),
    modificado: new Date(),
  };
