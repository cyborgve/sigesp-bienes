import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';

export const adaptarActivoUbicacion = () => pipe(map(adaptar));
export const adaptarActivosUbicacion = () =>
  pipe(map((ubicaciones: any[]) => ubicaciones.map(adaptar)));

const adaptar = (ubicacion: any) =>
  <ActivoUbicacion>{
    empresaId: Number(ubicacion.empresaId),
    id: Number(ubicacion.id),
    activoId: Number(ubicacion.activoId),
    sedeId: Number(ubicacion.sedeId),
    unidadAdministrativaId: Number(ubicacion.unidadAdministrativaId),
    fechaIngreso: ubicacion.fechaIngreso,
    estadoUsoId: Number(ubicacion.estadoUsoId),
    estadoConservacionId: Number(ubicacion.estadoConservacionId),
    descripcionEstadoConservacion: ubicacion.descripcionEstadoConservacion,
    responsableId: ubicacion.responsableId,
    responsableUsoId: ubicacion.responsableUsoId,
    creado: ubicacion.creado,
    modificado: ubicacion.modificado,
  };
