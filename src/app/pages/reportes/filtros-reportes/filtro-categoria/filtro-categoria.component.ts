import { MatDialog } from '@angular/material/dialog';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap, take, filter } from 'rxjs/operators';
import { BuscadorCategoriaComponent } from '@pages/definiciones/categorias/buscador-categoria/buscador-categoria.component';
import { Categoria } from '@core/models/definiciones/categoria';

@Component({
  selector: 'app-filtro-categoria',
  templateUrl: './filtro-categoria.component.html',
  styleUrls: ['./filtro-categoria.component.scss'],
})
export class FiltroCategoriaComponent {
  @Input() formulario: FormGroup;
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
        filter(todo => !!todo),
        tap((categoria: Categoria) =>
          this.formulario.patchValue({ categoria: categoria.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
