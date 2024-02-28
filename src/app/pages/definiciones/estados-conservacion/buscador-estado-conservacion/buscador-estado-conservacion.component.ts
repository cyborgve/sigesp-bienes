import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { EstadoConservacion } from '@core/models/definiciones/estado-conservacion';

@Component({
  selector: 'app-buscador-estado-conservacion',
  templateUrl: './buscador-estado-conservacion.component.html',
  styleUrls: ['./buscador-estado-conservacion.component.scss'],
})
export class BuscadorEstadoConservacionComponent {
  titulo = 'buscador de estados de consevación';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.ESTADOS_CONSERVACION.filter(
    c => c !== 'acciones'
  );
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorEstadoConservacionComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (conservacion: EstadoConservacion) => {
    this._dialogRef.close(conservacion);
  };
}
