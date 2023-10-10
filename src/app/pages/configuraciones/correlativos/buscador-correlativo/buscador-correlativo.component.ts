import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Correlativo } from '@core/models/definiciones/correlativo';

@Component({
  selector: 'app-buscador-correlativo',
  templateUrl: './buscador-correlativo.component.html',
  styleUrls: ['./buscador-correlativo.component.scss'],
})
export class BuscadorCorrelativoComponent {
  titulo = 'buscador de correlativos';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.CORRELATIVOS.filter(
    c => c !== 'acciones'
  );
  constructor(private _dialogRef: MatDialogRef<BuscadorCorrelativoComponent>) {}

  seleccionar = (entidad: Correlativo) => {
    this._dialogRef.close(entidad);
  };
}
