import { ActivoService } from '@core/services/definiciones/activo.service';
import { switchMap, map } from 'rxjs/operators';
import { Activo } from '@core/models/definiciones/activo';
import { forkJoin, pipe } from 'rxjs';
import { ActivoListaInventario } from '@core/models/auxiliares/activo-lista-inventario';
import { EstadoUsoService } from '@core/services/definiciones/estado-uso.service';
import { MarcaService } from '@core/services/definiciones/marca.service';
import { ModeloService } from '@core/services/definiciones/modelo.service';
import { EstadoConservacionService } from '@core/services/definiciones/estado-conservacion.service';
import { normalizarTipoActivo } from '@core/utils/funciones/normalizar-tipo-activo';
import { MonedaService } from '@core/services/otros-modulos/moneda.service';

export const transformarActivoListaInventario = (
  _activo: ActivoService,
  _estadoUso: EstadoUsoService,
  _marca: MarcaService,
  _modelo: ModeloService,
  _estadoConservacion: EstadoConservacionService,
  _moneda: MonedaService
) =>
  pipe(
    switchMap((activos: Activo[]) => {
      let transformar = activos.map(activoParcial =>
        _activo.buscarPorId(activoParcial.id).pipe(
          switchMap(activoCompleto => {
            let buscarComplementos$ = [
              _estadoUso
                .buscarPorId(activoCompleto.ubicacion.estadoUsoId)
                .pipe(map(estadoUso => estadoUso.denominacion)),
              _modelo
                .buscarPorId(activoCompleto.modeloId)
                .pipe(
                  switchMap(modelo =>
                    _marca
                      .buscarPorId(modelo.marcaId)
                      .pipe(
                        map(
                          marca =>
                            `${marca.denominacion} - ${modelo.denominacion}`
                        )
                      )
                  )
                ),
              _estadoConservacion
                .buscarPorId(activoCompleto.ubicacion.estadoConservacionId)
                .pipe(
                  map(estadoConservacion => estadoConservacion.denominacion)
                ),
              _moneda
                .buscarPorId(activoCompleto.monedaId)
                .pipe(map(moneda => moneda.iso)),
            ];
            return forkJoin(buscarComplementos$).pipe(
              map(([estadoUso, marcaModelo, estadoConservacion, isoMoneda]) =>
                convertirActivoListaInventario(
                  activoCompleto,
                  estadoUso,
                  marcaModelo,
                  estadoConservacion,
                  isoMoneda
                )
              )
            );
          })
        )
      );
      return forkJoin(transformar);
    })
  );

const convertirActivoListaInventario = (
  activo: Activo,
  estado: string,
  marcaModelo: string,
  condicion: string,
  isoMoneda: string
) =>
  <ActivoListaInventario>{
    codigo: activo.codigo,
    tipo: normalizarTipoActivo(activo.tipoActivo),
    denominacion: activo.denominacion,
    identificador: activo.serialRotulacion,
    serial: activo.serialFabrica,
    marcaModelo: marcaModelo,
    estado: estado,
    condicion: condicion,
    precio: `${activo.valorAdquisicion.toFixed(2)} ${isoMoneda}`,
    creado: new Date(activo.creado).toLocaleDateString(),
    modificado: new Date(activo.modificado).toLocaleDateString(),
  };
