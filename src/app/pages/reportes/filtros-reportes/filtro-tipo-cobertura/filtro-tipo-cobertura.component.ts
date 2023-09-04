import { tap, take } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorTipoCoberturaComponent } from '@pages/definiciones/tipos-cobertura/buscador-tipo-cobertura/buscador-tipo-cobertura.component';
import { TipoCobertura } from '@core/models/definiciones/tipo-cobertura';

@Component({
  selector: 'app-filtro-tipo-cobertura',
  templateUrl: './filtro-tipo-cobertura.component.html',
  styleUrls: ['./filtro-tipo-cobertura.component.scss'],
})
export class FiltroTipoCoberturaComponent {
  @Input() tipoCobertura = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarTipoCobertura() {
    let dialog = this._dialog.open(BuscadorTipoCoberturaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((tipoCobertura: TipoCobertura) =>
          tipoCobertura
            ? this.tipoCobertura.patchValue(tipoCobertura.id)
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
