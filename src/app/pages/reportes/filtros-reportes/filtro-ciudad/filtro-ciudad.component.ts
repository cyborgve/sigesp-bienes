import { tap, take } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorCiudadComponent } from '@shared/components/buscador-ciudad/buscador-ciudad.component';
import { Ciudad } from '@core/models/otros-modulos/ciudad';

@Component({
  selector: 'app-filtro-ciudad',
  templateUrl: './filtro-ciudad.component.html',
  styleUrls: ['./filtro-ciudad.component.scss'],
})
export class FiltroCiudadComponent {
  @Input() ciudad = new FormControl(['---']);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarCiudad() {
    let dialog = this._dialog.open(BuscadorCiudadComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((ciudad: Ciudad) =>
          ciudad ? this.ciudad.patchValue(ciudad.id) : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
