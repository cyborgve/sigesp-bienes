import { tap } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BuscadorActivoComponent } from '../../buscador-activo/buscador-activo.component';
import { MatDialog } from '@angular/material/dialog';
import { Activo } from '@core/models/activo';

@Component({
  selector: 'app-activo-datos-generales',
  templateUrl: './activo-datos-generales.component.html',
  styleUrls: ['./activo-datos-generales.component.scss'],
})
export class ActivoDatosGeneralesComponent {
  @Input() formulario: FormGroup = new FormGroup({});

  constructor(private _dialog: MatDialog) {}

  buscar() {
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: Activo) => {
          this.formulario.patchValue({
            empresaId: entidad.empresaId,
            id: entidad.id,
            codigo: entidad.creado,
            denominacion: entidad.denominacion,
            creado: entidad.creado,
            modificado: entidad.modificado,
          });
        })
      )
      .subscribe();
  }
}
