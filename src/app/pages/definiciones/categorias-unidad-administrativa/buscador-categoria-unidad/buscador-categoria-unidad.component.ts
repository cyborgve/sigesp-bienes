import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CategoriaUnidadAdministrativa } from '@core/models/definiciones/categoria-unidad-administrativa';

@Component({
  selector: 'app-buscador-categoria-unidad',
  templateUrl: './buscador-categoria-unidad.component.html',
  styleUrls: ['./buscador-categoria-unidad.component.scss'],
})
export class BuscadorCategoriaUnidadComponent {
  titulo = 'buscador de categorías de unidades administrativas';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.CATEGORIAS_UNIDAD_ADMINISTRATIVA.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorCategoriaUnidadComponent>
  ) {}

  seleccionar = (entidad: CategoriaUnidadAdministrativa) => {
    this._dialogRef.close(entidad);
  };
}
