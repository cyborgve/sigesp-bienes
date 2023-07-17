import { Retorno } from '@core/models/procesos/retorno';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-buscador-retorno',
  templateUrl: './buscador-retorno.component.html',
  styleUrls: ['./buscador-retorno.component.scss'],
})
export class BuscadorRetornoComponent {
  titulo = 'buscador de retornos';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.RETORNOS.filter(c => c !== 'acciones');
  constructor(private _dialogRef: MatDialogRef<BuscadorRetornoComponent>) {}

  seleccionar = (entidad: Retorno) => {
    this._dialogRef.close(entidad);
  };
}
