import { Activo } from '@core/models/definiciones/activo';
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { comprobarActivoDepreciable } from '@core/utils/funciones/comprobar-activo-depreciable';
import { convertirUnidadTiempo } from '@core/utils/funciones/convertir-unidad-tiempo';
import { calcularDepreciacion } from '@core/utils/funciones/depreciacion';
import { normalizarMetodoDepreciacion } from '@core/utils/funciones/normalizar-metodo-depreciacion';
import { of, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const generarDepreciacionAutomatica = (
  generarDepreciacion: boolean,
  _depreciacion: DepreciacionService
) =>
  pipe(
    switchMap((activo: Activo) => {
      if (generarDepreciacion) {
        if (comprobarActivoDepreciable(activo)) {
          let { depreciacion, ubicacion } = activo;
          let depreciacionCalculada = calcularDepreciacion(
            activo.valorAdquisicion,
            activo.fechaAdquisicion,
            depreciacion.vidaUtil,
            depreciacion.unidadVidaUtil,
            depreciacion.valorRescate,
            normalizarMetodoDepreciacion(depreciacion.metodoDepreciacion)
          );
          let depreciacionFinal: Depreciacion = {
            empresaId: 0,
            id: 0,
            comprobante: '0000-00000000',
            activo: activo.id,
            serial: activo.serialFabrica,
            identificador: activo.serialRotulacion,
            fechaCompra: activo.fechaAdquisicion,
            fechaIncorporacion: ubicacion.fechaIngreso,
            metodo: depreciacion.metodoDepreciacion,
            moneda: activo.monedaId,
            costo: activo.valorAdquisicion,
            valorRescate: depreciacion.valorRescate,
            montoDepreciar: activo.valorAdquisicion - depreciacion.valorRescate,
            vidaUtil: convertirUnidadTiempo(
              depreciacion.vidaUtil,
              depreciacion.unidadVidaUtil,
              'MESES'
            ),
            depreciacionMensual: depreciacionCalculada.mensual,
            depreciacionAnual: depreciacionCalculada.anual,
            observaciones:
              'DEPRECIACION GENERADA AUTOMATICAMENTE AL GUARDAR BIEN',
            detalles: depreciacionCalculada.detalles,
            creado: new Date(),
            modificado: new Date(),
          };
          return _depreciacion
            .guardar(depreciacionFinal, 'DEPRECIACION', true)
            .pipe(map(() => activo));
        }
      }
      return of(activo);
    })
  );
