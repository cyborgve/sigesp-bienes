import { ContabilizacionService } from '@core/services/otros-modulos/contabilidad.service';
import { Id } from '@core/types/id';
import { pipe } from 'rxjs';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { contabilizarDepreciacionesMensuales } from './contabilizar-depreciaciones-mensuales';
import { DesincorporacionService } from '@core/services/procesos/desincorporacion.service';
import { ModificacionService } from '@core/services/procesos/modificacion.service';
import { contabilizarDesincorporaciones } from './contabilizar-desincorporaciones';
import { contabilizarModificaciones } from './contabilizar-modificaciones';

export const ejecutarIntegracion = (
  lineaEmpresa: Id,
  fechaIntegraciones: Date,
  observaciones: string,
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService,
  _depreciacion: DepreciacionService,
  _desincorporacion: DesincorporacionService,
  _modificacion: ModificacionService,
  _contabilizacion: ContabilizacionService
) =>
  pipe(
    contabilizarDepreciacionesMensuales(
      lineaEmpresa,
      fechaIntegraciones,
      observaciones,
      _activo,
      _unidadAdministrativa,
      _depreciacion,
      _contabilizacion
    )
    // contabilizarDesincorporaciones(
    //   lineaEmpresa,
    //   _activo,
    //   _unidadAdministrativa,
    //   _desincorporacion,
    //   _contabilizacion
    // ),
    // contabilizarModificaciones(
    //   lineaEmpresa,
    //   _activo,
    //   _unidadAdministrativa,
    //   _modificacion,
    //   _contabilizacion
    // )
  );
