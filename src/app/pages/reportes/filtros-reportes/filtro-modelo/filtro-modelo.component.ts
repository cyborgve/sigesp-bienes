import { tap, take } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Modelo } from '@core/models/definiciones/modelo';
import { BuscadorModeloComponent } from '@pages/definiciones/modelos/buscador-modelo/buscador-modelo.component';

@Component({
  selector: 'app-filtro-modelo',
  templateUrl: './filtro-modelo.component.html',
  styleUrls: ['./filtro-modelo.component.scss'],
})
export class FiltroModeloComponent {
  @Input() modelo = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarModelo() {
    let dialog = this._dialog.open(BuscadorModeloComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((modelo: Modelo) =>
          modelo ? this.modelo.patchValue(modelo.id) : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
