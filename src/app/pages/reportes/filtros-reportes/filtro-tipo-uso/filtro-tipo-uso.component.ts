import { tap, take } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorTipoUsoComponent } from '@pages/definiciones/tipos-uso/buscador-tipo-uso/buscador-tipo-uso.component';
import { TipoUso } from '@core/models/definiciones/tipo-uso';

@Component({
  selector: 'app-filtro-tipo-uso',
  templateUrl: './filtro-tipo-uso.component.html',
  styleUrls: ['./filtro-tipo-uso.component.scss'],
})
export class FiltroTipoUsoComponent {
  @Input() tipoUso = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarTipoUso() {
    let dialog = this._dialog.open(BuscadorTipoUsoComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((tipoUso: TipoUso) =>
          tipoUso ? this.tipoUso.patchValue(tipoUso.id) : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
