import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { EstadoUso } from '@core/models/estado-uso';

@Component({
  selector: 'app-buscador-estado-uso',
  templateUrl: './buscador-estado-uso.component.html',
  styleUrls: ['./buscador-estado-uso.component.scss'],
})
export class BuscadorEstadoUsoComponent {
  titulo = 'buscador de estados de uso';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.ESTADOS_USO.filter(
    c => c !== 'acciones'
  );
  constructor(private _dialogRef: MatDialogRef<BuscadorEstadoUsoComponent>) {}

  seleccionar = (estadoUso: EstadoUso) => {
    this._dialogRef.close(estadoUso);
  };
}
