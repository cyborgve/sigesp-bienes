import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Rotulacion } from '@core/models/definiciones/rotulacion';
import { BuscadorRotulacionComponent } from '@pages/definiciones/rotulaciones/buscador-rotulacion/buscador-rotulacion.component';
import { take, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-filtro-rotulacion',
  templateUrl: './filtro-rotulacion.component.html',
  styleUrls: ['./filtro-rotulacion.component.scss'],
})
export class FiltroRotulacionComponent {
  @Input() rotulacion = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarRotulacion() {
    let dialog = this._dialog.open(BuscadorRotulacionComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((rotulacion: Rotulacion) =>
          this.rotulacion.patchValue(rotulacion.id)
        ),
        take(1)
      )
      .subscribe();
  }
}
