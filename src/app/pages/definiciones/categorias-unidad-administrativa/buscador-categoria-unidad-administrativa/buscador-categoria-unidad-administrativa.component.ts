import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CategoriaUnidadAdministr } from '@core/models/categoria-unidad-administrativa';

@Component({
  selector: 'app-buscador-categoria-unidad-administrativa',
  templateUrl: './buscador-categoria-unidad-administrativa.component.html',
  styleUrls: ['./buscador-categoria-unidad-administrativa.component.scss'],
})
export class BuscadorCategoriaUnidadAdministrativaComponent {
  titulo = 'buscador de categorias de unidad administrativa';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.CATEGORIAS_UNIDAD_ADMINISTRATIVA.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorCategoriaUnidadAdministrativaComponent>
  ) {}

  seleccionar = (categoriaUnidadAdministrativa: CategoriaUnidadAdministr) => {
    this._dialogRef.close(categoriaUnidadAdministrativa);
  };
}
