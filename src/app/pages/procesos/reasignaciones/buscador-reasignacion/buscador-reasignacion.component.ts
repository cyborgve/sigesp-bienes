import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Reasignacion } from '@core/models/procesos/reasignacion';

@Component({
  selector: 'app-buscador-reasignacion',
  templateUrl: './buscador-reasignacion.component.html',
  styleUrls: ['./buscador-reasignacion.component.scss'],
})
export class BuscadorReasignacionComponent {
  titulo = 'buscador de reasignaciones';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.REASIGNACIONES.filter(
    c => c !== 'acciones-proceso'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorReasignacionComponent>
  ) {}

  seleccionar = (entidad: Reasignacion) => {
    this._dialogRef.close(entidad);
  };
}
