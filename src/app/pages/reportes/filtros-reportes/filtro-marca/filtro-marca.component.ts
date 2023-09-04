import { tap, take } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorMarcaComponent } from '@pages/definiciones/marcas/buscador-marca/buscador-marca.component';
import { Marca } from '@core/models/definiciones/marca';

@Component({
  selector: 'app-filtro-marca',
  templateUrl: './filtro-marca.component.html',
  styleUrls: ['./filtro-marca.component.scss'],
})
export class FiltroMarcaComponent {
  @Input() marca = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarMarca() {
    let dialog = this._dialog.open(BuscadorMarcaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((marca: Marca) =>
          marca ? this.marca.patchValue(marca.id) : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
