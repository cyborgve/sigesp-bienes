import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  constructor(private _dialogRef: MatDialogRef<BuscadorColorComponent>) {}

  seleccionar = (color: Color) => {
    this._dialogRef.close(color);
  };
}
