import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Rotulacion } from '@core/models/rotulacion';

@Component({
  selector: 'app-buscador-rotulacion',
  templateUrl: './buscador-rotulacion.component.html',
  styleUrls: ['./buscador-rotulacion.component.scss'],
})
export class BuscadorRotulacionComponent {
  titulo = 'buscador de rotulaciones';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.ROTULACIONES.filter(
    c => c !== 'acciones'
  );
  constructor(private _dialogRef: MatDialogRef<BuscadorRotulacionComponent>) {}

  seleccionar = (entidad: Rotulacion) => {
    this._dialogRef.close(entidad);
  };
}
