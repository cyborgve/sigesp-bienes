import { map, tap } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { Basica } from '@core/models/basica';
import { MatDialog } from '@angular/material/dialog';

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
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ origenId: entidad.id })
      )
    );
  }
}
