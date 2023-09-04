import { MatDialog } from '@angular/material/dialog';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap, take } from 'rxjs/operators';
import { BuscadorCategoriaComponent } from '@pages/definiciones/categorias/buscador-categoria/buscador-categoria.component';
import { Categoria } from '@core/models/definiciones/categoria';

@Component({
  selector: 'app-filtro-categoria',
  templateUrl: './filtro-categoria.component.html',
  styleUrls: ['./filtro-categoria.component.scss'],
})
export class FiltroCategoriaComponent {
  @Input() categoria = new FormControl([0]);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarCategoria() {
    let dialog = this._dialog.open(BuscadorCategoriaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((categoria: Categoria) =>
          categoria ? this.categoria.patchValue(categoria.id) : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
