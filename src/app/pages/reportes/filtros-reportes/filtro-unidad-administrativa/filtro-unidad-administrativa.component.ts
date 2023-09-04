import { tap, take } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';

@Component({
  selector: 'app-filtro-unidad-administrativa',
  templateUrl: './filtro-unidad-administrativa.component.html',
  styleUrls: ['./filtro-unidad-administrativa.component.scss'],
})
export class FiltroUnidadAdministrativaComponent {
  @Input() unidadAdministrativa = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarUnidadAdministrativa() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((unidadAdministrativa: UnidadAdministrativa) =>
          unidadAdministrativa
            ? this.unidadAdministrativa.patchValue(unidadAdministrativa.id)
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
