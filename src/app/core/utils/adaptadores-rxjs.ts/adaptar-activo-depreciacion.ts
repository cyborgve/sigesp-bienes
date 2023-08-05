import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';

export const adaptarActivoDepreciacion = () =>
  pipe(
    map(
      (depreciacion: any) =>
        <ActivoDepreciacion>{
          empresaId: depreciacion.empresaId,
          id: Number(depreciacion.id),
          activoId: Number(depreciacion.activoId),
          depreciable: Number(depreciacion.depreciable),
          metodoDepreciacion: depreciacion.metodoDepreciacion
            ? depreciacion.metodoDepreciacion
            : '',
          cuentaContableGasto: depreciacion.cuentaContableGasto,
          cuentaContableDepreciacion: depreciacion.cuentaContableDepreciacion,
          vidaUtil: Number(depreciacion.vidaUtil),
          unidadVidaUtil: depreciacion.unidadVidaUtil,
          valorRescate: Number(depreciacion.valorRescate),
          monedaValorRescate: depreciacion.monedaValorRescate,
          creado: depreciacion.creado,
          modificado: depreciacion.modificado,
        }
    )
  );
