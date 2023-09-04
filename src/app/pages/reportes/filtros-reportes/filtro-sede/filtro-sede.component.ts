import { tap, take } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorSedeComponent } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.component';
import { Sede } from '@core/models/definiciones/sede';

@Component({
  selector: 'app-filtro-sede',
  templateUrl: './filtro-sede.component.html',
  styleUrls: ['./filtro-sede.component.scss'],
})
export class FiltroSedeComponent {
  @Input() sede = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarSede() {
    let dialog = this._dialog.open(BuscadorSedeComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((sede: Sede) => (sede ? this.sede.patchValue(sede.id) : undefined)),
        take(1)
      )
      .subscribe();
  }
}
