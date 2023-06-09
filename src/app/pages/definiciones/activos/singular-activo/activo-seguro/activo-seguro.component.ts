import { map, tap } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorSeguroComponent } from '@pages/definiciones/seguros/buscador-seguro/buscador-seguro.component';
import { Basica } from '@core/models/basica';

@Component({
  selector: 'app-activo-seguro',
  templateUrl: './activo-seguro.component.html',
  styleUrls: ['./activo-seguro.component.scss'],
})
export class ActivoSeguroComponent {
  @Input() formulario: FormGroup = new FormGroup({});

  constructor(private _dialog: MatDialog) {}

  buscarSeguro() {
    let dialog = this._dialog.open(BuscadorSeguroComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ seguroId: entidad.id })
      )
    );
  }
}
