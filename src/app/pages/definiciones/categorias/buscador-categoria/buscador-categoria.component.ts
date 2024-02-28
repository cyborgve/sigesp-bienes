import { Categoria } from '@core/models/definiciones/categoria';
import { Component, Inject } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-buscador-categoria',
  templateUrl: './buscador-categoria.component.html',
  styleUrls: ['./buscador-categoria.component.scss'],
})
export class BuscadorCategoriaComponent {
  titulo = 'buscador de categorías';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.CATEGORIAS.filter(c => c !== 'acciones');
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (categoria: Categoria) => {
    this._dialogRef.close(categoria);
  };
}
