import { Activo } from '@core/models/definiciones/activo';
import { Incorporacion } from '@core/models/procesos/incorporacion';

export function convertirActivosIncorporados(
  activos: Activo[],
  incorporacion: Incorporacion
) {
  return activos.map(activo => {
    activo.ubicacion.unidadAdministrativaId =
      incorporacion.unidadAdministrativa;
    activo.ubicacion.sedeId = incorporacion.sede;
    activo.ubicacion.responsableId = incorporacion.responsablePrimario;
    activo.ubicacion.responsableUsoId = incorporacion.responsableUso;
    return activo;
  });
}
