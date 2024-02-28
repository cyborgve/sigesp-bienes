import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Desincorporacion } from '@core/models/procesos/desincorporacion';

@Component({
  selector: 'app-buscador-desincorporacion',
  templateUrl: './buscador-desincorporacion.component.html',
  styleUrls: ['./buscador-desincorporacion.component.scss'],
})
export class BuscadorDesincorporacionComponent {
  titulo = 'buscador de desincorporaciones';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.DESINCORPORACIONES.filter(
    c => c !== 'acciones-proceso'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorDesincorporacionComponent>
  ) {}

  seleccionar = (entidad: Desincorporacion) => {
    this._dialogRef.close(entidad);
  };
}
