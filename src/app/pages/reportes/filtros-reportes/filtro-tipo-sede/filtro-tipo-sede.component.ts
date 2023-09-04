import { tap, take } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorTipoSedeComponent } from '@pages/definiciones/tipos-sede/buscador-tipo-sede/buscador-tipo-sede.component';
import { TipoSede } from '@core/models/definiciones/tipo-sede';

@Component({
  selector: 'app-filtro-tipo-sede',
  templateUrl: './filtro-tipo-sede.component.html',
  styleUrls: ['./filtro-tipo-sede.component.scss'],
})
export class FiltroTipoSedeComponent {
  @Input() tipoSede = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarTipoSede() {
    let dialog = this._dialog.open(BuscadorTipoSedeComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((tipoSede: TipoSede) =>
          tipoSede ? this.tipoSede.patchValue(tipoSede.id) : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
