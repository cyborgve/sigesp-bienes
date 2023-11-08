import { switchMap, map } from 'rxjs/operators';
import { ActivoListaDepreciacion } from '@core/models/auxiliares/activo-lista-depreciacion';
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { forkJoin, pipe } from 'rxjs';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { MonedaService } from '@core/services/otros-modulos/moneda.service';
import { normalizarTipoActivo } from '@core/utils/funciones/normalizar-tipo-activo';
import { normalizarMetodoDepreciacion } from '@core/utils/funciones/normalizar-metodo-depreciacion';

export const transformarActivoListaDepreciacion = (
  _depreciacion: DepreciacionService,
  _activo: ActivoService,
  _moneda: MonedaService
) =>
  pipe(
    switchMap((detallesDepreciacion: DetalleDepreciacion[]) => {
      let transformar = detallesDepreciacion.map(detalle =>
        _depreciacion.buscarPorId(detalle.proceso).pipe(
          switchMap(depreciacion => {
            let buscarComplementos = _activo
              .buscarPorId(depreciacion.activo)
              .pipe(
                switchMap(activo => {
                  let buscarIsoMoneda = _moneda
                    .buscarPorId(activo.monedaId)
                    .pipe(map(moneda => moneda.iso));
                  return buscarIsoMoneda.pipe(
                    map(isoMoneda => {
                      let complementos = {
                        codigo: activo.codigo,
                        denominacion: activo.denominacion,
                        tipoActivo: activo.tipoActivo,
                        identificador: activo.serialRotulacion,
                        isoMoneda: isoMoneda,
                      };
                      depreciacion.detalles = [detalle];
                      return convertirActivoListaDepreciacion(
                        depreciacion,
                        complementos
                      );
                    })
                  );
                })
              );
            return buscarComplementos;
          })
        )
      );
      return forkJoin(transformar);
    })
  );

const convertirActivoListaDepreciacion = (
  depreciacion: Depreciacion,
  complementos: {
    codigo: string;
    denominacion: string;
    tipoActivo: string;
    identificador: string;
    isoMoneda: string;
  }
) => {
  let activoResultado = <ActivoListaDepreciacion>{
    fechaDepreciacion: new Date(
      depreciacion.detalles[0].fecha
    ).toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    codigo: complementos.codigo.substring(5),
    denominacion: complementos.denominacion,
    tipo: normalizarTipoActivo(complementos.tipoActivo),
    identificador: complementos.identificador,
    valorInicial: depreciacion.costo.toFixed(2) + ' ' + complementos.isoMoneda,
    valorRescate:
      depreciacion.valorRescate.toFixed(2) + ' ' + complementos.isoMoneda,
    montoDepreciar:
      depreciacion.montoDepreciar.toFixed(2) + ' ' + complementos.isoMoneda,
    metodoDepreciacion: normalizarMetodoDepreciacion(depreciacion.metodo),
    depreciacionMensual:
      depreciacion.detalles[0].depreciacionMensual.toFixed(2) +
      ' ' +
      complementos.isoMoneda,
    depreciacionAnual:
      depreciacion.detalles[0].depreciacionAnual.toFixed(2) +
      ' ' +
      complementos.isoMoneda,
    depreciacionAcumulada:
      depreciacion.detalles[0].depreciacionAcumulada.toFixed(2) +
      ' ' +
      complementos.isoMoneda,
    valorContable:
      depreciacion.detalles[0].valorContable.toFixed(2) +
      ' ' +
      complementos.isoMoneda,
  };
  return activoResultado;
};
