import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Uso } from '@core/models/uso';

@Component({
  selector: 'app-buscador-uso',
  templateUrl: './buscador-uso.component.html',
  styleUrls: ['./buscador-uso.component.scss'],
})
export class BuscadorUsoComponent {
  titulo = 'buscador de usos';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.USOS.filter(c => c !== 'acciones');
  constructor(private _dialogRef: MatDialogRef<BuscadorUsoComponent>) {}

  seleccionar = (entidad: Uso) => {
    this._dialogRef.close(entidad);
  };
}
