import { MetodoDepreciacion } from '@core/types/metodo-depreciacion';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';
import { normalizarMetodoDepreciacion } from '@core/utils/funciones/normalizar-metodo-depreciacion';

export const adaptarActivoDepreciacion = () => pipe(map(adaptar));
export const adaptarActivosDepreciacion = () =>
  pipe(map((activosDepreciacion: any[]) => activosDepreciacion.map(adaptar)));

const adaptar = (depreciacion: any) =>
  <ActivoDepreciacion>{
    empresaId: Number(depreciacion.empresaId),
    id: Number(depreciacion.id),
    activoId: Number(depreciacion.activoId),
    depreciable: Number(depreciacion.depreciable),
    metodoDepreciacion: depreciacion.MetodoDepreciacion,
    cuentaContableGasto: depreciacion.cuentaContableGasto,
    cuentaContableDepreciacion: depreciacion.cuentaContableDepreciacion,
    vidaUtil: Number(depreciacion.vidaUtil),
    unidadVidaUtil: depreciacion.unidadVidaUtil,
    valorRescate: Number(depreciacion.valorRescate),
    monedaValorRescate: depreciacion.monedaValorRescate,
    creado: depreciacion.creado,
    modificado: depreciacion.modificado,
  };
