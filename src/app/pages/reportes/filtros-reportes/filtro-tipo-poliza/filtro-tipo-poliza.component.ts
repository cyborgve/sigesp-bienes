import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorTipoPolizaComponent } from '@pages/definiciones/tipos-poliza/buscador-tipo-poliza/buscador-tipo-poliza.component';
import { TipoPoliza } from '@core/models/definiciones/tipo-poliza';

@Component({
  selector: 'app-filtro-tipo-poliza',
  templateUrl: './filtro-tipo-poliza.component.html',
  styleUrls: ['./filtro-tipo-poliza.component.scss'],
})
export class FiltroTipoPolizaComponent {
  @Input() tipoPoliza = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarTipoPoliza() {
    let dialog = this._dialog.open(BuscadorTipoPolizaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((tipoPoliza: TipoPoliza) =>
          this.tipoPoliza.patchValue(tipoPoliza.id)
        ),
        take(1)
      )
      .subscribe();
  }
}
