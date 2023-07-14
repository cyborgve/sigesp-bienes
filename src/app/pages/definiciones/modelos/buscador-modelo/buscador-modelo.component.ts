import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Modelo } from '@core/models/definiciones/modelo';

@Component({
  selector: 'app-buscador-modelo',
  templateUrl: './buscador-modelo.component.html',
  styleUrls: ['./buscador-modelo.component.scss'],
})
export class BuscadorModeloComponent {
  titulo = 'buscador de modelos';
  columnasVisibles = COLUMNAS_VISIBLES.MODELOS.filter(c => c !== 'acciones');
  ocultarNuevo = true;
  constructor(private _dialogRef: MatDialogRef<BuscadorModeloComponent>) {}

  seleccionar = (modelo: Modelo) => {
    this._dialogRef.close(modelo);
  };
}
