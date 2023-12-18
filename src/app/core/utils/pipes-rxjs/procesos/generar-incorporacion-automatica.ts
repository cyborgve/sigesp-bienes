import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { Activo } from '@core/models/definiciones/activo';
import { Incorporacion } from '@core/models/procesos/incorporacion';
import { IncorporacionService } from '@core/services/procesos/incorporacion.service';
import { Id } from '@core/types/id';
import { comprobarActivoIncorporado } from '@core/utils/funciones/comprobar-activo-incorporado';
import { convertirActivoProceso } from '@core/utils/funciones/convertir-activo-proceso';
import { of, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const generarIncorporacionAutomatica = (
  generarIncorporacion: boolean,
  causaMovimiento: Id,
  _incorporacion: IncorporacionService
) =>
  pipe(
    switchMap((activo: Activo) => {
      if (generarIncorporacion) {
        if (comprobarActivoIncorporado(activo.ubicacion)) {
          let { ubicacion } = activo;
          let activos: ActivoProceso[] = [convertirActivoProceso(activo)];
          let incorporacion: Incorporacion = {
            empresaId: 0,
            id: 0,
            comprobante: '0000-00000000',
            causaMovimiento: Number(causaMovimiento),
            unidadAdministrativa: ubicacion.unidadAdministrativaId,
            sede: ubicacion.sedeId,
            fechaEntrega: ubicacion.fechaIngreso,
            responsablePrimario: ubicacion.responsableId,
            responsableUso: ubicacion.responsableUsoId,
            observaciones:
              'INCORPORACION GENERADA DE FORMA AUTOMATICA EN LA CREACION DEL BIEN',
            activos: activos,
            creado: new Date(),
            modificado: new Date(),
          };
          return _incorporacion
            .guardar(incorporacion, 'INCORPORACION', true)
            .pipe(map(() => activo));
        }
      }
      return of(activo);
    })
  );
