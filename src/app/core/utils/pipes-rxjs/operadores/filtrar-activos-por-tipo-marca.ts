import { Activo } from '@core/models/definiciones/activo';
import { MarcaService } from '@core/services/definiciones/marca.service';
import { ModeloService } from '@core/services/definiciones/modelo.service';
import { Id } from '@core/types/id';
import { of, pipe } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export const filtrarActivosPorTipoMarca = (
  tipoMarca: Id,
  _marca: MarcaService,
  _modelo: ModeloService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      tipoMarca && tipoMarca !== 0
        ? _marca.buscarTodos().pipe(
            map(marcas => marcas.filter(marca => marca.tipo === tipoMarca)),
            map(marcas => marcas.map(marca => marca.id)),
            switchMap(marcasId =>
              _modelo.buscarTodos().pipe(
                map(modelos =>
                  modelos.filter(modelo => marcasId.includes(modelo.marcaId))
                ),
                map(modelos => modelos.map(modelo => modelo.id)),
                map(modelosId =>
                  activos.filter(activo => modelosId.includes(activo.modeloId))
                )
              )
            )
          )
        : of(activos)
    )
  );
