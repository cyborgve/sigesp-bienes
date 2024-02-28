import { ContabilizacionService } from '@core/services/otros-modulos/contabilidad.service';
import { Id } from '@core/types/id';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { DesincorporacionService } from '@core/services/procesos/desincorporacion.service';
import { ModificacionService } from '@core/services/procesos/modificacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IntegracionService } from '@core/services/procesos/integracion.service';
import { Integracion } from '@core/models/procesos/integracion';
import { take } from 'rxjs/operators';

export const ejecutarIntegracion = (
  lineaEmpresa: Id,
  fechaIntegraciones: Date,
  comentario: string,
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService,
  _depreciacion: DepreciacionService,
  _desincorporacion: DesincorporacionService,
  _modificacion: ModificacionService,
  _contabilizacion: ContabilizacionService,
  _integracion: IntegracionService,
  _snackBar: MatSnackBar,
  notificar: boolean,
  integraciones: Integracion[],
  recargarDatos: () => void
) => {
  _integracion
    .procesarAprobaciones(integraciones, notificar)
    .pipe(take(1))
    .subscribe(() => recargarDatos());
  _integracion
    .procesarReversarAprobaciones(integraciones, notificar)
    .pipe(take(1))
    .subscribe(() => recargarDatos());
  _integracion
    .procesarDepreciaciones(
      integraciones,
      lineaEmpresa,
      fechaIntegraciones,
      comentario,
      notificar
    )
    .pipe(take(1))
    .subscribe(() => recargarDatos());
  _integracion
    .procesarReversarDepreciaciones(
      integraciones,
      lineaEmpresa,
      fechaIntegraciones,
      comentario,
      notificar
    )
    .pipe(take(1))
    .subscribe(() => recargarDatos());
  _integracion
    .procesarDesincorporaciones(
      integraciones,
      lineaEmpresa,
      fechaIntegraciones,
      comentario,
      notificar
    )
    .pipe(take(1))
    .subscribe(() => recargarDatos());
  _integracion
    .procesarReversarDesincorporaciones(
      integraciones,
      lineaEmpresa,
      fechaIntegraciones,
      comentario,
      notificar
    )
    .pipe(take(1))
    .subscribe(() => recargarDatos());
  _integracion
    .procesarModificaciones(
      integraciones,
      lineaEmpresa,
      fechaIntegraciones,
      comentario,
      notificar
    )
    .pipe(take(1))
    .subscribe(() => recargarDatos());
  _integracion
    .procesarReversarModificaciones(
      integraciones,
      lineaEmpresa,
      fechaIntegraciones,
      comentario,
      notificar
    )
    .pipe(take(1))
    .subscribe(() => recargarDatos());
};
