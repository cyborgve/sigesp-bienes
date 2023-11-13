import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaUnidadAdministrativa } from '@core/models/definiciones/categoria-unidad-administrativa';
import { BuscadorCategoriaUnidadComponent } from '@pages/definiciones/categorias-unidad-administrativa/buscador-categoria-unidad/buscador-categoria-unidad.component';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-filtro-categoria-unidad-administrativa',
  templateUrl: './filtro-categoria-unidad-administrativa.component.html',
  styleUrls: ['./filtro-categoria-unidad-administrativa.component.scss'],
})
export class FiltroCategoriaUnidadAdministrativaComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarCategoriaUnidadAdministrativa() {
    let dialog = this._dialog.open(BuscadorCategoriaUnidadComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((categoriaUnidadAdministrativa: CategoriaUnidadAdministrativa) =>
          this.formulario.patchValue({
            categoriaUnidadAdministrativa: categoriaUnidadAdministrativa.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }
}
