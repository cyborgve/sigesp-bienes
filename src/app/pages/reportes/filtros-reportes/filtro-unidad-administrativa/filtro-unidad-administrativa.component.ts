import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';

@Component({
  selector: 'app-filtro-unidad-administrativa',
  templateUrl: './filtro-unidad-administrativa.component.html',
  styleUrls: ['./filtro-unidad-administrativa.component.scss'],
})
export class FiltroUnidadAdministrativaComponent {
  @Input() formulario: FormGroup;
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
        filter(todo => !!todo),
        tap((unidadAdministrativa: UnidadAdministrativa) =>
          this.formulario.patchValue({
            unidadAdministrativa: unidadAdministrativa.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }
}
