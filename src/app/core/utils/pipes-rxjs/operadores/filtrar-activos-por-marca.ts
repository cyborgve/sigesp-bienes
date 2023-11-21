import { map, switchMap } from 'rxjs/operators';
import { pipe, of } from 'rxjs';
import { Id } from '@core/types/id';
import { Activo } from '@core/models/definiciones/activo';
import { ModeloService } from '@core/services/definiciones/modelo.service';

export const filtrarActivosPorMarca = (marca: Id, _modelo: ModeloService) =>
  pipe(
    switchMap((activos: Activo[]) =>
      marca && marca !== 0
        ? _modelo.buscarTodos().pipe(
            map(modelos => {
              let modelosFiltrados = modelos
                .filter(modelo => modelo.marcaId === marca)
                .map(modelo => modelo.id);
              return activos.filter(activo =>
                modelosFiltrados.includes(activo.modeloId)
              );
            })
          )
        : of(activos)
    )
  );
