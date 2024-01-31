import { ContabilizacionService } from '@core/services/otros-modulos/contabilidad.service';
import { Id } from '@core/types/id';
import { pipe } from 'rxjs';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { DesincorporacionService } from '@core/services/procesos/desincorporacion.service';
import { ModificacionService } from '@core/services/procesos/modificacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IntegracionService } from '@core/services/procesos/integracion.service';

export const ejecutarIntegracion = (
  lineaEmpresa: Id,
  fechaIntegraciones: Date,
  observaciones: string,
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService,
  _depreciacion: DepreciacionService,
  _desincorporacion: DesincorporacionService,
  _modificacion: ModificacionService,
  _contabilizacion: ContabilizacionService,
  _integracion: IntegracionService,
  _snackBar: MatSnackBar,
  notificar: boolean
) => pipe();
// contabilizarDepreciacionesMensuales(
//   lineaEmpresa,
//   fechaIntegraciones,
//   observaciones,
//   _activo,
//   _unidadAdministrativa,
//   _depreciacion,
//   _contabilizacion,
//   _integracion,
//   _snackBar,
//   notificar
// ),
// reversarContabilizarDepreciacionesMensuales(
//   lineaEmpresa,
//   fechaIntegraciones,
//   observaciones,
//   _activo,
//   _unidadAdministrativa,
//   _depreciacion,
//   _contabilizacion,
//   _integracion,
//   _snackBar,
//   notificar
// )
// contabilizarDesincorporaciones(
//   lineaEmpresa,
//   fechaIntegraciones,
//   observaciones,
//   _activo,
//   _unidadAdministrativa,
//   _desincorporacion,
//   _contabilizacion
// ),
// reversarContabilizarDesincorporaciones(
//   lineaEmpresa,
//   fechaIntegraciones,
//   observaciones,
//   _activo,
//   _unidadAdministrativa,
//   _desincorporacion,
//   _contabilizacion
// ),
// contabilizarModificaciones(
//   lineaEmpresa,
//   fechaIntegraciones,
//   observaciones,
//   _activo,
//   _unidadAdministrativa,
//   _modificacion,
//   _contabilizacion
// ),
// reversarContabilizarModificaciones(
//   lineaEmpresa,
//   fechaIntegraciones,
//   observaciones,
//   _activo,
//   _unidadAdministrativa,
//   _modificacion,
//   _contabilizacion
// )
