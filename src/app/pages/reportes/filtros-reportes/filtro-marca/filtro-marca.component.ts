import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorMarcaComponent } from '@pages/definiciones/marcas/buscador-marca/buscador-marca.component';
import { Marca } from '@core/models/definiciones/marca';

@Component({
  selector: 'app-filtro-marca',
  templateUrl: './filtro-marca.component.html',
  styleUrls: ['./filtro-marca.component.scss'],
})
export class FiltroMarcaComponent {
  @Input() formulario: FormGroup;
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
        filter(todo => !!todo),
        tap((marca: Marca) => this.formulario.patchValue({ marca: marca.id })),
        take(1)
      )
      .subscribe();
  }
}
