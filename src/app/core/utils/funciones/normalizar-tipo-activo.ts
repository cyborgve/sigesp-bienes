import { TipoActivo } from '@core/types/tipo-activo';

export const normalizarTipoActivo = (tipoActivo: string): TipoActivo => {
  let tiposActivo = {
    INM: 'Inmueble',
    MUE: 'Mueble',
    SEM: 'Semoviente',
    VEH: 'Vehículo',
    TIT: 'TITULOS O VALORES',
    ACC: 'ACCIONES O PARTICIPACIONES',
  };
  return tiposActivo[tipoActivo];
};
