import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Basica } from '@core/models/auxiliares/basica';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { BuscadorSedeComponent } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.component';
import { BuscadorEstadoConservacionComponent } from '@pages/definiciones/estados-conservacion/buscador-estado-conservacion/buscador-estado-conservacion.component';
import { BuscadorEstadoUsoComponent } from '@pages/definiciones/estados-uso/buscador-estado-uso/buscador-estado-uso.component';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';
import { ModoFormulario } from '@core/types/modo-formulario';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';
import { comprobarActivoIncorporado } from '@core/utils/funciones/comprobar-activo-incorporado';
import { BuscadorCausaMovimientoComponent } from '@pages/definiciones/causas-movimiento/buscador-causa-movimiento/buscador-causa-movimiento.component';
import { filtrarCausasMovimientoPorTipo } from '@core/utils/pipes-rxjs/operadores/filtrar-causas-movimiento-por-tipo';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-activo-ubicacion',
  templateUrl: './activo-ubicacion.component.html',
  styleUrls: ['./activo-ubicacion.component.scss'],
})
export class ActivoUbicacionComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() formularioEspecial: UntypedFormGroup;
  @Input() modoFormulario: ModoFormulario;

  constructor(private _dialog: MatDialog) {}

  activoIncorporado = () => comprobarActivoIncorporado(this.formulario.value);

  buscarUnidadAdministrativa() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.unidadAdministrativaId),
        tap((entidad: UnidadAdministrativa) =>
          this.formulario.patchValue({
            unidadAdministrativaId: entidad.id,
            responsableId: entidad.responsable,
            fechaIngreso: new Date(),
          })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarSede() {
    let dialog = this._dialog.open(BuscadorSedeComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.sedeId),
        tap((entidad: Basica) =>
          this.formulario.patchValue({ sedeId: entidad.id })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarResponsableUso() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.responsableUsoId),
        tap((entidad: Basica) =>
          this.formulario.patchValue({ responsableUsoId: entidad.id })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarEstadoConservacion() {
    let dialog = this._dialog.open(BuscadorEstadoConservacionComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.estadoConservacionId),
        tap((entidad: Basica) =>
          this.formulario.patchValue({ estadoConservacionId: entidad.id })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarEstadoUso() {
    let dialog = this._dialog.open(BuscadorEstadoUsoComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.EstadoUsoId),
        tap((entidad: Basica) =>
          this.formulario.patchValue({ estadoUsoId: entidad.id })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarCausaMovimiento() {
    let dialog = this._dialog.open(BuscadorCausaMovimientoComponent, {
      height: '95%',
      width: '85%',
      data: { filtros: [filtrarCausasMovimientoPorTipo('INCORPORACIÓN')] },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.causaMovimiento),
        tap((entidad: Basica) =>
          this.formularioEspecial.patchValue({ causaMovimiento: entidad.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
