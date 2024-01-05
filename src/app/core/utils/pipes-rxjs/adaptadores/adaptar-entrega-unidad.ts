import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarEntregaUnidad = () => pipe(map(adaptar));
export const adaptarEntregasUnidades = () =>
  pipe(map((entregasUnidad: any[]) => entregasUnidad.map(adaptar)));

const adaptar = (entregaUnidad: any) =>
  <EntregaUnidad>{
    empresaId: Number(entregaUnidad.empresaId),
    id: Number(entregaUnidad.id),
    comprobante: entregaUnidad.comprobante,
    unidadAdministrativa: Number(entregaUnidad.unidadAdministrativa),
    sede: Number(entregaUnidad.sede),
    responsableAnterior: entregaUnidad.responsableAnterior,
    nuevoResponsable: entregaUnidad.nuevoResponsable,
    observaciones: entregaUnidad.observaciones,
    activos: entregaUnidad.activos,
    creado: entregaUnidad.creado,
    modificado: entregaUnidad.modificado,
  };
