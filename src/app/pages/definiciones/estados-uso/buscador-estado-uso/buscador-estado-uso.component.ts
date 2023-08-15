import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { EstadoUso } from '@core/models/definiciones/estado-uso';

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
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorEstadoUsoComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (estadoUso: EstadoUso) => {
    this._dialogRef.close(estadoUso);
  };
}
