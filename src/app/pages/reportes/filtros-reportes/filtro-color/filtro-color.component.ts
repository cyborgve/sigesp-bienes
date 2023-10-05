import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Color } from '@core/models/definiciones/color';
import { BuscadorColorComponent } from '@pages/definiciones/colores/buscador-color/buscador-color.component';
import { take, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-filtro-color',
  templateUrl: './filtro-color.component.html',
  styleUrls: ['./filtro-color.component.scss'],
})
export class FiltroColorComponent {
  @Input() color = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarColor() {
    let dialog = this._dialog.open(BuscadorColorComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((color: Color) => this.color.patchValue(color.id)),
        take(1)
      )
      .subscribe();
  }
}
