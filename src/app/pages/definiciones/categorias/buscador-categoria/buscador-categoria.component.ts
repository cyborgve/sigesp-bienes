import { Categoria } from '@core/models/definiciones/categoria';
import { Component } from '@angular/core';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-buscador-categoria',
  templateUrl: './buscador-categoria.component.html',
  styleUrls: ['./buscador-categoria.component.scss'],
})
export class BuscadorCategoriaComponent {
  titulo = 'buscador de categorías';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.CATEGORIAS.filter(c => c !== 'acciones');
  constructor(private _dialogRef: MatDialogRef<BuscadorCategoriaComponent>) {}

  seleccionar = (categoria: Categoria) => {
    this._dialogRef.close(categoria);
  };
}
