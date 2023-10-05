import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorOrigenComponent } from '@pages/definiciones/origenes/buscador-origen/buscador-origen.component';
import { Origen } from '@core/models/definiciones/origen';

@Component({
  selector: 'app-filtro-origen',
  templateUrl: './filtro-origen.component.html',
  styleUrls: ['./filtro-origen.component.scss'],
})
export class FiltroOrigenComponent {
  @Input() origen = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarOrigen() {
    let dialog = this._dialog.open(BuscadorOrigenComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((origen: Origen) => this.origen.patchValue(origen.id)),
        take(1)
      )
      .subscribe();
  }
}
