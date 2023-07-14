import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Origen } from '@core/models/definiciones/origen';

@Component({
  selector: 'app-buscador-origen',
  templateUrl: './buscador-origen.component.html',
  styleUrls: ['./buscador-origen.component.scss'],
})
export class BuscadorOrigenComponent {
  titulo = 'buscador de orígenes';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.ORIGENES.filter(c => c !== 'acciones');
  constructor(private _dialogRef: MatDialogRef<BuscadorOrigenComponent>) {}

  seleccionar = (origen: Origen) => {
    this._dialogRef.close(origen);
  };
}
