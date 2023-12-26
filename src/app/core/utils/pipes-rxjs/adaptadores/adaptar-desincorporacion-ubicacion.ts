import { DesincorporacionUbicacion } from '@core/models/auxiliares/desincorporacion-ubicacion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarDesincorporacionUbicacion = () => pipe(map(adaptar));
export const adaptarDesincorporacionesUbicacion = () =>
  pipe(map((ubicaciones: any[]) => ubicaciones.map(adaptar)));

const adaptar = (ubicacion: any) =>
  <DesincorporacionUbicacion>{
    empresaId: Number(ubicacion.empresaId),
    id: Number(ubicacion.id),
    proceso: Number(ubicacion.proceso),
    activo: Number(ubicacion.activo),
    unidadAdministrativa: Number(ubicacion.unidadAdministrativa),
    sede: Number(ubicacion.sede),
    responsable: ubicacion.responsable,
    responsableUso: ubicacion.responsableUso,
    creado: ubicacion.creado,
    modificado: ubicacion.modificado,
  };
