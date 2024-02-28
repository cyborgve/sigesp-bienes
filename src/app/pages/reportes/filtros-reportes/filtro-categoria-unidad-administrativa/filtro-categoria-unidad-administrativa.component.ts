import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaUnidadAdministrativa } from '@core/models/definiciones/categoria-unidad-administrativa';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';
import { BuscadorCategoriaUnidadComponent } from '@pages/definiciones/categorias-unidad-administrativa/buscador-categoria-unidad/buscador-categoria-unidad.component';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-filtro-categoria-unidad-administrativa',
  templateUrl: './filtro-categoria-unidad-administrativa.component.html',
  styleUrls: ['./filtro-categoria-unidad-administrativa.component.scss'],
})
export class FiltroCategoriaUnidadAdministrativaComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ categoriaUnidadAdministrativa: 0 });
  }

  buscarCategoriaUnidadAdministrativa() {
    let dialog = this._dialog.open(BuscadorCategoriaUnidadComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(
          this.formulario.value.categoriaUnidadAdministrativa
        ),
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
