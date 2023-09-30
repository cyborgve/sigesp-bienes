import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarEntregasUnidad = () =>
  pipe(
    map((entregasUnidad: any[]) =>
      entregasUnidad.map(
        entregaUnidad =>
          <EntregaUnidad>{
            empresaId: Number(entregaUnidad.empresaId),
            id: Number(entregaUnidad.id),
            comprobante: entregaUnidad.comprobante,
            unidadAdministrativa: Number(entregaUnidad.unidadAdministrativa),
            sede: Number(entregaUnidad.sede),
            responsableAnterior: entregaUnidad.responsableAnterior,
            nuevoResponsable: entregaUnidad.nuevoResponsable,
            observaciones: entregaUnidad.observaciones,
            creado: entregaUnidad.creado,
            modificado: entregaUnidad.modificado,
          }
      )
    )
  );
