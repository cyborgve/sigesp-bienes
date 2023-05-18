import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Conservacion } from '@core/models/conservacion';

@Component({
  selector: 'app-buscador-estado-conservacion',
  templateUrl: './buscador-estado-conservacion.component.html',
  styleUrls: ['./buscador-estado-conservacion.component.scss'],
})
export class BuscadorEstadoConservacionComponent {
  titulo = 'buscador de estados de consevacion';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.CONSERVACION.filter(
    c => c !== 'acciones'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorEstadoConservacionComponent>
  ) {}

  seleccionar = (conservacion: Conservacion) => {
    this._dialogRef.close(conservacion);
  };
}
