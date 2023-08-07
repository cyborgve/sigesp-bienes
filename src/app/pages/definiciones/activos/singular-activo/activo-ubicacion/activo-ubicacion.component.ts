import { tap, take } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Basica } from '@core/models/auxiliares/basica';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorSedeComponent } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.component';
import { BuscadorEstadoConservacionComponent } from '@pages/definiciones/estados-conservacion/buscador-estado-conservacion/buscador-estado-conservacion.component';
import { BuscadorEstadoUsoComponent } from '@pages/definiciones/estados-uso/buscador-estado-uso/buscador-estado-uso.component';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';

@Component({
  selector: 'app-activo-ubicacion',
  templateUrl: './activo-ubicacion.component.html',
  styleUrls: ['./activo-ubicacion.component.scss'],
})
export class ActivoUbicacionComponent {
  @Input() formulario: FormGroup = new FormGroup({});

  constructor(private _dialog: MatDialog) {}

  buscarUnidadAdministrativa() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        take(1),
        tap((entidad: Basica) =>
          entidad
            ? this.formulario.patchValue({ unidadAdministrativaId: entidad.id })
            : undefined
        )
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
        tap((entidad: Basica) =>
          entidad
            ? this.formulario.patchValue({ sedeId: entidad.id })
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }

  buscarResponsable() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: Basica) =>
          entidad
            ? this.formulario.patchValue({ responsableId: entidad.id })
            : undefined
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
        tap((entidad: Basica) =>
          entidad
            ? this.formulario.patchValue({ responsableUsoId: entidad.id })
            : undefined
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
        tap((entidad: Basica) =>
          entidad
            ? this.formulario.patchValue({ estadoConservacionId: entidad.id })
            : undefined
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
        tap((entidad: Basica) =>
          entidad
            ? this.formulario.patchValue({ estadoUsoId: entidad.id })
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
