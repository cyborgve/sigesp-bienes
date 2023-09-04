import { tap, take } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaUnidadAdministrativa } from '@core/models/definiciones/categoria-unidad-administrativa';
import { BuscadorCategoriaUnidadComponent } from '@pages/definiciones/categorias-unidad-administrativa/buscador-categoria-unidad/buscador-categoria-unidad.component';

@Component({
  selector: 'app-filtro-categoria-unidad-administrativa',
  templateUrl: './filtro-categoria-unidad-administrativa.component.html',
  styleUrls: ['./filtro-categoria-unidad-administrativa.component.scss'],
})
export class FiltroCategoriaUnidadAdministrativaComponent {
  @Input() categoria = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarCategoria() {
    let dialog = this._dialog.open(BuscadorCategoriaUnidadComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((categoria: CategoriaUnidadAdministrativa) =>
          categoria ? this.categoria.patchValue(categoria.id) : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
