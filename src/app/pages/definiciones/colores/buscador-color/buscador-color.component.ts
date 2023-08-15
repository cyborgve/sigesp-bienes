import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Color } from '@core/models/definiciones/color';

@Component({
  selector: 'app-buscador-color',
  templateUrl: './buscador-color.component.html',
  styleUrls: ['./buscador-color.component.scss'],
})
export class BuscadorColorComponent {
  titulo = 'buscador de colores';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.COLORES.filter(c => c !== 'acciones');
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorColorComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (color: Color) => {
    this._dialogRef.close(color);
  };
}
