import { Component, Inject } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
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
  filtros: any[] = [];
  constructor(
    private _dialogRef: MatDialogRef<BuscadorCategoriaUnidadComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: CategoriaUnidadAdministrativa) => {
    this._dialogRef.close(entidad);
  };
}
