import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Clase } from '@core/models/definiciones/clase';
import { BuscadorClaseComponent } from '@pages/definiciones/clases/buscador-clase/buscador-clase.component';
import { take, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-filtro-clase',
  templateUrl: './filtro-clase.component.html',
  styleUrls: ['./filtro-clase.component.scss'],
})
export class FiltroClaseComponent {
  @Input() clase = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarClase() {
    let dialog = this._dialog.open(BuscadorClaseComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((clase: Clase) => this.clase.patchValue(clase.id)),
        take(1)
      )
      .subscribe();
  }
}
