import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorTipoMarcaComponent } from '@pages/definiciones/tipos-marca/buscador-tipo-marca/buscador-tipo-marca.component';
import { TipoMarca } from '@core/models/definiciones/tipo-marca';

@Component({
  selector: 'app-filtro-tipo-marca',
  templateUrl: './filtro-tipo-marca.component.html',
  styleUrls: ['./filtro-tipo-marca.component.scss'],
})
export class FiltroTipoMarcaComponent {
  @Input() tipoMarca = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarTipoMarca() {
    let dialog = this._dialog.open(BuscadorTipoMarcaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((tipoMarca: TipoMarca) => this.tipoMarca.patchValue(tipoMarca.id)),
        take(1)
      )
      .subscribe();
  }
}
